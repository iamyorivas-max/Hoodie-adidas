
import React, { useState, useEffect } from 'react';
import { Clock, ShoppingBag } from 'lucide-react';

const CountdownSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 15,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer);
          return prev;
        }
        
        let s = prev.seconds - 1;
        let m = prev.minutes;
        let h = prev.hours;

        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }
        
        return { hours: h, minutes: m, seconds: s };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="bg-orange-50 py-12 px-4 border-y border-orange-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-orange-900 mb-6 flex items-center justify-center gap-3">
          <Clock className="animate-pulse" />
          ⏰ Offre limitée – Fin dans :
        </h2>
        
        <div className="flex justify-center gap-4 md:gap-8 mb-8">
          {[
            { label: 'Heures', val: timeLeft.hours },
            { label: 'Minutes', val: timeLeft.minutes },
            { label: 'Secondes', val: timeLeft.seconds }
          ].map((unit, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="bg-white w-16 h-16 md:w-24 md:h-24 rounded-2xl flex items-center justify-center text-3xl md:text-5xl font-black text-orange-600 shadow-xl border-b-4 border-orange-200">
                {format(unit.val)}
              </div>
              <span className="mt-2 text-xs md:text-sm font-bold uppercase text-orange-800 tracking-wider">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        <p className="text-orange-800 font-medium mb-8">
          Attention : Cette réduction de <span className="font-bold underline">50%</span> est réservée aux premiers acheteurs aujourd'hui.
        </p>

        <a 
          href="#order-form" 
          className="inline-flex items-center gap-2 bg-orange-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-700 transition-all shadow-xl hover:scale-105"
        >
          Profiter de l'offre
        </a>
      </div>
    </section>
  );
};

export default CountdownSection;
