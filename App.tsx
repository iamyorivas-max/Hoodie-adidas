
import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Star, 
  ChevronDown, 
  ShoppingBag, 
  User, 
  Phone, 
  MapPin, 
  Maximize, 
  Award, 
  Zap,
  Headphones
} from 'lucide-react';
import AnnouncementBar from './components/AnnouncementBar';
import ProductHero from './components/ProductHero';
import CountdownSection from './components/CountdownSection';
import OrderForm from './components/OrderForm';
import GalleryBenefits from './components/GalleryBenefits';
import WhyChooseUs from './components/WhyChooseUs';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

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
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default App;
