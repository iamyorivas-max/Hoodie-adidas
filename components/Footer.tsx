
import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-black text-gray-900 mb-2">HOODIE ELITE™</h3>
            <p className="text-gray-500 max-w-sm">Le leader du confort premium pour un style quotidien inégalé. Livraison rapide et paiement sécurisé.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-gray-600">
            <a href="#" className="hover:text-orange-600 transition-colors">Politique de confidentialité</a>
            <a href="#" className="hover:text-orange-600 transition-colors">Conditions générales</a>
            <a href="#" className="hover:text-orange-600 transition-colors">Contact</a>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© 2024 Hoodie Elite. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <ShieldCheck className="text-gray-300" />
            <span className="text-gray-400 text-xs font-medium">Site Web 100% Sécurisé - Paiement à la livraison</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
