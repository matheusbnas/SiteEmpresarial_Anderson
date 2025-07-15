import React from 'react';
import { Linkedin, Calendar } from 'lucide-react';
import { scheduleGoogleCalendarMeeting, contactInfo } from '../utils/calendar';

interface ContactSectionProps {
  onPageChange?: (page: string) => void;
}

export default function ContactSection({ onPageChange }: ContactSectionProps) {
  const handleScheduleMeeting = () => {
    scheduleGoogleCalendarMeeting();
  };

  const handleLinkedInContact = () => {
    window.open(contactInfo.linkedin, '_blank');
  };

  return (
    <section className="py-20 px-6 lg:px-8 bg-gray-900/50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Vamos <span className="text-yellow-400">Conversar</span>?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Se você chegou até aqui, provavelmente já entendeu que não trabalho com todo mundo. 
          Trabalho com quem está pronto para a transformação real.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button 
            onClick={handleScheduleMeeting}
            className="flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
          >
            <Calendar size={20} />
            Agendar Diagnóstico
          </button>
          
          <button 
            onClick={handleLinkedInContact}
            className="flex items-center gap-2 border border-yellow-400 text-yellow-400 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 hover:text-black transition-colors"
          >
            <Linkedin size={20} />
            LinkedIn
          </button>
        </div>
        
        {onPageChange && (
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => onPageChange('portfolio')}
              className="border border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 hover:text-white transition-colors"
            >
              Ver Portfolio
            </button>
            <button 
              onClick={() => onPageChange('blog')}
              className="border border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 hover:text-white transition-colors"
            >
              Ler Blog
            </button>
          </div>
        )}
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-sm">
            <strong>Email:</strong> {contactInfo.email} | 
            <strong> LinkedIn:</strong>{' '}
            <a 
              href={contactInfo.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              /in/angarciabr
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}