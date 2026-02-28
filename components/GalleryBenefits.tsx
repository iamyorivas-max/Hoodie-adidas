
import React from 'react';

const GalleryBenefits: React.FC = () => {
  const benefits = [
    {
      title: "Confort Absolu",
      description: "Tissu ultra-doux en coton brossé pour une sensation de bien-être toute la journée.",
      img: "https://res.cloudinary.com/diptsoc4h/image/upload/v1772315771/WhatsApp_Image_2026-02-27_at_14.34.03_eybqef.jpg"
    },
    {
      title: "Coupe Parfaite",
      description: "Un design moderne et unisexe qui s'adapte à toutes les morphologies.",
      img: "https://res.cloudinary.com/diptsoc4h/image/upload/v1772315771/WhatsApp_Image_2026-02-27_at_14.34.03_5_xc1qdx.jpg"
    },
    {
      title: "Détails Premium",
      description: "Finitions soignées et logo iconique pour un look authentique et soigné.",
      img: "https://res.cloudinary.com/diptsoc4h/image/upload/v1772315771/WhatsApp_Image_2026-02-27_at_14.34.03_2_e1840t.jpg"
    },
    {
      title: "Chaleur Optimale",
      description: "Idéal pour les journées fraîches grâce à sa doublure en polaire douce et isolante.",
      img: "https://res.cloudinary.com/diptsoc4h/image/upload/v1772315772/WhatsApp_Image_2026-02-27_at_14.34.03_4_xlmnbr.jpg"
    },
    {
      title: "Style Polyvalent",
      description: "Se marie parfaitement avec un jean ou un jogging pour un look décontracté au quotidien.",
      img: "https://res.cloudinary.com/diptsoc4h/image/upload/v1772315773/WhatsApp_Image_2026-02-27_at_14.34.03_1_t2vtp4.jpg"
    },
    {
      title: "Qualité Durable",
      description: "Conçu pour durer, il résiste aux lavages fréquents sans perdre sa forme ni sa douceur.",
      img: "https://res.cloudinary.com/diptsoc4h/image/upload/v1772315775/WhatsApp_Image_2026-02-27_at_14.34.03_3_xc6kkd.jpg"
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Pourquoi tout le monde l'adore</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Plus qu'un simple vêtement, c'est une expérience de confort que vous ne voudrez plus quitter.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
