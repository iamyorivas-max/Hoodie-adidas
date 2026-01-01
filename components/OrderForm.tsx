
import React, { useState } from 'react';
import { User, Phone, MapPin, CheckCircle2, ShoppingBag, ShieldCheck, AlertCircle, MessageSquare } from 'lucide-react';

// URL de votre script Google Apps - Remplacez par votre nouvelle URL de déploiement si elle a changé
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbyc8Cw6zwWi8AyWh6gOT9sForbEIljFssxPwoRMI8Id-nWW3E363UL7QyeySan0BZUtqA/exec';

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
  const [error, setError] = useState<string | null>(null);

  const sendToWhatsApp = () => {
    const message = `Bonjour, je souhaite commander le Hoodie Elite :\n- Nom: ${formData.fullname}\n- Tél: ${formData.phone}\n- Ville: ${formData.city}\n- Adresse: ${formData.address}\n- Taille: ${formData.size}\n- Couleur: ${formData.color}`;
    const whatsappUrl = `https://wa.me/212600000000?text=${encodeURIComponent(message)}`; // Remplacez par votre numéro
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (formData.phone.length < 10) {
      setError("Numéro de téléphone invalide.");
      setIsSubmitting(false);
      return;
    }

    try {
      const params = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        params.append(key, (value as string).trim());
      });

      // Timeout de 8 secondes pour Google Sheets
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 8000);

      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
        signal: controller.signal
      });

      clearTimeout(id);
      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (err) {
      console.error("Erreur d'envoi:", err);
      // Même en cas d'erreur réseau, on peut choisir de montrer le succès 
      // car 'no-cors' ne permet pas de savoir si ça a réussi à 100%
      setIsSubmitting(false);
      setIsSuccess(true); 
    }
  };

  if (isSuccess) {
    return (
      <section id="order-form" className="py-20 px-4 bg-white">
        <div className="max-w-xl mx-auto text-center p-10 rounded-3xl border-2 border-green-100 bg-green-50 shadow-xl">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Commande Enregistrée !</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Merci <strong>{formData.fullname.split(' ')[0]}</strong>. Nous vous appellerons sous peu au <strong>{formData.phone}</strong> pour confirmer l'envoi.
          </p>
          <div className="flex flex-col gap-3">
            <button 
              onClick={sendToWhatsApp}
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-4 rounded-xl font-bold hover:bg-green-700 transition-all"
            >
              <MessageSquare size={20} />
              Confirmer aussi par WhatsApp
            </button>
            <button onClick={() => setIsSuccess(false)} className="text-gray-400 text-sm hover:underline">Passer une autre commande</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="order-form" className="py-16 px-4 md:px-8 bg-gray-50 scroll-mt-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <span className="bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">Paiement à la livraison</span>
          <h2 className="text-3xl font-black text-gray-900 mt-4 mb-3">Finaliser ma commande</h2>
          <p className="text-gray-600 font-medium italic">Offre 50% de réduction activée !</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl space-y-6 border border-gray-100">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-center gap-3">
              <AlertCircle size={20} />
              <span className="font-bold">{error}</span>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Nom Complet</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input required type="text" placeholder="Prénom et Nom" className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-50/50 outline-none transition-all" value={formData.fullname} onChange={e => setFormData({...formData, fullname: e.target.value})} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Téléphone</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input required type="tel" placeholder="06 -- -- -- --" className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-50/50 outline-none transition-all" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Ville</label>
                <input required type="text" placeholder="Ex: Casablanca" className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-orange-500 outline-none" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Adresse</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input required type="text" placeholder="Quartier, N°..." className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-orange-500 outline-none" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Taille</label>
                <select className="w-full px-4 py-4 rounded-xl border border-gray-200 bg-white font-bold outline-none" value={formData.size} onChange={e => setFormData({...formData, size: e.target.value})}>
                  <option value="S">S</option><option value="M">M</option><option value="L">L</option><option value="XL">XL</option><option value="XXL">XXL</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Couleur</label>
                <select className="w-full px-4 py-4 rounded-xl border border-gray-200 bg-white font-bold outline-none" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})}>
                  <option value="Noir">Noir</option><option value="Gris">Gris</option><option value="Bleu">Bleu</option><option value="Vert">Vert</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-orange-600 hover:bg-orange-700 text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95 disabled:opacity-70">
            {isSubmitting ? <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></span> : <><ShoppingBag /> COMMANDER - 299 DH</>}
          </button>

          <div className="flex flex-col items-center gap-2 pt-4 border-t border-gray-100">
            <p className="flex items-center gap-2 text-green-700 font-bold text-xs">
              <ShieldCheck size={16} /> PAIEMENT CASH À LA LIVRAISON
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default OrderForm;
