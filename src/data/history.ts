import { HistoricalMilestone, PositiveFact } from '../types';

export const HISTORICAL_MILESTONES: HistoricalMilestone[] = [
  {
    year: '1984',
    title: '1º Encontro Nacional em Cascavel (PR)',
    subtitle: 'O Nascimento do Movimento dos Sem Terra',
    location: 'Cascavel, Paraná',
    description: 'Trabalhadores rurais, posseiros, boias-frias e atingidos por barragens fundam formalmente o MST. Sob a bandeira "A terra para quem nela trabalha", o movimento une agricultores desapropriados e desterritorializados pela modernização conservadora da ditadura militar.',
    keyPoint: 'Unificação nacional da luta camponesa com foco na democratização da terra e produção de alimentos.',
    tag: 'Fundação'
  },
  {
    year: '1988',
    title: 'A Constituição Cidadã e a Função Social da Terra',
    subtitle: 'Artigo 184 e os Marcos Constitucionais',
    location: 'Brasília, DF',
    description: 'Após intensa mobilização popular camponesa e indígena durante a Assembleia Nacional Constituinte, a Carta Magna brasileira estabelece que a propriedade da terra deve cumprir sua função social: produzir racionalmente, respeitar o meio ambiente e as leis trabalhistas.',
    keyPoint: 'Desapropriação constitucional de latifúndios improdutivos para fins de Reforma Agrária.',
    tag: 'Legislação'
  },
  {
    year: '1996',
    title: 'O Massacre de Eldorado do Carajás',
    subtitle: 'Memória, Justiça e o 17 de Abril',
    location: 'Eldorado do Carajás, Pará',
    description: 'O assassinato de 19 camponeses sem terra choca o planeta. A data de 17 de abril é instituída internacionalmente pela Via Campesina como o "Dia Mundial da Luta Camponesa", consolidando o apoio global aos direitos humanos no campo brasileiro.',
    keyPoint: 'Reconhecimento global da urgência da Reforma Agrária e repúdio à violência latifundiária.',
    tag: 'Direitos Humanos'
  },
  {
    year: '2005',
    title: 'Inauguração da Escola Nacional Florestan Fernandes (ENFF)',
    subtitle: 'Educação Popular, Ciência e Agroecologia',
    location: 'Guararema, São Paulo',
    description: 'Construída coletivamente com tijolos de solo-cimento moldados pelas mãos de mais de 1.000 voluntários de todo o país, a ENFF torna-se centro mundial de formação política, ambiental, agroecológica e filosófica para movimentos sociais da América Latina e do mundo.',
    keyPoint: 'Formação científica e pedagógica com direito a bibliotecas, laboratórios e residência estudantil.',
    tag: 'Educação'
  },
  {
    year: '2010',
    title: 'Liderança na Produção de Arroz Agroecológico',
    subtitle: 'O Maior Produtor da América Latina',
    location: 'Região Metropolitana de Porto Alegre, RS',
    description: 'A transição agroecológica nas cooperativas gaúchas atinge maturidade histórica: o MST é formalmente reconhecido pela FAO (Organização das Nações Unidas para a Alimentação e a Agricultura) e pelo IRGA como o maior produtor de arroz orgânico certificado de toda a América Latina.',
    keyPoint: 'Mais de 16 mil hectares preservados e milhões de quilos de arroz livre de veneno chegando à mesa popular.',
    tag: 'Soberania Alimentar'
  },
  {
    year: '2016',
    title: 'Abertura do Primeiro Armazém do Campo',
    subtitle: 'A Ponte entre o Campo Agroecológico e a Cidade',
    location: 'Campos Elíseos, São Paulo',
    description: 'Inauguração da rede de lojas físicas e culturais Armazém do Campo, rompendo intermediários especulativos e garantindo que alimentos sem veneno e de alta qualidade cheguem aos centros urbanos a preços populares e justos.',
    keyPoint: 'Hoje são mais de 40 lojas físicas, cafés culturais e pontos de abastecimento em 14 capitais.',
    tag: 'Comercialização'
  },
  {
    year: '2020',
    title: 'Plano Nacional Plantar Árvores, Produzir Alimentos Saudáveis',
    subtitle: 'Meta de 100 Milhões de Árvores Nativas',
    location: 'Todos os Biomas Brasileiros',
    description: 'Lançamento de uma das maiores iniciativas de restauração ecológica comunitária do planeta. Em meio à emergência climática, assentamentos implantam viveiros de mudas nativas, recuperam nascentes e consorciam agroflorestas biodinâmicas.',
    keyPoint: 'Mais de 25 milhões de árvores nativas plantadas e 5.000 hectares de áreas degradadas recuperadas.',
    tag: 'Agroecologia'
  },
  {
    year: '2024-2026',
    title: '40 Anos: Reforma Agrária Popular e Combate à Fome',
    subtitle: 'Alimentar o Povo com Comida de Verdade',
    location: 'Nacional',
    description: 'Ao celebrar quatro décadas de existência, o MST reafirma que a Reforma Agrária Popular não é apenas dividir terra: é produzir comida saudável para quem passa fome nas cidades, defender a água e o clima, alfabetizar comunidades e democratizar o Brasil.',
    keyPoint: 'Solidariedade ativa permanente com cozinhas solidárias e doações humanitárias contínuas.',
    tag: 'Presente & Futuro'
  }
];

