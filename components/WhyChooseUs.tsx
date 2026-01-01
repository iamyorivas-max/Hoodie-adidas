
import React from 'react';
import { Award, Zap, Headphones, ShieldCheck } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <Award className="text-orange-600" size={32} />,
      title: "Qualité Premium",
      desc: "Chaque hoodie est inspecté à la main pour garantir zéro défaut de fabrication."
    },
    {
      icon: <Zap className="text-orange-600" size={32} />,
      title: "Livraison Rapide",
      desc: "Recevez votre colis chez vous en 48h à 72h partout en France."
    },
    {
      icon: <Headphones className="text-orange-600" size={32} />,
      title: "Service Client 24/7",
      desc: "Une question ? Notre équipe réactive est disponible pour vous aider à tout moment."
    },
    {
      icon: <ShieldCheck className="text-orange-600" size={32} />,
      title: "Satisfaction Garantie",
      desc: "Pas satisfait ? Nous vous échangeons le produit sans frais sous 14 jours."
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="mb-6 p-5 rounded-3xl bg-gray-800 transition-all group-hover:bg-gray-700 group-hover:-translate-y-2">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
