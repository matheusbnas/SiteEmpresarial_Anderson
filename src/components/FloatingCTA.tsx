import React, { useState } from 'react';
import { MessageCircle, Calendar, Briefcase, X, Phone } from 'lucide-react';
import { scheduleGoogleCalendarMeeting, contactInfo } from '../utils/calendar';

interface FloatingCTAProps {
  onPageChange?: (page: string) => void;
}

export default function FloatingCTA({ onPageChange }: FloatingCTAProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleScheduleMeeting = () => {
    scheduleGoogleCalendarMeeting();
    setIsOpen(false);
  };

  const handleViewServices = () => {
    onPageChange?.('portfolio');
    setIsOpen(false);
  };

  const handleContactAnderson = () => {
    window.open(contactInfo.linkedin, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Menu expandido */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-gray-900 border border-gray-700 rounded-xl p-4 shadow-2xl min-w-[280px]">
          <div className="space-y-3">
            <button
              onClick={handleScheduleMeeting}
              className="w-full flex items-center gap-3 p-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
            >
              <Calendar size={20} />
              Agendar Conversa
            </button>
            
            <button
              onClick={handleViewServices}
              className="w-full flex items-center gap-3 p-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              <Briefcase size={20} />
              Ver Serviços
            </button>
            
            <button
              onClick={handleContactAnderson}
              className="w-full flex items-center gap-3 p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <Phone size={20} />
              Falar com Anderson
            </button>
          </div>
        </div>
      )}

      {/* Botão principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen 
            ? 'bg-gray-800 text-white rotate-180' 
            : 'bg-yellow-400 text-black hover:bg-yellow-300 hover:scale-110'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}