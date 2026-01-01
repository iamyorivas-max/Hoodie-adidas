
import React, { useState } from 'react';
import { Ruler, CheckCircle, Info, ChevronRight, ArrowRightLeft, ArrowUpDown } from 'lucide-react';

interface SizeData {
  label: string;
  width: string;
  length: string;
  recom: string;
}

const SizeGuide: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string>('M');

  const sizeData: Record<string, SizeData> = {
    'S': { label: 'S', width: '52', length: '68', recom: 'Moins de 65kg / 1m70' },
    'M': { label: 'M', width: '54', length: '70', recom: '65 - 75kg / 1m75' },
    'L': { label: 'L', width: '56', length: '72', recom: '75 - 85kg / 1m80' },
    'XL': { label: 'XL', width: '58', length: '74', recom: '85 - 95kg / 1m85' },
    'XXL': { label: 'XXL', width: '60', length: '76', recom: 'Plus de 95kg / 1m90+' },
  };

  const current = sizeData[selectedSize];

  return (
    <section className="py-16 px-4 md:px-8 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest mb-4">
             <Ruler size={14} />
             Vérifiez votre taille
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-3 tracking-tight">Guide de Taille</h2>
          <p className="text-gray-500 text-sm md:text-base">Cliquez sur une taille pour voir les mesures correspondantes.</p>
        </div>

        <div className="bg-gray-50 rounded-[40px] p-6 md:p-12 border border-gray-100 shadow-sm">
          {/* Size Selector - Very accessible on Mobile */}
          <div className="flex justify-center gap-2 md:gap-4 mb-10">
            {Object.keys(sizeData).map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`flex-1 max-w-[70px] aspect-square rounded-2xl font-black text-lg transition-all flex items-center justify-center border-2 ${
                  selectedSize === size 
                  ? 'bg-gray-900 text-white border-orange-500 shadow-lg scale-110' 
                  : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Visual Part */}
            <div className="relative flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[280px] md:max-w-[320px] aspect-square">
                {/* Hoodie SVG Vector Simplified */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-gray-200 fill-current drop-shadow-lg">
                  <path d="M50 12 C42 12 38 14 33 17 L28 20 C24 22 20 24 15 24 L5 24 C3 24 2 25 2 27 L1 50 C1 55 3 58 8 58 L12 58 L12 90 C12 94 15 97 19 97 L81 97 C85 97 88 94 88 90 L88 58 L92 58 C97 58 99 55 99 50 L98 25 C98 23 97 22 95 22 L85 22 C80 22 76 20 72 18 L67 15 C62 12 58 12 50 12 Z" />
                  <path d="M35 12 Q50 25 65 12" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
                </svg>

                {/* Vertical Length Line */}
                <div className="absolute top-[15%] bottom-[5%] right-[10%] w-[2px] bg-blue-500/40 flex items-center justify-center">
                   <div className="absolute top-0 w-2 h-2 rounded-full bg-blue-500"></div>
                   <div className="absolute bottom-0 w-2 h-2 rounded-full bg-blue-500"></div>
                </div>

                {/* Horizontal Width Line */}
                <div className="absolute top-[50%] left-[10%] right-[10%] h-[2px] bg-orange-500/40 flex items-center justify-center">
                   <div className="absolute left-0 w-2 h-2 rounded-full bg-orange-500"></div>
                   <div className="absolute right-0 w-2 h-2 rounded-full bg-orange-500"></div>
                </div>
              </div>
            </div>

            {/* Info Part */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-3">
                    <ArrowRightLeft size={20} />
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Largeur</span>
                  <span className="text-3xl font-black text-gray-900">{current.width} <small className="text-sm font-bold opacity-50">cm</small></span>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                    <ArrowUpDown size={20} />
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Longueur</span>
                  <span className="text-3xl font-black text-gray-900">{current.length} <small className="text-sm font-bold opacity-50">cm</small></span>
                </div>
              </div>

              <div className="bg-gray-900 text-white p-6 rounded-[32px] relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-orange-500 font-black text-[10px] uppercase tracking-widest mb-2">Conseil Morphologie</h4>
                  <p className="text-xl font-bold mb-1">{current.recom}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Si vous êtes entre deux tailles, nous recommandons de choisir la plus grande pour un confort optimal.
                  </p>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-10">
                   <CheckCircle size={100} />
                </div>
              </div>

              <div className="flex items-center gap-3 bg-green-50 text-green-700 p-4 rounded-2xl border border-green-100 text-sm font-bold">
                 <CheckCircle size={18} />
                 <span>Taille standard EU/MA - Fidèle à la réalité</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              Largeur : Mesure de sous l'aisselle à sous l'aisselle
           </div>
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              Longueur : Mesure du haut de l'épaule au bas
           </div>
        </div>
      </div>
    </section>
  );
};

export default SizeGuide;
