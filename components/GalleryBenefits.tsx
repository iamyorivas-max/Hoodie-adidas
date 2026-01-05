
import React from 'react';

const GalleryBenefits: React.FC = () => {
  const benefits = [
    {
      title: "Confort Absolu",
      description: "Tissu ultra-doux en coton brossé pour une sensation de bien-être toute la journée.",
      img: "https://i.ibb.co/8D90GhgW/Whats-App-Image-2026-01-05-at-14-34-33-1.jpg"
    },
    {
      title: "Qualité Supérieure",
      description: "Coutures renforcées et tissu anti-boulochage conçu pour durer des années.",
      img: "https://i.ibb.co/WpxNyShR/Whats-App-Image-2026-01-05-at-14-40-13.jpg"
    },
    {
      title: "Style Intemporel",
      description: "Un design épuré qui se marie parfaitement avec n'importe quelle tenue.",
      img: "https://i.ibb.co/7NKVQbk6/Whats-App-Image-2026-01-05-at-14-34-33.jpg"
    },
    {
      title: "Durabilité Maximale",
      description: "Résiste aux lavages fréquents sans perdre sa forme ni sa couleur d'origine.",
      img: "https://i.ibb.co/nN3ZQ41x/Whats-App-Image-2026-01-05-at-14-36-25.jpg"
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Pourquoi tout le monde l'adore</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Plus qu'un simple vêtement, c'est une expérience de confort que vous ne voudrez plus quitter.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="group overflow-hidden rounded-[32px] bg-gray-50 hover:bg-white border border-gray-100 transition-all hover:shadow-2xl hover:-translate-y-1">
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={benefit.img} 
                  alt={benefit.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
