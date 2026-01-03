
import React, { useState, useEffect } from 'react';
import { User, Phone, MapPin, CheckCircle2, ShoppingBag, AlertCircle, MessageSquare, Loader2, Sparkles, Zap, Shirt } from 'lucide-react';

// --- URL DE DÉPLOIEMENT GMAIL ---
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbyvTK-hHnk8YcGpeUoOsvY1d260av1W4eLPPCSX8epEs950VpTZjh_rfLed-DDAoEu8pg/exec';

interface ItemVariant {
  size: string;
  color: string;
}

const OrderForm: React.FC = () => {
  const offers = [
    { id: '1x', name: '1 Hoodie Elite', price: 299, original: 599, badge: null, qty: 1 },
    { id: '2x', name: 'Pack Duo (2 Hoodies)', price: 499, original: 1198, badge: 'OFFRE POPULAIRE', save: 699, qty: 2 },
    { id: '3x', name: 'Pack Trio (3 Hoodies)', price: 649, original: 1797, badge: 'MEILLEUR PRIX', save: 1148, qty: 3 },
  ];

  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    address: '',
    city: '',
    offer: '1x',
    variants: [{ size: 'M', color: 'Noir' }] as ItemVariant[]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedOffer = offers.find(o => o.id === formData.offer) || offers[0];

  // Gérer le changement d'offre et mettre à jour le nombre de variantes
  const handleOfferChange = (offerId: string) => {
    const offer = offers.find(o => o.id === offerId) || offers[0];
    const newVariants = Array(offer.qty).fill(null).map((_, i) => (
      formData.variants[i] || { size: 'M', color: 'Noir' }
    ));
    setFormData({ ...formData, offer: offerId, variants: newVariants });
  };

  const updateVariant = (index: number, field: keyof ItemVariant, value: string) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[index] = { ...updatedVariants[index], [field]: value };
    setFormData({ ...formData, variants: updatedVariants });
  };

  const formatVariantsString = () => {
    return formData.variants.map((v, i) => `Art#${i+1}: ${v.size}/${v.color}`).join(' | ');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const cleanPhone = formData.phone.replace(/\s/g, '');
    if (cleanPhone.length < 10) {
      setError("Le numéro de téléphone est trop court.");
      setIsSubmitting(false);
      return;
    }

    try {
      const params = new URLSearchParams();
      const dataToSend = {
        fullname: formData.fullname,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        offer: selectedOffer.name,
        details: formatVariantsString(),
        totalPrice: `${selectedOffer.price} DH`
      };

      Object.entries(dataToSend).forEach(([key, value]) => {
        params.append(key, String(value).trim());
      });

      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      });

      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1200);

    } catch (err) {
      console.error("Erreur d'envoi:", err);
      setError("Un problème est survenu. Veuillez réessayer.");
      setIsSubmitting(false);
    }
  };

  const sendWhatsApp = () => {
    const text = `Bonjour, je commande le Hoodie Elite:\nOffre: ${selectedOffer.name}\nPrix: ${selectedOffer.price} DH\nArticles: ${formatVariantsString()}\nNom: ${formData.fullname}\nTél: ${formData.phone}\nVille: ${formData.city}`;
    window.open(`https://wa.me/212600000000?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (isSuccess) {
    return (
      <section id="order-form" className="py-20 px-4 bg-white scroll-mt-20">
        <div className="max-w-xl mx-auto text-center p-10 rounded-[40px] border-4 border-green-100 bg-green-50 shadow-2xl">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={48} className="text-white" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Commande Reçue !</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Merci <strong>{formData.fullname}</strong>. Votre commande pour <strong>{selectedOffer.name}</strong> a été enregistrée.
            <br/><span className="text-sm opacity-75">({formatVariantsString()})</span>
          </p>
          <button onClick={() => setIsSuccess(false)} className="text-green-700 font-bold hover:underline">Faire un autre achat</button>
        </div>
      </section>
    );
  }

  return (
    <section id="order-form" className="py-16 px-4 md:px-8 bg-gray-100 scroll-mt-20">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-orange-600 p-6 md:p-8 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-black mb-1">Validez votre Commande</h2>
            <p className="opacity-90 font-medium text-sm">Paiement à la livraison & Livraison Gratuite</p>
          </div>

          <form onSubmit={handleSubmit} className="p-5 md:p-8 space-y-8">
            {error && (
              <div className="bg-red-50 border-2 border-red-100 text-red-600 p-4 rounded-2xl flex items-center gap-3">
                <AlertCircle size={20} className="shrink-0" />
                <span className="font-bold text-sm">{error}</span>
              </div>
            )}

            {/* OFFERS SELECTION */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block ml-2">1. Sélectionnez votre Offre</label>
              <div className="grid grid-cols-1 gap-3">
                {offers.map((offer) => (
                  <label 
                    key={offer.id}
                    className={`relative flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      formData.offer === offer.id 
                      ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-200' 
                      : 'border-gray-100 bg-white hover:border-gray-200'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="offer" 
                      className="hidden" 
                      value={offer.id} 
                      checked={formData.offer === offer.id}
                      onChange={() => handleOfferChange(offer.id)}
                    />
                    <div className="flex items-center gap-4">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.offer === offer.id ? 'border-orange-500 bg-orange-500' : 'border-gray-300'}`}>
                        {formData.offer === offer.id && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black text-gray-900 text-sm md:text-base">{offer.name}</span>
                        {offer.save && <span className="text-[10px] text-green-600 font-bold uppercase">Économisez {offer.save} DH</span>}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black text-gray-900">{offer.price} DH</div>
                      <div className="text-[10px] text-gray-400 line-through font-bold">{offer.original} DH</div>
                    </div>
                    {offer.badge && (
                      <div className="absolute -top-2.5 right-4 bg-gray-900 text-white text-[8px] font-black px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                        <Sparkles size={10} className="text-orange-400" />
                        {offer.badge}
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* DYNAMIC VARIANTS SECTION */}
            <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block ml-2">2. Personnalisez vos articles</label>
              <div className="grid grid-cols-1 gap-4">
                {formData.variants.map((variant, index) => (
                  <div key={index} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 relative">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-full bg-gray-900 text-white text-[10px] font-black flex items-center justify-center">
                        {index + 1}
                      </div>
                      <span className="text-xs font-black text-gray-900 uppercase tracking-wider">Article n°{index + 1}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] font-bold text-gray-400 uppercase mb-1 block">Taille</label>
                        <select 
                          className="w-full px-4 py-3 rounded-xl border-2 border-white bg-white font-black text-xs md:text-sm outline-none shadow-sm focus:border-orange-500 transition-all"
                          value={variant.size} 
                          onChange={e => updateVariant(index, 'size', e.target.value)}
                        >
                          <option value="S">S</option><option value="M">M</option><option value="L">L</option><option value="XL">XL</option><option value="XXL">XXL</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-gray-400 uppercase mb-1 block">Couleur</label>
                        <select 
                          className="w-full px-4 py-3 rounded-xl border-2 border-white bg-white font-black text-xs md:text-sm outline-none shadow-sm focus:border-orange-500 transition-all"
                          value={variant.color} 
                          onChange={e => updateVariant(index, 'color', e.target.value)}
                        >
                          <option value="Noir">Noir</option><option value="Gris">Gris</option><option value="Bleu">Bleu</option><option value="Vert">Vert</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PERSONAL INFO */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block ml-2">3. Informations de livraison</label>
              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input required type="text" placeholder="Nom complet" className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-orange-500 outline-none font-bold text-sm" value={formData.fullname} onChange={e => setFormData({...formData, fullname: e.target.value})} />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input required type="tel" placeholder="Téléphone (06 --)" className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-orange-500 outline-none font-bold text-sm" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required type="text" placeholder="Ville" className="w-full px-5 py-3.5 rounded-xl border-2 border-gray-100 focus:border-orange-500 outline-none font-bold text-sm" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input required type="text" placeholder="Adresse complète" className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-orange-500 outline-none font-bold text-sm" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
               <button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 md:py-5 rounded-2xl font-black text-lg flex flex-col items-center justify-center gap-1 shadow-xl transition-all active:scale-95 disabled:opacity-70 group"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <ShoppingBag size={20} />
                      CONFIRMER MON ACHAT
                    </div>
                    <span className="text-[10px] font-medium opacity-80 uppercase tracking-widest">Total à payer : {selectedOffer.price} DH</span>
                  </>
                )}
              </button>
            </div>

            <button 
              type="button"
              onClick={sendWhatsApp}
              className="w-full bg-green-50 text-green-700 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border-2 border-green-100 hover:bg-green-100 transition-all"
            >
              <MessageSquare size={16} />
              Commander via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
