
import React, { useState } from 'react';
import { Star, ShoppingBag, CheckCircle2 } from 'lucide-react';

const ProductHero: React.FC = () => {
  const images = [
    'https://picsum.photos/seed/hoodie1/800/1000',
    'https://picsum.photos/seed/hoodie2/800/1000',
    'https://picsum.photos/seed/hoodie3/800/1000',
    'https://picsum.photos/seed/hoodie4/800/1000',
    'https://picsum.photos/seed/hoodie5/800/1000',
  ];

  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <section className="bg-white pt-8 pb-12 px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      {/* Multimedia Section */}
      <div className="flex flex-col gap-4">
        <div className="rounded-3xl overflow-hidden shadow-2xl bg-gray-100 aspect-[4/5] relative group">
          <img 
            src={mainImage} 
            alt="Hoodie Elite Main" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-6 right-6 bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-black shadow-xl animate-bounce">
            -50% OFF
          </div>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {images.map((img, idx) => (
            <button 
              key={idx}
              onClick={() => setMainImage(img)}
              className={`w-20 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                mainImage === img ? 'border-orange-500 scale-110 shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-8">
        <div>
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-sm font-bold text-gray-400 ml-2 tracking-wide uppercase">1,248 avis vérifiés</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight">
            Hoodie Elite™ <br/> <span className="text-orange-600">Confort Absolu.</span>
          </h1>
        </div>

        <p className="text-xl text-gray-600 leading-relaxed font-medium">
          Le hoodie qui redéfinit vos standards. Coton premium <span className="text-gray-900 font-bold">400 GSM</span> pour une douceur qui dure toute la vie.
        </p>

        <div className="space-y-4">
          {[
            "Coton Premium Brossé - Ultra Doux",
            "Coupe Moderne & Unisexe",
            "Garantie Satisfait ou Échangé"
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-3 text-gray-800 font-bold">
              <div className="bg-green-100 p-1 rounded-full text-green-600">
                <CheckCircle2 size={18} />
              </div>
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* PRICE CARD - CENTERED & ANIMATED */}
        <div className="bg-gray-50 p-8 rounded-[40px] border border-gray-100 shadow-inner text-center">
          <div className="flex flex-col items-center justify-center gap-1 mb-8">
             <div className="flex items-center gap-4 animate-pulse">
                <span className="text-6xl font-black text-gray-900 tracking-tighter">299 DH</span>
                <span className="text-3xl text-red-600 line-through font-bold opacity-80 decoration-[3px]">599 DH</span>
             </div>
             <p className="text-green-600 font-black text-sm uppercase tracking-widest mt-2">Économisez 300 DH aujourd'hui</p>
          </div>
          
          <a 
            href="#order-form" 
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 rounded-2xl font-black text-2xl flex items-center justify-center gap-4 shadow-2xl shadow-orange-200 transition-all active:scale-95 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
            <ShoppingBag size={28} />
            Commander maintenant
          </a>
          
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
            <p className="text-red-600 font-black text-sm uppercase tracking-tighter">
              Attention : Plus que 7 articles en stock !
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default ProductHero;
