import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Wheat, 
  Trees, 
  HeartHandshake, 
  GraduationCap, 
  Building2, 
  Scale, 
  Search, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Users2,
  Droplets,
  HeartCrack,
  Sprout
} from 'lucide-react';

export type BenefitPillar = 'todos' | 'alimentacao' | 'meio_ambiente' | 'solidariedade' | 'educacao' | 'economia' | 'democracia';

export interface BenefitItem {
  id: string;
  pillar: BenefitPillar;
  pillarLabel: string;
  title: string;
  metric: string;
  metricLabel: string;
  summary: string;
  realImpact: string;
  concreteExample: string;
  source: string;
}

export const MST_BENEFITS: BenefitItem[] = [
  {
    id: 'arroz-agroecologico',
    pillar: 'alimentacao',
    pillarLabel: 'Soberania Alimentar',
    title: 'Maior Produção de Arroz Orgânico da América Latina',
    metric: '1º Lugar',
    metricLabel: 'Liderança continental há mais de 10 safras consecutivas',
    summary: 'Colheita anual de mais de 16 mil toneladas de arroz livre de glifosato, fertilizantes químicos sintéticos e sementes transgênicas, alimentando famílias em todo o país.',
    realImpact: 'Garante arroz agulhinha, integral, vermelho e preto de alta qualidade biológica a preços justos para escolas públicas, hospitais e a mesa popular.',
    concreteExample: 'Cooperativa COOPAT (Nova Santa Rita/RS) e Cooperativas de Assentados da Grande Porto Alegre com a marca Terra Livre.',
    source: 'FAO / Organização das Nações Unidas e Instituto Rio Grandense do Arroz (IRGA)',
  },
  {
    id: 'diversificacao-alimentar',
    pillar: 'alimentacao',
    pillarLabel: 'Soberania Alimentar',
    title: 'Comida de Verdade no Prato do Povo Brasileiro',
    metric: '70%',
    metricLabel: 'Dos alimentos básicos do Brasil vêm de agricultores familiares',
    summary: 'Enquanto o agronegócio de grande porte se dedica predominantemente a monoculturas de exportação (soja e milho transgênicos), o MST planta o feijão, a mandioca, as hortaliças, as frutas e o leite consumidos no Brasil.',
    realImpact: 'Redução do custo da cesta básica através de circuitos curtos e abastecimento direto de feiras livres sem a especulação de atravessadores.',
    concreteExample: 'Feiras estaduais da Reforma Agrária em 24 capitais e a rede permanente de Armazéns do Campo.',
    source: 'Censo Agropecuário do IBGE e CONAB',
  },
  {
    id: 'reflorestamento-nacional',
    pillar: 'meio_ambiente',
    pillarLabel: 'Meio Ambiente & Clima',
    title: 'Plano Nacional Plantar Árvores, Produzir Alimentos Saudáveis',
    metric: '+25 Mi',
    metricLabel: 'Mudas nativas e frutíferas já plantadas (meta de 100 milhões)',
    summary: 'Uma das maiores iniciativas populares de reflorestamento comunitário do mundo, recuperando áreas degradadas, matas ciliares e nascentes nos seis biomas brasileiros.',
    realImpact: 'Proteção dos recursos hídricos, sequestro de carbono atmosférico e implantação de Sistemas Agroflorestais (SAFs) que combinam floresta em pé com produção de alimentos.',
    concreteExample: 'Viveiros comunitários no Cerrado, Mata Atlântica, Caatinga, Pampa e Amazônia.',
    source: 'Setor de Meio Ambiente do MST / Observatório do Clima',
  },
  {
    id: 'sementes-crioulas',
    pillar: 'meio_ambiente',
    pillarLabel: 'Meio Ambiente & Clima',
    title: 'Guardiões da Biodiversidade e Sementes Crioulas',
    metric: '40+',
    metricLabel: 'Variedades ancestrais preservadas sem transgenia',
    summary: 'Resgate, multiplicação e conservação de sementes tradicionais de milho, feijão, arroz e adubos verdes nativos, garantindo independência genética em relação às multinacionais químicas.',
    realImpact: 'Maior resiliência das lavouras a estiagens e mudanças climáticas locais sem necessidade de fertilizantes derivados de petróleo.',
    concreteExample: 'Rede Bionatur de Sementes Agroecológicas (Candiota/RS) e Casas Comunitárias de Sementes.',
    source: 'Rede Bionatur / Embrapa Recursos Genéticos',
  },
  {
    id: 'solidariedade-marmitas',
    pillar: 'solidariedade',
    pillarLabel: 'Solidariedade Ativa',
    title: 'Doações Humanitárias e Redes de Cozinhas Solidárias',
    metric: '+9.000',
    metricLabel: 'Toneladas de alimentos saudáveis doados à população carente',
    summary: 'Solidariedade ativa permanente em momentos críticos da história recente do país: pandemia de Covid-19, estiagens severas no semiárido e inundações históricas no Rio Grande do Sul.',
    realImpact: 'Distribuição direta de cestas de alimentos agroecológicos frescos e preparo de milhares de marmitas solidárias diárias nas periferias das grandes cidades.',
    concreteExample: 'Cozinhas Solidárias das Periferias e Marmitas da Terra organizadas em São Paulo, Rio de Janeiro, Recife e Porto Alegre.',
    source: 'Campanha Nacional de Solidariedade do MST / Ação da Cidadania',
  },
  {
    id: 'educacao-escolas',
    pillar: 'educacao',
    pillarLabel: 'Educação Popular',
    title: 'Construção de Escolas Públicas no Campo',
    metric: '2.000+',
    metricLabel: 'Escolas públicas erguidas e conquistadas em assentamentos',
    summary: 'Garantia do direito constitucional à educação pública de qualidade no meio rural, impedindo o fechamento de salas de aula e respeitando a identidade pedagógica camponesa.',
    realImpact: 'Acesso universal à educação básica para centenas de milhares de crianças e adolescentes sem necessidade de deslocamentos exaustivos até centros urbanos.',
    concreteExample: 'Escolas estaduais e municipais construídas nos assentamentos de todo o território nacional.',
    source: 'Setor de Educação do MST / Ministério da Educação (MEC)',
  },
  {
    id: 'alfabetizacao-adultos',
    pillar: 'educacao',
    pillarLabel: 'Educação Popular',
    title: 'Erradicação do Analfabetismo com o Método "Sim, Eu Posso"',
    metric: '+50.000',
    metricLabel: 'Jovens, adultos e idosos alfabetizados',
    summary: 'Aplicação do método de alfabetização popular adaptado da experiência cubana, capacitando trabalhadores rurais que foram historicamente excluídos das escolas na infância.',
    realImpact: 'Autonomia cidadã para assinar o próprio nome, ler contratos de cooperativa, receitas médicas e exercer plenamente seus direitos democráticos.',
    concreteExample: 'Brigadas de alfabetização realizadas nos estados do Maranhão, Ceará, Bahia, Paraná e São Paulo.',
    source: 'Programa Brasil Alfabetizado / Campanhas de Alfabetização do MST',
  },
  {
    id: 'formacao-universitaria',
    pillar: 'educacao',
    pillarLabel: 'Educação Popular',
    title: 'Acesso Universitário via PRONERA e a ENFF',
    metric: '50+',
    metricLabel: 'Universidades públicas parceiras formando camponeses',
    summary: 'Cursos superiores em parceria com instituições públicas de ensino formando agrônomos, médicos veterinários, pedagogos, técnicos em agropecuária e advogados populares com foco no desenvolvimento do campo.',
    realImpact: 'Interiorização da ciência e permanência da juventude no campo com conhecimento técnico a serviço da agroecologia e da comunidade.',
    concreteExample: 'Escola Nacional Florestan Fernandes (Guararema/SP) e cursos do PRONERA na UFRGS, UFPR, UnB, UFRPE e UFBA.',
    source: 'PRONERA / INCRA / Ministério do Desenvolvimento Agrário',
  },
  {
    id: 'cooperativismo-trabalho',
    pillar: 'economia',
    pillarLabel: 'Economia & Cooperativas',
    title: 'Agroindústrias Comunitárias e Cooperativismo Popular',
    metric: '160+',
    metricLabel: 'Cooperativas agropecuárias e 120 agroindústrias ativas',
    summary: 'Organização econômica coletiva que beneficia e processa leite, café, derivados de mandioca, sucos integrais, mel, cana-de-açúcar e pescados artesanais com controle democrático dos trabalhadores.',
    realImpact: 'Agregação de valor à produção agrícola familiar, retenção da riqueza gerada no município e distribuição equitativa dos resultados entre as famílias cooperadas.',
    concreteExample: 'COOPEROESTE Terra Viva (SC), COOPCON Café Guaií (MG), COOPAT (RS) e COAPAV (SP).',
    source: 'Confederação das Cooperativas de Reforma Agrária do Brasil (CONCRAB)',
  },
  {
    id: 'funcao-social-constituicao',
    pillar: 'democracia',
    pillarLabel: 'Democracia & Cidadania',
    title: 'Cumprimento dos Artigos 184 a 189 da Constituição Cidadã',
    metric: 'Art. 184',
    metricLabel: 'Efetivação do mandamento constitucional da função social da terra',
    summary: 'A Reforma Agrária Popular garante a aplicação prática da Constituição Federal de 1988, que determina que a terra deve produzir de forma racional, respeitar a legislação trabalhista e preservar o meio ambiente.',
    realImpact: 'Combate direto a latifúndios improdutivos, fraudes cartorárias, grilagem de terras públicas da União e práticas criminosas de trabalho análogo à escravidão.',
    concreteExample: 'Desapropriação legal de fazendas flagradas com trabalho escravo ou envolvidas em crimes ambientais para fins de Reforma Agrária.',
    source: 'Constituição da República Federativa do Brasil / Ministério Público do Trabalho',
  },
  {
    id: 'empoderamento-mulheres-juventude',
    pillar: 'democracia',
    pillarLabel: 'Democracia & Cidadania',
    title: 'Autonomia das Mulheres Camponesas e Sucessão Rural',
    metric: '50%',
    metricLabel: 'Co-titularidade obrigatória das terras para mulheres camponesas',
    summary: 'Garantia legal de que o título da terra e as linhas de crédito sejam registrados obrigatoriamente no nome das mulheres camponesas, enfrentando o patriarcado histórico no campo.',
    realImpact: 'Independência financeira das mulheres através de hortas agroecológicas, coletivos produtivos de doces e artesanato, e incentivo à permanência dos jovens nas comunidades rurais.',
    concreteExample: 'Coletivo de Mulheres do MST e jornadas de março contra a violência no campo.',
    source: 'Setor de Gênero do MST / MDA',
  },
  {
    id: 'protecao-hidrica-nascentes',
    pillar: 'meio_ambiente',
    pillarLabel: 'Meio Ambiente & Clima',
    title: 'Recuperação e Proteção Permanente de Nascentes Hídricas',
    metric: '10.000+',
    metricLabel: 'Fontes e olhos d\'água protegidos e cercados em assentamentos',
    summary: 'Preservação de matas ciliares e mananciais estratégicos que abastecem bacias hidrográficas vitais (como bacias dos rios São Francisco, Doce, Paraíba do Sul e Paraná), impedindo assoreamento e contaminação química.',
    realImpact: 'Garante água limpa e potável para comunidades rurais e municípios vizinhos, combatendo a crise hídrica agravada pelo desmatamento de monoculturas.',
    concreteExample: 'Projeto Olhos D\'Água nos assentamentos de Minas Gerais, Bahia e Paraná com plantio de espécies nativas ciliares.',
    source: 'Articulação Nacional de Agroecologia (ANA) e Comitês de Bacias Hidrográficas',
  },
  {
    id: 'cultura-expressao-popular',
    pillar: 'democracia',
    pillarLabel: 'Democracia & Cidadania',
    title: 'Democratização do Livro e Cultura Popular',
    metric: '1.000+',
    metricLabel: 'Títulos publicados pela Editora Expressão Popular a preços acessíveis',
    summary: 'Acesso democrático à literatura, teatro camponês, música regional e formação política e filosófica, com livrarias abertas em dezenas de capitais junto aos Armazéns do Campo.',
    realImpact: 'Descentralização da produção cultural brasileira, valorizando a identidade dos povos do campo, das águas e das florestas.',
    concreteExample: 'Editora Expressão Popular e Festivais Nacionais de Arte e Cultura da Reforma Agrária no Parque da Água Branca (SP).',
    source: 'Editora Expressão Popular / Ministério da Cultura',
  },
  {
    id: 'saude-popular-ervas',
    pillar: 'alimentacao',
    pillarLabel: 'Soberania Alimentar',
    title: 'Farmácias Vivas Comunitárias e Fitoterapia Popular',
    metric: '300+',
    metricLabel: 'Hortos comunitários de plantas medicinais e fitoterápicos',
    summary: 'Resgate dos saberes ancestrais de erveiras, parteiras e curandeiras com cultivo agroecológico de ervas medicinais, produção de xaropes, tinturas e pomadas naturais para atenção básica primária.',
    realImpact: 'Alternativa natural, ecológica e gratuita de cuidado à saúde para famílias assentadas e comunidades periféricas sem acesso regular a medicamentos caros.',
    concreteExample: 'Hortos Medicinais dos assentamentos no Ceará, Pernambuco e Rio Grande do Sul em diálogo com o SUS.',
    source: 'Setor de Saúde do MST / Práticas Integrativas e Complementares do SUS (PICS)',
  },
  {
    id: 'circuitos-curtos-precos-justos',
    pillar: 'economia',
    pillarLabel: 'Economia & Cooperativas',
    title: 'Circuitos Curtos de Comercialização: Sem Especulação de Atravessadores',
    metric: '35+',
    metricLabel: 'Lojas Armazém do Campo e feiras permanentes em 24 estados',
    summary: 'Ligação direta entre o camponês que planta e o consumidor urbano que come, reduzindo drasticamente o preço final ao eliminar margens abusivas de redes atacadistas intermediárias.',
    realImpact: 'Remuneração digna para os trabalhadores da terra e acesso a comida fresca e agroecológica a preços populares para as famílias trabalhadoras das cidades.',
    concreteExample: 'Rede nacional Armazém do Campo e feiras populares semanais em universidades e praças públicas.',
    source: 'Observatório de Feiras Agroecológicas / Brasil de Fato',
  }
];

