
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
        <div className="rounded-2xl overflow-hidden shadow-xl bg-gray-100 aspect-[4/5] relative">
          <img 
            src={mainImage} 
            alt="Hoodie Elite Main" 
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            -50% OFF
          </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button 
              key={idx}
              onClick={() => setMainImage(img)}
              className={`w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                mainImage === img ? 'border-orange-500 scale-105' : 'border-transparent'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-sm font-medium text-gray-500 ml-2">(1,248 avis clients)</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Hoodie Elite™ : Le Confort Ultime en Style
          </h1>
        </div>

        <p className="text-lg text-gray-600 leading-relaxed">
          Découvrez la fusion parfaite entre <span className="font-bold text-gray-900">chaleur</span>, <span className="font-bold text-gray-900">douceur</span> et <span className="font-bold text-gray-900">durabilité</span>. Notre Hoodie Elite est conçu avec un coton premium brossé pour vous offrir un confort inégalé, que ce soit pour vos sorties ou vos moments de détente.
        </p>

        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-gray-700">
            <CheckCircle2 size={20} className="text-green-500" />
            <span>Coton Premium 400 GSM - Respirant & Chaud</span>
          </li>
          <li className="flex items-center gap-3 text-gray-700">
            <CheckCircle2 size={20} className="text-green-500" />
            <span>Coupe Moderne Relax - S'adapte à toutes les morphologies</span>
          </li>
          <li className="flex items-center gap-3 text-gray-700">
            <CheckCircle2 size={20} className="text-green-500" />
            <span>Capuche doublée & finitions haut de gamme</span>
          </li>
        </ul>

        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <div className="flex items-end gap-3 mb-4">
            <span className="text-4xl font-black text-gray-900">49.90 €</span>
            <span className="text-xl text-gray-400 line-through mb-1">99.80 €</span>
          </div>
          
          <a 
            href="#order-form" 
            className="w-full bg-orange-600 hover:bg-orange-700 text-white text-center py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-orange-200 transition-all active:scale-95"
          >
            <ShoppingBag size={22} />
            Commander maintenant
          </a>
          <p className="text-center text-xs text-gray-500 mt-3 font-medium">
             ⚡ Plus que 7 articles en stock !
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;
