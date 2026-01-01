
import React from 'react';
import { Ruler, Info } from 'lucide-react';

const SizeGuide: React.FC = () => {
  const sizes = [
    { label: 'S', width: '52 cm', length: '68 cm', weight: 'Moins de 65kg', height: '1m70' },
    { label: 'M', width: '54 cm', length: '70 cm', weight: '65 - 75kg', height: '1m75' },
    { label: 'L', width: '56 cm', length: '72 cm', weight: '75 - 85kg', height: '1m80' },
    { label: 'XL', width: '58 cm', length: '74 cm', weight: '85 - 95kg', height: '1m85' },
    { label: 'XXL', width: '60 cm', length: '76 cm', weight: 'Plus de 95kg', height: '1m90+' },
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 mb-4">
            <Ruler size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Guide des Tailles</h2>
          <p className="text-gray-500 font-medium">Mesures précises pour votre Hoodie Elite™</p>
        </div>

        <div className="overflow-hidden rounded-[32px] border border-gray-100 shadow-xl shadow-gray-100/50">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-6 px-8 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Taille</th>
                  <th className="py-6 px-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Largeur (cm)</th>
                  <th className="py-6 px-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Longueur (cm)</th>
                  <th className="py-6 px-8 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Morphologie idéale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {sizes.map((size) => (
                  <tr key={size.label} className="group hover:bg-orange-50/50 transition-colors">
                    <td className="py-6 px-8">
                      <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-900 text-white font-black text-lg group-hover:bg-orange-600 transition-colors">
                        {size.label}
                      </span>
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex flex-col">
                        <span className="text-xl font-black text-gray-900">{size.width}</span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Aisselle à aisselle</span>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex flex-col">
                        <span className="text-xl font-black text-gray-900">{size.length}</span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Épaule au bas</span>
                      </div>
                    </td>
                    <td className="py-6 px-8">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-gray-800">{size.weight}</span>
                        <span className="text-xs text-gray-500 font-medium">Taille env. {size.height}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-4 p-6 rounded-3xl bg-blue-50 border border-blue-100">
            <Info className="text-blue-500 shrink-0" size={20} />
            <p className="text-sm text-blue-900 leading-relaxed">
              <strong>Conseil Style :</strong> Nos hoodies taillent normalement. Pour un look <strong>"Oversize"</strong> tendance, nous vous conseillons de commander <strong>une taille au-dessus</strong>.
            </p>
          </div>
          <div className="flex gap-4 p-6 rounded-3xl bg-gray-50 border border-gray-100">
            <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 shrink-0"></div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Les mesures sont prises à plat. Une marge d'erreur de 1 à 2 cm peut exister selon la fabrication.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SizeGuide;
