
import React from 'react';
import { Ruler, Info } from 'lucide-react';

const SizeGuide: React.FC = () => {
  const sizes = [
    { label: 'S', width: '52 cm', length: '68 cm', sleeve: '61 cm' },
    { label: 'M', width: '54 cm', length: '70 cm', sleeve: '62 cm' },
    { label: 'L', width: '56 cm', length: '72 cm', sleeve: '63 cm' },
    { label: 'XL', width: '58 cm', length: '74 cm', sleeve: '64 cm' },
    { label: 'XXL', width: '60 cm', length: '76 cm', sleeve: '65 cm' },
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 mb-4">
            <Ruler size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Guide des Tailles</h2>
          <p className="text-gray-600">Prenez vos mesures pour commander en toute confiance.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          {/* Hoodie Vector Illustration */}
          <div className="lg:col-span-1 bg-gray-50 rounded-[32px] p-8 border border-gray-100 flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-[240px]">
              {/* Hoodie SVG Vector */}
              <svg viewBox="0 0 100 100" className="w-full h-full text-gray-200 fill-current stroke-gray-300 stroke-[0.5]">
                <path d="M50 10 C45 10 40 12 35 15 L32 18 C28 20 25 22 22 22 L10 22 C8 22 7 23 7 25 L5 45 C4 50 6 52 10 52 L18 52 L18 85 C18 88 20 90 23 90 L77 90 C80 90 82 88 82 85 L82 52 L90 52 C94 52 96 50 95 45 L93 25 C93 23 92 22 90 22 L78 22 C75 22 72 20 68 18 L65 15 C60 12 55 10 50 10 Z M40 25 L60 25 L65 40 L35 40 Z" />
                {/* Pocket and hood details */}
                <path d="M35 65 L65 65 C68 65 70 67 70 70 L70 82 C70 84 68 85 65 85 L35 85 C32 85 30 84 30 82 L30 70 C30 67 32 65 35 65 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
                <path d="M50 15 C45 15 42 18 40 25 M50 15 C55 15 58 18 60 25" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
              </svg>

              {/* WIDTH Measurement Line */}
              <div className="absolute top-[48%] left-[18%] right-[18%] flex items-center justify-between">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                <div className="flex-grow h-[2px] bg-orange-500 relative flex justify-center">
                   <span className="absolute -top-6 bg-orange-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase">Largeur</span>
                </div>
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
              </div>

              {/* LENGTH Measurement Line */}
              <div className="absolute top-[18%] bottom-[10%] left-[50%] flex flex-col items-center justify-between">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                <div className="flex-grow w-[2px] bg-orange-500 relative flex items-center">
                   <span className="absolute -left-12 rotate-[-90deg] bg-orange-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase whitespace-nowrap">Longueur</span>
                </div>
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
              </div>

              {/* SLEEVE Measurement Line */}
              <div className="absolute top-[22%] left-[8%] w-[25%] h-[2px] bg-blue-500 rotate-[45deg] origin-top-left flex items-center justify-between">
                <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                <div className="flex-grow relative flex justify-center">
                  <span className="absolute -top-6 -rotate-[45deg] bg-blue-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase">Manches</span>
                </div>
                <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
              </div>
            </div>
            <p className="mt-8 text-xs text-center text-gray-400 font-medium italic leading-tight">
              Posez votre hoodie à plat et prenez les mesures indiquées.
            </p>
          </div>

          {/* Table */}
          <div className="lg:col-span-2 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[320px]">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="py-4 px-2 text-sm font-black text-gray-400 uppercase tracking-widest">Taille</th>
                  <th className="py-4 px-2 text-sm font-black text-gray-400 uppercase tracking-widest text-center">Largeur</th>
                  <th className="py-4 px-2 text-sm font-black text-gray-400 uppercase tracking-widest text-center">Longueur</th>
                  <th className="py-4 px-2 text-sm font-black text-gray-400 uppercase tracking-widest text-center">Manches</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((size) => (
                  <tr key={size.label} className="border-b border-gray-50 hover:bg-orange-50 transition-colors group">
                    <td className="py-4 px-2">
                      <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-900 text-white font-black group-hover:bg-orange-600 transition-colors">
                        {size.label}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-center font-bold text-gray-700">{size.width}</td>
                    <td className="py-4 px-2 text-center font-bold text-gray-700">{size.length}</td>
                    <td className="py-4 px-2 text-center font-bold text-gray-700">{size.sleeve}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-8 bg-blue-50 rounded-2xl p-5 border border-blue-100 flex gap-4">
              <div className="shrink-0 text-blue-500 mt-1">
                <Info size={20} />
              </div>
              <div>
                <h4 className="font-bold text-blue-900 text-sm mb-1">Besoin d'aide ?</h4>
                <p className="text-blue-800 text-xs leading-relaxed">
                  Notre Hoodie Elite a une coupe <strong>Standard Fit</strong>. Pour un look <strong>Oversized</strong>, nous conseillons de choisir <strong>une taille au-dessus</strong> de votre taille habituelle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SizeGuide;
