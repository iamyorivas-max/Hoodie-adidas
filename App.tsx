
import React, { useState, useEffect } from 'react';
import AnnouncementBar from './components/AnnouncementBar.tsx';
import ProductHero from './components/ProductHero.tsx';
import CountdownSection from './components/CountdownSection.tsx';
import OrderForm from './components/OrderForm.tsx';
import SizeGuide from './components/SizeGuide.tsx';
import GalleryBenefits from './components/GalleryBenefits.tsx';
import WhyChooseUs from './components/WhyChooseUs.tsx';
import Testimonials from './components/Testimonials.tsx';
import FAQ from './components/FAQ.tsx';
import Footer from './components/Footer.tsx';
import ThankYouPage from './components/ThankYouPage.tsx';
import { MessageCircle } from 'lucide-react';

export interface OrderDetails {
  fullname: string;
  phone: string;
  city: string;
  address: string;
  offer: string;
  price: string;
  items: string;
}

const App: React.FC = () => {
  const [submittedOrder, setSubmittedOrder] = useState<OrderDetails | null>(null);

  // Synchronise l'état de l'application avec l'URL pour le tracking et le bouton retour
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      if (!params.has('status')) {
        setSubmittedOrder(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOrderSuccess = (details: OrderDetails) => {
    setSubmittedOrder(details);
    
    // Changement d'URL pour le tracking (ex: ?status=merci)
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?status=merci';
    window.history.pushState({ path: newUrl }, '', newUrl);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetView = () => {
    setSubmittedOrder(null);
    
    // Retour à l'URL d'origine
    const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.pushState({ path: cleanUrl }, '', cleanUrl);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const WhatsAppFloating = () => (
    <a 
      href="https://wa.me/212676809781" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-90 group"
      aria-label="Contactez-nous sur WhatsApp"
    >
      <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-25 group-hover:hidden"></div>
      <MessageCircle size={32} className="relative z-10" />
    </a>
  );

  if (submittedOrder) {
    return (
      <div className="min-h-screen flex flex-col scroll-smooth">
        <AnnouncementBar />
        <main className="flex-grow">
          <ThankYouPage order={submittedOrder} onBack={resetView} />
        </main>
        <Footer />
        <WhatsAppFloating />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col scroll-smooth">
      <AnnouncementBar />
      
      <main className="flex-grow">
        <ProductHero />
        <CountdownSection />
        <OrderForm onOrderSuccess={handleOrderSuccess} />
        <SizeGuide />
        <GalleryBenefits />
        <WhyChooseUs />
        <Testimonials />
        <FAQ />
      </main>

      <Footer />
      <WhatsAppFloating />
    </div>
  );
};

export default App;
