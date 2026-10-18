import { HistoricalMilestone, PositiveFact } from '../types';

export const HISTORICAL_MILESTONES: HistoricalMilestone[] = [
  {
    year: '1984',
    title: '1º Encontro Nacional em Cascavel (PR)',
    subtitle: 'Fundação Formal do Movimento dos Trabalhadores Rurais Sem Terra',
    location: 'Cascavel, Paraná',
    description: 'Trabalhadores rurais, posseiros, meeiros, atingidos por barragens e boias-frias reuniram-se em Cascavel para fundar o MST. Sob o lema "Terra para quem nela trabalha", unificaram lutas antes dispersas para exigir a democratização do solo brasileiro.',
    keyPoint: 'Unificação nacional da luta camponesa pela desapropriação de latifúndios improdutivos.',
    tag: 'Fundação'
  },
  {
    year: '1988',
    title: 'A Constituição Cidadã e a Função Social da Terra',
    subtitle: 'Artigos 184 a 189 da Carta Magna',
    location: 'Brasília, DF',
    description: 'Após intensa pressão de caravanas populares camponesas na Assembleia Nacional Constituinte, a Constituição de 1988 consagrou que a propriedade da terra é vinculada à sua função social: produzir racionalmente, respeitar a legislação trabalhista e preservar os ecossistemas.',
    keyPoint: 'Fundamento jurídico constitucional que legitima a desapropriação de terras improdutivas para Reforma Agrária.',
    tag: 'Legislação'
  },
  {
    year: '1996',
    title: 'Massacre de Eldorado do Carajás',
    subtitle: 'Memória, Justiça e o Dia Mundial da Luta Camponesa',
    location: 'Eldorado do Carajás, Pará',
    description: 'O assassinato de 19 camponeses pela Polícia Militar do Pará na rodovia PA-150 repercutiu globalmente. A data de 17 de abril foi instituída pela Via Campesina Internacional como o Dia Mundial da Luta Camponesa em defesa dos direitos humanos.',
    keyPoint: 'Marco internacional de solidariedade aos direitos humanos e repúdio à violência latifundiária.',
    tag: 'Direitos Humanos'
  },
  {
    year: '2005',
    title: 'Inauguração da Escola Nacional Florestan Fernandes (ENFF)',
    subtitle: 'Educação Popular, Ciência e Agroecologia',
    location: 'Guararema, São Paulo',
    description: 'Erguida com tijolos de solo-cimento confeccionados por mais de 1.000 voluntários de brigadas populares, a ENFF consolidou-se como centro internacional de formação política, ambiental e técnica para movimentos sociais de diversos países.',
    keyPoint: 'Espaço com biblioteca de 40 mil títulos, laboratórios de informática, hortas agroecológicas e alojamentos.',
    tag: 'Educação Popular'
  },
  {
    year: '2010',
    title: 'Consolidação como Maior Produtor de Arroz Orgânico',
    subtitle: 'Liderança Certificada na América Latina',
    location: 'Região Metropolitana de Porto Alegre, RS',
    description: 'A transição agroecológica nas cooperativas de assentamentos gaúchos (como COOPAT em Nova Santa Rita) atinge escala continental: a produção de arroz livre de agrotóxicos é reconhecida pelo IRGA e pela FAO/ONU como a maior de toda a América Latina.',
    keyPoint: 'Mais de 16 mil hectares de várzeas preservadas e milhões de quilos de arroz agroecológico Terra Livre.',
    tag: 'Soberania Alimentar'
  },
  {
    year: '2016',
    title: 'Criação da Rede de Armazéns do Campo',
    subtitle: 'A Ponte Direta entre o Campo Agroecológico e a Cidade',
    location: 'São Paulo (Al. Nothman, 806)',
    description: 'Inauguração da primeira unidade da rede Armazém do Campo, rompendo intermediários para oferecer alimentos agroecológicos sem veneno a preços justos. A rede hoje está presente em mais de 14 capitais e dezenas de cidades brasileiras.',
    keyPoint: 'Lojas físicas, cafés culturais, livrarias e empórios de comercialização direta popular.',
    tag: 'Comercialização Justa'
  },
  {
    year: '2020',
    title: 'Plano Nacional Plantar Árvores, Produzir Alimentos Saudáveis',
    subtitle: 'Meta de 100 Milhões de Árvores Nativas',
    location: 'Todos os Biomas Brasileiros',
    description: 'Lançamento do plano nacional de recuperação ambiental. Em resposta às queimadas e à crise climática, o movimento implantou viveiros populares comunitários para restaurar matas ciliares, nascentes e implementar sistemas agroflorestais (SAFs).',
    keyPoint: 'Mais de 25 milhões de mudas de espécies nativas e frutíferas já plantadas.',
    tag: 'Agroecologia & Clima'
  },
  {
    year: '2024-2026',
    title: '40 Anos de Reforma Agrária Popular e Cozinhas Solidárias',
    subtitle: 'Solidariedade Permanente e Combate à Fome',
    location: 'Nacional',
    description: 'Ao celebrar quatro décadas, o MST reafirma seu compromisso com a alimentação saudável da população brasileira. Através de redes de cozinhas solidárias e doações contínuas em tragédias climáticas (como nas enchentes do RS), coloca a solidariedade como princípio basilar.',
    keyPoint: 'Mais de 9.000 toneladas de alimentos saudáveis doados a famílias em situação de vulnerabilidade.',
    tag: 'Solidariedade Ativa'
  }
];

