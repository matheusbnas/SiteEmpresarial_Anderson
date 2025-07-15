import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { scheduleGoogleCalendarMeeting } from '../utils/calendar';

interface FixedHeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function FixedHeader({ currentPage, onPageChange }: FixedHeaderProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar o header fixo após rolar 100px
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScheduleMeeting = () => {
    scheduleGoogleCalendarMeeting();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-black/95 backdrop-blur-sm border-b border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <span className="text-sm text-gray-300">Anderson Garcia</span>
          <span className="text-xs text-gray-500">Transformação Estratégica</span>
        </div>
        
        <button
          onClick={handleScheduleMeeting}
          className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors text-sm"
        >
          <Calendar size={16} />
          Fale com Anderson
        </button>
      </div>
    </div>
  );
}