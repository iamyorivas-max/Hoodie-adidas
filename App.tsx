
import React, { useState } from 'react';
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

  const handleOrderSuccess = (details: OrderDetails) => {
    setSubmittedOrder(details);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetView = () => {
    setSubmittedOrder(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submittedOrder) {
    return (
      <div className="min-h-screen flex flex-col scroll-smooth">
        <AnnouncementBar />
        <main className="flex-grow">
          <ThankYouPage order={submittedOrder} onBack={resetView} />
        </main>
        <Footer />
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
    </div>
  );
};

export default App;
