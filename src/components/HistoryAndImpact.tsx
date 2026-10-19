import React, { useState } from 'react';
import { HISTORICAL_MILESTONES, POSITIVE_FACTS } from '../data/history';
import { heroAgriculture } from '../assets/images';
import { 
  BookOpen, 
  Award, 
  Calendar, 
  CheckCircle2, 
  Globe2, 
  HeartHandshake, 
  GraduationCap, 
  Trees, 
  Wheat, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const HistoryAndImpact: React.FC = () => {
  const [selectedFactCategory, setSelectedFactCategory] = useState<string>('todos');
  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState<number>(0);

  const filteredFacts = selectedFactCategory === 'todos' 
    ? POSITIVE_FACTS 
    : POSITIVE_FACTS.filter((f) => f.category === selectedFactCategory);

  const currentMilestone = HISTORICAL_MILESTONES[selectedMilestoneIndex];

  return (
    <section 
      id="historia-conquistas" 
      aria-labelledby="history-heading"
      className="py-16 bg-white border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-red-700 tracking-wider uppercase mb-2">
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            <span>40 Anos de Luta e Produção</span>
            <span aria-hidden="true">·</span>
            <span>Reforma Agrária Popular</span>
          </div>
          <h2 
            id="history-heading"
            className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight text-balance"
          >
            História & Fatos Positivos: Alimentando o Povo Brasileiro
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            Conheça as quatro décadas de trajetória do MST: de ocupações de terras improdutivas à 
            construção da maior cooperativa de arroz orgânico da América Latina, preservação ambiental 
            e solidariedade ativa com quem passa fome.
          </p>
        </div>

        {/* Fatos Positivos Grid with Audited Numbers */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-red-700" aria-hidden="true" />
              <span>Conquistas e Números Comprovados</span>
            </h3>

            {/* Filter buttons */}
            <div 
              role="tablist" 
              aria-label="Filtrar fatos comprovados por categoria"
              className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-lg"
            >
              {[
                { id: 'todos', label: 'Todos os Fatos' },
                { id: 'alimento', label: 'Alimentos & Grãos' },
                { id: 'ecologia', label: 'Ecologia & Árvores' },
                { id: 'solidariedade', label: 'Solidariedade' },
                { id: 'educacao', label: 'Educação' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  role="tab"
                  aria-selected={selectedFactCategory === btn.id}
                  aria-controls="facts-grid-list"
                  onClick={() => setSelectedFactCategory(btn.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-red-700 ${
                    selectedFactCategory === btn.id
                      ? 'bg-white text-stone-900 shadow-xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div 
            id="facts-grid-list"
            role="list"
            aria-label="Lista de fatos e conquistas auditadas da Reforma Agrária"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredFacts.map((fact) => (
              <article
                key={fact.id}
                role="listitem"
                className="bg-[#FAF8F5] rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:border-stone-300 transition-all shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-red-700 tabular-nums">
                      {fact.stat}
                    </span>
                    <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                      {fact.category === 'alimento' && '🌾 Produção'}
                      {fact.category === 'ecologia' && '🌳 Meio Ambiente'}
                      {fact.category === 'solidariedade' && '🤝 Ajuda Mútua'}
                      {fact.category === 'educacao' && '📚 Pedagogia'}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-stone-900 mb-1 leading-snug">
                    {fact.title}
                  </h4>
                  <div className="text-xs font-semibold text-stone-500 mb-3">
                    {fact.statLabel}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {fact.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-200/80 text-[11px] text-stone-500 font-mono">
                  {fact.citation}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Feature Spotlight: Arroz Orgânico & Agrofloresta (2-Column Balance) */}
        <section 
          aria-label="Destaque histórico: Maior produtor de arroz orgânico da América Latina"
          className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-stone-900 text-white rounded-3xl overflow-hidden shadow-md"
        >
          <div className="lg:col-span-6 p-8 sm:p-12 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-700/80 text-white text-xs font-semibold">
              <Wheat className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Destaque Histórico Global</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold leading-tight">
              A comida que chega à mesa do brasileiro nasce do solo livre de agrotóxicos
            </h3>
            <p className="text-sm text-stone-300 leading-relaxed">
              Enquanto o agronegócio de monocultura volta-se principalmente para commodities de exportação como soja transgênica, 
              é a agricultura familiar camponesa e a Reforma Agrária Popular que colocam a comida de verdade no prato da população: 
              feijão, arroz agroecológico, mandioca, hortaliças e frutas.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-stone-800 text-xs">
              <div>
                <span className="block text-xl font-bold text-red-500 tabular-nums">70%</span>
                <span className="text-stone-400">da alimentação consumida no Brasil vem de agricultores familiares</span>
              </div>
              <div>
                <span className="block text-xl font-bold text-emerald-400 tabular-nums">0%</span>
                <span className="text-stone-400">agrotóxico nas lavouras certificadas de arroz Terra Livre</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 h-full min-h-[320px] lg:min-h-[460px] relative">
            <img
              src={heroAgriculture}
              alt="Colheita agroecológica do arroz orgânico nos assentamentos do Rio Grande do Sul"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent lg:hidden" aria-hidden="true" />
          </div>
        </section>

        {/* Interactive Timeline of Milestones */}
        <section aria-labelledby="timeline-heading">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-wider">
              <Calendar className="w-4 h-4 text-red-700" aria-hidden="true" />
              <span>Linha do Tempo Interativa</span>
            </div>
            <h3 id="timeline-heading" className="text-2xl font-serif font-bold text-stone-900 mt-1">
              Quatro Décadas de Luta pela Terra e Justiça Social
            </h3>
          </div>

          {/* Timeline Navigation Tabs */}
          <div 
            role="tablist"
            aria-label="Selecione o marco histórico na linha do tempo"
            className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-stone-200 mb-8"
          >
            {HISTORICAL_MILESTONES.map((m, idx) => {
              const isActive = selectedMilestoneIndex === idx;
              return (
                <button
                  key={m.year}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="timeline-detail-panel"
                  onClick={() => setSelectedMilestoneIndex(idx)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-red-700 ${
                    isActive
                      ? 'bg-red-700 text-white shadow-sm'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  <span className="font-mono">{m.year}</span>
                  <span className="hidden sm:inline">· {m.tag}</span>
                </button>
              );
            })}
          </div>

          {/* Active Milestone Card */}
          {currentMilestone && (
            <div 
              id="timeline-detail-panel"
              role="region"
              aria-live="polite"
              aria-label={`Marco histórico do ano ${currentMilestone.year}: ${currentMilestone.title}`}
              className="bg-[#FAF8F5] rounded-3xl border border-stone-300 p-6 sm:p-10 shadow-xs"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
                    <span className="font-mono text-xl font-bold text-red-700">
                      {currentMilestone.year}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-stone-800">{currentMilestone.location}</span>
                    <span aria-hidden="true">·</span>
                    <span className="bg-stone-200/80 text-stone-800 px-2.5 py-0.5 rounded-md font-medium">
                      {currentMilestone.tag}
                    </span>
                  </div>

                  <h4 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-tight">
                    {currentMilestone.title}
                  </h4>
                  <div className="text-sm font-semibold text-red-700">
                    {currentMilestone.subtitle}
                  </div>

                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans">
                    {currentMilestone.description}
                  </p>

                  <div className="p-4 rounded-xl bg-white border border-stone-200 text-xs text-stone-800 flex items-start gap-3 mt-4">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <span className="font-bold text-stone-900">Marco Histórico:</span>{' '}
                      <span>{currentMilestone.keyPoint}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200 p-5 space-y-4">
                  <div className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" aria-hidden="true" />
                    <span>Princípio da Reforma Agrária</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed italic">
                    "A Reforma Agrária Popular propõe não apenas democratizar o acesso à terra, mas 
                    revolucionar a forma como nos relacionamos com a natureza, erradicar o analfabetismo, 
                    respeitar a cultura camponesa e garantir alimento saudável para toda a classe trabalhadora."
                  </p>
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() =>
                        setSelectedMilestoneIndex((prev) =>
                          prev > 0 ? prev - 1 : HISTORICAL_MILESTONES.length - 1
                        )
                      }
                      aria-label="Ver marco histórico do ano anterior"
                      className="text-stone-600 hover:text-stone-900 font-medium focus-visible:outline-2 focus-visible:outline-stone-700 rounded p-1"
                    >
                      ← Ano anterior
                    </button>
                    <button
                      onClick={() =>
                        setSelectedMilestoneIndex((prev) =>
                          prev < HISTORICAL_MILESTONES.length - 1 ? prev + 1 : 0
                        )
                      }
                      aria-label="Ver próximo marco histórico"
                      className="text-red-700 hover:text-red-900 font-bold focus-visible:outline-2 focus-visible:outline-red-700 rounded p-1"
                    >
                      Próximo marco →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </section>
  );
};
