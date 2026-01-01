
import React, { useState } from 'react';
import { User, Phone, MapPin, CheckCircle2, ShoppingBag, ShieldCheck } from 'lucide-react';

const OrderForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    address: '',
    city: '',
    size: 'M',
    color: 'Noir'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulation de l'envoi de la commande
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <section id="order-form" className="py-20 px-4 bg-white">
        <div className="max-w-xl mx-auto text-center p-10 rounded-3xl border-2 border-green-100 bg-green-50">
          <CheckCircle2 size={80} className="text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Commande Reçue !</h2>
          <p className="text-gray-600 mb-8">
            Merci {formData.fullname.split(' ')[0]}. Votre commande a bien été enregistrée. Notre service client vous appellera sur le <strong>{formData.phone}</strong> dans les prochaines heures pour confirmer votre adresse et lancer l'expédition.
          </p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="text-green-600 font-bold hover:underline"
          >
            Passer une autre commande
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="order-form" className="py-16 px-4 md:px-8 bg-gray-50 scroll-mt-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-gray-900 mb-3">🛍️ Commandez maintenant</h2>
          <p className="text-gray-600 font-medium">Livraison gratuite partout au Maroc. Payez seulement à la réception !</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl space-y-6 border border-gray-100">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Nom et Prénom</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  required
                  type="text" 
                  placeholder="Ex: Amine El Amrani"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                  value={formData.fullname}
                  onChange={e => setFormData({...formData, fullname: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Numéro de téléphone (WhatsApp)</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  required
                  type="tel" 
                  placeholder="Ex: 06 12 34 56 78"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-1 ml-1">* Nous vous contacterons sur ce numéro pour confirmer la commande.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Ville</label>
                <input 
                  required
                  type="text" 
                  placeholder="Ex: Casablanca, Rabat, Marrakech..."
                  className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Adresse de livraison</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    required
                    type="text" 
                    placeholder="Quartier, Rue, N° Appartement"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Taille</label>
                <select 
                  className="w-full px-4 py-4 rounded-xl border border-gray-200 bg-white focus:border-orange-500 outline-none font-bold"
                  value={formData.size}
                  onChange={e => setFormData({...formData, size: e.target.value})}
                >
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Couleur</label>
                <select 
                  className="w-full px-4 py-4 rounded-xl border border-gray-200 bg-white focus:border-orange-500 outline-none font-bold"
                  value={formData.color}
                  onChange={e => setFormData({...formData, color: e.target.value})}
                >
                  <option value="Noir">Noir Profond</option>
                  <option value="Gris">Gris Chiné</option>
                  <option value="Bleu">Bleu Marine</option>
                  <option value="Vert">Vert Forêt</option>
                </select>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
          >
            {isSubmitting ? (
              <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></span>
            ) : (
              <>
                <ShoppingBag />
                Confirmer ma commande
              </>
            )}
          </button>

          <div className="flex flex-col items-center justify-center gap-2 pt-4 border-t border-gray-100">
            <p className="flex items-center gap-2 text-green-700 font-bold text-sm">
              <ShieldCheck size={20} />
              ✅ Paiement à la livraison (COD) – 100% sécurisé
            </p>
            <p className="text-gray-400 text-[11px] italic text-center leading-tight">
              Service disponible dans tout le Royaume. Vous ne payez qu'après avoir vérifié la qualité de votre produit.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default OrderForm;
