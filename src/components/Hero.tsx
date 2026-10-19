import React from 'react';
import { MapPin, UtensilsCrossed, ArrowRight, ShieldCheck, Wheat, Sparkles } from 'lucide-react';
import { heroAgriculture } from '../assets/images';

interface HeroProps {
  onExploreMarkets: () => void;
  onExploreRecipes: () => void;
  onExploreHistory: () => void;
  onExploreBenefits?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMarkets,
  onExploreRecipes,
  onExploreHistory,
  onExploreBenefits
}) => {
  return (
    <section 
      aria-labelledby="hero-title" 
      className="bg-[#FAF8F5] border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        {/* 2-Column Split: Editorial Copy (Left) + Visual Focal Anchor (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-700 uppercase tracking-wider">
                <Wheat className="w-4 h-4 text-red-700" aria-hidden="true" />
                <span>Reforma Agrária Popular · Soberania Alimentar</span>
              </div>

              <h1 
                id="hero-title" 
                className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.1] text-balance"
              >
                Comida de verdade no prato de quem tem fome.
              </h1>

              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl font-sans">
                Descubra a produção agroecológica dos assentamentos e cooperativas do MST. 
                Localize feiras e Armazéns do Campo perto de você, aprenda receitas orgânicas 
                saudáveis e apoie a segurança e a dignidade das famílias camponesas.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2" role="group" aria-label="Ações principais">
              <button
                onClick={onExploreMarkets}
                aria-label="Encontrar feiras e armazéns agroecológicos no mapa interativo"
                className="px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-red-700 hover:bg-red-800 rounded-xl shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-red-700 focus-visible:outline-offset-2"
              >
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>Encontrar Feiras & Armazéns</span>
              </button>

              {onExploreBenefits && (
                <button
                  onClick={onExploreBenefits}
                  aria-label="Conhecer os 15 benefícios auditados e sociais do MST"
                  className="px-5 py-3.5 text-xs sm:text-sm font-semibold text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-red-700 focus-visible:outline-offset-2"
                >
                  <Sparkles className="w-4 h-4 text-red-700" aria-hidden="true" />
                  <span>Benefícios Sociais do MST</span>
                </button>
              )}

              <button
                onClick={onExploreRecipes}
                aria-label="Ver receitas agroecológicas e culinária camponesa"
                className="px-5 py-3.5 text-xs sm:text-sm font-semibold text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-red-700 focus-visible:outline-offset-2"
              >
                <UtensilsCrossed className="w-4 h-4 text-stone-600" aria-hidden="true" />
                <span>Receitas Agroecológicas</span>
              </button>

              <button
                onClick={onExploreHistory}
                aria-label="Conhecer a história de 40 anos e as conquistas do MST"
                className="px-4 py-3.5 text-xs sm:text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors flex items-center gap-1.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-red-700 focus-visible:outline-offset-2"
              >
                <span>Nossa História</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>

            {/* Quiet Trust Footnote */}
            <div className="pt-4 border-t border-stone-200/80 flex items-center gap-4 text-xs text-stone-500" role="list" aria-label="Compromissos da produção">
              <span className="flex items-center gap-1.5" role="listitem">
                <ShieldCheck className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                <span>Sem Agrotóxicos</span>
              </span>
              <span aria-hidden="true">·</span>
              <span role="listitem">100% Agricultura Familiar</span>
              <span aria-hidden="true">·</span>
              <span role="listitem">Comércio Justo Direto</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Image Anchor */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-sm border border-stone-200/80 min-h-[360px] lg:h-full">
            <img
              src={heroAgriculture}
              alt="Famílias camponesas colhendo arroz orgânico na lavoura da reforma agrária em Nova Santa Rita, Rio Grande do Sul"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover lg:h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-[11px] font-mono tracking-wider uppercase text-amber-300">
                Polo Agroecológico de Nova Santa Rita · RS
              </span>
              <p className="text-sm font-serif font-medium mt-1 leading-snug">
                Maior produção de arroz orgânico certificado da América Latina, livre de transgênicos e venenos.
              </p>
            </div>
          </div>
        </div>

        {/* 4-Column KPI Strip in a full-width row below the hero split */}
        <section 
          aria-label="Indicadores auditados da Reforma Agrária Popular"
          className="mt-12 pt-8 border-t border-stone-200"
        >
          <div className="flex items-center justify-between gap-4 mb-4">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Conquistas e Números Auditados da Reforma Agrária Popular
            </span>
            {onExploreBenefits && (
              <button
                onClick={onExploreBenefits}
                aria-label="Ver todos os 15 benefícios comprovados e auditados do MST"
                className="text-xs text-red-700 hover:text-red-800 font-bold inline-flex items-center gap-1 cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-red-700 rounded"
              >
                <span>Ver todos os 15 benefícios comprovados</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" role="list">
            <div 
              role="button"
              tabIndex={0}
              onClick={onExploreBenefits}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onExploreBenefits?.(); } }}
              aria-label="Indicador: 1º Lugar em Arroz Orgânico na América Latina com certificação internacional FAO. Clique para ver benefícios."
              className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs hover:border-red-300 hover:shadow-sm transition-all cursor-pointer group focus-visible:outline-2 focus-visible:outline-red-700 focus-visible:outline-offset-2"
            >
              <div className="text-2xl sm:text-3xl font-serif font-bold text-red-700 tabular-nums group-hover:scale-102 transition-transform">
                1º Lugar
              </div>
              <div className="text-xs font-bold text-stone-900 mt-1">
                Arroz Orgânico América Latina
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">
                Certificação internacional e auditoria FAO
              </div>
            </div>

            <div 
              role="button"
              tabIndex={0}
              onClick={onExploreBenefits}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onExploreBenefits?.(); } }}
              aria-label="Indicador: Mais de 25 milhões de árvores nativas plantadas nos 6 biomas. Clique para ver benefícios."
              className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs hover:border-emerald-300 hover:shadow-sm transition-all cursor-pointer group focus-visible:outline-2 focus-visible:outline-red-700 focus-visible:outline-offset-2"
            >
              <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-700 tabular-nums group-hover:scale-102 transition-transform">
                +25 Milhões
              </div>
              <div className="text-xs font-bold text-stone-900 mt-1">
                Árvores Nativas Plantadas
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">
                Plano de recuperação dos 6 biomas
              </div>
            </div>

            <div 
              role="button"
              tabIndex={0}
              onClick={onExploreBenefits}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onExploreBenefits?.(); } }}
              aria-label="Indicador: Mais de 9 mil toneladas de alimentos doados em pandemias e enchentes. Clique para ver benefícios."
              className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs hover:border-amber-300 hover:shadow-sm transition-all cursor-pointer group focus-visible:outline-2 focus-visible:outline-red-700 focus-visible:outline-offset-2"
            >
              <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-600 tabular-nums group-hover:scale-102 transition-transform">
                +9.000 Toneladas
              </div>
              <div className="text-xs font-bold text-stone-900 mt-1">
                Alimentos Doados à População
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">
                Solidariedade em pandemias e enchentes
              </div>
            </div>

            <div 
              role="button"
              tabIndex={0}
              onClick={onExploreBenefits}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onExploreBenefits?.(); } }}
              aria-label="Indicador: Mais de 160 cooperativas agropecuárias e 120 agroindústrias comunitárias. Clique para ver benefícios."
              className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs hover:border-stone-400 hover:shadow-sm transition-all cursor-pointer group focus-visible:outline-2 focus-visible:outline-red-700 focus-visible:outline-offset-2"
            >
              <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tabular-nums group-hover:scale-102 transition-transform">
                160+
              </div>
              <div className="text-xs font-bold text-stone-900 mt-1">
                Cooperativas Agropecuárias
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">
                120 agroindústrias comunitárias no país
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};
