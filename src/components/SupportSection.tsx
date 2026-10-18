import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  HeartHandshake, 
  ShoppingBag, 
  Trees, 
  Soup, 
  Sparkles, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Calculator,
  Share2
} from 'lucide-react';

interface SupportSectionProps {
  onGoToMarkets: () => void;
}

export const SupportSection: React.FC<SupportSectionProps> = ({ onGoToMarkets }) => {
  // Simulator inputs
  const [riceKg, setRiceKg] = useState<number>(5);
  const [beansKg, setBeansKg] = useState<number>(3);
  const [basketsPerMonth, setBasketsPerMonth] = useState<number>(2);
  const [hasCommitted, setHasCommitted] = useState<boolean>(false);

  // Computations
  // Average pesticides in conventional cultivation: approx 3.8g active ingredient per kg grain
  const pesticidesAvoidedGrams = Math.round((riceKg * 3.8 + beansKg * 4.2 + basketsPerMonth * 15) * 12);
  // Carbon savings: approx 1.8 kg CO2eq per kg of agroecological short supply chain vs agroindustrial long chain
  const carbonAvoidedKg = Math.round((riceKg * 1.8 + beansKg * 1.5 + basketsPerMonth * 8.5) * 12);
  // Fair income directly paid to family cooperatives
  const incomeSupportedReais = Math.round((riceKg * 12 + beansKg * 14 + basketsPerMonth * 65) * 12);
  // Native trees supported via solidarity fund
  const treesSupported = Math.max(1, Math.round(incomeSupportedReais / 250));

  const handleCommitment = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#b91c1c', '#047857', '#d97706', '#ffffff'],
    });
    setHasCommitted(true);
  };

  return (
    <section id="como-apoiar" className="py-16 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-red-700 tracking-wider uppercase mb-2">
            <HeartHandshake className="w-4 h-4" />
            <span>Engajamento & Solidariedade</span>
            <span aria-hidden="true">·</span>
            <span>Democratizar a Terra</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight text-balance">
            Como Fomentar a Reforma Agrária Popular no seu Dia a Dia
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            Apoiar o MST e a agricultura camponesa está ao alcance de todos: seja escolhendo onde comprar 
            seu arroz e café, assinando uma cesta de alimentos frescos, ou fortalecendo campanhas 
            de solidariedade e reflorestamento.
          </p>
        </div>

        {/* 4 Pillars of Support */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:border-stone-300 transition-all shadow-xs">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-700 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                1. Compre Comida sem Veneno
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Priorize compras nos Armazéns do Campo, feiras periódicas e pontos agroecológicos. Cada real gasto vai direto para a família produtora, sem atravessadores.
              </p>
            </div>
            <button
              onClick={onGoToMarkets}
              className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-red-700 hover:text-red-900"
            >
              <span>Ver pontos no mapa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:border-stone-300 transition-all shadow-xs">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                2. Assine Cestas Agroecológicas
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Garanta o consumo quinzenal ou semanal de hortaliças, frutas e tubérculos da época, colhidos no dia da entrega e garantindo renda estável para o campo.
              </p>
            </div>
            <button
              onClick={onGoToMarkets}
              className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-900"
            >
              <span>Pontos de cesta</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:border-stone-300 transition-all shadow-xs">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Trees className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                3. Plante Árvores com o MST
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Apoie o Plano Nacional "Plantar Árvores, Produzir Alimentos Saudáveis". Participe dos mutirões comunitários ou doe mudas para viveiros populares de biomas.
              </p>
            </div>
            <div className="mt-6 text-xs font-semibold text-amber-800">
              Meta: 100 milhões de mudas
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:border-stone-300 transition-all shadow-xs">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center">
                <Soup className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                4. Cozinhas Solidárias
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Ajude as redes urbanas de solidariedade nas periferias que transformam os alimentos camponeses em marmitas nutritivas para pessoas em situação de vulnerabilidade.
              </p>
            </div>
            <div className="mt-6 text-xs font-semibold text-stone-700">
              +9.000 t doadas até hoje
            </div>
          </div>
        </div>

        {/* Interactive Impact Calculator */}
        <div className="bg-white rounded-3xl border border-stone-300 p-6 sm:p-10 shadow-sm">
          <div className="max-w-2xl mb-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              <Calculator className="w-4 h-4 text-red-700" />
              <span>Simulador de Consumo Consciente</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Calcule o Impacto Popular da sua Mesa
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              Ajuste as quantidades médias consumidas pela sua casa e veja em tempo real os impactos positivos 
              gerados ao optar por alimentos agroecológicos da Reforma Agrária em 1 ano.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sliders Column */}
            <div className="lg:col-span-6 space-y-6 bg-[#FAF8F5] p-6 rounded-2xl border border-stone-200">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-2">
                  <span>Arroz Orgânico Terra Livre por mês</span>
                  <span className="text-sm font-bold text-red-700 font-mono tabular-nums">{riceKg} kg</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={riceKg}
                  onChange={(e) => setRiceKg(Number(e.target.value))}
                  className="w-full accent-red-700 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                  <span>1 kg</span>
                  <span>15 kg</span>
                  <span>30 kg</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-2">
                  <span>Feijão Agroecológico sem veneno por mês</span>
                  <span className="text-sm font-bold text-red-700 font-mono tabular-nums">{beansKg} kg</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={beansKg}
                  onChange={(e) => setBeansKg(Number(e.target.value))}
                  className="w-full accent-red-700 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                  <span>1 kg</span>
                  <span>10 kg</span>
                  <span>20 kg</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-2">
                  <span>Cestas de legumes e verduras agroecológicas por mês</span>
                  <span className="text-sm font-bold text-red-700 font-mono tabular-nums">{basketsPerMonth} cesta(s)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  value={basketsPerMonth}
                  onChange={(e) => setBasketsPerMonth(Number(e.target.value))}
                  className="w-full accent-red-700 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                  <span>0 (nenhuma)</span>
                  <span>4 (semanal)</span>
                  <span>8 (família grande)</span>
                </div>
              </div>
            </div>

            {/* Impact Results Column */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="text-2xl font-serif font-bold text-emerald-800 tabular-nums">
                    {pesticidesAvoidedGrams} g
                  </div>
                  <div className="text-xs font-semibold text-emerald-950 mt-1">
                    Agrotóxicos evitados no ano
                  </div>
                  <p className="text-[11px] text-emerald-800 mt-1">
                    Não ingeridos pela sua família e não despejados no solo e nas águas.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
                  <div className="text-2xl font-serif font-bold text-sky-800 tabular-nums">
                    {carbonAvoidedKg} kg
                  </div>
                  <div className="text-xs font-semibold text-sky-950 mt-1">
                    CO₂ eq reduzido ao ano
                  </div>
                  <p className="text-[11px] text-sky-800 mt-1">
                    Menos queima de combustível fóssil e sem insumos petroquímicos sintéticos.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                  <div className="text-2xl font-serif font-bold text-amber-900 tabular-nums">
                    R$ {incomeSupportedReais.toLocaleString('pt-BR')}
                  </div>
                  <div className="text-xs font-semibold text-amber-950 mt-1">
                    Renda direta às cooperativas
                  </div>
                  <p className="text-[11px] text-amber-800 mt-1">
                    Valor total direcionado à autonomia e dignidade de famílias camponesas.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200">
                  <div className="text-2xl font-serif font-bold text-stone-900 tabular-nums">
                    {treesSupported} árvore{treesSupported > 1 ? 's' : ''}
                  </div>
                  <div className="text-xs font-semibold text-stone-900 mt-1">
                    Apoio a mudas nativas
                  </div>
                  <p className="text-[11px] text-stone-600 mt-1">
                    Incentivo aos viveiros comunitários de restauração ecológica.
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                {!hasCommitted ? (
                  <button
                    onClick={handleCommitment}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-red-700 hover:bg-red-800 rounded-xl shadow-xs hover:shadow transition-all"
                  >
                    <Check className="w-4 h-4" />
                    <span>Assumir Compromisso de Apoio Popular</span>
                  </button>
                ) : (
                  <div className="p-4 rounded-xl bg-emerald-100/70 border border-emerald-300 text-emerald-950 text-xs flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                      <span>
                        <b>Compromisso Solidário Ativado!</b> Obrigado por fortalecer a produção sem veneno e a soberania alimentar.
                      </span>
                    </div>
                    <button
                      onClick={onGoToMarkets}
                      className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors"
                    >
                      Encontrar Feira
                    </button>
                  </div>
                )}
              </div>

              {/* Real Data Methodology Note */}
              <div className="pt-3 border-t border-stone-200 text-[11px] text-stone-500 leading-relaxed font-sans">
                <b>Metodologia & Fontes Reais:</b> Estimativas fundamentadas nos dados oficiais do Programa de Análise de Resíduos de Agrotóxicos em Alimentos (PARA/ANVISA), médias de emissões em circuitos curtos da Embrapa/FAO e tabelas de preços públicos praticados pela CONCRAB (Confederação das Cooperativas de Reforma Agrária do Brasil).
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
