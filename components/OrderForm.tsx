
import React, { useState } from 'react';
import { User, Phone, MapPin, CheckCircle2, ShoppingBag, ShieldCheck, AlertCircle } from 'lucide-react';

// URL de votre script Google Apps - Assurez-vous d'avoir bien publié la DERNIÈRE version
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

    // Validation basique du numéro
    if (formData.phone.length < 10) {
      setError("Le numéro de téléphone semble trop court.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Préparation des données au format URL standard (le plus robuste pour Google)
      const params = new URLSearchParams();
      // Fix: cast value to string to ensure .trim() is available and fix the 'unknown' type error
      Object.entries(formData).forEach(([key, value]) => {
        params.append(key, (value as string).trim());
      });

      console.log("Envoi en cours vers Google Sheets...");

      // On utilise fetch avec no-cors pour éviter les blocages de sécurité de redirection Google
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      // Simulation d'un délai de traitement pour l'expérience utilisateur
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1500);

    } catch (err) {
      console.error("Erreur Fetch:", err);
      setError("Erreur de connexion. Si le problème persiste, contactez-nous sur WhatsApp.");
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="order-form" className="py-20 px-4 bg-white">
        <div className="max-w-xl mx-auto text-center p-10 rounded-3xl border-2 border-green-100 bg-green-50 shadow-xl">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Commande Confirmée !</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Merci <strong>{formData.fullname.split(' ')[0]}</strong>. Votre demande est enregistrée. Nous vous appellerons au <strong>{formData.phone}</strong> pour confirmer l'adresse de livraison à <strong>{formData.city}</strong>.
          </p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="text-green-700 font-bold hover:underline transition-all"
          >
            Faire un autre achat
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="order-form" className="py-16 px-4 md:px-8 bg-gray-50 scroll-mt-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <span className="bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">Étape Finale</span>
          <h2 className="text-3xl font-black text-gray-900 mt-4 mb-3">Informations de Livraison</h2>
          <p className="text-gray-600 font-medium">Remplissez le formulaire ci-dessous pour valider votre commande.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl space-y-6 border border-gray-100 transition-all hover:shadow-orange-100/50">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-center gap-3 animate-shake">
              <AlertCircle size={20} />
              <span className="font-bold">{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 gap-5">
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Nom et Prénom</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  required
                  type="text" 
                  placeholder="Votre nom complet"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-50/50 outline-none transition-all font-medium"
                  value={formData.fullname}
                  onChange={e => setFormData({...formData, fullname: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Téléphone (Mobile)</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  required
                  type="tel" 
                  placeholder="06 -- -- -- --"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-50/50 outline-none transition-all font-medium"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Ville</label>
                <input 
                  required
                  type="text" 
                  placeholder="Ex: Casablanca"
                  className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-50/50 outline-none transition-all font-medium"
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Adresse</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    required
                    type="text" 
                    placeholder="Quartier, Rue..."
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-50/50 outline-none transition-all font-medium"
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Taille</label>
                <select 
                  className="w-full px-4 py-4 rounded-xl border border-gray-200 bg-white focus:border-orange-500 outline-none font-bold appearance-none cursor-pointer"
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
                <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Couleur</label>
                <select 
                  className="w-full px-4 py-4 rounded-xl border border-gray-200 bg-white focus:border-orange-500 outline-none font-bold appearance-none cursor-pointer"
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
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95 disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                Traitement...
              </span>
            ) : (
              <>
                <ShoppingBag />
                VALIDER MA COMMANDE
              </>
            )}
          </button>

          <div className="pt-4 flex flex-col items-center gap-3">
            <div className="flex items-center gap-4">
              <img src="https://cdn-icons-png.flaticon.com/128/11461/11461329.png" alt="COD" className="h-8 opacity-70" />
              <img src="https://cdn-icons-png.flaticon.com/128/9562/9562913.png" alt="Secure" className="h-8 opacity-70" />
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center">
              Paiement à la livraison après vérification de la marchandise
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default OrderForm;
