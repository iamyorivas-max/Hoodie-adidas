
import React, { useState } from 'react';
import { User, Phone, MapPin, CheckCircle2, ShoppingBag, AlertCircle, MessageSquare, Loader2, Sparkles } from 'lucide-react';

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
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    const cleanPhone = formData.phone.replace(/\s/g, '');
    if (cleanPhone.length < 10) {
      setError("Numéro de téléphone invalide (10 chiffres minimum).");
      setIsSubmitting(false);
      return;
    }

    try {
      const params = new URLSearchParams();
      
      // On prépare les données pour qu'elles correspondent aux colonnes probables de votre Excel
      const dataToSend = {
        fullname: formData.fullname.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        offer: selectedOffer.name,
        // 'details' contient tout le récapitulatif
        details: formatVariantsString(),
        // 'size' et 'color' envoient les listes pour compatibilité avec vos anciennes colonnes
        size: formData.variants.map(v => v.size).join(', '),
        color: formData.variants.map(v => v.color).join(', '),
        totalPrice: `${selectedOffer.price} DH`,
        date: new Date().toLocaleString()
      };

      Object.entries(dataToSend).forEach(([key, value]) => {
        params.append(key, String(value));
      });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      try {
        await fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString(),
          signal: controller.signal
        });
        clearTimeout(timeoutId);
      } catch (fetchErr) {
        console.warn("Fetch warning:", fetchErr);
      }

      setTimeout(() => {
        setIsSuccess(true);
        setIsSubmitting(false);
        window.scrollTo({ top: document.getElementById('order-form')?.offsetTop, behavior: 'smooth' });
      }, 800);

    } catch (err) {
      console.error("Erreur critique:", err);
      setError("Une erreur est survenue. Vérifiez votre connexion.");
      setIsSubmitting(false);
    }
  };

  const sendWhatsApp = () => {
    const text = `Bonjour, je souhaite commander:\n- Offre: ${selectedOffer.name}\n- Articles: ${formatVariantsString()}\n- Prix total: ${selectedOffer.price} DH\n\nMes infos:\n- Nom: ${formData.fullname}\n- Tél: ${formData.phone}\n- Ville: ${formData.city}`;
    window.open(`https://wa.me/212600000000?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (isSuccess) {
    return (
      <section id="order-form" className="py-20 px-4 bg-white scroll-mt-20">
        <div className="max-w-xl mx-auto text-center p-10 rounded-[40px] border-4 border-green-100 bg-green-50 shadow-2xl animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200">
            <CheckCircle2 size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Commande Enregistrée !</h2>
          <p className="text-gray-600 mb-8 font-medium">
            Merci <span className="text-gray-900 font-bold">{formData.fullname}</span>. <br/>
            Notre équipe vous contactera pour confirmer la livraison de votre pack : <br/>
            <span className="text-orange-600 font-bold">{selectedOffer.name}</span>
          </p>
          <button 
            onClick={() => setIsSuccess(false)} 
            className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all"
          >
            Faire une autre commande
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="order-form" className="py-16 px-4 md:px-8 bg-gray-100 scroll-mt-20">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-orange-600 p-6 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-black mb-1">Finalisez votre Commande</h2>
            <p className="opacity-90 font-medium text-xs md:text-sm">Livraison Gratuite & Paiement à la réception</p>
          </div>

          <form onSubmit={handleSubmit} className="p-5 md:p-8 space-y-6">
            {error && (
              <div className="bg-red-50 border-2 border-red-100 text-red-600 p-4 rounded-2xl flex items-center gap-3 animate-pulse">
                <AlertCircle size={20} className="shrink-0" />
                <span className="font-bold text-sm">{error}</span>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-2">1. Choisissez votre pack</label>
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
                        <span className="font-black text-gray-900 text-sm">{offer.name}</span>
                        {offer.save && <span className="text-[9px] text-green-600 font-bold uppercase">Gagnez {offer.save} DH</span>}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black text-gray-900">{offer.price} DH</div>
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

            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-2">2. Tailles et Couleurs</label>
              <div className="grid grid-cols-1 gap-3">
                {formData.variants.map((variant, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-wrap md:flex-nowrap items-center gap-4">
                    <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 text-[10px] font-black flex items-center justify-center shrink-0">
                      #{index + 1}
                    </div>
                    <div className="flex-grow grid grid-cols-2 gap-3">
                      <select 
                        required
                        className="w-full px-3 py-2.5 rounded-xl border-2 border-white bg-white font-black text-xs outline-none shadow-sm focus:border-orange-500"
                        value={variant.size} 
                        onChange={e => updateVariant(index, 'size', e.target.value)}
                      >
                        {['S','M','L','XL','XXL'].map(s => <option key={s} value={s}>Taille {s}</option>)}
                      </select>
                      <select 
                        required
                        className="w-full px-3 py-2.5 rounded-xl border-2 border-white bg-white font-black text-xs outline-none shadow-sm focus:border-orange-500"
                        value={variant.color} 
                        onChange={e => updateVariant(index, 'color', e.target.value)}
                      >
                        {['Noir','Gris','Bleu','Vert'].map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block ml-2">3. Où livrer ?</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  <input required type="text" placeholder="Nom complet" className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-orange-500 outline-none font-bold text-sm" value={formData.fullname} onChange={e => setFormData({...formData, fullname: e.target.value})} />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  <input required type="tel" placeholder="Tél (06 --)" className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-orange-500 outline-none font-bold text-sm" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <input required type="text" placeholder="Ville" className="w-full px-5 py-3.5 rounded-xl border-2 border-gray-100 focus:border-orange-500 outline-none font-bold text-sm" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  <input required type="text" placeholder="Adresse complète" className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-orange-500 outline-none font-bold text-sm" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                </div>
              </div>
            </div>

            <div className="pt-2">
               <button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-black text-lg flex flex-col items-center justify-center gap-1 shadow-xl shadow-orange-100 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="animate-spin" size={24} />
                    <span>Traitement...</span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 uppercase tracking-tight">
                      <ShoppingBag size={20} />
                      Valider ma commande
                    </div>
                    <span className="text-[10px] font-medium opacity-80 uppercase tracking-widest">Total : {selectedOffer.price} DH</span>
                  </>
                )}
              </button>
            </div>

            <button 
              type="button"
              onClick={sendWhatsApp}
              className="w-full bg-green-50 text-green-700 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border-2 border-green-100 hover:bg-green-100 transition-all"
            >
              <MessageSquare size={14} />
              Commander rapidement via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
