import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, ExternalLink, Sparkles, Wheat } from 'lucide-react';

interface FooterProps {
  onNavigate: (tabId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const stored = localStorage.getItem('mst_newsletter_subscribers');
        const list: string[] = stored ? JSON.parse(stored) : [];
        if (!list.includes(trimmedEmail)) {
          list.push(trimmedEmail);
          localStorage.setItem('mst_newsletter_subscribers', JSON.stringify(list));
        }
      } catch (err) {
        console.error('Error saving newsletter subscriber', err);
      }

      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
    }, 400);
  };

  return (
    <footer className="bg-stone-900 text-stone-300 py-14 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Newsletter Subscription Row */}
        <div className="bg-stone-800/90 rounded-3xl border border-stone-700/80 p-6 sm:p-8 lg:p-10 shadow-inner">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Copy */}
            <div className="lg:col-span-6 space-y-3">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-red-400 uppercase tracking-wider">
                <Mail className="w-3.5 h-3.5 text-red-500" />
                <span>Boletim Popular da Terra</span>
                <span aria-hidden="true" className="text-stone-600">·</span>
                <span className="text-stone-400">Informativo Quinzenal</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                Receba novidades sobre feiras e conquistas da Reforma Agrária
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-sans">
                Acompanhe o calendário atualizado de feiras agroecológicas em sua região, chegada de safras 
                de arroz orgânico Terra Livre, receitas da estação e os avanços na democratização do campo.
              </p>
            </div>

            {/* Form */}
            <div className="lg:col-span-6">
              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="relative flex-1">
                      <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errorMessage) setErrorMessage('');
                        }}
                        placeholder="Digite seu melhor e-mail..."
                        className="w-full pl-10 pr-4 py-3 text-xs bg-stone-900/90 border border-stone-700 rounded-xl text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-red-700 hover:bg-red-800 disabled:opacity-60 text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                    >
                      <span>{isSubmitting ? 'Cadastrando...' : 'Inscrever-se'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {errorMessage && (
                    <div className="text-xs text-red-400 font-medium">
                      {errorMessage}
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-[11px] text-stone-400">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Envios periódicos e sem spam. Cancele sua inscrição quando quiser.</span>
                  </div>
                </form>
              ) : (
                <div className="bg-emerald-950/60 border border-emerald-800/80 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center gap-2.5 text-emerald-300 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Inscrição confirmada com sucesso!</span>
                  </div>
                  <p className="text-emerald-200/90 text-xs leading-relaxed">
                    Você começará a receber nossas atualizações com avisos de feiras próximas, 
                    receitas agroecológicas e notícias da produção camponesa.
                  </p>
                  <button
                    onClick={() => setIsSubscribed(false)}
                    className="text-[11px] text-emerald-400 hover:text-emerald-200 underline pt-1 font-medium cursor-pointer"
                  >
                    Cadastrar outro e-mail
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Links and Organization Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2 text-white font-serif font-bold text-lg">
              <span className="w-7 h-7 rounded-full bg-red-700 flex items-center justify-center text-[10px] font-black text-white">
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
          <div className="md:col-span-3 space-y-2.5">
            <div className="font-bold uppercase tracking-wider text-stone-200 text-[11px]">
              Navegação Rápida
            </div>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('mapa')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Localizar Feiras & Armazéns
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('beneficios')}
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-red-500" />
                  <span>Benefícios Sociais do MST</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('receitas')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Receitas Orgânicas da Terra
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('historia')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  História & Fatos Positivos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('apoiar')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Como Apoiar a Reforma Agrária
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('denuncias')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Canal de Denúncias & Segurança
                </button>
              </li>
            </ul>
          </div>

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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
              >
                <span>Portal MST Oficial</span>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </a>
              <a
                href="https://armazemdocampo.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
              >
                <span>Armazém do Campo</span>
                <ExternalLink className="w-3 h-3 text-stone-400" />
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
