
import React, { useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  city: string;
  text: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Amine Benjelloun",
    city: "Casablanca",
    text: "Qualité incroyable ! Le coton est vraiment épais et doux à l'intérieur. J'ai été livré à Casa en moins de 48h. C'est devenu mon hoodie préféré.",
    avatar: "https://i.pravatar.cc/150?u=amine"
  },
  {
    id: 2,
    name: "Sara Mansouri",
    city: "Rabat",
    text: "Franchement rien à dire, la coupe est parfaite. La couleur ne bouge pas du tout après plusieurs lavages. Je vais en commander un deuxième en gris !",
    avatar: "https://i.pravatar.cc/150?u=sara"
  },
  {
    id: 3,
    name: "Youssef Tazi",
    city: "Marrakech",
    text: "Le meilleur hoodie que j'ai acheté au Maroc. Le paiement à la livraison est super rassurant et le livreur était très pro. 10/10.",
    avatar: "https://i.pravatar.cc/150?u=youssef"
  },
  {
    id: 4,
    name: "Laila Kadiri",
    city: "Tanger",
    text: "Super confortable pour mes sorties le soir. La capuche est bien doublée et protège bien du vent. Très satisfaite de mon achat.",
    avatar: "https://i.pravatar.cc/150?u=laila"
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  }, []);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(next, 4000);
      return () => clearInterval(timer);
    }
  }, [next, isPaused]);

  return (
    <section className="py-20 bg-orange-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Ce que disent nos clients</h2>
          <div className="flex items-center justify-center gap-1 text-yellow-500">
            <Star size={20} className="fill-current" />
            <Star size={20} className="fill-current" />
            <Star size={20} className="fill-current" />
            <Star size={20} className="fill-current" />
            <Star size={20} className="fill-current" />
            <span className="text-gray-900 font-bold ml-2">4.9/5</span>
          </div>
        </div>

        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Carousel Wrapper */}
          <div className="relative h-[320px] md:h-[280px]">
            {testimonials.map((t, idx) => (
              <div
                key={t.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                  idx === currentIndex 
                    ? 'opacity-100 translate-x-0' 
                    : idx < currentIndex ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'
                }`}
              >
                <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-xl border border-orange-100 flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <img 
                      src={t.avatar} 
                      alt={t.name} 
                      className="w-16 h-16 rounded-full border-4 border-orange-100 object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1 border-2 border-white">
                      <CheckCircle size={12} className="fill-current" />
                    </div>
                  </div>
                  <p className="text-gray-700 italic text-lg md:text-xl leading-relaxed mb-6 font-medium">
                    "{t.text}"
                  </p>
                  <div>
                    <h4 className="font-black text-gray-900">{t.name}</h4>
                    <p className="text-orange-600 text-sm font-bold uppercase tracking-widest">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={prev}
              className="p-3 rounded-full bg-white shadow-md border border-gray-100 hover:bg-orange-600 hover:text-white transition-all active:scale-90"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'w-8 bg-orange-600' : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <button 
              onClick={next}
              className="p-3 rounded-full bg-white shadow-md border border-gray-100 hover:bg-orange-600 hover:text-white transition-all active:scale-90"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
