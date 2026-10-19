import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  Calendar, 
  FileText, 
  UtensilsCrossed, 
  BookOpen, 
  X, 
  Check, 
  Bell, 
  ShieldCheck,
  Settings2,
  Trash2
} from 'lucide-react';

export interface NewsletterPreference {
  email: string;
  name?: string;
  state: string;
  topics: {
    fairs: boolean;
    events: boolean;
    news: boolean;
    recipes: boolean;
  };
  frequency: 'quinzenal' | 'semanal' | 'alertas_urgentes';
  subscribedAt: string;
}

interface FooterNewsletterProps {
  onNavigateToMap?: () => void;
}

export const FooterNewsletter: React.FC<FooterNewsletterProps> = ({ onNavigateToMap }) => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('TODOS');
  const [frequency, setFrequency] = useState<'quinzenal' | 'semanal' | 'alertas_urgentes'>('quinzenal');
  
  // Topic preferences based on user request: novas feiras, eventos e notícias da reforma agrária + safras
  const [topics, setTopics] = useState({
    fairs: true,
    events: true,
    news: true,
    recipes: true,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [activeSubscription, setActiveSubscription] = useState<NewsletterPreference | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [showPreferencesEdit, setShowPreferencesEdit] = useState<boolean>(false);

  // Load existing subscription from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mst_newsletter_active_sub');
      if (stored) {
        const parsed = JSON.parse(stored);
        setActiveSubscription(parsed);
        setEmail(parsed.email || '');
        setName(parsed.name || '');
        setSelectedState(parsed.state || 'TODOS');
        if (parsed.topics) setTopics(parsed.topics);
        if (parsed.frequency) setFrequency(parsed.frequency);
      }
    } catch (err) {
      console.error('Error loading newsletter subscription', err);
    }
  }, []);

  // Handle ESC key for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showPreviewModal) {
        setShowPreviewModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showPreviewModal]);

  const toggleTopic = (key: keyof typeof topics) => {
    setTopics(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail) {
      setErrorMessage('Por favor, informe seu endereço de e-mail.');
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('Por favor, insira um e-mail válido (ex: seuemail@exemplo.com.br).');
      return;
    }

    const hasAtLeastOneTopic = Object.values(topics).some(Boolean);
    if (!hasAtLeastOneTopic) {
      setErrorMessage('Selecione pelo menos um tema de interesse para receber o boletim.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newSub: NewsletterPreference = {
        email: trimmedEmail,
        name: name.trim() || undefined,
        state: selectedState,
        topics,
        frequency,
        subscribedAt: new Date().toLocaleDateString('pt-BR'),
      };

      try {
        localStorage.setItem('mst_newsletter_active_sub', JSON.stringify(newSub));
        // Also add to global archive
        const allSubsRaw = localStorage.getItem('mst_newsletter_subscribers');
        const allSubs: string[] = allSubsRaw ? JSON.parse(allSubsRaw) : [];
        if (!allSubs.includes(trimmedEmail)) {
          allSubs.push(trimmedEmail);
          localStorage.setItem('mst_newsletter_subscribers', JSON.stringify(allSubs));
        }
      } catch (err) {
        console.error('Error saving newsletter subscription', err);
      }

      setIsSubmitting(false);
      setActiveSubscription(newSub);
      setShowPreferencesEdit(false);
    }, 450);
  };

  const handleUnsubscribe = () => {
    try {
      localStorage.removeItem('mst_newsletter_active_sub');
      setActiveSubscription(null);
      setEmail('');
      setName('');
      setShowPreferencesEdit(false);
    } catch (err) {
      console.error('Error unsubscribing', err);
    }
  };

  const brazilianStates = [
    { code: 'TODOS', label: 'Brasil Inteiro (Geral)' },
    { code: 'SP', label: 'São Paulo (SP)' },
    { code: 'RJ', label: 'Rio de Janeiro (RJ)' },
    { code: 'MG', label: 'Minas Gerais (MG)' },
    { code: 'RS', label: 'Rio Grande do Sul (RS)' },
    { code: 'PR', label: 'Paraná (PR)' },
    { code: 'BA', label: 'Bahia (BA)' },
    { code: 'DF', label: 'Distrito Federal (DF)' },
    { code: 'PE', label: 'Pernambuco (PE)' },
    { code: 'CE', label: 'Ceará (CE)' },
    { code: 'SC', label: 'Santa Catarina (SC)' },
    { code: 'GO', label: 'Goiás (GO)' },
    { code: 'PA', label: 'Pará (PA)' },
  ];

  return (
    <div 
      role="region" 
      aria-labelledby="footer-newsletter-heading"
      className="bg-stone-800/95 rounded-3xl border border-stone-700/80 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden"
    >
      {/* Decorative ambient gradient backdrop */}
      <div 
        aria-hidden="true" 
        className="absolute -right-20 -bottom-20 w-80 h-80 bg-red-950/30 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 space-y-8">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-700/60 pb-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold text-red-400 uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5 text-red-500" aria-hidden="true" />
              <span>Boletim Popular da Terra</span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span className="text-emerald-400">Gratuito & Sem Spam</span>
            </div>
            <h3 id="footer-newsletter-heading" className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Atualizações de Feiras, Eventos & Conquistas do MST
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Receba avisos em primeira mão sobre a abertura de novas feiras agroecológicas na sua cidade, 
              o calendário dos festivais culturais da colheita e as vitórias populares na democratização da terra.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            aria-label="Ver exemplo da última edição do Boletim Popular da Terra"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-700/60 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-600 transition-colors self-start md:self-center focus:outline-hidden focus:ring-2 focus:ring-red-500"
          >
            <BookOpen className="w-3.5 h-3.5 text-stone-300" aria-hidden="true" />
            <span>Ver Edição de Exemplo</span>
          </button>
        </div>

        {/* Subscription Active Confirmation OR Form */}
        {activeSubscription && !showPreferencesEdit ? (
          <div 
            role="status" 
            aria-live="polite"
            className="bg-stone-900/80 border border-emerald-700/60 rounded-2xl p-6 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-700/50 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold text-emerald-400">
                    Inscrição Ativa & Confirmada
                  </div>
                  <h4 className="text-base font-serif font-bold text-white mt-0.5">
                    {activeSubscription.name ? `Olá, ${activeSubscription.name}!` : 'Tudo pronto!'} Você está conectado ao Boletim Popular.
                  </h4>
                  <p className="text-xs text-stone-400 mt-1">
                    Enviaremos novidades para <strong className="text-white">{activeSubscription.email}</strong> com frequência{' '}
                    <span className="text-emerald-300 font-semibold">{activeSubscription.frequency}</span>.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <button
                  type="button"
                  onClick={() => setShowPreferencesEdit(true)}
                  aria-label="Ajustar temas e preferências do boletim"
                  className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 flex items-center gap-1.5 transition-colors focus:outline-hidden focus:ring-2 focus:ring-stone-500"
                >
                  <Settings2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Ajustar Temas</span>
                </button>
                <button
                  type="button"
                  onClick={handleUnsubscribe}
                  aria-label="Cancelar assinatura do boletim"
                  className="p-1.5 rounded-lg text-stone-400 hover:text-red-400 hover:bg-red-950/40 border border-transparent transition-colors focus:outline-hidden focus:ring-2 focus:ring-red-500"
                  title="Cancelar inscrição"
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Active Themes Badges */}
            <div className="pt-3 border-t border-stone-800 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-stone-400 text-[11px] font-semibold">Tópicos selecionados:</span>
              {activeSubscription.topics.fairs && (
                <span className="px-2.5 py-0.5 rounded-full bg-red-950/70 border border-red-800 text-red-200 text-[11px] font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-red-400" aria-hidden="true" />
                  Novas Feiras & Armazéns ({activeSubscription.state})
                </span>
              )}
              {activeSubscription.topics.events && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-800 text-emerald-200 text-[11px] font-medium flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-emerald-400" aria-hidden="true" />
                  Festivais & Eventos
                </span>
              )}
              {activeSubscription.topics.news && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-950/70 border border-amber-800 text-amber-200 text-[11px] font-medium flex items-center gap-1">
                  <FileText className="w-3 h-3 text-amber-400" aria-hidden="true" />
                  Notícias da Reforma Agrária
                </span>
              )}
              {activeSubscription.topics.recipes && (
                <span className="px-2.5 py-0.5 rounded-full bg-stone-800 border border-stone-700 text-stone-300 text-[11px] font-medium flex items-center gap-1">
                  <UtensilsCrossed className="w-3 h-3 text-stone-400" aria-hidden="true" />
                  Receitas & Safras
                </span>
              )}
            </div>

            {/* Teaser of upcoming edition */}
            <div className="p-3 bg-stone-950/50 rounded-xl border border-stone-800 text-xs text-stone-300 flex items-start gap-2.5">
              <Bell className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <b className="text-white">Na próxima edição:</b> Programação completa da Feira Nacional da Reforma Agrária no Parque da Água Branca, colheita recorde do arroz Terra Livre no RS e novas cooperativas de café agroecológico na Bahia.
              </div>
            </div>
          </div>
        ) : (
          /* Subscription / Preferences Form */
          <form 
            onSubmit={handleSubscribe} 
            aria-labelledby="footer-newsletter-heading"
            className="space-y-6"
          >
            {/* Topic Selection Grid */}
            <fieldset className="space-y-2.5">
              <legend className="text-xs font-semibold uppercase tracking-wider text-stone-300 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                <span>Escolha os temas de seu interesse:</span>
              </legend>

              <div 
                role="group" 
                aria-label="Temas do boletim informativo"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
              >
                {/* Topic 1: Feiras & Armazéns */}
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={topics.fairs}
                  onClick={() => toggleTopic('fairs')}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-red-500 ${
                    topics.fairs
                      ? 'bg-red-950/40 border-red-700 text-white'
                      : 'bg-stone-900/60 border-stone-700 text-stone-400 hover:border-stone-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-1.5 rounded-lg bg-red-900/60 text-red-300">
                      <MapPin className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <span className={`w-4 h-4 rounded flex items-center justify-center text-xs ${topics.fairs ? 'bg-red-700 text-white' : 'border border-stone-600'}`}>
                      {topics.fairs && <Check className="w-3 h-3" />}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white">Novas Feiras do MST</div>
                    <p className="text-[11px] text-stone-400 mt-0.5 leading-snug">
                      Alertas de pontos agroecológicos, Armazéns do Campo e feiras periódicas.
                    </p>
                  </div>
                </button>

                {/* Topic 2: Eventos e Mutirões */}
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={topics.events}
                  onClick={() => toggleTopic('events')}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-500 ${
                    topics.events
                      ? 'bg-emerald-950/40 border-emerald-700 text-white'
                      : 'bg-stone-900/60 border-stone-700 text-stone-400 hover:border-stone-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-1.5 rounded-lg bg-emerald-900/60 text-emerald-300">
                      <Calendar className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <span className={`w-4 h-4 rounded flex items-center justify-center text-xs ${topics.events ? 'bg-emerald-700 text-white' : 'border border-stone-600'}`}>
                      {topics.events && <Check className="w-3 h-3" />}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white">Eventos & Festivais</div>
                    <p className="text-[11px] text-stone-400 mt-0.5 leading-snug">
                      Feiras Nacionais, Festas da Colheita, cursos da ENFF e mutirões de árvores.
                    </p>
                  </div>
                </button>

                {/* Topic 3: Notícias da Reforma Agrária */}
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={topics.news}
                  onClick={() => toggleTopic('news')}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-amber-500 ${
                    topics.news
                      ? 'bg-amber-950/40 border-amber-700 text-white'
                      : 'bg-stone-900/60 border-stone-700 text-stone-400 hover:border-stone-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-1.5 rounded-lg bg-amber-900/60 text-amber-300">
                      <FileText className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <span className={`w-4 h-4 rounded flex items-center justify-center text-xs ${topics.news ? 'bg-amber-600 text-white' : 'border border-stone-600'}`}>
                      {topics.news && <Check className="w-3 h-3" />}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white">Notícias & Conquistas</div>
                    <p className="text-[11px] text-stone-400 mt-0.5 leading-snug">
                      Democratização da terra, direitos humanos, dados da produção e decisões jurídicas.
                    </p>
                  </div>
                </button>

                {/* Topic 4: Safras & Culinária Camponesa */}
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={topics.recipes}
                  onClick={() => toggleTopic('recipes')}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-stone-400 ${
                    topics.recipes
                      ? 'bg-stone-700/60 border-stone-500 text-white'
                      : 'bg-stone-900/60 border-stone-700 text-stone-400 hover:border-stone-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="p-1.5 rounded-lg bg-stone-800 text-stone-300">
                      <UtensilsCrossed className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <span className={`w-4 h-4 rounded flex items-center justify-center text-xs ${topics.recipes ? 'bg-stone-500 text-white' : 'border border-stone-600'}`}>
                      {topics.recipes && <Check className="w-3 h-3" />}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white">Receitas & Safras</div>
                    <p className="text-[11px] text-stone-400 mt-0.5 leading-snug">
                      Alimentos da época, arroz orgânico e culinária popular saudável.
                    </p>
                  </div>
                </button>
              </div>
            </fieldset>

            {/* Inputs: Name, State, Frequency, Email */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-end">
              {/* Optional Name */}
              <div className="md:col-span-3">
                <label htmlFor="newsletter-name-input" className="block text-[11px] font-semibold text-stone-300 mb-1">
                  Seu Nome (Opcional)
                </label>
                <input
                  id="newsletter-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Dandara dos Santos"
                  className="w-full px-3 py-2.5 text-xs bg-stone-900/90 border border-stone-700 rounded-xl text-white placeholder:text-stone-500 focus:outline-hidden focus:ring-2 focus:ring-red-600 transition-all"
                />
              </div>

              {/* State Filter */}
              <div className="md:col-span-3">
                <label htmlFor="newsletter-state-select" className="block text-[11px] font-semibold text-stone-300 mb-1">
                  Região de Interesse (UF)
                </label>
                <select
                  id="newsletter-state-select"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-stone-900/90 border border-stone-700 rounded-xl text-white focus:outline-hidden focus:ring-2 focus:ring-red-600 transition-all"
                >
                  {brazilianStates.map((st) => (
                    <option key={st.code} value={st.code}>
                      {st.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Email Input */}
              <div className="md:col-span-4">
                <label htmlFor="newsletter-email-main" className="block text-[11px] font-semibold text-stone-300 mb-1">
                  Seu E-mail <span className="text-red-400" aria-label="obrigatório">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" aria-hidden="true" />
                  <input
                    id="newsletter-email-main"
                    type="email"
                    required
                    aria-required="true"
                    aria-invalid={!!errorMessage}
                    aria-describedby={errorMessage ? 'newsletter-form-error' : undefined}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="voce@exemplo.com.br"
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-stone-900/90 border border-stone-700 rounded-xl text-white placeholder:text-stone-500 focus:outline-hidden focus:ring-2 focus:ring-red-600 transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label="Cadastrar e receber o boletim popular"
                  className="w-full py-2.5 px-4 bg-red-700 hover:bg-red-800 disabled:opacity-60 text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow flex items-center justify-center gap-1.5 focus:outline-hidden focus:ring-2 focus:ring-red-600 cursor-pointer"
                >
                  <span>{isSubmitting ? 'Salvando...' : 'Inscrever-se'}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div 
                id="newsletter-form-error"
                role="alert" 
                aria-live="assertive"
                className="text-xs text-red-400 bg-red-950/50 border border-red-800 p-2.5 rounded-xl font-medium flex items-center gap-2"
              >
                <span>⚠️ {errorMessage}</span>
              </div>
            )}

            {/* Trust and Privacy Note */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-[11px] text-stone-400 border-t border-stone-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                <span>Dados protegidos pelo sigilo ético popular. Cancelamento com 1 clique a qualquer momento.</span>
              </div>
              <div className="flex items-center gap-3">
                <span>Frequência:</span>
                <div role="radiogroup" aria-label="Frequência de envio" className="inline-flex gap-2">
                  {(['quinzenal', 'semanal', 'alertas_urgentes'] as const).map((freq) => (
                    <label key={freq} className="inline-flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="newsletter-frequency"
                        value={freq}
                        checked={frequency === freq}
                        onChange={() => setFrequency(freq)}
                        className="text-red-600 focus:ring-red-500 w-3 h-3"
                      />
                      <span className="capitalize">{freq === 'alertas_urgentes' ? 'Apenas Alertas' : freq}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Sample Edition Modal */}
      {showPreviewModal && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="sample-modal-title"
          className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white text-stone-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-300 space-y-6 relative">
            <button
              type="button"
              onClick={() => setShowPreviewModal(false)}
              aria-label="Fechar janela de prévia do boletim"
              className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors focus:outline-hidden focus:ring-2 focus:ring-stone-400"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-red-700 uppercase tracking-wider mb-1">
                <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Edição de Exemplo · Ano 2026 · Edição #42</span>
              </div>
              <h3 id="sample-modal-title" className="text-2xl font-serif font-bold text-stone-900">
                Boletim Popular da Terra: Safra Viva
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Veja o conteúdo que você receberá na sua caixa de entrada ao se cadastrar.
              </p>
            </div>

            <div className="space-y-4 text-xs text-stone-700 divide-y divide-stone-100 max-h-[60vh] overflow-y-auto pr-1">
              {/* Highlight 1: Feiras */}
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center gap-2 text-red-800 font-bold text-xs uppercase tracking-wide">
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Novas Feiras em Destaque</span>
                </div>
                <h4 className="font-serif font-bold text-sm text-stone-900">
                  Feira Agroecológica de Outono no Parque da Água Branca (São Paulo)
                </h4>
                <p className="text-stone-600 leading-relaxed text-[11px]">
                  Mais de 40 barracas com hortaliças frescas, frutas sem agrotóxicos e queijos artesanais dos assentamentos paulistas. De quinta a domingo, com café camponês servido pela manhã.
                </p>
              </div>

              {/* Highlight 2: Eventos */}
              <div className="space-y-1.5 pt-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wide">
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Agenda Cultural & Formação</span>
                </div>
                <h4 className="font-serif font-bold text-sm text-stone-900">
                  Festa Nacional da Colheita do Arroz Agroecológico no Rio Grande do Sul
                </h4>
                <p className="text-stone-600 leading-relaxed text-[11px]">
                  Celebrando a 22ª safra da maior produção orgânica de arroz da América Latina, reunindo milhares de agricultores, especialistas e chefs em Viamão (RS).
                </p>
              </div>

              {/* Highlight 3: Notícias */}
              <div className="space-y-1.5 pt-3">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wide">
                  <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Notícias da Reforma Agrária</span>
                </div>
                <h4 className="font-serif font-bold text-sm text-stone-900">
                  500 Novas Famílias Assentadas Destinam Terras à Agrofloresta
                </h4>
                <p className="text-stone-600 leading-relaxed text-[11px]">
                  Imóvel improdutivo com passivo ambiental no Vale do Paraíba é revertido para a produção de alimentos sem veneno e recuperação de 20 nascentes nativas.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-stone-200">
              <span className="text-[11px] text-stone-500">
                Gostou? Cadastre-se acima para receber a próxima edição!
              </span>
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-colors focus:outline-hidden focus:ring-2 focus:ring-stone-600"
              >
                Fechar Prévia
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
