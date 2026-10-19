import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { FooterNewsletter } from './FooterNewsletter';

interface FooterProps {
  onNavigate: (tabId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer 
      role="contentinfo" 
      aria-label="Rodapé institucional Terra & Alimento"
      className="bg-stone-900 text-stone-300 py-14 border-t border-stone-800 text-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Dedicated Rich Newsletter Component */}
        <FooterNewsletter onNavigateToMap={() => onNavigate('mapa')} />

        {/* Links and Organization Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2 text-white font-serif font-bold text-lg">
              <span className="w-7 h-7 rounded-full bg-red-700 flex items-center justify-center text-[10px] font-black text-white" aria-hidden="true">
                MST
              </span>
              <span>Terra & Alimento</span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              Plataforma popular para conectar consumidores conscientes às feiras, Armazéns do Campo 
              e cooperativas agroecológicas da Reforma Agrária em todo o território nacional.
            </p>
            <div className="text-[11px] text-stone-500 font-medium">
              Alimentar quem tem fome · Preservar as águas e as florestas · Democratizar a terra.
            </div>
          </div>

          {/* Navigation Links */}
          <nav 
            aria-label="Navegação secundária do rodapé" 
            className="md:col-span-3 space-y-2.5"
          >
            <div className="font-bold uppercase tracking-wider text-stone-200 text-[11px]">
              Navegação Rápida
            </div>
            <ul role="list" className="space-y-1.5 text-stone-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('mapa')}
                  className="hover:text-white transition-colors cursor-pointer text-left focus:outline-hidden focus:ring-1 focus:ring-stone-400 rounded"
                >
                  Localizar Feiras & Armazéns
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('beneficios')}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5 focus:outline-hidden focus:ring-1 focus:ring-stone-400 rounded"
                >
                  <Sparkles className="w-3.5 h-3.5 text-red-500" aria-hidden="true" />
                  <span>Benefícios Sociais do MST</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('receitas')}
                  className="hover:text-white transition-colors cursor-pointer text-left focus:outline-hidden focus:ring-1 focus:ring-stone-400 rounded"
                >
                  Receitas Orgânicas da Terra
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('historia')}
                  className="hover:text-white transition-colors cursor-pointer text-left focus:outline-hidden focus:ring-1 focus:ring-stone-400 rounded"
                >
                  História & Fatos Positivos
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('apoiar')}
                  className="hover:text-white transition-colors cursor-pointer text-left focus:outline-hidden focus:ring-1 focus:ring-stone-400 rounded"
                >
                  Como Apoiar a Reforma Agrária
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('denuncias')}
                  className="hover:text-white transition-colors cursor-pointer text-left focus:outline-hidden focus:ring-1 focus:ring-stone-400 rounded"
                >
                  Canal de Denúncias & Segurança
                </button>
              </li>
            </ul>
          </nav>

          {/* Social Proof & Networks */}
          <div className="md:col-span-4 space-y-2.5">
            <div className="font-bold uppercase tracking-wider text-stone-200 text-[11px]">
              Canais Oficiais & Solidariedade
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Conheça as campanhas permanentes, o jornal Sem Terra e a Escola Nacional Florestan Fernandes.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <a
                href="https://mst.org.br"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Portal MST Oficial (abre em nova aba)"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors focus:outline-hidden focus:ring-1 focus:ring-stone-400"
              >
                <span>Portal MST Oficial</span>
                <ExternalLink className="w-3 h-3 text-stone-400" aria-hidden="true" />
              </a>
              <a
                href="https://armazemdocampo.com.br"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Armazém do Campo (abre em nova aba)"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors focus:outline-hidden focus:ring-1 focus:ring-stone-400"
              >
                <span>Armazém do Campo</span>
                <ExternalLink className="w-3 h-3 text-stone-400" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Hairline Divider & Bottom Copyright */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <div>
            © 2026 Terra & Alimento · Plataforma Popular da Reforma Agrária Agroecológica.
          </div>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Cultivado com dignidade e soberania popular</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
