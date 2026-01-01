
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-gray-200">
    <button 
      className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
      onClick={onClick}
    >
      <span className="text-lg font-bold text-gray-900 pr-4">{question}</span>
      <ChevronDown className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
      <p className="text-gray-600 leading-relaxed">{answer}</p>
    </div>
  </div>
);

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Quels sont les délais de livraison ?",
      answer: "Nous expédions vos commandes sous 24h. Le délai de livraison habituel est de 48h à 72h ouvrés à votre domicile. Un numéro de suivi vous sera communiqué après confirmation."
    },
    {
      question: "Comment choisir la bonne taille ?",
      answer: "Le Hoodie Elite taille normalement (Standard Fit). Si vous préférez un style 'Oversized' ou très large, nous vous conseillons de prendre une taille au-dessus de votre taille habituelle."
    },
    {
      question: "Le paiement à la livraison est-il disponible ?",
      answer: "Oui, tout à fait ! C'est notre mode de paiement privilégié. Vous ne payez rien en ligne, vous réglez directement le livreur en espèces lors de la remise de votre colis."
    },
    {
      question: "Puis-je retourner le produit ?",
      answer: "Absolument. Si la taille ne convient pas ou si vous n'êtes pas satisfait, vous disposez de 14 jours après réception pour demander un échange ou un remboursement. Le produit doit être dans son emballage d'origine."
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-black text-center text-gray-900 mb-12">Questions Fréquentes</h2>
        <div className="border-t border-gray-200">
          {faqs.map((faq, idx) => (
            <FAQItem 
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
