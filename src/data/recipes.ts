import { Recipe } from '../types';
import { culinaryDish, armazemCampo, heroAgriculture, agroecologyCoop } from '../assets/images';

export const RECIPES_DATA: Recipe[] = [
  {
    id: 'feijoada-agroecologica',
    title: 'Feijoada Agroecológica da Terra',
    subtitle: 'Com feijão preto dos assentamentos, farofa de mandioca tostada e couve da horta',
    category: 'prato_principal',
    categoryLabel: 'Prato Principal',
    prepTimeMinutes: 30,
    cookTimeMinutes: 60,
    servings: 6,
    difficulty: 'Médio',
    description: 'A clássica feijoada brasileira recriada com ingredientes de manejo agroecológico. Feijão preto cultivado sem agrotóxicos pelas cooperativas do MST no Sul e Sudeste, servido com couve fresca, arroz agulhinha orgânico e farofa de milho crioulo.',
    mstIngredients: [
      {
        name: 'Feijão Preto Orgânico Terra Livre',
        cooperativeOrigin: 'Cooperativa COOPAT - RS',
        benefit: 'Grãos sem glifosato ou defensivos químicos sintéticos, rico em ferro e antocianinas naturais.'
      },
      {
        name: 'Arroz Agulhinha Branco ou Integral Terra Livre',
        cooperativeOrigin: 'Cooperativas de Arroz Orgânico da Grande Porto Alegre - RS',
        benefit: 'Certificado orgânico pelo IBD e pela FAO/ONU como a maior produção limpa da América Latina.'
      },
      {
        name: 'Farinha de Mandioca Artesanal Torrada',
        cooperativeOrigin: 'Assentamentos do Vale do Rio Doce - MG / Bahia',
        benefit: 'Processada em casas de farinha comunitárias tradicionais, textura crocante e sabor de brasa.'
      }
    ],
    ingredients: [
      '500g de Feijão Preto Orgânico Terra Livre (hidratado por 8 horas)',
      '2 xícaras de Arroz Agulhinha Orgânico Terra Livre',
      '200g de cogumelos frescos ou defumados (ou cortes artesanais de suíno caipira de cooperativa)',
      '1 maço grande de couve manteiga orgânica cortada em tiras bem finas',
      '2 laranjas frescas cortadas em rodelas',
      '1 xícara de farinha de mandioca torrada artesanal',
      '6 dentes de alho amassados com sal marinho',
      '1 cebola grande picada finamente',
      '2 folhas de louro fresco',
      '3 colheres (sopa) de azeite de oliva ou banha natural',
      'Cheiro-verde fresco a gosto'
    ],
    instructions: [
      'Escorra a água do remolho do feijão preto. Coloque o feijão na panela de pressão com água nova cobrindo cerca de 4 dedos acima dos grãos e adicione as folhas de louro.',
      'Cozinhe em fogo médio por cerca de 25 a 30 minutos após pegar pressão. Deixe a pressão sair naturalmente.',
      'Em uma frigideira funda, aqueça o azeite e refogue a cebola e metade do alho até dourarem perfumadamente. Se utilizar cogumelos ou carnes caipiras, doure-os nesta etapa.',
      'Transfira uma concha do feijão cozido para o refogado, amasse os grãos com as costas da concha para formar uma pasta rica e devolva tudo à panela de feijão para encorpar o caldo. Cozinhe em fogo brando por mais 15 minutos até engrossar.',
      'Em outra panela, refogue o arroz orgânico em alho e azeite, adicione água fervente (proporção 2:1) e cozinhe até secar e ficar macio e soltinho.',
      'Para a couve: doure alho no azeite quente e salteie a couve picada por apenas 90 segundos para preservar o verde vivo e os nutrientes.',
      'Para a farofa: torre a farinha com cebola dourada, uma pitada de sal e ervas frescas.',
      'Sirva a feijoada borbulhante em louça de barro acompanhada do arroz, couve, farofa e fatias de laranja doce.'
    ],
    agroTip: 'A água do remolho inicial do feijão pode ser descartada ou usada para regar as plantas do jardim, pois ajuda a reduzir o fitato e os gases na digestão!',
    image: culinaryDish
  },
  {
    id: 'arroz-carreteiro-organico',
    title: 'Arroz Carreteiro com Arroz Vermelho & Agulhinha',
    subtitle: 'Com legumes da época, cheiro-verde e azeite aromático',
    category: 'prato_principal',
    categoryLabel: 'Prato Principal',
    prepTimeMinutes: 20,
    cookTimeMinutes: 35,
    servings: 5,
    difficulty: 'Fácil',
    description: 'Homenagem à tradição tropeira e gaúcha com o arroz agroecológico cultivado nas várzeas preservadas do Rio Grande do Sul. Prato único substancioso, aromático e nutritivo.',
    mstIngredients: [
      {
        name: 'Arroz Vermelho ou Integral Orgânico Terra Livre',
        cooperativeOrigin: 'Cooperativa dos Trabalhadores Assentados da Região de Porto Alegre (COOPAT)',
        benefit: 'Rico em fibras, zinco e antioxidantes com notas amendoadas inconfundíveis.'
      },
      {
        name: 'Tomates Orgânicos & Pimentões da Safra',
        cooperativeOrigin: 'Hortas Agroecológicas dos Assentamentos Paulistas e Fluminenses',
        benefit: 'Cultivados em consórcio agroflorestal sem qualquer resíduo químico sintético.'
      }
    ],
    ingredients: [
      '2 xícaras de Arroz Integral ou Agulhinha Orgânico Terra Livre',
      '300g de abóbora cabotiá picada em cubos ou carne desfiada caipira',
      '1 cebola roxa grande em cubinhos',
      '4 dentes de alho triturados',
      '2 tomates maduros picados sem sementes',
      '1 pimentão verde picadinho',
      '4 xícaras de caldo de legumes caseiro fervente',
      '1 colher (chá) de cúrcuma (açafrão-da-terra) pura',
      'Salsinha e cebolinha verde picadas a gosto',
      'Pimenta-do-reino e sal a gosto'
    ],
    instructions: [
      'Aqueça uma panela de ferro ou fundo grosso com 2 colheres de azeite. Doure os cubos de abóbora ou proteína até dourarem e reserve.',
      'Na mesma panela, doure o alho e a cebola até caramelizarem levemente. Acrescente os tomates, pimentão e a cúrcuma da terra.',
      'Adicione o arroz orgânico cru e refogue bem por 2 minutos para que os grãos absorvam os aromas dos temperos.',
      'Junte a abóbora reservada e despeje o caldo de legumes fervente.',
      'Tampe parcialmente a panela e cozinhe em fogo baixo até a água secar e o arroz amaciar (cerca de 20 a 25 minutos).',
      'Desligue o fogo, salpique farto cheiro-verde e deixe descansar tampado por 5 minutos antes de soltar com um garfo.'
    ],
    agroTip: 'Aproveite a casca da abóbora cabotiá: ela é macia, saborosa e rica em betacaroteno e fibras quando colhida sem veneno.',
    image: armazemCampo
  },
  {
    id: 'moqueca-pupunha-banana',
    title: 'Moqueca Agroecológica de Pupunha & Banana-da-Terra',
    subtitle: 'Com dendê puro de pilão, leite de coco fresco e pimentões coloridos',
    category: 'vegetariano',
    categoryLabel: 'Vegetariano / Vegano',
    prepTimeMinutes: 25,
    cookTimeMinutes: 30,
    servings: 4,
    difficulty: 'Fácil',
    description: 'Explosão de sabores da sociobiodiversidade brasileira. O palmito pupunha cultivado de forma sustentável na Mata Atlântica combina com a doçura da banana-da-terra e o dendê artesanal da Bahia.',
    mstIngredients: [
      {
        name: 'Azeite de Dendê Puro de Pilão',
        cooperativeOrigin: 'Assentamentos do Baixo Sul da Bahia',
        benefit: 'Extração artesanal e a frio, preservando carotenoides e sabor marcante sem aditivos.'
      },
      {
        name: 'Palmito Pupunha Agroflorestal',
        cooperativeOrigin: 'Cooperativas do Vale do Ribeira - SP/PR',
        benefit: 'Manejo sustentável sem corte de espécies ameaçadas como a juçara, promovendo restauração florestal.'
      }
    ],
    ingredients: [
      '400g de palmito pupunha fresco cortado em rodelas de 1,5 cm',
      '2 bananas-da-terra maduras cortadas em rodelas grossas',
      '400ml de leite de coco artesanal',
      '3 colheres (sopa) de azeite de dendê',
      '2 tomates maduros em rodelas',
      '1 cebola grande em rodelas',
      '1 pimentão vermelho e 1 amarelo em rodelas',
      'Suco de 1 limão taiti',
      'Coentro fresco e cebolinha picados a gosto',
      'Pimenta dedo-de-moça sem sementes bem picadinha',
      'Sal a gosto'
    ],
    instructions: [
      'Tempere as rodelas de pupunha com suco de limão, sal e pimenta dedo-de-moça. Deixe marinar por 10 minutos.',
      'Em uma panela de barro aquecida, espalhe 1 colher de dendê no fundo.',
      'Monte camadas alternadas: rodelas de cebola, tomate, pimentões, pupunha e banana-da-terra.',
      'Regue com o leite de coco e o restante do azeite de dendê.',
      'Tampe e leve ao fogo médio. Quando ferver, reduza para fogo brando e cozinhe por 18 a 20 minutos, até o palmito e a banana ficarem macios sem desmanchar.',
      'Finalize com o coentro fresco picado e desligue o fogo.',
      'Sirva com arroz branco soltinho Terra Livre e farofa de farinha d’água da Amazônia.'
    ],
    agroTip: 'O cultivo da pupunha em sistemas agroflorestais (SAFs) protege encostas contra erosão e gera renda sustentável para dezenas de famílias assentadas.',
    image: heroAgriculture
  },
  {
    id: 'polenta-crioula-milho',
    title: 'Polenta Cremosa de Fubá Crioulo com Molho Rústico',
    subtitle: 'Com milho crioulo moído em moinho de pedra e queijo de cooperativa',
    category: 'prato_principal',
    categoryLabel: 'Prato Principal',
    prepTimeMinutes: 15,
    cookTimeMinutes: 40,
    servings: 4,
    difficulty: 'Fácil',
    description: 'O milho crioulo resgata a herança milenar indígena e camponesa livre de sementes transgênicas (OGM). Uma polenta aveludada com molho rico de tomates e manjericão fresco.',
    mstIngredients: [
      {
        name: 'Fubá de Milho Crioulo Agroecológico',
        cooperativeOrigin: 'Cooperativa BioVida / Cooperbio - PR e SC',
        benefit: 'Semente ancestral livre de transgenia e fertilizantes químicos, sabor adocicado autêntico.'
      },
      {
        name: 'Queijo Artesanal de Assentamento',
        cooperativeOrigin: 'Cooperativa COOPEROESTE Terra Viva - SC',
        benefit: 'Feito com leite cru ou pasteurizado de vacas criadas a pasto em piquetes agroecológicos.'
      }
    ],
    ingredients: [
      '2 xícaras de Fubá Crioulo da Reforma Agrária',
      '6 xícaras de água ou caldo de legumes caseiro',
      '1 colher (sopa) de manteiga artesanal da cooperativa',
      '150g de queijo colonial ralado grosso',
      '8 tomates maduros bem vermelhos picados',
      '4 dentes de alho e 1 cebola picada',
      'Ramos de manjericão fresco',
      'Azeite de oliva e sal a gosto'
    ],
    instructions: [
      'Em uma panela grande, ferva 4 xícaras de água com 1 colher (chá) de sal e a manteiga.',
      'Dissolva o fubá crioulo nas outras 2 xícaras de água fria para não empelotar.',
      'Despeje o fubá dissolvido na água fervente, mexendo continuamente com um fouet ou colher de pau.',
      'Cozinhe em fogo bem baixo, mexendo frequentemente, por pelo menos 30 a 35 minutos para que o milho cozinhe perfeitamente e fique aveludado.',
      'Em outra panela, faça o molho: doure o alho e cebola no azeite, acrescente os tomates picados e deixe apurar até formar um molho rústico espesso. Tempere com sal e finalize com as folhas de manjericão fresco.',
      'Despeje a polenta quente numa travessa, salpique metade do queijo, cubra com o molho de tomates e finalize com o queijo restante para derreter com o calor.'
    ],
    agroTip: 'As casas de sementes crioulas do MST guardam mais de 40 variedades de milhos nativos que resistem naturalmente a secas e pragas locais.',
    image: armazemCampo
  },
  {
    id: 'bolo-mandioca-mel',
    title: 'Bolo Cremoso de Mandioca & Mel Silvestre',
    subtitle: 'Com macaxeira ralada na hora, coco fresco e mel de abelhas nativas',
    category: 'sobremesa',
    categoryLabel: 'Sobremesa Saudável',
    prepTimeMinutes: 20,
    cookTimeMinutes: 45,
    servings: 10,
    difficulty: 'Fácil',
    description: 'Um clássico das mesas do interior do Brasil. Não leva farinha de trigo refinada: a textura cremosa quase pudim vem da mandioca fresca ralada com coco e mel silvestre de florada da caatinga ou mata atlântica.',
    mstIngredients: [
      {
        name: 'Mandioca (Aipim/Macaxeira) Fresca dos Assentamentos',
        cooperativeOrigin: 'Assentamentos da Reforma Agrária em Alagoas, Pernambuco e SP',
        benefit: 'Colhida no ponto ideal de cozimento rápido, sem conservantes químicos ou alvejantes.'
      },
      {
        name: 'Mel Silvestre Puro da Reforma Agrária',
        cooperativeOrigin: 'Cooperativas de Apicultura Agroecológica do Ceará e Piauí',
        benefit: '100% puro e não pasteurizado, colhido em flores silvestres do sertão e cerrado.'
      }
    ],
    ingredients: [
      '800g de mandioca fresca descascada e ralada fina (ou batida no liquidificador)',
      '1 xícara de mel silvestre puro da Reforma Agrária (ou açúcar mascavo agroecológico)',
      '3 ovos caipiras de pequenos produtores',
      '200ml de leite integral de cooperativa ou leite de coco fresco',
      '100g de coco ralado fresco',
      '2 colheres (sopa) de manteiga de garrafa ou manteiga caipira derretida',
      '1 pitada de sal marinho',
      '1 colher (sopa) de fermento químico em pó'
    ],
    instructions: [
      'Pré-aqueça o forno a 180°C e unte uma forma redonda ou retangular com manteiga e polvilhe açúcar mascavo ou fubá.',
      'No liquidificador ou tigela grande, bata os ovos com o mel e a manteiga derretida até ficar homogêneo.',
      'Acrescente o leite e o coco fresco ralado e misture bem.',
      'Junte a mandioca ralada e a pitada de sal, misturando com uma espátula até obter uma massa pesada e úmida.',
      'Por último, incorpore delicadamente o fermento químico.',
      'Despeje na forma untada e asse por 40 a 45 minutos, até dourar por cima e as bordas começarem a soltar da forma.',
      'Deixe amornar antes de cortar em quadrados. Fica irresistível acompanhado de café passado na hora.'
    ],
    agroTip: 'A mandioca é a raiz soberana da alimentação brasileira: pode ser aproveitada integralmente, e suas folhas bem cozidas rendem a tradicional maniçoba rica em ferro.',
    image: culinaryDish
  },
  {
    id: 'cafe-guaii-especiarias',
    title: 'Café Guaií Especial Coado com Rapadura Pura',
    subtitle: 'Café 100% arábica do Sul de Minas com rapadura raspada e canela',
    category: 'cafe_lanche',
    categoryLabel: 'Café & Lanches',
    prepTimeMinutes: 10,
    cookTimeMinutes: 5,
    servings: 4,
    difficulty: 'Fácil',
    description: 'O Café Guaií é produzido por famílias assentadas na histórica fazenda Guaií, no Sul de Minas Gerais. Um café especial de altitude com notas doces de chocolate e nozes, servido com a doçura mineral da rapadura agroecológica.',
    mstIngredients: [
      {
        name: 'Café Especial Guaií em Grãos ou Moído',
        cooperativeOrigin: 'Cooperativa Camponesa (COOPCON) - Campo do Meio / Sul de Minas (MG)',
        benefit: 'Premiado pela doçura e aroma de altitude, cultivado em harmonia com as matas ciliares.'
      },
      {
        name: 'Rapadura e Melado Agroecológico',
        cooperativeOrigin: 'Engenhos comunitários dos Assentamentos da Paraíba e Pernambuco',
        benefit: 'Minerais vivos preservados (ferro, potássio, magnésio) sem aditivos químicos industriais.'
      }
    ],
    ingredients: [
      '4 colheres (sopa) bem cheias de Café Guaií moído médio',
      '500ml de água mineral ou filtrada aquecida (a 92°C, logo antes de levantar fervura vigorosa)',
      '2 colheres (sopa) de rapadura pura ralada na hora a gosto',
      '1 pauzinho de canela do Ceilão',
      '2 sementes de cardamomo levemente amassadas (opcional)'
    ],
    instructions: [
      'Aqueça a água com a canela em pau até começar a soltar pequenas bolhas no fundo (sem ferver intensamente).',
      'Escalde o coador de pano ou filtro de papel com um pouco de água quente e descarte essa primeira água.',
      'Coloque o pó de Café Guaií no coador.',
      'Despeje um fio da água quente em movimentos circulares para hidratar o pó (pré-infusão de 30 segundos).',
      'Verta o restante da água com calma, sem mexer no pó, deixando o café extrair de forma limpa e equilibrada.',
      'Ao final, adicione a rapadura ralada diretamente no bule quente e mexa suavemente até dissolver por completo.',
      'Sirva bem quentinho em canecas esmaltadas ou de cerâmica artesanal.'
    ],
    agroTip: 'A borra de café usada é um excelente adubo rico em nitrogênio para hortas domésticas e vasos de plantas ornamentais!',
    image: armazemCampo
  }
];
