
import React from 'react';
import AnnouncementBar from './components/AnnouncementBar.tsx';
import ProductHero from './components/ProductHero.tsx';
import CountdownSection from './components/CountdownSection.tsx';
import OrderForm from './components/OrderForm.tsx';
import GalleryBenefits from './components/GalleryBenefits.tsx';
import WhyChooseUs from './components/WhyChooseUs.tsx';
import Testimonials from './components/Testimonials.tsx';
import FAQ from './components/FAQ.tsx';
import Footer from './components/Footer.tsx';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col scroll-smooth">
      <AnnouncementBar />
      
      <main className="flex-grow">
        <ProductHero />
        <CountdownSection />
        <OrderForm />
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
