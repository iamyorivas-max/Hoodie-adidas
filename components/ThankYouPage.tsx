
import React from 'react';
import { CheckCircle2, Package, Truck, PhoneCall, ChevronLeft, ShoppingBag, ShieldCheck, Star, Sparkles } from 'lucide-react';
import { OrderDetails } from '../App.tsx';

interface ThankYouPageProps {
  order: OrderDetails;
  onBack: () => void;
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({ order, onBack }) => {
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
            <div className="bg-gray-900 px-8 py-5 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <Package size={20} className="text-orange-500" />
                <span className="font-black uppercase tracking-widest text-xs">Récapitulatif de la commande</span>
              </div>
              <span className="text-[10px] font-bold opacity-60">#{Math.floor(Math.random() * 90000) + 10000}</span>
            </div>
            
            <div className="p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-50">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-24 bg-gray-100 rounded-2xl overflow-hidden shrink-0 border border-gray-50">
                    <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400&auto=format&fit=crop" alt="Hoodie Elite" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900">{order.offer}</h3>
                    <p className="text-sm text-gray-500 font-medium mt-1 leading-relaxed">{order.items}</p>
                  </div>
                </div>
                <div className="text-2xl font-black text-gray-900">{order.price}</div>
              </div>

              <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-gray-50">
                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Informations de livraison</h4>
                  <div className="space-y-1">
                    <p className="font-bold text-gray-900">{order.fullname}</p>
                    <p className="text-sm text-gray-600">{order.phone}</p>
                    <p className="text-sm text-gray-600">{order.address}, {order.city}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Mode de paiement</h4>
                  <div className="flex items-center gap-2 text-green-600 font-bold">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    Paiement à la réception (Cash)
                  </div>
                </div>
              </div>

              <div className="pt-8 flex items-center justify-between">
                <span className="text-gray-500 font-bold">Total à payer au livreur</span>
                <span className="text-3xl font-black text-orange-600">{order.price}</span>
              </div>
            </div>
          </div>

          {/* Satisfaction Badge */}
          <div className="bg-orange-600 rounded-[32px] p-8 text-white flex flex-col md:flex-row items-center gap-6 shadow-xl shadow-orange-100">
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
            <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
              <Sparkles className="text-orange-500" size={20} />
              Prochaines étapes
            </h3>
            
            <div className="space-y-10 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
              <div className="relative flex gap-6">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shrink-0 z-10 border-4 border-white">
                  <PhoneCall size={20} />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 mb-1">Confirmation par téléphone</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Un conseiller va vous appeler sur le <span className="font-bold text-gray-900">{order.phone}</span> pour valider votre adresse.
                  </p>
                </div>
              </div>

              <div className="relative flex gap-6">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shrink-0 z-10 border-4 border-white">
                  <Package size={20} />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 mb-1">Expédition express</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Une fois confirmé, votre pack sera expédié immédiatement depuis notre entrepôt.
                  </p>
                </div>
              </div>

              <div className="relative flex gap-6">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 shrink-0 z-10 border-4 border-white">
                  <Truck size={20} />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 mb-1">Livraison 48h</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Le livreur vous contactera pour vous remettre le colis à <span className="font-bold text-gray-900">{order.city}</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-4">
            <button 
              onClick={onBack}
              className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-95 shadow-xl shadow-gray-200"
            >
              <ChevronLeft size={20} />
              Retour à l'accueil
            </button>
            <a 
              href={`https://wa.me/212600000000?text=${encodeURIComponent("Bonjour, j'ai une question concernant ma commande au nom de " + order.fullname)}`}
              target="_blank"
              className="w-full bg-white text-gray-600 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 border-2 border-gray-100 hover:bg-gray-50 transition-all"
            >
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
