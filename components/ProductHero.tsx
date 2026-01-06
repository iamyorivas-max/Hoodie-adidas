
import React, { useState } from 'react';
import { Star, ShoppingBag, CheckCircle2 } from 'lucide-react';

const ProductHero: React.FC = () => {
  const images = [
    'https://i.ibb.co/yc2BVzTZ/Whats-App-Image-2026-01-05-at-16-01-46.jpg',
    'https://i.ibb.co/JFsFmFvF/Whats-App-Image-2026-01-05-at-16-01-38.jpg',
    'https://i.ibb.co/NvvsYzY/Whats-App-Image-2026-01-05-at-16-01-30.jpg',
    'https://i.ibb.co/xt345WGj/Whats-App-Image-2026-01-05-at-16-01-22.jpg',
    'https://i.ibb.co/jdfnBtR/Whats-App-Image-2026-01-05-at-16-01-15.jpg',
  ];

  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <section className="bg-white pt-6 pb-12 px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Multimedia Section */}
      <div className="flex flex-col gap-4">
        <div className="rounded-3xl overflow-hidden shadow-2xl bg-gray-100 aspect-[4/5] relative group">
          <img 
            src={mainImage} 
            alt="Adidas fleece hoodie unisexe" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1.5 rounded-full text-xs font-black shadow-xl animate-bounce">
            -50% OFF
          </div>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button 
              key={idx}
              onClick={() => setMainImage(img)}
              className={`w-16 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                mainImage === img ? 'border-orange-500 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-6 md:gap-8">
        <div>
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-[10px] font-bold text-gray-400 ml-2 tracking-widest uppercase">1,248 avis vérifiés</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">
            Adidas fleece hoodie <br/> <span className="text-orange-600">unisexe</span>
          </h1>
        </div>

        <p className="text-lg text-gray-600 leading-relaxed font-medium">
          Le hoodie iconique qui redéfinit vos standards. Coton premium brossé pour une douceur et une chaleur inégalées.
        </p>

        <div className="space-y-3">
          {[
            "Coton Premium Brossé - Ultra Doux",
            "Coupe Moderne & Unisexe",
            "Garantie Satisfait ou Échangé"
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-3 text-gray-800 font-bold text-sm">
              <div className="bg-green-100 p-1 rounded-full text-green-600">
                <CheckCircle2 size={16} />
              </div>
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* PRICE CARD */}
        <div className="bg-gray-50 p-5 md:p-7 rounded-[32px] border border-gray-100 shadow-inner text-center max-w-md mx-auto lg:mx-0 w-full">
          <div className="flex flex-col items-center justify-center gap-1 mb-5">
             <div className="flex items-center gap-3">
                <span className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">349 DH</span>
                <span className="text-xl md:text-2xl text-red-600 line-through font-bold opacity-70 decoration-[2px]">699 DH</span>
             </div>
             <p className="text-green-600 font-black text-[10px] uppercase tracking-[0.15em] mt-1">Économisez 350 DH aujourd'hui</p>
          </div>
          
          <a 
            href="#order-form" 
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-orange-100 transition-all active:scale-95 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
            <ShoppingBag size={22} />
            Commander maintenant
          </a>
          
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            <p className="text-red-600 font-black text-[10px] uppercase tracking-tight">
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