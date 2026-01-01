
import React from 'react';

const GalleryBenefits: React.FC = () => {
  const benefits = [
    {
      title: "Confort Absolu",
      description: "Tissu ultra-doux en coton brossé pour une sensation de bien-être toute la journée.",
      img: "https://picsum.photos/seed/hoodie_benefit1/600/400"
    },
    {
      title: "Qualité Supérieure",
      description: "Coutures renforcées et tissu anti-boulochage conçu pour durer des années.",
      img: "https://picsum.photos/seed/hoodie_benefit2/600/400"
    },
    {
      title: "Style Intemporel",
      description: "Un design épuré qui se marie parfaitement avec n'importe quelle tenue.",
      img: "https://picsum.photos/seed/hoodie_benefit3/600/400"
    },
    {
      title: "Durabilité Maximale",
      description: "Résiste aux lavages fréquents sans perdre sa forme ni sa couleur d'origine.",
      img: "https://picsum.photos/seed/hoodie_benefit4/600/400"
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Pourquoi tout le monde l'adore</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Plus qu'un simple vêtement, c'est une expérience de confort que vous ne voudrez plus quitter.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="group overflow-hidden rounded-3xl bg-gray-50 hover:bg-white border border-gray-100 transition-all hover:shadow-2xl">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={benefit.img} 
                  alt={benefit.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryBenefits;