export const POSITIVE_FACTS: PositiveFact[] = [
  {
    id: 'arroz-lideranca',
    title: 'Maior Produtor de Arroz Orgânico da América Latina',
    stat: '1º Lugar',
    statLabel: 'Há mais de 10 safras consecutivas no continente',
    description: 'Certificado por auditorias internacionais e pelo IRGA, o MST colhe anualmente mais de 16.000 toneladas de arroz agroecológico (integral, agulhinha, vermelho e preto) através da cooperativa COOPAT e associadas no Rio Grande do Sul.',
    citation: 'Fonte: FAO / Instituto Rio Grandense do Arroz (IRGA)',
    category: 'alimento'
  },
  {
    id: 'doacoes-solidarias',
    title: 'Solidariedade em Ação Humanitária',
    stat: '+9.000',
    statLabel: 'Toneladas de alimentos saudáveis doados',
    description: 'Durante a pandemia de Covid-19, estiagens no Nordeste e enchentes devastadoras no Rio Grande do Sul, o MST mobilizou suas cooperativas e cozinhas solidárias urbanas para fornecer marmitas nutritivas e cestas de alimentos frescos a quem mais precisa.',
    citation: 'Fonte: Campanha Nacional de Solidariedade do MST',
    category: 'solidariedade'
  },
  {
    id: 'arvores-biodiversidade',
    title: 'Reflorestamento e Preservação de Biomas',
    stat: '+25 Mi',
    statLabel: 'Árvores nativas e frutíferas plantadas',
    description: 'Através do Plano "Plantar Árvores, Produzir Alimentos Saudáveis", o movimento mantém dezenas de viveiros populares comunitários, restaurando matas ciliares, nascentes de água e plantando sistemas agroflorestais em todo o Brasil.',
    citation: 'Fonte: Plano Nacional de Reflorestamento Popular',
    category: 'ecologia'
  },
  {
    id: 'cooperativismo-popular',
    title: 'Rede de Agroindústrias e Cooperativas',
    stat: '160+',
    statLabel: 'Cooperativas de camponeses ativas no país',
    description: 'O MST organiza mais de 160 cooperativas de produção, 120 agroindústrias comunitárias de laticínios, beneficiamento de café, grãos, conservas e mel, além de 1.900 associações produtivas registradas formalmente.',
    citation: 'Fonte: Setor de Produção e Cooperativismo (CONAB/MST)',
    category: 'alimento'
  },
  {
    id: 'educacao-campo',
    title: 'Educação Popular e Erradicação do Analfabetismo',
    stat: '2.000+',
    statLabel: 'Escolas públicas construídas nos assentamentos',
    description: 'Garantia de acesso à educação pública com identidade camponesa. Mais de 50.000 jovens e adultos alfabetizados através do método "Sim, Eu Posso" e milhares de camponeses formados em agronomia, veterinária e pedagogia pelo PRONERA em universidades públicas.',
    citation: 'Fonte: Setor de Educação do MST / PRONERA',
    category: 'educacao'
  },
  {
    id: 'sementes-crioulas',
    title: 'Bancos e Guardiões de Sementes Crioulas',
    stat: '40+',
    statLabel: 'Variedades ancestrais protegidas da transgenia',
    description: 'Camponeses do MST preservam e multiplicam sementes tradicionais de milho, feijão, arroz, hortaliças e adubos verdes, impedindo a perda genética provocada pelas grandes corporações multinacionais de transgênicos.',
    citation: 'Fonte: Rede Bionatur de Sementes Agroecológicas',
    category: 'ecologia'
  }
];

export const SECURITY_HOTLINES = [
  {
    name: 'Comissão Pastoral da Terra (CPT)',
    role: 'Monitoramento Nacional de Conflitos no Campo & Apoio Jurídico',
    phone: '(62) 4008-6400',
    email: 'cpt@cptnacional.org.br',
    site: 'https://www.cptnacional.org.br'
  },
  {
    name: 'Defensoria Pública da União (DPU)',
    role: 'Grupo de Trabalho de Conflitos Fundiários e Proteção aos Direitos Humanos',
    phone: '0800 722 0101',
    email: 'conflitosfundiarios@dpu.def.br',
    site: 'https://www.dpu.def.br'
  },
  {
    name: 'Disque 100 - Direitos Humanos Brasil',
    role: 'Canal Oficial Federal de Denúncias Contra Violência e Ameaças',
    phone: 'Disque 100',
    email: 'ouvidoria@mdh.gov.br',
    site: 'https://www.gov.br/mdh/pt-br'
  },
  {
    name: 'Ministério Público Federal (MPF - 6ª CCR)',
    role: 'Câmara de Populações Indígenas e Comunidades Tradicionais',
    phone: '(61) 3105-5100',
    email: 'pgr-6ccr@mpf.mp.br',
    site: 'https://www.mpf.mp.br'
  },
  {
    name: 'Ouvidoria Agrária Nacional (MDA)',
    role: 'Ministério do Desenvolvimento Agrário e Agricultura Familiar',
    phone: '(61) 2020-0000',
    email: 'ouvidoria@mda.gov.br',
    site: 'https://www.gov.br/mda'
  }
];
