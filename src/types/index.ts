export type MarketType = 'armazem' | 'feira' | 'cesta' | 'cooperativa';

export interface MarketLocation {
  id: string;
  name: string;
  type: MarketType;
  typeLabel: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  openingHours: string;
  scheduleDays: string;
  phone?: string;
  whatsapp?: string;
  instagram?: string;
  website?: string;
  highlights: string[];
  description: string;
  isCertifiedOrganic: boolean;
  distanceKm?: number;
}

export type RecipeCategory = 'todos' | 'prato_principal' | 'cafe_lanche' | 'sobremesa' | 'vegetariano' | 'bebida';

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  category: RecipeCategory;
  categoryLabel: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: 'Fácil' | 'Médio' | 'Elaborado';
  description: string;
  mstIngredients: {
    name: string;
    cooperativeOrigin: string;
    benefit: string;
  }[];
  ingredients: string[];
  instructions: string[];
  agroTip: string;
  image: string;
}

export interface HistoricalMilestone {
  year: string;
  title: string;
  subtitle: string;
  location: string;
  description: string;
  keyPoint: string;
  tag: string;
}

export interface PositiveFact {
  id: string;
  title: string;
  stat: string;
  statLabel: string;
  description: string;
  citation: string;
  category: 'alimento' | 'ecologia' | 'solidariedade' | 'educacao';
}

export interface ReportSubmission {
  id: string;
  protocol: string;
  timestamp: string;
  category: string;
  urgency: 'Alta' | 'Média' | 'Crítica';
  state: string;
  municipality: string;
  settlementName: string;
  description: string;
  hasArmedPresence: boolean;
  hasChemicalSpraying: boolean;
  isAnonymous: boolean;
  informantName?: string;
  informantContact?: string;
  status: 'Recebida' | 'Em Análise Humanitária' | 'Encaminhada ao MPF/DPU';
}
