import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import L from 'leaflet';
import { MarketLocation, MarketType } from '../types';
import { MARKETS_DATA } from '../data/markets';
import { 
  Search, 
  MapPin, 
  Navigation, 
  Store, 
  Clock, 
  Phone, 
  ExternalLink, 
  Bookmark, 
  Check, 
  Sparkles, 
  Share2, 
  Filter,
  Compass,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Calendar,
  LocateFixed,
  Eye
} from 'lucide-react';

interface InteractiveMapProps {
  onSelectRecipeProduct?: (productName: string) => void;
  targetMarketId?: string | null;
  targetSearchQuery?: string | null;
}

// Preset cities for quick testing and manual location simulation
const PRESET_CITIES = [
  { name: 'São Paulo', state: 'SP', lat: -23.5505, lng: -46.6333 },
  { name: 'Rio de Janeiro', state: 'RJ', lat: -22.9068, lng: -43.1729 },
  { name: 'Belo Horizonte', state: 'MG', lat: -19.9208, lng: -43.9378 },
  { name: 'Porto Alegre', state: 'RS', lat: -30.0346, lng: -51.2177 },
  { name: 'Curitiba', state: 'PR', lat: -25.4284, lng: -49.2733 },
  { name: 'Brasília', state: 'DF', lat: -15.7975, lng: -47.8919 },
  { name: 'Salvador', state: 'BA', lat: -12.9777, lng: -38.5016 },
  { name: 'Recife', state: 'PE', lat: -8.0578, lng: -34.8829 },
  { name: 'Fortaleza', state: 'CE', lat: -3.7172, lng: -38.5434 },
];

// Haversine formula to compute distance in km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

