import React, { useState } from 'react';
import { Menu, X, MapPin, ShieldAlert, BookOpen, UtensilsCrossed, HeartHandshake, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLocateClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onLocateClick
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'mapa', label: 'Feiras & Mapa', icon: MapPin },
    { id: 'beneficios', label: 'Benefícios do MST', icon: Sparkles },
    { id: 'receitas', label: 'Receitas da Terra', icon: UtensilsCrossed },
    { id: 'historia', label: 'História & Conquistas', icon: BookOpen },
    { id: 'apoiar', label: 'Como Apoiar', icon: HeartHandshake },
    { id: 'denuncias', label: 'Segurança & Denúncias', icon: ShieldAlert },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header role="banner" className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Brand wordmark (single line element) */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('mapa')}
              aria-label="MST Terra e Alimento - Ir para início e mapa de feiras"
              className="group text-left text-lg sm:text-xl font-bold tracking-tight text-stone-900 hover:text-red-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-red-700 focus-visible:outline-offset-2 rounded-lg"
            >
              <span aria-hidden="true" className="w-8 h-8 rounded-full bg-red-700 flex items-center justify-center text-white text-xs font-black shadow-sm group-hover:scale-105 transition-transform">
                MST
              </span>
              <span className="font-serif">Terra & Alimento</span>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav 
            role="navigation" 
            aria-label="Navegação principal" 
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 focus-visible:outline-2 focus-visible:outline-red-700 focus-visible:outline-offset-2 rounded-sm ${
                    isActive
                      ? 'text-red-700 font-semibold border-red-700'
                      : 'border-transparent text-stone-600 hover:text-stone-900 hover:border-stone-300'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-75" aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary action & Mobile menu trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onLocateClick}
              aria-label="Localizar feira agroecológica do MST mais próxima no mapa"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-red-700 focus-visible:outline-offset-2"
            >
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Localizar Feira Próxima</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-200/60 transition-colors focus-visible:outline-2 focus-visible:outline-red-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div 
          id="mobile-navigation" 
          role="navigation" 
          aria-label="Menu de navegação móvel"
          className="lg:hidden border-t border-stone-200 bg-[#FAF8F5] px-4 pt-3 pb-5 space-y-1 shadow-lg"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors focus-visible:outline-2 focus-visible:outline-red-700 ${
                  isActive
                    ? 'bg-red-50 text-red-700 font-semibold'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-red-700' : 'text-stone-500'}`} aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-3 border-t border-stone-200">
            <button
              onClick={() => {
                onLocateClick();
                setMobileMenuOpen(false);
              }}
              aria-label="Localizar feira agroecológica do MST mais próxima"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-red-700"
            >
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>Localizar Feira Próxima</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
