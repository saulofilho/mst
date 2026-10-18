import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveMap } from './components/InteractiveMap';
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
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={scrollToSection}
        onLocateClick={handleLocateClick}
      />

      <main className="flex-1">
        {/* Hero Section with 4-Column KPI strip */}
        <Hero
          onExploreMarkets={() => scrollToSection('mapa')}
          onExploreRecipes={() => scrollToSection('receitas')}
          onExploreHistory={() => scrollToSection('historia')}
        />

        {/* Core Feature 1: Interactive Map & Market Locator */}
        <InteractiveMap
          targetMarketId={targetMarketId}
          targetSearchQuery={targetSearchQuery}
          onSelectRecipeProduct={handleLocateMarketForProduct}
        />

        {/* Core Feature 2: Organic Recipes with MST Farm Products */}
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
