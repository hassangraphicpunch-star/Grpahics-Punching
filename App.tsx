import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { Portfolio } from './components/Portfolio';
import { StitchSimulator } from './components/StitchSimulator';
import { ThreadChartTool } from './components/ThreadChartTool';
import { OrderTracker } from './components/OrderTracker';
import { PricingSection } from './components/PricingSection';
import { Testimonials } from './components/Testimonials';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InstantQuoteModal } from './components/InstantQuoteModal';
import { ServiceCategory } from './types';
import { Zap, Sparkles, Phone, MessageSquare } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [quoteInitialService, setQuoteInitialService] = useState<ServiceCategory>('digitizing');

  const handleOpenQuoteModal = (service?: string) => {
    if (service === 'vector' || service === 'patches' || service === 'digitizing') {
      setQuoteInitialService(service as ServiceCategory);
    } else {
      setQuoteInitialService('digitizing');
    }
    setIsQuoteModalOpen(true);
  };

  const handleOpenTrackModal = () => {
    setActiveTab('tracker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-red-600 selection:text-white">
      
      {/* Sticky Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuoteModal={handleOpenQuoteModal}
        onOpenTrackModal={handleOpenTrackModal}
      />

      {/* Main Page Views */}
      <main>
        {activeTab === 'home' && (
          <>
            <Hero onOpenQuoteModal={handleOpenQuoteModal} setActiveTab={setActiveTab} />
            <ServicesSection onOpenQuoteModal={handleOpenQuoteModal} />
            <Portfolio onOpenQuoteModal={handleOpenQuoteModal} />
            <StitchSimulator onOpenQuoteModal={handleOpenQuoteModal} />
            <PricingSection onOpenQuoteModal={handleOpenQuoteModal} />
            <ThreadChartTool />
            <OrderTracker />
            <Testimonials />
            <FAQSection />
            <ContactSection />
          </>
        )}

        {activeTab === 'services' && (
          <>
            <ServicesSection onOpenQuoteModal={handleOpenQuoteModal} />
            <PricingSection onOpenQuoteModal={handleOpenQuoteModal} />
            <Testimonials />
          </>
        )}

        {activeTab === 'portfolio' && (
          <>
            <Portfolio onOpenQuoteModal={handleOpenQuoteModal} />
            <Testimonials />
          </>
        )}

        {activeTab === 'pricing' && (
          <>
            <PricingSection onOpenQuoteModal={handleOpenQuoteModal} />
            <FAQSection />
          </>
        )}

        {activeTab === 'simulator' && (
          <>
            <StitchSimulator onOpenQuoteModal={handleOpenQuoteModal} />
            <Portfolio onOpenQuoteModal={handleOpenQuoteModal} />
          </>
        )}

        {activeTab === 'thread-chart' && (
          <>
            <ThreadChartTool />
            <ServicesSection onOpenQuoteModal={handleOpenQuoteModal} />
          </>
        )}

        {activeTab === 'tracker' && (
          <>
            <OrderTracker />
            <FAQSection />
          </>
        )}

        {activeTab === 'faq' && <FAQSection />}

        {activeTab === 'contact' && <ContactSection />}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} onOpenQuoteModal={() => handleOpenQuoteModal()} />

      {/* Instant Quote & Order Modal Overlay */}
      <InstantQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialService={quoteInitialService}
      />

      {/* Floating Bottom Quick Quote Launcher */}
      <div className="fixed bottom-4 right-4 z-30 flex items-center gap-2">
        <a
          href="https://wa.me/18005557862"
          target="_blank"
          rel="noreferrer"
          className="p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center border border-emerald-400"
          title="Chat on WhatsApp"
        >
          <MessageSquare className="w-5 h-5" />
        </a>

        <button
          onClick={() => handleOpenQuoteModal()}
          className="px-4 py-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider rounded-full shadow-2xl border border-red-400/40 hover:scale-105 transition-all flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-amber-200" />
          <span className="hidden sm:inline">Get Instant Quote</span>
          <span className="bg-black/30 px-2 py-0.5 rounded-full text-[10px] text-amber-200">
            $10 Flat
          </span>
        </button>
      </div>

    </div>
  );
}