function getMarkerColor(type: MarketType): { bg: string; border: string; text: string; pin: string } {
  switch (type) {
    case 'armazem':
      return { bg: 'bg-red-700', border: 'border-red-800', text: 'text-red-700', pin: '#b91c1c' };
    case 'feira':
      return { bg: 'bg-emerald-700', border: 'border-emerald-800', text: 'text-emerald-700', pin: '#047857' };
    case 'cesta':
      return { bg: 'bg-amber-600', border: 'border-amber-700', text: 'text-amber-700', pin: '#d97706' };
    case 'cooperativa':
      return { bg: 'bg-sky-700', border: 'border-sky-800', text: 'text-sky-700', pin: '#0369a1' };
    default:
      return { bg: 'bg-stone-800', border: 'border-stone-900', text: 'text-stone-800', pin: '#292524' };
  }
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
  targetMarketId, 
  targetSearchQuery 
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const autoLocateAttemptedRef = useRef(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<MarketType | 'todos'>('todos');
  const [selectedState, setSelectedState] = useState<string>('todos');
  const [selectedMarketId, setSelectedMarketId] = useState<string | null>(null);
  
  // Geolocation States
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationLabel, setLocationLabel] = useState<string | null>(null);
  const [geoStatus, setGeoStatus] = useState<'idle' | 'searching' | 'located' | 'denied' | 'unsupported'>('idle');
  const [maxDistanceFilter, setMaxDistanceFilter] = useState<number | null>(null);

  const [copiedMarketId, setCopiedMarketId] = useState<string | null>(null);
  const [savedFavorites, setSavedFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mst_favorite_markets');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Unique states for filter
  const availableStates = useMemo(() => {
    const states = Array.from(new Set(MARKETS_DATA.map((m) => m.state))).sort();
    return states;
  }, []);

  // Filtered and sorted markets
  const filteredMarkets = useMemo(() => {
    return MARKETS_DATA.map((m) => {
      let distanceKm: number | undefined = undefined;
      if (userLocation) {
        distanceKm = calculateDistance(userLocation.lat, userLocation.lng, m.lat, m.lng);
      }
      return { ...m, distanceKm };
    })
      .filter((m) => {
        const matchesType = selectedType === 'todos' || m.type === selectedType;
        const matchesState = selectedState === 'todos' || m.state === selectedState;
        const matchesMaxDist = !maxDistanceFilter || (m.distanceKm !== undefined && m.distanceKm <= maxDistanceFilter);
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !query ||
          m.name.toLowerCase().includes(query) ||
          m.city.toLowerCase().includes(query) ||
          m.address.toLowerCase().includes(query) ||
          m.neighborhood.toLowerCase().includes(query) ||
          m.highlights.some((h) => h.toLowerCase().includes(query));

        return matchesType && matchesState && matchesMaxDist && matchesQuery;
      })
      .sort((a, b) => {
        if (a.distanceKm !== undefined && b.distanceKm !== undefined) {
          return a.distanceKm - b.distanceKm;
        }
        return a.name.localeCompare(b.name);
      });
  }, [searchQuery, selectedType, selectedState, userLocation, maxDistanceFilter]);

  // Closest items calculation based on current user location
  const closestMarket = useMemo(() => {
    if (!userLocation) return null;
    const withDistance = MARKETS_DATA.map((m) => ({
      ...m,
      distanceKm: calculateDistance(userLocation.lat, userLocation.lng, m.lat, m.lng),
    })).sort((a, b) => a.distanceKm - b.distanceKm);

    return withDistance[0] || null;
  }, [userLocation]);

  // Closest periodic Feira do MST specifically
  const closestFeira = useMemo(() => {
    if (!userLocation) return null;
    const feiras = MARKETS_DATA.filter((m) => m.type === 'feira').map((m) => ({
      ...m,
      distanceKm: calculateDistance(userLocation.lat, userLocation.lng, m.lat, m.lng),
    })).sort((a, b) => a.distanceKm - b.distanceKm);

    return feiras[0] || null;
  }, [userLocation]);

  // Top 3 closest items for the dedicated proximity highlight strip
  const topNearestMarkets = useMemo(() => {
    if (!userLocation) return [];
    const withDistance = MARKETS_DATA.map((m) => ({
      ...m,
      distanceKm: calculateDistance(userLocation.lat, userLocation.lng, m.lat, m.lng),
    })).sort((a, b) => a.distanceKm - b.distanceKm);

    return withDistance.slice(0, 3);
  }, [userLocation]);

  const selectedMarket = useMemo(() => {
    if (!selectedMarketId) return filteredMarkets[0] || MARKETS_DATA[0];
    return MARKETS_DATA.find((m) => m.id === selectedMarketId) || filteredMarkets[0] || MARKETS_DATA[0];
  }, [selectedMarketId, filteredMarkets]);

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    setSavedFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('mst_favorite_markets', JSON.stringify(next));
      } catch (err) {
        console.error('Failed to save to localStorage', err);
      }
      return next;
    });
  };

  // Copy share link
  const handleShare = (market: MarketLocation) => {
    const text = `${market.name} - ${market.address}, ${market.city} (${market.state})\nHorários: ${market.openingHours}\nCompre produtos agroecológicos da Reforma Agrária Popular!`;
    navigator.clipboard.writeText(text);
    setCopiedMarketId(market.id);
    setTimeout(() => setCopiedMarketId(null), 2500);
  };

  // Place or update user marker on Leaflet map
  const renderUserMarker = useCallback((lat: number, lng: number, label?: string) => {
    if (!mapInstanceRef.current) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
    }

    const userIcon = L.divIcon({
      className: 'user-geo-marker',
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -16],
      html: `
        <div style="position: relative; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;" role="img" aria-label="Sua localização atual no mapa">
          <div class="radar-pulse-ring" style="background-color: rgba(37, 99, 235, 0.45); border: 1.5px solid #2563eb;"></div>
          <div style="width: 16px; height: 16px; border-radius: 9999px; background: #2563eb; border: 3px solid #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.35); position: relative; z-index: 10;"></div>
        </div>
      `,
    });

    const marker = L.marker([lat, lng], { icon: userIcon, zIndexOffset: 1000 });
    marker.bindPopup(`
      <div style="font-family: system-ui, sans-serif; padding: 6px 10px; font-size: 12px;">
        <span style="display: inline-block; width: 8px; height: 8px; border-radius: 9999px; background: #2563eb; margin-right: 6px;"></span>
        <b>${label || 'Sua localização atual'}</b>
      </div>
    `);
    marker.addTo(mapInstanceRef.current);
    userMarkerRef.current = marker;
  }, []);

  // Core Geolocation Request Handler
  const runGeolocation = useCallback((isAutomatic = false) => {
    if (!navigator.geolocation) {
      setGeoStatus('unsupported');
      return;
    }

    setGeoStatus('searching');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setLocationLabel('GPS do Navegador');
        setGeoStatus('located');

        renderUserMarker(latitude, longitude, 'Sua Localização (GPS)');

        // Automatically determine closest market and fit bounds
        const sorted = MARKETS_DATA.map((m) => ({
          ...m,
          dist: calculateDistance(latitude, longitude, m.lat, m.lng),
        })).sort((a, b) => a.dist - b.dist);

        const nearest = sorted[0];
        if (nearest) {
          setSelectedMarketId(nearest.id);
        }

        if (mapInstanceRef.current) {
          // Fit bounds encompassing user and the closest 2-3 points
          const closestPoints = sorted.slice(0, 3).map((m) => [m.lat, m.lng] as [number, number]);
          closestPoints.push([latitude, longitude]);
          const bounds = L.latLngBounds(closestPoints);
          mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
        }
      },
      (error) => {
        console.warn('Geolocation lookup notice:', error.message);
        setGeoStatus('denied');
      },
      { timeout: 12000, enableHighAccuracy: true, maximumAge: 60000 }
    );
  }, [renderUserMarker]);

  // Trigger Automatic Search On Mount
  useEffect(() => {
    if (autoLocateAttemptedRef.current) return;
    autoLocateAttemptedRef.current = true;

    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') {
          runGeolocation(true);
        } else if (result.state === 'prompt') {
          runGeolocation(true);
        } else {
          setGeoStatus('denied');
        }
      }).catch(() => {
        runGeolocation(true);
      });
    } else {
      runGeolocation(true);
    }
  }, [runGeolocation]);

  // Set simulated preset city for users without active GPS
  const handleSelectPresetCity = (city: typeof PRESET_CITIES[0]) => {
    setUserLocation({ lat: city.lat, lng: city.lng });
    setLocationLabel(`${city.name} (${city.state})`);
    setGeoStatus('located');
    renderUserMarker(city.lat, city.lng, `Ponto de Referência: ${city.name}`);

    const sorted = MARKETS_DATA.map((m) => ({
      ...m,
      dist: calculateDistance(city.lat, city.lng, m.lat, m.lng),
    })).sort((a, b) => a.dist - b.dist);

    if (sorted[0]) {
      setSelectedMarketId(sorted[0].id);
    }

    if (mapInstanceRef.current) {
      const topPts = sorted.slice(0, 3).map((m) => [m.lat, m.lng] as [number, number]);
      topPts.push([city.lat, city.lng]);
      const bounds = L.latLngBounds(topPts);
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
    }
  };

  // Reset user location
  const handleResetLocation = () => {
    setUserLocation(null);
    setLocationLabel(null);
    setGeoStatus('idle');
    setMaxDistanceFilter(null);
    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([-15.7801, -47.9292], 4);
    }
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [-15.7801, -47.9292],
      zoom: 4,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> colaboradores',
    }).addTo(map);

    markersGroupRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Sync Markers on Map with Highlighting for Closest Points & Feiras
  useEffect(() => {
    if (!mapInstanceRef.current || !markersGroupRef.current) return;

    const layerGroup = markersGroupRef.current;
    layerGroup.clearLayers();

    filteredMarkets.forEach((market) => {
      const colors = getMarkerColor(market.type);
      const isSelected = market.id === selectedMarketId;
      const isClosestMarket = closestMarket?.id === market.id;
      const isClosestFeira = closestFeira?.id === market.id;
      const isHighlighted = isClosestMarket || isClosestFeira;

      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        iconSize: [40, 52],
        iconAnchor: [20, 50],
        popupAnchor: [0, -48],
        html: `
          <div style="position: relative; cursor: pointer; display: flex; flex-direction: column; align-items: center; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.28)); transition: transform 0.2s;" class="${isSelected ? 'scale-115 z-30' : isHighlighted ? 'scale-105 z-20' : 'hover:scale-110'}" role="img" aria-label="${market.name} - ${market.typeLabel}">
            
            ${isClosestFeira ? `
              <div class="nearest-badge-pulse" style="position: absolute; top: -16px; background: #047857; color: #ffffff; font-size: 10px; font-weight: 800; padding: 2px 7px; border-radius: 9999px; border: 1.5px solid #ffffff; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.25); display: flex; align-items: center; gap: 3px; z-index: 40;">
                <span>🌾 Feira Mais Próxima</span>
              </div>
            ` : isClosestMarket ? `
              <div class="nearest-badge-pulse" style="position: absolute; top: -16px; background: #b91c1c; color: #ffffff; font-size: 10px; font-weight: 800; padding: 2px 7px; border-radius: 9999px; border: 1.5px solid #ffffff; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.25); display: flex; align-items: center; gap: 3px; z-index: 40;">
                <span>⭐ Ponto Mais Próximo</span>
              </div>
            ` : ''}

            ${isHighlighted ? `
              <div class="radar-pulse-ring" style="background-color: ${isClosestFeira ? 'rgba(4, 120, 87, 0.45)' : 'rgba(185, 28, 28, 0.45)'}; width: 34px; height: 34px; margin-top: -8px; margin-left: -17px;"></div>
            ` : ''}

            <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M18 0C8.05887 0 0 8.05887 0 18C0 30.6 18 44 18 44C18 44 36 30.6 36 18C36 8.05887 27.9411 0 18 0Z" fill="${colors.pin}"/>
              <circle cx="18" cy="18" r="8" fill="white"/>
              <circle cx="18" cy="18" r="4" fill="${colors.pin}"/>
            </svg>
          </div>
        `,
      });

      const marker = L.marker([market.lat, market.lng], { icon: customIcon });

      const popupHtml = `
        <div style="font-family: system-ui, sans-serif; padding: 12px 14px; min-width: 230px; max-width: 290px;">
          ${market.distanceKm !== undefined ? `
            <div style="font-size: 11px; font-weight: 700; color: #15803d; background: #dcfce7; padding: 3px 8px; border-radius: 6px; margin-bottom: 6px; display: inline-flex; align-items: center; gap: 4px;">
              📍 ${market.distanceKm} km de você ${isClosestMarket ? '· (Mais Próximo)' : ''}
            </div>
          ` : ''}
          <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: ${colors.pin}; letter-spacing: 0.5px; margin-bottom: 2px;">
            ${market.typeLabel}
          </div>
          <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #1c1917; line-height: 1.2;">
            ${market.name}
          </h4>
          <p style="margin: 0 0 8px 0; font-size: 12px; color: #57534e; line-height: 1.3;">
            ${market.address}, ${market.neighborhood} · ${market.city}-${market.state}
          </p>
          <div style="font-size: 11px; color: #44403c; background: #f5f5f4; padding: 4px 8px; border-radius: 6px; margin-bottom: 8px;">
            ⏰ ${market.openingHours}
          </div>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${market.lat},${market.lng}" target="_blank" rel="noopener noreferrer" style="display: block; text-align: center; background: #b91c1c; color: #ffffff; text-decoration: none; padding: 6px 10px; border-radius: 6px; font-size: 12px; font-weight: 600;">
            Como Chegar (Rota no Google Maps)
          </a>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        setSelectedMarketId(market.id);
      });

      layerGroup.addLayer(marker);
    });

    if (filteredMarkets.length > 0 && !selectedMarketId && !userLocation) {
      const bounds = L.latLngBounds(filteredMarkets.map((m) => [m.lat, m.lng]));
      mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
    }
  }, [filteredMarkets, selectedMarketId, closestMarket, closestFeira, userLocation]);

  // When selected market changes, pan smoothly
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedMarketId) return;
    const target = MARKETS_DATA.find((m) => m.id === selectedMarketId);
    if (target) {
      mapInstanceRef.current.flyTo([target.lat, target.lng], 14, {
        animate: true,
        duration: 1.2,
      });
    }
  }, [selectedMarketId]);

  // Handle external selection (from recipes or navbar)
  useEffect(() => {
    if (targetMarketId) {
      setSelectedMarketId(targetMarketId);
      const target = MARKETS_DATA.find((m) => m.id === targetMarketId);
      if (target) {
        setSelectedType('todos');
        setSelectedState('todos');
      }
    }
  }, [targetMarketId]);

  useEffect(() => {
    if (targetSearchQuery) {
      setSearchQuery(targetSearchQuery);
      setSelectedType('todos');
      setSelectedState('todos');
    }
  }, [targetSearchQuery]);

  const handleSelectMarketCard = (id: string) => {
    setSelectedMarketId(id);
  };

  return (
    <section 
      id="mapa-feiras" 
      aria-labelledby="mapa-heading"
      className="py-12 bg-white border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-red-700 tracking-wider uppercase mb-2">
            <span>Rede Popular de Comercialização</span>
            <span aria-hidden="true">·</span>
            <span>Busca Inteligente por Proximidade</span>
          </div>
          <h2 
            id="mapa-heading"
            className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight text-balance"
          >
            Encontre Feiras e Armazéns do Campo Próximos
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            Localize onde comprar arroz orgânico Terra Livre, café especial Guaií, feijões agroecológicos, 
            hortaliças frescas colhidas de manhã e a diversidade da culinária camponesa em feiras periódicas e armazéns em todo o Brasil.
          </p>
        </div>

        {/* Automatic Geolocation Status & Proximity Bar */}
        <div className="mb-6">
          {geoStatus === 'searching' && (
            <div 
              role="status" 
              aria-live="polite"
              className="flex items-center gap-3 p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs sm:text-sm text-blue-900 animate-pulse"
            >
              <RefreshCw className="w-4 h-4 text-blue-700 animate-spin shrink-0" aria-hidden="true" />
              <div className="flex-1">
                <span className="font-semibold">Localizando você automaticamente...</span>
                <span className="hidden sm:inline text-blue-700 ml-1">
                  Calculando a distância de todas as feiras e armazéns do MST em tempo real.
                </span>
              </div>
            </div>
          )}

          {geoStatus === 'located' && userLocation && (
            <div 
              role="status" 
              aria-live="polite"
              className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900"
            >
              <div className="flex items-center gap-2.5">
                <LocateFixed className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                <div>
                  <span className="font-bold text-emerald-950">Busca por GPS Ativa:</span>{' '}
                  <span>Locais ordenados automaticamente pela menor distância de você ({locationLabel || 'Coordenadas atuais'}).</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => runGeolocation(false)}
                  aria-label="Atualizar coordenadas de GPS e recalcular distâncias"
                  className="px-2.5 py-1 text-xs font-semibold text-emerald-800 bg-white border border-emerald-300 rounded-lg hover:bg-emerald-100 transition-colors flex items-center gap-1 shadow-2xs focus-visible:outline-2 focus-visible:outline-emerald-700"
                >
                  <RefreshCw className="w-3 h-3" aria-hidden="true" />
                  <span>Recalcular GPS</span>
                </button>
                <button
                  onClick={handleResetLocation}
                  aria-label="Redefinir busca por localização e exibir todo o Brasil"
                  className="px-2.5 py-1 text-xs font-medium text-stone-600 hover:text-stone-900 bg-white border border-stone-200 rounded-lg hover:bg-stone-100 transition-colors focus-visible:outline-2 focus-visible:outline-stone-700"
                >
                  Ver Todo o Brasil
                </button>
              </div>
            </div>
          )}

          {(geoStatus === 'denied' || geoStatus === 'unsupported') && !userLocation && (
            <div 
              role="region" 
              aria-label="Opções manuais de localização"
              className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-2.5"
            >
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="flex-1">
                  <span className="font-bold text-amber-950">
                    {geoStatus === 'unsupported' 
                      ? 'Navegador sem suporte a GPS:' 
                      : 'Geolocalização não concedida pelo navegador:'}
                  </span>{' '}
                  Para encontrar a feira do MST mais próxima, você pode permitir a localização no navegador ou selecionar sua capital de referência abaixo:
                </div>
              </div>

              {/* Quick City Presets */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1" role="group" aria-label="Simular localização por cidade">
                <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider mr-1">
                  Simular cidade:
                </span>
                {PRESET_CITIES.map((city) => (
                  <button
                    key={city.name}
                    onClick={() => handleSelectPresetCity(city)}
                    aria-label={`Simular localização em ${city.name}, estado ${city.state}`}
                    className="px-2.5 py-1 text-xs bg-white text-stone-800 border border-amber-300 rounded-lg hover:bg-amber-100/70 hover:border-amber-400 transition-all font-medium shadow-2xs cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-700"
                  >
                    📍 {city.name} ({city.state})
                  </button>
                ))}
                <button
                  onClick={() => runGeolocation(false)}
                  aria-label="Solicitar permissão de GPS e tentar busca automática novamente"
                  className="ml-auto px-2.5 py-1 text-xs font-semibold text-amber-900 underline hover:text-amber-950 focus-visible:outline-2 focus-visible:outline-amber-700 rounded"
                >
                  Tentar GPS novamente
                </button>
              </div>
            </div>
          )}
        </div>

        {/* FEATURED: Highlight Closest MST Fairs Strip (When Location is Known) */}
        {userLocation && (closestFeira || closestMarket) && (
          <section 
            aria-label="Feiras e armazéns do MST em destaque por proximidade"
            className="mb-8 p-5 bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-950 rounded-2xl text-white shadow-md border border-emerald-800"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-emerald-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" aria-hidden="true" />
                <h3 className="font-serif font-bold text-lg sm:text-xl text-emerald-100 flex items-center gap-2">
                  <span>Destaques da Reforma Agrária Mais Próximos de Você</span>
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedType(selectedType === 'feira' ? 'todos' : 'feira');
                  }}
                  aria-pressed={selectedType === 'feira'}
                  aria-label={selectedType === 'feira' ? 'Desativar filtro exclusivo de feiras' : 'Filtrar apenas feiras periódicas da Reforma Agrária'}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-white ${
                    selectedType === 'feira'
                      ? 'bg-emerald-500 text-stone-950 font-bold'
                      : 'bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 border border-emerald-700'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{selectedType === 'feira' ? '✓ Filtrando Apenas Feiras' : 'Apenas Feiras Periódicas'}</span>
                </button>
                <button
                  onClick={() => setMaxDistanceFilter(maxDistanceFilter === 50 ? null : 50)}
                  aria-pressed={maxDistanceFilter === 50}
                  aria-label={maxDistanceFilter === 50 ? 'Remover filtro de raio de 50 quilômetros' : 'Filtrar apenas locais até 50 quilômetros de distância'}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-white ${
                    maxDistanceFilter === 50
                      ? 'bg-amber-400 text-stone-950 font-bold'
                      : 'bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 border border-emerald-700'
                  }`}
                >
                  {maxDistanceFilter === 50 ? '✓ Raio até 50 km' : 'Filtrar raio < 50 km'}
                </button>
              </div>
            </div>

            {/* Grid of the 2-3 Closest Highlight Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
              {/* Highlight 1: Closest Periodic Feira */}
              {closestFeira && (
                <article 
                  role="listitem"
                  onClick={() => handleSelectMarketCard(closestFeira.id)}
                  className="bg-emerald-900/60 hover:bg-emerald-900/90 border border-emerald-600/80 rounded-xl p-4 transition-all cursor-pointer relative flex flex-col justify-between group"
                >
                  <div className="absolute top-3 right-3 flex items-center gap-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500 text-emerald-950 px-2 py-0.5 rounded-full shadow-2xs">
                      🌾 Feira Mais Próxima
                    </span>
                  </div>

                  <div>
                    <div className="text-xs text-emerald-300 font-bold flex items-center gap-1">
                      <Navigation className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                      <span>{closestFeira.distanceKm} km de você</span>
                    </div>

                    <h4 className="text-base font-bold text-white mt-1 group-hover:text-emerald-200 transition-colors">
                      {closestFeira.name}
                    </h4>

                    <p className="text-xs text-emerald-200/90 mt-1 line-clamp-2">
                      {closestFeira.address}, {closestFeira.city} - {closestFeira.state}
                    </p>

                    <div className="mt-2.5 text-[11px] text-emerald-100/80 bg-emerald-950/60 p-2 rounded-lg border border-emerald-800/60">
                      ⏰ <b>Horário:</b> {closestFeira.openingHours}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-emerald-800/80">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMarketId(closestFeira.id);
                      }}
                      aria-label={`Centralizar mapa na feira ${closestFeira.name}`}
                      className="flex-1 py-1.5 px-2.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-center flex items-center justify-center gap-1 focus-visible:outline-2 focus-visible:outline-white"
                    >
                      <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Ver no Mapa</span>
                    </button>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${closestFeira.lat},${closestFeira.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Traçar rota no Google Maps até a feira ${closestFeira.name}`}
                      className="py-1.5 px-3 text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-stone-950 rounded-lg transition-colors flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-white"
                    >
                      <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Rota</span>
                    </a>
                  </div>
                </article>
              )}

              {/* Highlight 2: Closest Overall Point */}
              {closestMarket && closestMarket.id !== closestFeira?.id && (
                <article 
                  role="listitem"
                  onClick={() => handleSelectMarketCard(closestMarket.id)}
                  className="bg-stone-900/70 hover:bg-stone-900/90 border border-stone-700 rounded-xl p-4 transition-all cursor-pointer relative flex flex-col justify-between group"
                >
                  <div className="absolute top-3 right-3 flex items-center gap-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-red-600 text-white px-2 py-0.5 rounded-full shadow-2xs">
                      ⭐ Mais Próximo ({closestMarket.typeLabel})
                    </span>
                  </div>

                  <div>
                    <div className="text-xs text-amber-300 font-bold flex items-center gap-1">
                      <Navigation className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                      <span>{closestMarket.distanceKm} km de você</span>
                    </div>

                    <h4 className="text-base font-bold text-white mt-1 group-hover:text-red-200 transition-colors">
                      {closestMarket.name}
                    </h4>

                    <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                      {closestMarket.address}, {closestMarket.city} - {closestMarket.state}
                    </p>

                    <div className="mt-2.5 text-[11px] text-stone-300 bg-black/40 p-2 rounded-lg border border-stone-800">
                      ⏰ <b>Horário:</b> {closestMarket.openingHours}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-stone-800">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMarketId(closestMarket.id);
                      }}
                      aria-label={`Centralizar mapa no ponto ${closestMarket.name}`}
                      className="flex-1 py-1.5 px-2.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-center flex items-center justify-center gap-1 focus-visible:outline-2 focus-visible:outline-white"
                    >
                      <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Ver no Mapa</span>
                    </button>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${closestMarket.lat},${closestMarket.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Traçar rota no Google Maps até ${closestMarket.name}`}
                      className="py-1.5 px-3 text-xs font-bold bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-white"
                    >
                      <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Rota</span>
                    </a>
                  </div>
                </article>
              )}

              {/* Highlight 3: Another close point if available */}
              {topNearestMarkets[1] && topNearestMarkets[1].id !== closestFeira?.id && topNearestMarkets[1].id !== closestMarket?.id && (
                <article 
                  role="listitem"
                  onClick={() => handleSelectMarketCard(topNearestMarkets[1].id)}
                  className="bg-stone-900/70 hover:bg-stone-900/90 border border-stone-700 rounded-xl p-4 transition-all cursor-pointer relative flex flex-col justify-between group hidden lg:flex"
                >
                  <div className="absolute top-3 right-3 flex items-center gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-700 text-stone-200 px-2 py-0.5 rounded-full">
                      #2 em Proximidade
                    </span>
                  </div>

                  <div>
                    <div className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                      <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{topNearestMarkets[1].distanceKm} km de você</span>
                    </div>

                    <h4 className="text-base font-bold text-white mt-1 group-hover:text-stone-200 transition-colors">
                      {topNearestMarkets[1].name}
                    </h4>

                    <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                      {topNearestMarkets[1].address}, {topNearestMarkets[1].city} - {topNearestMarkets[1].state}
                    </p>

                    <div className="mt-2.5 text-[11px] text-stone-300 bg-black/40 p-2 rounded-lg border border-stone-800">
                      ⏰ <b>Horário:</b> {topNearestMarkets[1].openingHours}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-stone-800">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMarketId(topNearestMarkets[1].id);
                      }}
                      aria-label={`Centralizar mapa em ${topNearestMarkets[1].name}`}
                      className="flex-1 py-1.5 px-2.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-center flex items-center justify-center gap-1 focus-visible:outline-2 focus-visible:outline-white"
                    >
                      <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Ver no Mapa</span>
                    </button>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${topNearestMarkets[1].lat},${topNearestMarkets[1].lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Traçar rota no Google Maps até ${topNearestMarkets[1].name}`}
                      className="py-1.5 px-3 text-xs font-bold bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-white"
                    >
                      <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Rota</span>
                    </a>
                  </div>
                </article>
              )}
            </div>
          </section>
        )}

        {/* Filter and Search Bar */}
        <section 
          aria-label="Filtros e pesquisa de pontos de venda"
          className="bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs mb-8 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="relative md:col-span-5">
              <label htmlFor="market-search-input" className="sr-only">
                Buscar por nome, bairro, feira, cidade ou produto
              </label>
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" aria-hidden="true" />
              <input
                id="market-search-input"
                type="search"
                role="searchbox"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nome, bairro, feira, cidade ou produto..."
                aria-label="Buscar por nome, bairro, feira, cidade ou produto"
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-shadow placeholder:text-stone-400"
              />
            </div>

            {/* State Selector */}
            <div className="md:col-span-3">
              <label htmlFor="market-state-select" className="sr-only">
                Filtrar por estado brasileiro
              </label>
              <select
                id="market-state-select"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                aria-label="Filtrar locais por estado brasileiro"
                className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 text-stone-700"
              >
                <option value="todos">Todos os Estados ({MARKETS_DATA.length} locais)</option>
                {availableStates.map((st) => (
                  <option key={st} value={st}>
                    Estado: {st} ({MARKETS_DATA.filter((m) => m.state === st).length})
                  </option>
                ))}
              </select>
            </div>

            {/* Geolocation Button */}
            <div className="md:col-span-4 flex items-center gap-2">
              <button
                onClick={() => runGeolocation(false)}
                disabled={geoStatus === 'searching'}
                aria-label="Detectar localização atual pelo GPS e ordenar feiras por distância"
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-stone-800 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 hover:border-stone-400 transition-all shadow-xs disabled:opacity-60 cursor-pointer focus-visible:outline-2 focus-visible:outline-red-700"
              >
                <Compass className={`w-4 h-4 text-red-700 ${geoStatus === 'searching' ? 'animate-spin' : ''}`} aria-hidden="true" />
                <span>
                  {geoStatus === 'searching' 
                    ? 'Detectando GPS...' 
                    : userLocation 
                    ? 'Atualizar Minha Localização' 
                    : 'Buscar Mais Próximos via GPS'}
                </span>
              </button>
            </div>
          </div>

          {/* Type Segmented Controls */}
          <div 
            role="tablist" 
            aria-label="Filtrar pontos por tipo de comercialização"
            className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200/80"
          >
            <span className="text-xs font-semibold text-stone-500 mr-1 flex items-center gap-1" id="filter-type-label">
              <Filter className="w-3.5 h-3.5" aria-hidden="true" />
              Tipo:
            </span>
            {[
              { id: 'todos', label: 'Todos os Pontos' },
              { id: 'feira', label: 'Feiras Periódicas do MST' },
              { id: 'armazem', label: 'Armazéns do Campo' },
              { id: 'cesta', label: 'Cestas Agroecológicas' },
              { id: 'cooperativa', label: 'Cooperativas de Produção' },
            ].map((tab) => {
              const isActive = selectedType === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="markets-list-view"
                  onClick={() => setSelectedType(tab.id as MarketType | 'todos')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-stone-900 ${
                    isActive
                      ? tab.id === 'feira' 
                        ? 'bg-emerald-800 text-white shadow-xs font-bold'
                        : 'bg-stone-900 text-white shadow-xs'
                      : 'bg-white text-stone-600 border border-stone-200 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  {tab.id === 'feira' && '🌾 '}
                  {tab.label}
                </button>
              );
            })}

            {(searchQuery || selectedType !== 'todos' || selectedState !== 'todos' || maxDistanceFilter) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('todos');
                  setSelectedState('todos');
                  setMaxDistanceFilter(null);
                }}
                aria-label="Limpar todos os filtros de pesquisa e seleção"
                className="ml-auto text-xs text-red-700 hover:text-red-900 underline font-medium cursor-pointer focus-visible:outline-2 focus-visible:outline-red-700 rounded"
              >
                Limpar filtros
              </button>
            )}
          </div>
        </section>

        {/* Grid: Map (Left/Center) + Detail / List (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Map Column */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="relative w-full h-[480px] sm:h-[580px] rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
              <div 
                ref={mapContainerRef} 
                role="region"
                aria-label="Mapa interativo com marcações de feiras e armazéns da Reforma Agrária"
                className="w-full h-full" 
              />

              {/* Legend overlay */}
              <div 
                role="region"
                aria-label="Legenda dos tipos de pontos no mapa"
                className="absolute bottom-3 left-3 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-stone-200 shadow-md text-[11px] text-stone-700 space-y-1.5 max-w-[240px]"
              >
                <div className="font-bold text-stone-900 flex items-center justify-between">
                  <span>Legenda dos Pontos</span>
                  {userLocation && (
                    <span className="text-[10px] text-blue-700 font-semibold bg-blue-50 px-1.5 py-0.5 rounded">
                      GPS Ativo
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-700" aria-hidden="true" />
                  <span className="font-semibold text-emerald-950">Feira Agroecológica MST</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-700" aria-hidden="true" />
                  <span>Armazém do Campo (Loja)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600" aria-hidden="true" />
                  <span>Cesta Agroecológica</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-700" aria-hidden="true" />
                  <span>Cooperativa de Produção</span>
                </div>
                {userLocation && (
                  <div className="flex items-center gap-2 pt-1 border-t border-stone-200 text-blue-800 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 ring-2 ring-blue-300" aria-hidden="true" />
                    <span>Sua Localização</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick stats ribbon */}
            <div 
              role="status" 
              aria-live="polite"
              className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 bg-[#FAF8F5] rounded-xl border border-stone-200 text-xs text-stone-600"
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold text-stone-900 tabular-nums">{filteredMarkets.length}</span>
                <span>locais de comercialização encontrados</span>
                {userLocation && (
                  <span className="text-emerald-700 font-semibold">
                    (ordenados pela menor distância)
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                  <Check className="w-3.5 h-3.5" aria-hidden="true" /> 100% Produção Camponesa
                </span>
                <span className="inline-flex items-center gap-1 text-stone-700 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" /> Sem Agrotóxicos
                </span>
              </div>
            </div>
          </div>

          {/* Details & List Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Selected Spot Showcase Card */}
            {selectedMarket && (
              <article 
                role="region"
                aria-label={`Detalhes do local selecionado: ${selectedMarket.name}`}
                aria-live="polite"
                className="bg-[#FAF8F5] rounded-2xl border border-stone-300 p-5 shadow-sm space-y-4 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs uppercase tracking-wider font-semibold ${
                        selectedMarket.type === 'feira' ? 'text-emerald-800 font-bold' : 'text-red-700'
                      }`}>
                        {selectedMarket.typeLabel}
                      </span>
                      {closestMarket?.id === selectedMarket.id && (
                        <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-full">
                          ★ Mais Próximo
                        </span>
                      )}
                      {closestFeira?.id === selectedMarket.id && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                          🌾 Feira Mais Próxima
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-serif font-bold text-stone-900 mt-1">
                      {selectedMarket.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {selectedMarket.neighborhood} · {selectedMarket.city}, {selectedMarket.state}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleShare(selectedMarket)}
                      aria-label={`Compartilhar endereço de ${selectedMarket.name}`}
                      title="Compartilhar endereço"
                      className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 rounded-lg transition-colors relative cursor-pointer focus-visible:outline-2 focus-visible:outline-red-700"
                    >
                      {copiedMarketId === selectedMarket.id ? (
                        <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                      ) : (
                        <Share2 className="w-4 h-4" aria-hidden="true" />
                      )}
                    </button>
                    <button
                      onClick={() => toggleFavorite(selectedMarket.id)}
                      aria-label={savedFavorites.includes(selectedMarket.id) ? `Remover ${selectedMarket.name} dos favoritos` : `Favoritar ${selectedMarket.name}`}
                      title={savedFavorites.includes(selectedMarket.id) ? 'Remover dos favoritos' : 'Favoritar este local'}
                      className="p-2 text-stone-500 hover:text-red-700 hover:bg-stone-200/60 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-red-700"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          savedFavorites.includes(selectedMarket.id)
                            ? 'fill-red-700 text-red-700'
                            : 'text-stone-500'
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed">
                  {selectedMarket.description}
                </p>

                {/* Practical operational info */}
                <div className="space-y-2 text-xs text-stone-700 border-y border-stone-200/80 py-3">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-red-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{selectedMarket.address}, {selectedMarket.neighborhood}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{selectedMarket.openingHours}</span>
                  </div>
                  {selectedMarket.phone && (
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-stone-500 shrink-0" aria-hidden="true" />
                      <span>{selectedMarket.phone}</span>
                    </div>
                  )}
                  {selectedMarket.distanceKm !== undefined && (
                    <div className="flex items-center gap-2.5 text-stone-900 font-bold bg-emerald-50 text-emerald-950 p-2 rounded-lg border border-emerald-200">
                      <Navigation className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                      <span>Distância calculada via GPS: aproximadamente {selectedMarket.distanceKm} km</span>
                    </div>
                  )}
                </div>

                {/* Highlight products */}
                <div>
                  <div className="text-[11px] uppercase font-bold text-stone-500 tracking-wider mb-2">
                    Destaques da Reforma Agrária neste local
                  </div>
                  <div className="flex flex-wrap gap-1.5" role="list" aria-label="Produtos agroecológicos em destaque">
                    {selectedMarket.highlights.map((prod, i) => (
                      <span
                        key={i}
                        role="listitem"
                        className="text-xs bg-white text-stone-800 border border-stone-200 px-2.5 py-1 rounded-md"
                      >
                        {prod}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-2.5 pt-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedMarket.lat},${selectedMarket.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Abrir rota no Google Maps até ${selectedMarket.name}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-red-700"
                  >
                    <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Como Chegar (GPS)</span>
                  </a>

                  {selectedMarket.whatsapp && (
                    <a
                      href={`https://wa.me/55${selectedMarket.whatsapp.replace(/\D/g, '')}?text=Ol%C3%A1!%20Encontrei%20voc%C3%AAs%20pela%20plataforma%20Terra%20%26%20Alimento%20e%20gostaria%20de%20informa%C3%A7%C3%B5es.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Enviar mensagem no WhatsApp para ${selectedMarket.name}`}
                      className="px-3.5 py-2.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-emerald-700"
                    >
                      <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>WhatsApp</span>
                    </a>
                  )}

                  {selectedMarket.instagram && (
                    <a
                      href={`https://instagram.com/${selectedMarket.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Abrir perfil do Instagram de ${selectedMarket.name}`}
                      className="p-2.5 text-stone-600 hover:text-stone-900 bg-white border border-stone-200 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-stone-700"
                      title="Ver Instagram"
                    >
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            )}

            {/* Scrollable List of Matches with Distance Ranking */}
            <div className="space-y-3">
              <div 
                aria-live="polite"
                className="flex items-center justify-between text-xs font-bold text-stone-500 uppercase tracking-wider"
              >
                <span>
                  Lista de Locais ({filteredMarkets.length})
                  {userLocation && ' · Ordenados por Distância'}
                </span>
                {savedFavorites.length > 0 && (
                  <span className="text-red-700">{savedFavorites.length} salvos</span>
                )}
              </div>

              <div 
                id="markets-list-view"
                role="list"
                aria-label="Lista de feiras e armazéns da Reforma Agrária filtrados"
                className="max-h-[380px] overflow-y-auto space-y-2 pr-1 divide-y divide-stone-100"
              >
                {filteredMarkets.length === 0 ? (
                  <div className="p-8 text-center text-sm text-stone-500 bg-stone-50 rounded-xl space-y-2" role="status">
                    <p>Nenhum ponto encontrado com os filtros atuais.</p>
                    {maxDistanceFilter && (
                      <button
                        onClick={() => setMaxDistanceFilter(null)}
                        className="text-xs text-red-700 font-semibold underline focus-visible:outline-2 focus-visible:outline-red-700"
                      >
                        Remover filtro de raio de 50 km
                      </button>
                    )}
                  </div>
                ) : (
                  filteredMarkets.map((market, index) => {
                    const isSelected = market.id === selectedMarket?.id;
                    const isFav = savedFavorites.includes(market.id);
                    const isTopFeira = closestFeira?.id === market.id;
                    const isTopMarket = closestMarket?.id === market.id;

                    return (
                      <div
                        key={market.id}
                        role="listitem"
                        tabIndex={0}
                        onClick={() => handleSelectMarketCard(market.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleSelectMarketCard(market.id);
                          }
                        }}
                        aria-label={`${market.name}, ${market.typeLabel} em ${market.city}, ${market.state}${market.distanceKm !== undefined ? `, a ${market.distanceKm} quilômetros` : ''}`}
                        className={`p-3.5 rounded-xl cursor-pointer transition-all border focus-visible:outline-2 focus-visible:outline-red-700 ${
                          isSelected
                            ? 'bg-red-50/70 border-red-300 shadow-xs'
                            : isTopFeira
                            ? 'bg-emerald-50/50 border-emerald-300 hover:bg-emerald-50'
                            : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-stone-500">
                              <span className={getMarkerColor(market.type).text}>{market.typeLabel}</span>
                              <span aria-hidden="true">·</span>
                              <span>{market.city}, {market.state}</span>
                              
                              {market.distanceKm !== undefined && (
                                <>
                                  <span aria-hidden="true">·</span>
                                  <span className={`font-bold tabular-nums px-1.5 py-0.5 rounded text-[10px] ${
                                    isTopFeira || isTopMarket 
                                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                                      : 'bg-stone-100 text-stone-700'
                                  }`}>
                                    {market.distanceKm} km
                                  </span>
                                </>
                              )}

                              {isTopFeira && (
                                <span className="bg-emerald-700 text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider">
                                  🌾 Feira + Próxima
                                </span>
                              )}
                              {!isTopFeira && isTopMarket && (
                                <span className="bg-red-700 text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider">
                                  ⭐ + Próximo
                                </span>
                              )}
                            </div>
                            
                            <h4 className="text-sm font-semibold text-stone-900 mt-1">
                              {market.name}
                            </h4>
                            
                            <p className="text-xs text-stone-600 line-clamp-1 mt-0.5">
                              {market.address}
                            </p>

                            {market.type === 'feira' && (
                              <p className="text-[11px] text-emerald-800 font-medium mt-1">
                                📅 {market.scheduleDays || 'Edições Periódicas'} · {market.openingHours}
                              </p>
                            )}
                          </div>

                          <div className="flex flex-col items-end gap-1.5 shrink-0">
                            {isFav && (
                              <Bookmark className="w-3.5 h-3.5 fill-red-700 text-red-700" aria-label="Item favoritado" />
                            )}
                            <span className="text-[10px] text-stone-400 font-mono" aria-hidden="true">
                              #{index + 1}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
