
import React, { useState } from 'react';
import { User, Phone, MapPin, ShoppingBag, AlertCircle, MessageSquare, Loader2, Sparkles, ChevronDown } from 'lucide-react';

const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbyvTK-hHnk8YcGpeUoOsvY1d260av1W4eLPPCSX8epEs950VpTZjh_rfLed-DDAoEu8pg/exec';

interface ItemVariant {
  size: string;
  color: string;
}

interface OrderFormProps {
  onOrderSuccess: (details: {
    fullname: string;
    phone: string;
    city: string;
    address: string;
    offer: string;
    price: string;
    items: string;
  }) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onOrderSuccess }) => {
  const offers = [
    { id: '1x', name: '1 adidas fleece hoodie', price: 299, original: 699, badge: null, qty: 1 },
    { id: '2x', name: 'Pack Duo (2 Hoodies)', price: 499, original: 1398, badge: 'OFFRE POPULAIRE', save: 99, qty: 2 },
  ];

  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    address: '',
    city: '',
    offer: '1x',
    variants: [{ size: 'M', color: 'Blanc' }] as ItemVariant[]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedOffer = offers.find(o => o.id === formData.offer) || offers[0];

  const handleOfferChange = (offerId: string) => {
    const offer = offers.find(o => o.id === offerId) || offers[0];
    const newVariants = Array(offer.qty).fill(null).map((_, i) => (
      formData.variants[i] || { size: 'M', color: 'Blanc' }
    ));
    setFormData({ ...formData, offer: offerId, variants: newVariants });
  };

  const updateVariant = (index: number, field: keyof ItemVariant, value: string) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[index] = { ...updatedVariants[index], [field]: value };
    setFormData({ ...formData, variants: updatedVariants });
  };

  const formatVariantsString = () => {
    return formData.variants.map((v, i) => `Article ${i+1}: ${v.size} / ${v.color}`).join(' | ');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    const cleanPhone = formData.phone.replace(/\s/g, '');
    if (cleanPhone.length < 10) {
      setError("Numéro de téléphone invalide.");
      setIsSubmitting(false);
      return;
    }

    try {
      const params = new URLSearchParams();
      const variantDetails = formatVariantsString();
      
      const dataToSend = {
        fullname: formData.fullname.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        offer: selectedOffer.name,
        details: variantDetails,
        size: formData.variants.map(v => v.size).join(', '),
        color: formData.variants.map(v => v.color).join(', '),
        totalPrice: `${selectedOffer.price} DH`,
        date: new Date().toLocaleString()
      };

      Object.entries(dataToSend).forEach(([key, value]) => {
        params.append(key, String(value));
      });

      try {
        await fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString()
        });
      } catch (fErr) {
        console.warn("Sheet submission silent log:", fErr);
      }

      onOrderSuccess({
        fullname: formData.fullname.trim(),
        phone: formData.phone.trim(),
        city: formData.city.trim(),
        address: formData.address.trim(),
        offer: selectedOffer.name,
        price: `${selectedOffer.price} DH`,
        items: variantDetails
      });

    } catch (err) {
      console.error("Critical error:", err);
      setError("Erreur de connexion. Réessayez.");
      setIsSubmitting(false);
    }
  };

  const sendWhatsApp = () => {
    const text = `Bonjour, je souhaite commander:\n- Offre: ${selectedOffer.name}\n- Articles: ${formatVariantsString()}\n- Prix total: ${selectedOffer.price} DH\n\nMes infos:\n- Nom: ${formData.fullname}\n- Tél: ${formData.phone}\n- Ville: ${formData.city}`;
    window.open(`https://wa.me/212676809781?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="order-form" className="py-16 px-4 md:px-8 bg-gray-100 scroll-mt-20">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-orange-600 p-6 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-black mb-1 italic uppercase tracking-tighter">Finalisez votre Commande</h2>
            <p className="opacity-90 font-medium text-xs md:text-sm">Livraison Gratuite & Paiement à la réception</p>
          </div>

          <form onSubmit={handleSubmit} className="p-5 md:p-8 space-y-8">
            {error && (
              <div className="bg-red-50 border-2 border-red-100 text-red-600 p-4 rounded-2xl flex items-center gap-3 animate-pulse">
                <AlertCircle size={20} className="shrink-0" />
                <span className="font-bold text-sm">{error}</span>
              </div>
            )}

            {/* STEP 1: OFFERS */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-2">1. Choisissez votre pack</label>
              <div className="grid grid-cols-1 gap-3">
                {offers.map((offer) => (
                  <label key={offer.id} className={`relative flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer ${formData.offer === offer.id ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-200' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
                    <input type="radio" name="offer" className="hidden" value={offer.id} checked={formData.offer === offer.id} onChange={() => handleOfferChange(offer.id)} />
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.offer === offer.id ? 'border-orange-500 bg-orange-500' : 'border-gray-300'}`}>
                        {formData.offer === offer.id && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black text-gray-900 text-base">{offer.name}</span>
                        {offer.save > 0 && <span className="text-[10px] text-green-600 font-bold uppercase tracking-tight">Vous économisez {offer.save} DH</span>}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-gray-900">{offer.price} DH</div>
                    </div>
                    {offer.badge && (
                      <div className="absolute -top-3 right-6 bg-gray-900 text-white text-[9px] font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-gray-800">
                        <Sparkles size={11} className="text-orange-400 fill-orange-400" />
                        {offer.badge}
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* STEP 2: VARIANTS (SIDE BY SIDE ON MOBILE) */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-2">2. Tailles et Couleurs</label>
              <div className="grid grid-cols-1 gap-4">
                {formData.variants.map((variant, index) => (
                  <div key={index} className="p-4 md:p-5 rounded-3xl bg-gray-50 border border-gray-100 space-y-3">
                    <div className="flex items-center gap-2">
                       <span className="bg-gray-900 text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">Article {index + 1}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 md:gap-4">
                      <div className="relative">
                        <select 
                          required 
                          className="w-full bg-orange-600 text-white pl-3 pr-8 py-3.5 md:px-5 md:py-4 rounded-xl md:rounded-2xl font-black text-sm md:text-lg outline-none shadow-lg shadow-orange-100 hover:bg-orange-700 transition-colors cursor-pointer appearance-none border-b-4 border-orange-800"
                          value={variant.size} 
                          onChange={e => updateVariant(index, 'size', e.target.value)}
                        >
                          {['M','L','XL'].map(s => <option key={s} value={s} className="text-gray-900 bg-white">TAILLE {s}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white/70 pointer-events-none" size={16} />
                      </div>
                      <div className="relative">
                        <select 
                          required 
                          className="w-full bg-orange-600 text-white pl-3 pr-8 py-3.5 md:px-5 md:py-4 rounded-xl md:rounded-2xl font-black text-sm md:text-lg outline-none shadow-lg shadow-orange-100 hover:bg-orange-700 transition-colors cursor-pointer appearance-none border-b-4 border-orange-800"
                          value={variant.color} 
                          onChange={e => updateVariant(index, 'color', e.target.value)}
                        >
                          {['Blanc'].map(c => <option key={c} value={c} className="text-gray-900 bg-white">{c.toUpperCase()}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white/70 pointer-events-none" size={16} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* STEP 3: SHIPPING */}
            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-2">3. Où livrer ?</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors" size={16} />
                  <input required type="text" placeholder="Nom complet" className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-orange-500 outline-none font-bold text-sm transition-all" value={formData.fullname} onChange={e => setFormData({...formData, fullname: e.target.value})} />
                </div>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors" size={16} />
                  <input required type="tel" placeholder="Numéro de téléphone" className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-orange-500 outline-none font-bold text-sm transition-all" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div className="relative group">
                   <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors" size={16} />
                   <input required type="text" placeholder="Ville" className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-orange-500 outline-none font-bold text-sm transition-all" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                </div>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors" size={16} />
                  <input required type="text" placeholder="Adresse complète" className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-orange-500 outline-none font-bold text-sm transition-all" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                </div>
              </div>
            </div>

            <div className="pt-4">
               <button type="submit" disabled={isSubmitting} className="w-full bg-gray-900 hover:bg-black text-white py-5 rounded-2xl font-black text-xl flex flex-col items-center justify-center gap-1 shadow-2xl transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group">
                {isSubmitting ? (
                  <div className="flex items-center gap-3"><Loader2 className="animate-spin" size={24} /><span>Traitement...</span></div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 uppercase tracking-tight"><ShoppingBag size={22} />Valider ma commande</div>
                    <span className="text-[10px] font-medium opacity-60 uppercase tracking-widest">Paiement à la livraison : {selectedOffer.price} DH</span>
                  </>
                )}
              </button>
            </div>

            <button type="button" onClick={sendWhatsApp} className="w-full bg-green-50 text-green-700 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 border-2 border-green-100 hover:bg-green-100 transition-all">
              <MessageSquare size={16} />Commander via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