interface MSTBenefitsProps {
  onGoToMarkets: () => void;
  onGoToRecipes: () => void;
}

export const MSTBenefits: React.FC<MSTBenefitsProps> = ({ onGoToMarkets, onGoToRecipes }) => {
  const [selectedPillar, setSelectedPillar] = useState<BenefitPillar>('todos');
  const [searchQuery, setSearchQuery] = useState('');

  const pillars: { id: BenefitPillar; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'todos', label: 'Todos os Benefícios', icon: Sparkles },
    { id: 'alimentacao', label: 'Alimentação Saudável', icon: Wheat },
    { id: 'meio_ambiente', label: 'Meio Ambiente & Clima', icon: Trees },
    { id: 'solidariedade', label: 'Solidariedade Ativa', icon: HeartHandshake },
    { id: 'educacao', label: 'Educação Popular', icon: GraduationCap },
    { id: 'economia', label: 'Economia & Cooperativas', icon: Building2 },
    { id: 'democracia', label: 'Democracia & Direitos', icon: Scale },
  ];

  const filteredBenefits = useMemo(() => {
    return MST_BENEFITS.filter((item) => {
      const matchesPillar = selectedPillar === 'todos' || item.pillar === selectedPillar;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery = 
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.realImpact.toLowerCase().includes(query) ||
        item.concreteExample.toLowerCase().includes(query) ||
        item.source.toLowerCase().includes(query);

      return matchesPillar && matchesQuery;
    });
  }, [selectedPillar, searchQuery]);

  return (
    <section 
      id="beneficios-mst" 
      aria-labelledby="benefits-heading"
      className="py-16 bg-[#FAF8F5] border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-700 uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-red-700" aria-hidden="true" />
            <span>Impacto Social, Ecológico e Econômico</span>
            <span aria-hidden="true">·</span>
            <span>Reforma Agrária Popular</span>
          </div>
          <h2 
            id="benefits-heading"
            className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight text-balance"
          >
            Como o MST Beneficia Toda a Sociedade Brasileira
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed font-sans">
            A Reforma Agrária Popular vai muito além da democratização da terra: ela gera comida sem veneno 
            para as cidades, preserva nascentes e biomas, constrói escolas públicas, cria cooperativas de trabalho 
            digno e promove a solidariedade permanente com quem mais precisa.
          </p>
        </div>

        {/* Filter Bar with Search */}
        <section 
          aria-label="Filtros e pesquisa de benefícios"
          className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs mb-10 space-y-4"
        >
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <label htmlFor="benefits-search-input" className="sr-only">
                Buscar benefícios do MST por palavra-chave
              </label>
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" aria-hidden="true" />
              <input
                id="benefits-search-input"
                type="search"
                role="searchbox"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por benefício (ex: arroz, árvores, escolas, doações)..."
                aria-label="Buscar benefícios por palavra-chave como arroz, árvores, escolas ou doações"
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 text-stone-800 placeholder:text-stone-400"
              />
            </div>

            {/* Results Counter */}
            <div 
              aria-live="polite"
              className="text-xs text-stone-500 font-medium self-end md:self-center"
            >
              Mostrando <span className="font-bold text-stone-900 tabular-nums">{filteredBenefits.length}</span> benefícios comprovados
            </div>
          </div>

          {/* Pillar Buttons */}
          <div 
            role="tablist" 
            aria-label="Filtrar benefícios por pilar temático"
            className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100"
          >
            {pillars.map((p) => {
              const Icon = p.icon;
              const isActive = selectedPillar === p.id;
              const count = p.id === 'todos' 
                ? MST_BENEFITS.length 
                : MST_BENEFITS.filter((b) => b.pillar === p.id).length;
              return (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="benefits-results-grid"
                  onClick={() => setSelectedPillar(p.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-red-700 ${
                    isActive
                      ? 'bg-red-700 text-white shadow-xs'
                      : 'bg-stone-50 text-stone-700 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-stone-500'}`} aria-hidden="true" />
                  <span>{p.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full tabular-nums font-mono font-bold ${
                    isActive ? 'bg-red-900/60 text-red-100' : 'bg-stone-200 text-stone-600'
                  }`} aria-label={`${count} itens`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Benefits Grid */}
        <div 
          id="benefits-results-grid"
          role="list"
          aria-label="Grade de benefícios comprovados da Reforma Agrária"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {filteredBenefits.map((item) => (
            <article
              key={item.id}
              role="listitem"
              className="bg-white rounded-3xl border border-stone-200 p-6 flex flex-col justify-between hover:border-stone-300 hover:shadow-sm transition-all"
            >
              <div className="space-y-4">
                {/* Header Meta */}
                <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-3">
                  <span className="text-[11px] font-bold text-red-700 uppercase tracking-wider">
                    {item.pillarLabel}
                  </span>
                  <span className="text-xs font-mono font-bold text-stone-900 bg-stone-100 px-2.5 py-0.5 rounded-md tabular-nums">
                    {item.metric}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-serif font-bold text-stone-900 leading-snug">
                  {item.title}
                </h3>

                <div className="text-xs font-semibold text-stone-500">
                  {item.metricLabel}
                </div>

                <p className="text-xs text-stone-700 leading-relaxed font-sans">
                  {item.summary}
                </p>

                {/* Real Impact */}
                <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-stone-200 text-xs text-stone-800 space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                    <span>Impacto Direto na Vida do Cidadão</span>
                  </div>
                  <div className="text-stone-700 leading-relaxed text-[11px]">
                    {item.realImpact}
                  </div>
                </div>

                {/* Concrete Example */}
                <div className="text-[11px] text-stone-600">
                  <b>Onde se concretiza:</b> {item.concreteExample}
                </div>
              </div>

              {/* Source Audit Footnote */}
              <div className="pt-4 mt-4 border-t border-stone-100 text-[10px] text-stone-400 font-mono">
                Fonte: {item.source}
              </div>
            </article>
          ))}
        </div>

        {/* Practical Comparative Matrix: Reforma Agrária vs. Latifúndio Monocultor */}
        <section 
          aria-labelledby="matrix-heading"
          className="bg-white rounded-3xl border border-stone-300 p-6 sm:p-10 shadow-sm mb-12"
        >
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              <Scale className="w-4 h-4 text-red-700" aria-hidden="true" />
              <span>Comparativo Concreto</span>
            </div>
            <h3 id="matrix-heading" className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Reforma Agrária Popular vs. Latifúndio Monocultor
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 font-sans">
              Veja a diferença prática entre o modelo camponês agroecológico e o modelo de monocultura predatória para o país.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table 
              aria-label="Comparativo estrutural entre Reforma Agrária Popular e Latifúndio Monocultor"
              className="w-full text-left text-xs text-stone-700 border-collapse"
            >
              <thead>
                <tr className="border-b-2 border-stone-200 text-stone-900 font-serif text-sm">
                  <th scope="col" className="py-3 px-4 font-bold">Critério / Dimensão</th>
                  <th scope="col" className="py-3 px-4 font-bold text-red-700 bg-red-50/50 rounded-t-xl">
                    🌱 Reforma Agrária Popular (MST)
                  </th>
                  <th scope="col" className="py-3 px-4 font-bold text-stone-600 bg-stone-100/70 rounded-t-xl">
                    🏭 Latifúndio Monocultor / Agroquímico
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr>
                  <th scope="row" className="py-3.5 px-4 font-semibold text-stone-900 text-left">Destino da Produção</th>
                  <td className="py-3.5 px-4 bg-red-50/30 font-medium text-emerald-900">
                    Alimentos para o prato do povo brasileiro (arroz, feijão, hortaliças, frutas e mandioca).
                  </td>
                  <td className="py-3.5 px-4 bg-stone-50/60 text-stone-600">
                    Commodities brutas para exportação (ração animal internacional e biocombustíveis).
                  </td>
                </tr>

                <tr>
                  <th scope="row" className="py-3.5 px-4 font-semibold text-stone-900 text-left">Uso de Agrotóxicos</th>
                  <td className="py-3.5 px-4 bg-red-50/30 font-medium text-emerald-900">
                    Agroecologia, adubação verde biológica e certificação orgânica sem veneno.
                  </td>
                  <td className="py-3.5 px-4 bg-stone-50/60 text-stone-600">
                    Pulverização massiva de agrotóxicos químicos (glifosato, paraquat e neonicotinoides).
                  </td>
                </tr>

                <tr>
                  <th scope="row" className="py-3.5 px-4 font-semibold text-stone-900 text-left">Geração de Emprego e Renda</th>
                  <td className="py-3.5 px-4 bg-red-50/30 font-medium text-emerald-900">
                    Gera até 15 vezes mais empregos por hectare cultivado, fixando a família no campo com dignidade.
                  </td>
                  <td className="py-3.5 px-4 bg-stone-50/60 text-stone-600">
                    Altamente mecanizado com poucos postos de trabalho; histórico de conflitos e expulsão camponesa.
                  </td>
                </tr>

                <tr>
                  <th scope="row" className="py-3.5 px-4 font-semibold text-stone-900 text-left">Preservação Ambiental & Água</th>
                  <td className="py-3.5 px-4 bg-red-50/30 font-medium text-emerald-900">
                    Recuperação de nascentes, viveiros populares de mudas e sistemas agroflorestais consorciados.
                  </td>
                  <td className="py-3.5 px-4 bg-stone-50/60 text-stone-600">
                    Desmatamento de biomas nativos, erosão do solo e contaminação de lençóis freáticos.
                  </td>
                </tr>

                <tr>
                  <th scope="row" className="py-3.5 px-4 font-semibold text-stone-900 text-left">Sementes</th>
                  <td className="py-3.5 px-4 bg-red-50/30 font-medium text-emerald-900">
                    Sementes crioulas ancestrais preservadas em bancos comunitários (Rede Bionatur).
                  </td>
                  <td className="py-3.5 px-4 bg-stone-50/60 text-stone-600">
                    Sementes transgênicas patenteadas controladas por conglomerados transnacionais.
                  </td>
                </tr>

                <tr>
                  <th scope="row" className="py-3.5 px-4 font-semibold text-stone-900 text-left">Educação e Comunidade</th>
                  <td className="py-3.5 px-4 bg-red-50/30 font-medium text-emerald-900">
                    Construção de escolas públicas nos assentamentos, alfabetização de adultos e centros comunitários.
                  </td>
                  <td className="py-3.5 px-4 bg-stone-50/60 text-stone-600">
                    Ausência de tecido comunitário local; despovoamento forçado das áreas rurais.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs uppercase font-bold text-red-400 tracking-wider">
                Compre Comida de Verdade
              </span>
              <h4 className="text-xl sm:text-2xl font-serif font-bold mt-1">
                Apoie essa produção comprando nas feiras e Armazéns do Campo
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 mt-2 font-sans leading-relaxed">
                Cada compra de arroz Terra Livre, café Guaií ou hortaliças sem veneno fortalece 
                diretamente a renda camponesa e a alimentação de qualidade no país.
              </p>
            </div>
            <button
              onClick={onGoToMarkets}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-bold transition-colors self-start shadow-xs"
            >
              <span>Localizar Feira Mais Próxima</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs uppercase font-bold text-emerald-800 tracking-wider">
                Gastronomia Agroecológica
              </span>
              <h4 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-1">
                Descubra receitas saudáveis com os produtos da colheita
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 font-sans leading-relaxed">
                Aprenda a preparar pratos tradicionais brasileiros que aproveitam integralmente 
                os nutrientes dos grãos orgânicos, raízes da terra e frutos dos assentamentos.
              </p>
            </div>
            <button
              onClick={onGoToRecipes}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-colors self-start shadow-xs"
            >
              <span>Explorar Receitas da Terra</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
