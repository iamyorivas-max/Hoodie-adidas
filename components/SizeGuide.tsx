
import React from 'react';
import { Ruler, Info, ArrowRightLeft } from 'lucide-react';

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
          <p className="text-gray-600">Trouvez la coupe parfaite pour votre confort.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          {/* Schema Illustration */}
          <div className="lg:col-span-1 bg-gray-50 rounded-[32px] p-8 border border-gray-100 flex flex-col items-center">
            <div className="relative w-48 h-56 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center">
              {/* Simple Hoodie Silhouette Represented by Lines */}
              <div className="absolute inset-4 border-2 border-gray-400 rounded-t-3xl"></div>
              {/* Width Line */}
              <div className="absolute left-4 right-4 top-1/2 border-t-2 border-orange-500 flex justify-between items-center">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full -ml-0.5"></div>
                <span className="bg-orange-500 text-white text-[10px] px-1 font-bold rounded -mt-0.5">LARGEUR</span>
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full -mr-0.5"></div>
              </div>
              {/* Length Line */}
              <div className="absolute top-4 bottom-4 left-1/2 border-l-2 border-orange-500 flex flex-col justify-between items-center">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full -mt-0.5"></div>
                <span className="bg-orange-500 text-white text-[10px] px-1 font-bold rounded -ml-0.5 rotate-90 origin-left translate-x-3 translate-y-6">LONGUEUR</span>
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full -mb-0.5"></div>
              </div>
            </div>
            <p className="mt-6 text-xs text-center text-gray-400 font-medium italic">
              Mesurez un de vos hoodies à plat pour comparer.
            </p>
          </div>

          {/* Table */}
          <div className="lg:col-span-2 overflow-x-auto">
            <table className="w-full text-left border-collapse">
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
                <h4 className="font-bold text-blue-900 text-sm mb-1">Un doute sur la taille ?</h4>
                <p className="text-blue-800 text-xs leading-relaxed">
                  Le Hoodie Elite a une coupe <strong>Standard Fit</strong>. Si vous aimez le porter large (Oversized), nous vous recommandons de prendre <strong>une taille au-dessus</strong> de votre taille habituelle.
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