export const POSITIVE_FACTS: PositiveFact[] = [
  {
    id: 'arroz-lideranca',
    title: 'Maior Produtor de Arroz Orgânico da América Latina',
    stat: '1º Lugar',
    statLabel: 'Há mais de 10 safras consecutivas no continente',
    description: 'Certificado por auditorias da IBD e pelo Instituto Rio Grandense do Arroz (IRGA), o MST produz e industrializa mais de 16.000 toneladas de arroz agroecológico (agulhinha, integral, vermelho e preto) através da cooperativa COOPAT e associadas no RS.',
    citation: 'Fonte: FAO / Instituto Rio Grandense do Arroz (IRGA)',
    category: 'alimento'
  },
  {
    id: 'doacoes-solidarias',
    title: 'Solidariedade em Ação Humanitária',
    stat: '+9.000',
    statLabel: 'Toneladas de alimentos saudáveis doados',
    description: 'Durante a pandemia de Covid-19 e as históricas enchentes no Rio Grande do Sul, cooperativas e acampamentos do MST mobilizaram doações diretas de arroz, feijão, hortaliças e marmitas da terra preparadas em cozinhas solidárias.',
    citation: 'Fonte: Campanha Nacional de Solidariedade do MST',
    category: 'solidariedade'
  },
  {
    id: 'arvores-biodiversidade',
    title: 'Recuperação Ambiental e Viveiros Comunitários',
    stat: '+25 Mi',
    statLabel: 'Mudas de árvores nativas e frutíferas plantadas',
    description: 'Através do Plano "Plantar Árvores, Produzir Alimentos Saudáveis", foram estruturados dezenas de viveiros populares nos biomas Cerrado, Mata Atlântica, Caatinga, Amazônia e Pampa, recuperando nascentes e matas ciliares degradadas.',
    citation: 'Fonte: Setor de Meio Ambiente do MST',
    category: 'ecologia'
  },
  {
    id: 'cooperativismo-popular',
    title: 'Rede de Agroindústrias e Cooperativas Agropecuárias',
    stat: '160+',
    statLabel: 'Cooperativas de pequenos produtores ativas no país',
    description: 'O movimento organiza mais de 160 cooperativas de produção, 120 agroindústrias comunitárias de laticínios, café, beneficiamento de grãos, sucos, mel e conservas, além de 1.900 associações produtivas legalmente constituídas.',
    citation: 'Fonte: Confederação das Cooperativas de Reforma Agrária do Brasil (CONCRAB)',
    category: 'alimento'
  },
  {
    id: 'educacao-campo',
    title: 'Educação do Campo e Erradicação do Analfabetismo',
    stat: '2.000+',
    statLabel: 'Escolas públicas erguidas em assentamentos',
    description: 'Parcerias com o PRONERA (Programa Nacional de Educação na Reforma Agrária) e universidades públicas já formaram milhares de técnicos agrícolas, agrônomos, veterinários, advogados e educadores populares, além de alfabetizar mais de 50 mil adultos com o método "Sim, Eu Posso".',
    citation: 'Fonte: Setor de Educação do MST / PRONERA',
    category: 'educacao'
  },
  {
    id: 'sementes-crioulas',
    title: 'Rede Bionatur e Guardiões de Sementes Crioulas',
    stat: '40+',
    statLabel: 'Variedades ancestrais preservadas sem transgenia',
    description: 'Através da Cooperativa Bionatur (sediada em Candiota/RS) e de casas de sementes comunitárias, camponeses multiplicam sementes agroecológicas de milho, feijão, hortaliças e adubação verde, combatendo o monopólio corporativo de transgênicos.',
    citation: 'Fonte: Rede Bionatur de Sementes Agroecológicas',
    category: 'ecologia'
  }
];

export const SECURITY_HOTLINES = [
  {
    name: 'Comissão Pastoral da Terra (CPT Nacional)',
    role: 'Monitoramento de Conflitos no Campo & Assessoria Jurídica Popular',
    phone: '(62) 4008-6400',
    email: 'cpt@cptnacional.org.br',
    site: 'https://www.cptnacional.org.br',
    address: 'Rua 19, nº 226, Ed. Dom Abel, 1º andar, Centro, Goiânia - GO'
  },
  {
    name: 'Defensoria Pública da União (DPU)',
    role: 'Grupo de Trabalho de Conflitos Fundiários e Proteção aos Direitos Humanos',
    phone: '0800 722 0101',
    email: 'conflitosfundiarios@dpu.def.br',
    site: 'https://www.dpu.def.br',
    address: 'Edifício Sede DPU, Setor Bancário Norte, Quadra 1, Bloco F, Brasília - DF'
  },
  {
    name: 'Disque 100 - Direitos Humanos Brasil',
    role: 'Canal Oficial Federal de Denúncias Contra Violência, Ameaças e Trabalho Escravo',
    phone: 'Disque 100',
    email: 'ouvidoria@mdh.gov.br',
    site: 'https://www.gov.br/mdh/pt-br',
    address: 'Ministério dos Direitos Humanos e da Cidadania - Esplanada dos Ministérios, Bloco A, Brasília - DF'
  },
  {
    name: 'Ministério Público Federal (MPF - 6ª CCR)',
    role: 'Câmara de Populações Indígenas e Comunidades Tradicionais',
    phone: '(61) 3105-5100',
    email: 'pgr-6ccr@mpf.mp.br',
    site: 'https://www.mpf.mp.br/pgr/institucional/camaras-de-coordenacao-e-revisao/6a-ccr',
    address: 'Procuradoria-Geral da República, SAF Sul, Quadra 4, Conjunto C, Brasília - DF'
  },
  {
    name: 'Ouvidoria Agrária Nacional (MDA)',
    role: 'Ministério do Desenvolvimento Agrário e Agricultura Familiar',
    phone: '(61) 2020-0000',
    email: 'ouvidoria@mda.gov.br',
    site: 'https://www.gov.br/mda/pt-br',
    address: 'Esplanada dos Ministérios, Bloco F, Brasília - DF'
  }
];
