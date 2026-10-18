import React, { useEffect, useRef, useState, useMemo } from 'react';
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
  ArrowRight
} from 'lucide-react';

interface InteractiveMapProps {
  onSelectRecipeProduct?: (productName: string) => void;
  targetMarketId?: string | null;
  targetSearchQuery?: string | null;
}

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
  const userMarkerRef = useRef<L.CircleMarker | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<MarketType | 'todos'>('todos');
  const [selectedState, setSelectedState] = useState<string>('todos');
  const [selectedMarketId, setSelectedMarketId] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
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
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !query ||
          m.name.toLowerCase().includes(query) ||
          m.city.toLowerCase().includes(query) ||
          m.address.toLowerCase().includes(query) ||
          m.neighborhood.toLowerCase().includes(query) ||
          m.highlights.some((h) => h.toLowerCase().includes(query));

        return matchesType && matchesState && matchesQuery;
      })
      .sort((a, b) => {
        if (a.distanceKm !== undefined && b.distanceKm !== undefined) {
          return a.distanceKm - b.distanceKm;
        }
        return a.name.localeCompare(b.name);
      });
  }, [searchQuery, selectedType, selectedState, userLocation]);

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

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center of Brazil roughly or São Paulo / Brasília
    const map = L.map(mapContainerRef.current, {
      center: [-15.7801, -47.9292], // Brasília center view
      zoom: 4,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    // Clean OpenStreetMap tiles
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

  // Sync Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !markersGroupRef.current) return;

    const layerGroup = markersGroupRef.current;
    layerGroup.clearLayers();

    filteredMarkets.forEach((market) => {
      const colors = getMarkerColor(market.type);
      const isSelected = market.id === selectedMarketId;

      // Custom DivIcon with SVG Pin
      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        iconSize: [36, 44],
        iconAnchor: [18, 44],
        popupAnchor: [0, -42],
        html: `
          <div style="cursor: pointer; display: flex; flex-direction: column; align-items: center; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.25)); transition: transform 0.2s;" class="${isSelected ? 'scale-115 z-30' : 'hover:scale-110'}">
            <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 0C8.05887 0 0 8.05887 0 18C0 30.6 18 44 18 44C18 44 36 30.6 36 18C36 8.05887 27.9411 0 18 0Z" fill="${colors.pin}"/>
              <circle cx="18" cy="18" r="8" fill="white"/>
              <circle cx="18" cy="18" r="4" fill="${colors.pin}"/>
            </svg>
          </div>
        `,
      });

      const marker = L.marker([market.lat, market.lng], { icon: customIcon });

      const popupHtml = `
        <div style="font-family: system-ui, sans-serif; padding: 12px 14px; min-width: 220px; max-width: 280px;">
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
            Como Chegar (Rota)
          </a>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        setSelectedMarketId(market.id);
      });

      layerGroup.addLayer(marker);
    });

    // Auto-fit bounds if we have markets and not currently focused on single
    if (filteredMarkets.length > 0 && !selectedMarketId) {
      const bounds = L.latLngBounds(filteredMarkets.map((m) => [m.lat, m.lng]));
      mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
    }
  }, [filteredMarkets, selectedMarketId]);

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

  // Request browser geolocation
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocalização não é suportada pelo seu navegador.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        if (mapInstanceRef.current) {
          if (userMarkerRef.current) {
            userMarkerRef.current.remove();
          }
          userMarkerRef.current = L.circleMarker([latitude, longitude], {
            radius: 9,
            fillColor: '#2563eb',
            color: '#ffffff',
            weight: 3,
            opacity: 1,
            fillOpacity: 0.9,
          })
            .bindPopup('<b>Você está aqui</b>')
            .addTo(mapInstanceRef.current);

          mapInstanceRef.current.flyTo([latitude, longitude], 11, { animate: true });
        }
      },
      (error) => {
        setIsLocating(false);
        console.warn('Geolocation error:', error);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleSelectMarketCard = (id: string) => {
    setSelectedMarketId(id);
  };

  return (
    <section id="mapa-feiras" className="py-12 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-red-700 tracking-wider uppercase mb-2">
            <span>Rede Popular de Comercialização</span>
            <span aria-hidden="true">·</span>
            <span>Alimento Saudável Sem Veneno</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight text-balance">
            Encontre Feiras e Armazéns do Campo Próximos
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            Localize onde comprar arroz orgânico Terra Livre, café especial Guaií, feijões agroecológicos, 
            hortaliças frescas colhidas de manhã e a diversidade da culinária camponesa em todo o Brasil.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="relative md:col-span-5">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nome, bairro, cidade ou produto..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-shadow placeholder:text-stone-400"
              />
            </div>

            {/* State Selector */}
            <div className="md:col-span-3">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
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
                onClick={handleUseMyLocation}
                disabled={isLocating}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-stone-800 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 hover:border-stone-400 transition-all shadow-xs disabled:opacity-60"
              >
                <Compass className={`w-4 h-4 text-red-700 ${isLocating ? 'animate-spin' : ''}`} />
                <span>{isLocating ? 'Obtendo localização...' : 'Ordenar por Mais Próximos'}</span>
              </button>
            </div>
          </div>

          {/* Type Segmented Controls */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200/80">
            <span className="text-xs font-semibold text-stone-500 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Tipo:
            </span>
            {[
              { id: 'todos', label: 'Todos os Pontos' },
              { id: 'armazem', label: 'Armazéns do Campo' },
              { id: 'feira', label: 'Feiras Periódicas' },
              { id: 'cesta', label: 'Cestas Agroecológicas' },
              { id: 'cooperativa', label: 'Cooperativas de Produção' },
            ].map((tab) => {
              const isActive = selectedType === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedType(tab.id as MarketType | 'todos')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-white text-stone-600 border border-stone-200 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}

            {(searchQuery || selectedType !== 'todos' || selectedState !== 'todos') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('todos');
                  setSelectedState('todos');
                }}
                className="ml-auto text-xs text-red-700 hover:text-red-900 underline font-medium cursor-pointer"
              >
                Limpar filtros
              </button>
            )}
          </div>
        </div>

        {/* Grid: Map (Left/Center) + Detail / List (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Map Column */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="relative w-full h-[480px] sm:h-[560px] rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
              <div ref={mapContainerRef} className="w-full h-full" />

              {/* Legend overlay */}
              <div className="absolute bottom-3 left-3 z-20 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-stone-200 shadow-md text-[11px] text-stone-700 space-y-1">
                <div className="font-bold text-stone-900 mb-1">Legenda dos Pontos</div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-700" />
                  <span>Armazém do Campo (Loja Física)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-700" />
                  <span>Feira Agroecológica Periódica</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                  <span>Cesta Agroecológica</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-700" />
                  <span>Cooperativa de Produção</span>
                </div>
              </div>
            </div>

            {/* Quick stats ribbon */}
            <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 bg-[#FAF8F5] rounded-xl border border-stone-200 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-stone-900 tabular-nums">{filteredMarkets.length}</span>
                <span>locais de comercialização encontrados</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                  <Check className="w-3.5 h-3.5" /> 100% Produção Camponesa
                </span>
                <span className="inline-flex items-center gap-1 text-stone-700 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Sem Agrotóxicos
                </span>
              </div>
            </div>
          </div>

          {/* Details & List Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Selected Spot Showcase Card */}
            {selectedMarket && (
              <div className="bg-[#FAF8F5] rounded-2xl border border-stone-300 p-5 shadow-sm space-y-4 transition-all">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-red-700">
                      {selectedMarket.typeLabel}
                    </span>
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
                      title="Compartilhar endereço"
                      className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 rounded-lg transition-colors relative"
                    >
                      {copiedMarketId === selectedMarket.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => toggleFavorite(selectedMarket.id)}
                      title={savedFavorites.includes(selectedMarket.id) ? 'Remover dos favoritos' : 'Favoritar este local'}
                      className="p-2 text-stone-500 hover:text-red-700 hover:bg-stone-200/60 rounded-lg transition-colors"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          savedFavorites.includes(selectedMarket.id)
                            ? 'fill-red-700 text-red-700'
                            : 'text-stone-500'
                        }`}
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
                    <MapPin className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                    <span>{selectedMarket.address}, {selectedMarket.neighborhood}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                    <span>{selectedMarket.openingHours}</span>
                  </div>
                  {selectedMarket.phone && (
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-stone-500 shrink-0" />
                      <span>{selectedMarket.phone}</span>
                    </div>
                  )}
                  {selectedMarket.distanceKm !== undefined && (
                    <div className="flex items-center gap-2.5 text-stone-900 font-semibold">
                      <Navigation className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Aproximadamente {selectedMarket.distanceKm} km de você</span>
                    </div>
                  )}
                </div>

                {/* Highlight products */}
                <div>
                  <div className="text-[11px] uppercase font-bold text-stone-500 tracking-wider mb-2">
                    Destaques da Reforma Agrária neste local
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedMarket.highlights.map((prod, i) => (
                      <span
                        key={i}
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
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg shadow-xs transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Como Chegar (GPS)</span>
                  </a>

                  {selectedMarket.whatsapp && (
                    <a
                      href={`https://wa.me/55${selectedMarket.whatsapp.replace(/\D/g, '')}?text=Ol%C3%A1!%20Encontrei%20voc%C3%AAs%20pela%20plataforma%20Terra%20%26%20Alimento%20e%20gostaria%20de%20informa%C3%A7%C3%B5es.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  )}

                  {selectedMarket.instagram && (
                    <a
                      href={`https://instagram.com/${selectedMarket.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 text-stone-600 hover:text-stone-900 bg-white border border-stone-200 rounded-lg transition-colors"
                      title="Ver Instagram"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Scrollable List of All Matches */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-stone-500 uppercase tracking-wider">
                <span>Lista de Locais ({filteredMarkets.length})</span>
                {savedFavorites.length > 0 && (
                  <span className="text-red-700">{savedFavorites.length} salvos</span>
                )}
              </div>

              <div className="max-h-[360px] overflow-y-auto space-y-2 pr-1 divide-y divide-stone-100">
                {filteredMarkets.length === 0 ? (
                  <div className="p-8 text-center text-sm text-stone-500 bg-stone-50 rounded-xl">
                    Nenhum ponto encontrado com os filtros atuais.
                  </div>
                ) : (
                  filteredMarkets.map((market) => {
                    const isSelected = market.id === selectedMarket?.id;
                    const isFav = savedFavorites.includes(market.id);
                    return (
                      <div
                        key={market.id}
                        onClick={() => handleSelectMarketCard(market.id)}
                        className={`p-3.5 rounded-xl cursor-pointer transition-all border ${
                          isSelected
                            ? 'bg-red-50/70 border-red-300 shadow-xs'
                            : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2 text-[11px] font-semibold text-stone-500">
                              <span className={getMarkerColor(market.type).text}>{market.typeLabel}</span>
                              <span aria-hidden="true">·</span>
                              <span>{market.city}, {market.state}</span>
                              {market.distanceKm !== undefined && (
                                <>
                                  <span aria-hidden="true">·</span>
                                  <span className="text-blue-700 font-bold tabular-nums">
                                    {market.distanceKm} km
                                  </span>
                                </>
                              )}
                            </div>
                            <h4 className="text-sm font-semibold text-stone-900 mt-0.5">
                              {market.name}
                            </h4>
                            <p className="text-xs text-stone-600 line-clamp-1 mt-0.5">
                              {market.address}
                            </p>
                          </div>
                          {isFav && (
                            <Bookmark className="w-3.5 h-3.5 fill-red-700 text-red-700 shrink-0 mt-1" />
                          )}
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
