
import React from 'react';
import { CheckCircle2, Package, Truck, PhoneCall, ChevronLeft, ShoppingBag, ShieldCheck, Star, Sparkles } from 'lucide-react';
import { OrderDetails } from '../App.tsx';

interface ThankYouPageProps {
  order: OrderDetails;
  onBack: () => void;
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({ order, onBack }) => {
  // Photo principale du produit (celle du Hero)
  const productThumbnail = "https://i.ibb.co/yc2BVzTZ/Whats-App-Image-2026-01-05-at-16-01-46.jpg";

  return (
    <div className="bg-gray-50 min-h-screen pb-20 animate-in fade-in duration-700">
      {/* Hero Header */}
      <section className="bg-white pt-12 pb-16 px-4 text-center border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-100 animate-in zoom-in duration-500 delay-200">
            <CheckCircle2 size={44} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Merci <span className="text-orange-600">{order.fullname.split(' ')[0]}</span> !
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-medium max-w-xl mx-auto leading-relaxed">
            Votre commande a bien été enregistrée. Nous préparons votre colis avec le plus grand soin.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 -mt-10">
        
        {/* Left Column: Order Summary */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-[32px] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
            <div className="bg-[#111827] px-8 py-5 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <Package size={20} className="text-orange-500" />
                <span className="font-black uppercase tracking-widest text-[10px] md:text-xs">Récapitulatif de la commande</span>
              </div>
              <span className="text-[10px] font-bold opacity-60">#{Math.floor(Math.random() * 90000) + 10000}</span>
            </div>
            
            <div className="p-6 md:p-10">
              <div className="flex flex-row items-center justify-between gap-4 md:gap-6 pb-8 border-b border-gray-50">
                <div className="flex items-center gap-4 md:gap-6">
                  {/* Image réelle du produit */}
                  <div className="w-20 h-24 md:w-28 md:h-32 bg-gray-50 rounded-2xl overflow-hidden shrink-0 border border-gray-100 shadow-sm">
                    <img src={productThumbnail} alt="Adidas fleece hoodie" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-2xl font-black text-gray-900 leading-tight">{order.offer}</h3>
                    <p className="text-xs md:text-sm text-gray-400 font-bold mt-1.5 uppercase tracking-wide">
                      {order.items}
                    </p>
                  </div>
                </div>
                <div className="text-xl md:text-3xl font-black text-gray-900 whitespace-nowrap">{order.price}</div>
              </div>

              <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-gray-100">
                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Informations de livraison</h4>
                  <div className="space-y-1.5">
                    <p className="font-black text-gray-900 text-base">{order.fullname}</p>
                    <p className="text-sm text-gray-600 font-medium">{order.phone}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{order.address}, {order.city}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Mode de paiement</h4>
                  <div className="flex items-center gap-2 text-green-600 font-black text-sm">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                    Paiement à la réception (Cash)
                  </div>
                </div>
              </div>

              <div className="pt-8 flex items-center justify-between">
                <span className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Total à payer au livreur</span>
                <span className="text-3xl md:text-4xl font-black text-orange-600 tracking-tighter">{order.price}</span>
              </div>
            </div>
          </div>

          {/* Satisfaction Badge */}
          <div className="bg-orange-600 rounded-[32px] p-8 text-white flex flex-col md:flex-row items-center gap-6 shadow-xl shadow-orange-100/50">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h3 className="text-xl font-black mb-1">Garantie Satisfait ou Échangé</h3>
              <p className="text-orange-100 text-sm font-medium leading-relaxed">
                Si la taille ne convient pas ou si vous n'êtes pas satisfait à 100%, contactez-nous sous 14 jours pour un échange gratuit.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Next Steps */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
            <h3 className="text-xl font-black text-gray-900 mb-10 flex items-center gap-3">
              <Sparkles className="text-orange-500" size={20} />
              Prochaines étapes
            </h3>
            
            <div className="space-y-12 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
              <div className="relative flex gap-8">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shrink-0 z-10 border-4 border-white shadow-sm">
                  <PhoneCall size={22} />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 mb-1.5 text-lg">Confirmation par téléphone</h4>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">
                    Un conseiller va vous appeler sur le <span className="font-black text-gray-900">{order.phone}</span> pour valider votre commande.
                  </p>
                </div>
              </div>

              <div className="relative flex gap-8">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shrink-0 z-10 border-4 border-white shadow-sm">
                  <Package size={22} />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 mb-1.5 text-lg">Expédition express</h4>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">
                    Une fois confirmé, votre colis est préparé et expédié immédiatement depuis notre stock.
                  </p>
                </div>
              </div>

              <div className="relative flex gap-8">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 shrink-0 z-10 border-4 border-white shadow-sm">
                  <Truck size={22} />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 mb-1.5 text-lg">Livraison 48h</h4>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">
                    Le livreur vous contactera pour vous remettre le colis en main propre à <span className="font-black text-gray-900">{order.city}</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-4">
            <button 
              onClick={onBack}
              className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-95 shadow-xl shadow-gray-200"
            >
              <ChevronLeft size={20} />
              Retour à l'accueil
            </button>
            <a 
              href={`https://wa.me/212676809781?text=${encodeURIComponent("Bonjour, j'ai une question concernant ma commande au nom de " + order.fullname)}`}
              target="_blank"
              className="w-full bg-white text-gray-600 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 border-2 border-gray-100 hover:bg-gray-50 transition-all shadow-sm"
            >
              <ShoppingBag size={18} className="text-orange-500" />
              Besoin d'aide ? Contactez-nous
            </a>
          </div>
        </div>

      </div>

      {/* Trust Footer */}
      <div className="max-w-4xl mx-auto px-4 mt-20 text-center">
        <div className="flex items-center justify-center gap-1 text-yellow-500 mb-4">
          {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-current" />)}
        </div>
        <p className="text-gray-400 text-sm font-medium italic">
          "Excellent service, rapide et de qualité. Merci l'équipe Hoodie Elite !"
        </p>
      </div>
    </div>
  );
};

export default ThankYouPage;
