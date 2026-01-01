
import React, { useState } from 'react';
import { User, Phone, MapPin, CheckCircle2, ShoppingBag, AlertCircle, MessageSquare, Loader2 } from 'lucide-react';

// --- ÉTAPE CRUCIALE : COLLEZ VOTRE URL DE DÉPLOIEMENT ICI ---
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Vérification du numéro de téléphone (Maroc)
    const phoneRegex = /^(05|06|07|08)\d{8}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      setError("Veuillez entrer un numéro de téléphone marocain valide (06... ou 07...)");
      setIsSubmitting(false);
      return;
    }

    try {
      const params = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        params.append(key, String(value).trim());
      });

      // Envoi vers Google Sheets avec mode no-cors
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      });

      // On attend un petit peu pour faire "pro"
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1000);

    } catch (err) {
      console.error("Erreur technique:", err);
      // En mode no-cors, fetch peut échouer si l'URL est bloquée ou mal copiée
      setError("Problème de connexion. Veuillez réessayer ou commander via WhatsApp.");
      setIsSubmitting(false);
    }
  };

  const sendWhatsAppFallback = () => {
    const text = `Nouvelle commande Hoodie Elite:\nNom: ${formData.fullname}\nTél: ${formData.phone}\nVille: ${formData.city}\nTaille: ${formData.size}\nCouleur: ${formData.color}`;
    window.open(`https://wa.me/212600000000?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (isSuccess) {
    return (
      <section id="order-form" className="py-20 px-4 bg-white scroll-mt-20">
        <div className="max-w-xl mx-auto text-center p-8 md:p-12 rounded-[40px] border-4 border-green-100 bg-green-50 shadow-2xl animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-200">
            <CheckCircle2 size={48} className="text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">C'est validé !</h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Merci <strong>{formData.fullname}</strong>. Votre commande a été transmise avec succès. Notre équipe vous contactera sous peu au <strong>{formData.phone}</strong>.
          </p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="text-green-700 font-bold hover:underline"
          >
            Passer une autre commande
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="order-form" className="py-16 px-4 md:px-8 bg-gray-100 scroll-mt-20">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-orange-600 p-8 text-center text-white">
            <h2 className="text-3xl font-black mb-2">🛍️ Commandez Maintenant</h2>
            <p className="opacity-90 font-medium">Paiement cash à la livraison (Livraison Gratuite)</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-5">
            {error && (
              <div className="bg-red-50 border-2 border-red-100 text-red-600 p-4 rounded-2xl flex items-center gap-3 animate-bounce">
                <AlertCircle size={20} className="shrink-0" />
                <span className="font-bold text-sm">{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block ml-2">Nom Complet</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input required type="text" placeholder="Ex: Ahmed Benani" className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-orange-500 focus:ring-0 outline-none transition-all font-bold" value={formData.fullname} onChange={e => setFormData({...formData, fullname: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block ml-2">Téléphone</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input required type="tel" placeholder="06 00 00 00 00" className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-orange-500 focus:ring-0 outline-none transition-all font-bold" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block ml-2">Ville</label>
                  <input required type="text" placeholder="Ex: Casablanca" className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-orange-500 outline-none font-bold" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block ml-2">Adresse</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input required type="text" placeholder="Quartier, Rue..." className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-orange-500 outline-none font-bold" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block ml-2">Taille</label>
                  <select className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 font-black outline-none appearance-none cursor-pointer" value={formData.size} onChange={e => setFormData({...formData, size: e.target.value})}>
                    <option value="S">S</option><option value="M">M</option><option value="L">L</option><option value="XL">XL</option><option value="XXL">XXL</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 block ml-2">Couleur</label>
                  <select className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 font-black outline-none appearance-none cursor-pointer" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})}>
                    <option value="Noir">Noir</option><option value="Gris">Gris</option><option value="Bleu">Bleu</option><option value="Vert">Vert</option>
                  </select>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95 disabled:opacity-70 group"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  <ShoppingBag className="group-hover:rotate-12 transition-transform" />
                  COMMANDER - 299 DH
                </>
              )}
            </button>

            <button 
              type="button"
              onClick={sendWhatsAppFallback}
              className="w-full bg-green-50 text-green-700 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 border-2 border-green-100 hover:bg-green-100 transition-all"
            >
              <MessageSquare size={18} />
              Ou commander via WhatsApp
            </button>

            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest text-center">
              🔐 Vos données sont sécurisées. Paiement après réception.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
