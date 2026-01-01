
import React, { useState } from 'react';
import { Ruler, CheckCircle, Info, ChevronRight } from 'lucide-react';

interface SizeData {
  label: string;
  width: string;
  length: string;
  recom: string;
}

const SizeGuide: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string>('M');

  const sizeData: Record<string, SizeData> = {
    'S': { label: 'S', width: '52 cm', length: '68 cm', recom: 'Moins de 65kg / 1m70' },
    'M': { label: 'M', width: '54 cm', length: '70 cm', recom: '65 - 75kg / 1m75' },
    'L': { label: 'L', width: '56 cm', length: '72 cm', recom: '75 - 85kg / 1m80' },
    'XL': { label: 'XL', width: '58 cm', length: '74 cm', recom: '85 - 95kg / 1m85' },
    'XXL': { label: 'XXL', width: '60 cm', length: '76 cm', recom: 'Plus de 95kg / 1m90+' },
  };

  const current = sizeData[selectedSize];

  return (
    <section className="py-24 px-4 md:px-8 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest mb-4">
             <Ruler size={14} />
             Trouvez votre taille parfaite
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Guide des Tailles Interactif</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Choisissez votre taille pour visualiser les dimensions précises sur le vêtement.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Size Selector & Recom */}
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {Object.keys(sizeData).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl font-black text-xl transition-all flex items-center justify-center border-4 ${
                    selectedSize === size 
                    ? 'bg-gray-900 text-white border-orange-500 scale-110 shadow-xl' 
                    : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                  <Info size={60} className="text-gray-900" />
               </div>
               <h3 className="text-xs font-black text-orange-600 uppercase tracking-[0.2em] mb-4">Recommandation</h3>
               <p className="text-2xl font-black text-gray-900 mb-2">{current.recom}</p>
               <p className="text-gray-500 text-sm leading-relaxed">
                  Basé sur une coupe <span className="text-gray-900 font-bold underline decoration-orange-500">Standard Fit</span>. Pour un effet plus large, prenez la taille supérieure.
               </p>
               <div className="mt-6 flex items-center gap-2 text-green-600 font-bold text-sm">
                  <CheckCircle size={18} />
                  <span>En stock et prêt à expédier</span>
               </div>
            </div>
          </div>

          {/* RIGHT: Visual Hoodie Vector */}
          <div className="lg:col-span-7 flex flex-col items-center order-1 lg:order-2">
            <div className="relative w-full max-w-[400px] aspect-square">
              {/* Main SVG Vector */}
              <svg viewBox="0 0 100 100" className="w-full h-full text-gray-100 fill-current drop-shadow-2xl">
                <path d="M50 10 C42 10 38 12 33 15 L28 18 C24 20 20 22 15 22 L5 22 C3 22 2 23 2 25 L1 50 C1 55 3 58 8 58 L12 58 L12 90 C12 94 15 97 19 97 L81 97 C85 97 88 94 88 90 L88 58 L92 58 C97 58 99 55 99 50 L98 25 C98 23 97 22 95 22 L85 22 C80 22 76 20 72 18 L67 15 C62 12 58 10 50 10 Z" />
                {/* Details like pocket and hood */}
                <path d="M30 65 Q50 60 70 65 L72 85 Q50 90 28 85 Z" fill="white" opacity="0.3" />
                <path d="M40 10 Q50 25 60 10" fill="none" stroke="white" strokeWidth="0.5" opacity="0.5" />
              </svg>

              {/* WIDTH TOOLTIP */}
              <div className="absolute top-[50%] left-0 right-0 flex justify-center">
                 <div className="relative w-[70%] h-[2px] bg-orange-500/30 flex items-center justify-center">
                    <div className="absolute left-0 w-2 h-2 rounded-full bg-orange-500"></div>
                    <div className="absolute right-0 w-2 h-2 rounded-full bg-orange-500"></div>
                    <div className="bg-orange-600 text-white px-3 py-1.5 rounded-xl font-black text-sm shadow-lg transform -translate-y-0 transition-all duration-500 flex items-center gap-2">
                       <span className="text-[10px] opacity-70">LARGEUR:</span>
                       {current.width}
                    </div>
                 </div>
              </div>

              {/* LENGTH TOOLTIP */}
              <div className="absolute inset-y-[15%] right-[15%] flex flex-col items-center justify-center">
                 <div className="relative w-[2px] h-[75%] bg-blue-500/30 flex items-center justify-center">
                    <div className="absolute top-0 w-2 h-2 rounded-full bg-blue-500"></div>
                    <div className="absolute bottom-0 w-2 h-2 rounded-full bg-blue-500"></div>
                    <div className="bg-blue-600 text-white px-3 py-1.5 rounded-xl font-black text-sm shadow-lg transform translate-x-12 transition-all duration-500 flex items-center gap-2 whitespace-nowrap">
                       <span className="text-[10px] opacity-70">LONGUEUR:</span>
                       {current.length}
                    </div>
                 </div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-6 text-gray-400 font-bold text-xs uppercase tracking-widest">
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  Largeur (Aisselle à aisselle)
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  Longueur (Épaule au bas)
               </div>
            </div>
          </div>
        </div>
        
        {/* Trust Badge footer */}
        <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
           <div className="flex items-center gap-4">
              <div className="bg-orange-50 p-3 rounded-2xl text-orange-600 font-black">14j</div>
              <p className="text-sm font-bold text-gray-600">Retours et échanges <br/> gratuits sous 14 jours</p>
           </div>
           <div className="flex items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                 <CheckCircle size={24} />
              </div>
              <p className="text-sm font-bold text-gray-600">Taille standard <br/> marocaine (EU)</p>
           </div>
        </div>
      </div>
    </section>
  );
};

export default SizeGuide;
