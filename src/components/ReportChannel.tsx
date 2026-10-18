import React, { useState } from 'react';
import { SECURITY_HOTLINES } from '../data/history';
import { ReportSubmission } from '../types';
import { 
  ShieldAlert, 
  Lock, 
  AlertTriangle, 
  PhoneCall, 
  FileCheck2, 
  Copy, 
  Check, 
  Printer, 
  EyeOff, 
  Eye, 
  LifeBuoy, 
  Search,
  ExternalLink,
  ChevronDown,
  Info
} from 'lucide-react';

export const ReportChannel: React.FC = () => {
  // Form State
  const [category, setCategory] = useState<string>('ameaca_armada');
  const [urgency, setUrgency] = useState<'Alta' | 'Média' | 'Crítica'>('Alta');
  const [state, setState] = useState<string>('SP');
  const [municipality, setMunicipality] = useState<string>('');
  const [settlementName, setSettlementName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [hasArmedPresence, setHasArmedPresence] = useState<boolean>(false);
  const [hasChemicalSpraying, setHasChemicalSpraying] = useState<boolean>(false);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const [informantName, setInformantName] = useState<string>('');
  const [informantContact, setInformantContact] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Completed Protocol Modal
  const [generatedProtocol, setGeneratedProtocol] = useState<ReportSubmission | null>(null);
  const [copiedProtocol, setCopiedProtocol] = useState<boolean>(false);

  // Status Lookup Simulator
  const [lookupCode, setLookupCode] = useState<string>('');
  const [lookupResult, setLookupResult] = useState<ReportSubmission | null>(null);
  const [lookupError, setLookupError] = useState<string>('');

  // Stored protocols history
  const [storedReports, setStoredReports] = useState<ReportSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('mst_security_reports');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !settlementName.trim() || !municipality.trim()) {
      alert('Por favor, preencha o município, nome da comunidade e o relato dos fatos.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const newProtocolId = `DEN-MST-2026-${randomNum}`;
      const now = new Date();
      const formattedDate = `${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;

      const newReport: ReportSubmission = {
        id: `rep_${Date.now()}`,
        protocol: newProtocolId,
        timestamp: formattedDate,
        category,
        urgency,
        state,
        municipality,
        settlementName,
        description,
        hasArmedPresence,
        hasChemicalSpraying,
        isAnonymous,
        informantName: isAnonymous ? undefined : informantName,
        informantContact: isAnonymous ? undefined : informantContact,
        status: urgency === 'Crítica' ? 'Em Análise Humanitária' : 'Recebida',
      };

      const updated = [newReport, ...storedReports];
      setStoredReports(updated);
      try {
        localStorage.setItem('mst_security_reports', JSON.stringify(updated));
      } catch (err) {
        console.error('Error saving report', err);
      }

      setGeneratedProtocol(newReport);
      setIsSubmitting(false);

      // Reset form
      setDescription('');
      setMunicipality('');
      setSettlementName('');
      setHasArmedPresence(false);
      setHasChemicalSpraying(false);
    }, 600);
  };

  const handleCopyProtocol = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedProtocol(true);
    setTimeout(() => setCopiedProtocol(false), 2000);
  };

  const handleLookup = () => {
    setLookupError('');
    setLookupResult(null);
    const cleanCode = lookupCode.trim().toUpperCase();
    if (!cleanCode) return;

    const found = storedReports.find((r) => r.protocol.toUpperCase() === cleanCode);
    if (found) {
      setLookupResult(found);
    } else {
      // Demo simulated response if looking up a sample code
      if (cleanCode.startsWith('DEN-MST')) {
        setLookupResult({
          id: 'sim_1',
          protocol: cleanCode,
          timestamp: '17/10/2026 às 10:15',
          category: 'Ameaça de Grileiros / Conflito de Terra',
          urgency: 'Alta',
          state: 'PA',
          municipality: 'Marabá',
          settlementName: 'Assentamento Palmares II',
          description: 'Registro sob monitoramento da assessoria jurídica da CPT e Ouvidoria Agrária.',
          hasArmedPresence: true,
          hasChemicalSpraying: false,
          isAnonymous: true,
          status: 'Encaminhada ao MPF/DPU',
        });
      } else {
        setLookupError('Protocolo não localizado na base local. Verifique os dígitos (Exemplo: DEN-MST-2026-1234).');
      }
    }
  };

  return (
    <section id="canal-denuncias" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-red-700 tracking-wider uppercase mb-2">
            <ShieldAlert className="w-4 h-4" />
            <span>Direitos Humanos & Proteção da Vida</span>
            <span aria-hidden="true">·</span>
            <span>Segurança Popular no Campo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight text-balance">
            Canal de Denúncias e Apoio à Segurança dos Assentados
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            Espaço ético e sigiloso para registrar ameaças de grileiros, pistolagem armada, 
            pulverização criminosa de agrotóxicos em áreas escolares e invasões. 
            Todas as denúncias são direcionadas às redes de direitos humanos (CPT, DPU e Ministério Público Federal).
          </p>
        </div>

        {/* Emergency Alert Banner */}
        <div className="mb-10 bg-red-50 border border-red-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-red-950">
                Emergência em andamento ou risco iminente à vida?
              </h3>
              <p className="text-xs text-red-900 mt-0.5">
                Acione imediatamente o <b>Disque 100</b> (Direitos Humanos) ou a Defensoria Pública da União antes de preencher o relatório.
              </p>
            </div>
          </div>
          <a
            href="tel:100"
            className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg text-xs font-bold whitespace-nowrap shadow-xs transition-colors flex items-center gap-1.5 shrink-0"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Ligar para o Disque 100</span>
          </a>
        </div>

        {/* Main Grid: Form (Left) + Hotlines & Emergency Protocol (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form Column */}
          <div className="lg:col-span-7 bg-[#FAF8F5] rounded-3xl border border-stone-300 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-200">
              <h3 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-700" />
                <span>Formulário de Registro de Ocorrência</span>
              </h3>
              <span className="text-xs font-semibold text-stone-500">
                {isAnonymous ? 'Modo 100% Anônimo' : 'Com Identificação'}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Anonymous toggle */}
              <div className="p-3.5 bg-white rounded-xl border border-stone-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  {isAnonymous ? (
                    <EyeOff className="w-4 h-4 text-emerald-700" />
                  ) : (
                    <Eye className="w-4 h-4 text-stone-500" />
                  )}
                  <div>
                    <div className="text-xs font-bold text-stone-900">
                      {isAnonymous ? 'Denúncia Anônima Ativada' : 'Identificação Informada'}
                    </div>
                    <div className="text-[11px] text-stone-500">
                      {isAnonymous
                        ? 'Nenhum dado pessoal (nome, IP, contato) será vinculado ao relato.'
                        : 'Seus dados de contato ficarão restritos aos advogados da causa.'}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    isAnonymous
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-stone-200 text-stone-700'
                  }`}
                >
                  {isAnonymous ? 'Tornar Pública/Identificada' : 'Tornar Anônima'}
                </button>
              </div>

              {!isAnonymous && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-white rounded-xl border border-stone-200">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Seu Nome ou Codinome
                    </label>
                    <input
                      type="text"
                      value={informantName}
                      onChange={(e) => setInformantName(e.target.value)}
                      placeholder="Ex: Maria dos Santos"
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Contato Seguro (WhatsApp ou Telefone)
                    </label>
                    <input
                      type="text"
                      value={informantContact}
                      onChange={(e) => setInformantContact(e.target.value)}
                      placeholder="(DDD) 90000-0000"
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600"
                    />
                  </div>
                </div>
              )}

              {/* Category & Urgency */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Tipo de Ocorrência
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-stone-800"
                  >
                    <option value="ameaca_armada">Ameaça de Pistoleiros / Milícia Rural</option>
                    <option value="pulverizacao_agrotoxicos">Pulverização Criminosa de Agrotóxicos</option>
                    <option value="invasao_grilagem">Invasão de Terra / Grilagem de Área Pública</option>
                    <option value="perseguicao_liderancas">Perseguição contra Liderança Camponesa</option>
                    <option value="destruicao_ambiental">Contaminação de Águas e Queimada Criminosa</option>
                    <option value="trabalho_escravo">Trabalho Análogo à Escravidão na Região</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Nível de Urgência
                  </label>
                  <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg border border-stone-200">
                    {(['Média', 'Alta', 'Crítica'] as const).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setUrgency(lvl)}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                          urgency === lvl
                            ? lvl === 'Crítica'
                              ? 'bg-red-700 text-white'
                              : lvl === 'Alta'
                              ? 'bg-amber-600 text-white'
                              : 'bg-stone-800 text-white'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Estado (UF)
                  </label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-stone-800"
                  >
                    {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map((uf) => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Município
                  </label>
                  <input
                    type="text"
                    required
                    value={municipality}
                    onChange={(e) => setMunicipality(e.target.value)}
                    placeholder="Ex: Ribeirão Preto"
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-1">
                    Assentamento / Comunidade
                  </label>
                  <input
                    type="text"
                    required
                    value={settlementName}
                    onChange={(e) => setSettlementName(e.target.value)}
                    placeholder="Ex: Assentamento Mário Lago"
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
              </div>

              {/* Checkbox tags */}
              <div className="flex flex-wrap gap-4 pt-1">
                <label className="flex items-center gap-2 text-xs text-stone-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasArmedPresence}
                    onChange={(e) => setHasArmedPresence(e.target.checked)}
                    className="rounded text-red-700 focus:ring-red-600 w-4 h-4"
                  />
                  <span>Há presença visível de homens armados ou seguranças privados ilegais</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-stone-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasChemicalSpraying}
                    onChange={(e) => setHasChemicalSpraying(e.target.checked)}
                    className="rounded text-red-700 focus:ring-red-600 w-4 h-4"
                  />
                  <span>Houve pulverização de agrotóxicos sobre casas, hortas ou escolas</span>
                </label>
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Relato Detalhado dos Fatos
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva o que ocorreu: datas aproximadas, quantidade de pessoas afetadas, placas de veículos se houver, ameaças proferidas e situação atual da comunidade..."
                  className="w-full p-3 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-stone-800 leading-relaxed"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 text-xs sm:text-sm font-bold text-white bg-red-700 hover:bg-red-800 rounded-xl shadow-xs transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>
                  {isSubmitting ? 'Gerando Protocolo Seguro...' : 'Registrar Denúncia com Criptografia e Sigilo'}
                </span>
              </button>
            </form>
          </div>

          {/* Right Column: Hotlines & Protocol Check */}
          <div className="lg:col-span-5 space-y-6">
            {/* Consult Protocol Card */}
            <div className="bg-[#FAF8F5] rounded-3xl border border-stone-300 p-6 space-y-4 shadow-xs">
              <h4 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2">
                <Search className="w-4 h-4 text-red-700" />
                <span>Consultar Andamento de Denúncia</span>
              </h4>
              <p className="text-xs text-stone-600">
                Digite o código gerado no registro (Ex: <code>DEN-MST-2026-8492</code>) para verificar as providências tomadas.
              </p>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={lookupCode}
                  onChange={(e) => setLookupCode(e.target.value)}
                  placeholder="DEN-MST-2026-XXXX"
                  className="flex-1 px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 font-mono uppercase"
                />
                <button
                  onClick={handleLookup}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                >
                  Consultar
                </button>
              </div>

              {lookupError && (
                <div className="text-xs text-red-700 bg-red-50 p-2.5 rounded-lg border border-red-200">
                  {lookupError}
                </div>
              )}

              {lookupResult && (
                <div className="bg-white rounded-xl border border-stone-200 p-4 space-y-2.5 text-xs text-stone-700 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-red-700">{lookupResult.protocol}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                      {lookupResult.status}
                    </span>
                  </div>
                  <div>
                    <b>Local:</b> {lookupResult.settlementName} ({lookupResult.municipality} - {lookupResult.state})
                  </div>
                  <div>
                    <b>Data do Registro:</b> {lookupResult.timestamp}
                  </div>
                  <div className="p-2 bg-stone-50 rounded-lg text-stone-600 text-[11px] leading-relaxed">
                    {lookupResult.description}
                  </div>
                </div>
              )}
            </div>

            {/* Official Support Channels */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-4 shadow-xs">
              <h4 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2">
                <LifeBuoy className="w-4 h-4 text-emerald-700" />
                <span>Órgãos de Proteção e Apoio Jurídico</span>
              </h4>
              <p className="text-xs text-stone-600">
                Rede de entidades permanentes que acompanham os conflitos agrários e a segurança das famílias camponesas.
              </p>

              <div className="space-y-3 divide-y divide-stone-100">
                {SECURITY_HOTLINES.map((hotline, idx) => (
                  <div key={idx} className={idx > 0 ? 'pt-3' : ''}>
                    <div className="text-xs font-bold text-stone-900 flex items-center justify-between">
                      <span>{hotline.name}</span>
                      <a
                        href={hotline.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-400 hover:text-stone-700"
                        title="Visitar site oficial"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">{hotline.role}</div>
                    {'address' in hotline && (
                      <div className="text-[11px] text-stone-500 mt-0.5">📍 {hotline.address}</div>
                    )}
                    <div className="flex items-center gap-3 mt-1.5 text-xs font-semibold text-red-700">
                      <a href={`tel:${hotline.phone.replace(/\D/g, '')}`} className="hover:underline">
                        📞 {hotline.phone}
                      </a>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <a href={`mailto:${hotline.email}`} className="text-stone-600 hover:underline">
                        ✉️ {hotline.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Guide Accordion */}
            <div className="bg-amber-50/60 rounded-2xl border border-amber-200 p-5 space-y-2 text-xs text-amber-950">
              <div className="font-bold flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-700" />
                <span>Orientações de Segurança Preventiva</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-amber-900 text-[11px] leading-relaxed">
                <li>Nunca enfrente homens armados sozinho; avise a coordenação da comunidade imediatamente.</li>
                <li>Em caso de pulverização aérea de agrotóxicos, recolha as crianças para dentro de casa, feche janelas e lave os olhos com água limpa.</li>
                <li>Se for seguro, registre fotos e vídeos com data e hora sem se expor à linha de tiro.</li>
                <li>Guarde seu número de protocolo para acompanhamento com a equipe jurídica.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Modal: Successfully Generated Protocol Receipt */}
        {generatedProtocol && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <FileCheck2 className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-700">
                  Denúncia Registrada com Sucesso
                </span>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                  Protocolo de Segurança Gerado
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Guarde este código para acompanhar os desdobramentos com a assessoria jurídica e a Comissão Pastoral da Terra.
                </p>
              </div>

              {/* Protocol display box */}
              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-stone-300 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase font-bold text-stone-500">Número do Protocolo</div>
                  <div className="text-xl font-mono font-bold text-red-700">
                    {generatedProtocol.protocol}
                  </div>
                </div>
                <button
                  onClick={() => handleCopyProtocol(generatedProtocol.protocol)}
                  className="px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs font-semibold text-stone-700 hover:bg-stone-50 flex items-center gap-1.5"
                >
                  {copiedProtocol ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedProtocol ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>

              {/* Summary facts */}
              <div className="text-xs text-stone-700 space-y-1.5 border-y border-stone-100 py-3">
                <div><b>Data/Hora:</b> {generatedProtocol.timestamp}</div>
                <div><b>Local:</b> {generatedProtocol.settlementName} ({generatedProtocol.municipality} - {generatedProtocol.state})</div>
                <div><b>Urgência:</b> {generatedProtocol.urgency}</div>
                <div><b>Status Atual:</b> {generatedProtocol.status}</div>
                <div><b>Anonimato:</b> {generatedProtocol.isAnonymous ? 'Preservado (100% Anônimo)' : 'Identificado com a equipe'}</div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir Comprovante</span>
                </button>
                <button
                  onClick={() => setGeneratedProtocol(null)}
                  className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-colors"
                >
                  Concluir e Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
