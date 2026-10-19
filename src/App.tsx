import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveMap } from './components/InteractiveMap';
import { MSTBenefits } from './components/MSTBenefits';
import { RecipesSection } from './components/RecipesSection';
import { HistoryAndImpact } from './components/HistoryAndImpact';
import { SupportSection } from './components/SupportSection';
import { ReportChannel } from './components/ReportChannel';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('mapa');
  const [targetMarketId, setTargetMarketId] = useState<string | null>(null);
  const [targetSearchQuery, setTargetSearchQuery] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(
      id === 'mapa'
        ? 'mapa-feiras'
        : id === 'beneficios'
        ? 'beneficios-mst'
        : id === 'receitas'
        ? 'receitas-organicas'
        : id === 'historia'
        ? 'historia-conquistas'
        : id === 'apoiar'
        ? 'como-apoiar'
        : id === 'denuncias'
        ? 'canal-denuncias'
        : ''
    );
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLocateClick = () => {
    setTargetSearchQuery('');
    scrollToSection('mapa');
  };

  const handleLocateMarketForProduct = (productName: string) => {
    // Extract base keyword like 'Arroz', 'Café', 'Feijão', 'Fubá', 'Mandioca'
    const cleanWord = productName.split(' ')[0] || productName;
    setTargetSearchQuery(cleanWord);
    scrollToSection('mapa');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans selection:bg-red-700 selection:text-white">
      {/* Skip to Content Link for Screen Readers & Keyboard Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-red-700 focus:text-white focus:font-semibold focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all"
      >
        Pular para o conteúdo principal
      </a>

      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={scrollToSection}
        onLocateClick={handleLocateClick}
      />

      <main 
        id="main-content" 
        tabIndex={-1} 
        role="main" 
        aria-label="Conteúdo principal da plataforma Terra & Alimento"
        className="flex-1 focus:outline-none"
      >
        {/* Hero Section with 4-Column KPI strip */}
        <Hero
          onExploreMarkets={() => scrollToSection('mapa')}
          onExploreRecipes={() => scrollToSection('receitas')}
          onExploreHistory={() => scrollToSection('historia')}
          onExploreBenefits={() => scrollToSection('beneficios')}
        />

        {/* Core Feature 1: Interactive Map & Market Locator */}
        <InteractiveMap
          targetMarketId={targetMarketId}
          targetSearchQuery={targetSearchQuery}
          onSelectRecipeProduct={handleLocateMarketForProduct}
        />

        {/* Core Feature 2: All Benefits of MST (Social, Ecological & Economic) */}
        <MSTBenefits
          onGoToMarkets={() => scrollToSection('mapa')}
          onGoToRecipes={() => scrollToSection('receitas')}
        />

        {/* Core Feature 3: Organic Recipes with MST Farm Products */}
        <RecipesSection
          onLocateMarketForProduct={handleLocateMarketForProduct}
        />

        {/* Core Feature 3: History & Positive Facts (Feeding Brazil) */}
        <HistoryAndImpact />

        {/* Core Feature 4: Support Movement & Popular Impact Calculator */}
        <SupportSection
          onGoToMarkets={() => scrollToSection('mapa')}
        />

        {/* Core Feature 5: Security & Human Rights Report Channel */}
        <ReportChannel />
      </main>

      {/* Institutional Clean Footer */}
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
