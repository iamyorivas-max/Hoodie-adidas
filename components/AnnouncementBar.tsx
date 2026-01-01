
import React from 'react';
import { Truck } from 'lucide-react';

const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-black text-white py-2.5 px-4 text-center sticky top-0 z-50 shadow-md">
      <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-bold tracking-wide uppercase">
        <Truck size={18} className="text-yellow-400" />
        <span>🚚 Livraison gratuite aujourd’hui uniquement – Offre à ne pas rater !</span>
      </div>
    </div>
  );
};

export default AnnouncementBar;
