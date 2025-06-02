import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/919999999999?text=Hello! I'm interested. Tell me more about your NEET course."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50"
    >
      <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg hover:bg-green-600">
        <FaWhatsapp className="text-white text-2xl" />
      </div>
    </a>
  );
};

export default WhatsAppFloat;
