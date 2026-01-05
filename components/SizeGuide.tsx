
import React from 'react';
import { Ruler, Info } from 'lucide-react';

const SizeGuide: React.FC = () => {
  const sizes = [
    { label: 'S', width: '52', length: '68', weight: ' < 65kg', height: '1m70' },
    { label: 'M', width: '54', length: '70', weight: '65-75kg', height: '1m75' },
    { label: 'L', width: '56', length: '72', weight: '75-85kg', height: '1m80' },
    { label: 'XL', width: '58', length: '74', weight: '85-95kg', height: '1m85' },
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-orange-100 text-orange-600 mb-3">
            <Ruler size={20} className="md:w-6 md:h-6" />
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-1">Guide des Tailles</h2>
          <p className="text-gray-500 text-sm md:text-base font-medium">Mesures précises pour votre Hoodie Elite™</p>
        </div>

        <div className="overflow-hidden rounded-[24px] md:rounded-[32px] border border-gray-100 shadow-lg shadow-gray-100/50">
          <div className="w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-4 px-3 md:py-6 md:px-8 text-[9px] md:text-[11px] font-black text-gray-400 uppercase tracking-wider">Taille</th>
                  <th className="py-4 px-2 md:py-6 md:px-6 text-[9px] md:text-[11px] font-black text-gray-400 uppercase tracking-wider text-center md:text-left">Dimensions</th>
                  <th className="py-4 px-2 md:py-6 md:px-8 text-[9px] md:text-[11px] font-black text-gray-400 uppercase tracking-wider text-right md:text-left">Morphologie</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {sizes.map((size) => (
                  <tr key={size.label} className="group hover:bg-orange-50/50 transition-colors">
                    <td className="py-3 px-3 md:py-6 md:px-8">
                      <span className="inline-flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gray-900 text-white font-black text-xs md:text-lg group-hover:bg-orange-600 transition-colors">
                        {size.label}
                      </span>
                    </td>
                    <td className="py-3 px-2 md:py-6 md:px-6">
                      <div className="flex flex-col md:flex-row md:gap-6 items-center md:items-start text-center md:text-left">
                        <div className="flex flex-col">
                          <span className="text-sm md:text-xl font-black text-gray-900">{size.width}cm</span>
                          <span className="hidden md:block text-[10px] text-gray-400 font-bold uppercase">Largeur</span>
                        </div>
                        <div className="h-px w-4 bg-gray-200 my-1 md:hidden"></div>
                        <div className="flex flex-col">
                          <span className="text-sm md:text-xl font-black text-gray-900">{size.length}cm</span>
                          <span className="hidden md:block text-[10px] text-gray-400 font-bold uppercase">Longueur</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 md:py-6 md:px-8 text-right md:text-left">
                      <div className="flex flex-col">
                        <span className="text-xs md:text-sm font-black text-gray-800">{size.weight}</span>
                        <span className="text-[10px] md:text-xs text-gray-500 font-medium">~ {size.height}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div className="flex gap-3 p-4 md:p-6 rounded-2xl md:rounded-3xl bg-blue-50 border border-blue-100">
            <Info className="text-blue-500 shrink-0" size={18} />
            <p className="text-[11px] md:text-sm text-blue-900 leading-relaxed">
              <strong>Conseil Style :</strong> Pour un look <strong>"Oversize"</strong>, prenez <strong>une taille au-dessus</strong> de votre taille habituelle.
            </p>
          </div>
          <div className="flex gap-3 p-4 md:p-6 rounded-2xl md:rounded-3xl bg-gray-50 border border-gray-100">
            <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-orange-500 shrink-0"></div>
            <p className="text-[11px] md:text-sm text-gray-600 leading-relaxed">
              Mesures à plat (marge de 1-2 cm possible). Convient aux hommes et aux femmes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SizeGuide;
