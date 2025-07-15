import React from 'react';
import { Quote, Target, Eye, Heart, Compass, Zap, Crown } from 'lucide-react';
import { scheduleGoogleCalendarMeeting } from '../utils/calendar';
import ContactSection from './ContactSection';

interface BrandingPageProps {
  onPageChange?: (page: string) => void;
}

export default function BrandingPage({ onPageChange }: BrandingPageProps) {
  const handleScheduleMeeting = () => {
    scheduleGoogleCalendarMeeting();
  };

  const manifestoSections = [
    {
      title: "O corte inicial",
      content: "Não estou aqui para entreter. Estou aqui para estruturar. Não sou coach. Não sou guru. Não vendo atalhos. Falo de coerência, legado e sistemas que não colapsam sob pressão."
    },
    {
      title: "O que vi de perto",
      content: "Já vi gente brilhante ser engolida por processos frágeis. Líderes exaustos tentando escalar o caos. Estratégias que pareciam sólidas — mas eram só medo bem apresentado. E foi aí que entendi: Pensar bem é liderar melhor."
    },
    {
      title: "A lógica da entrega",
      content: "Não aumento faturamento com mágica. Eu elimino a dependência da sorte. Trago método. Governança. Filosofia aplicada. Mas acima de tudo: clareza."
    },
    {
      title: "Para quem é isso?",
      content: "Trabalho com líderes que querem parar de apagar incêndio. Com empresas que cansaram de improvisar. Gente que prefere o desconforto da verdade à ilusão confortável. Só caminho com quem escolhe o difícil que liberta."
    },
    {
      title: "O que fica",
      content: "Toda estrutura que crio é pra durar. Não entrego moda. Entrego base. Se for pra fazer, que seja com raiz. Se for pra crescer, que seja com sentido."
    },
    {
      title: "A assinatura",
      content: "Esse é meu branding. Essa é minha marca. Esse é o tipo de rastro que eu deixo quando passo."
    }
  ];

  const identityElements = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Missão",
      content: "Estruturar empresas para que cresçam com propósito, eliminando a dependência do improviso e construindo bases sólidas para o futuro."
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Visão",
      content: "Ser referência em transformação estratégica, criando um mundo onde empresas operam com clareza, método e essência preservada."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Valores",
      content: "Coerência, transparência, excelência operacional, sustentabilidade, responsabilidade e compromisso com resultados duradouros."
    },
    {
      icon: <Compass className="w-8 h-8" />,
      title: "Propósito",
      content: "Transformar a forma como líderes pensam e empresas operam, criando legados que transcendem gerações."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-16">
      {/* Hero Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            Branding <span className="text-yellow-400">Book</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            A arquitetura de quem decidiu ser o que entrega. Não feito para agradar. Feito para alinhar.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => onPageChange?.('portfolio')}
              className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
            >
              🧭 Ver Frameworks
            </button>
            <button 
              onClick={() => onPageChange?.('manifesto')}
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors"
            >
              📘 Ler Manifesto
            </button>
            <button 
              onClick={handleScheduleMeeting}
              className="border border-yellow-400 text-yellow-400 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 hover:text-black transition-colors"
            >
              💡 Agendar Diagnóstico
            </button>
          </div>
        </div>
      </section>

      {/* Identity Section */}
      <section className="py-20 px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Identidade <span className="text-yellow-400">Pessoal</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {identityElements.map((element, index) => (
              <div key={index} className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
                <div className="text-yellow-400 mb-4">
                  {element.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{element.title}</h3>
                <p className="text-gray-300 leading-relaxed">{element.content}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <blockquote className="text-2xl md:text-3xl font-bold text-yellow-400 italic">
              "Não escalo promessas. Escalo estruturas."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Manifesto de <span className="text-yellow-400">Branding</span>
          </h2>
          
          <div className="space-y-12">
            {manifestoSections.map((section, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-800/30 to-gray-900/30 p-8 rounded-xl border-l-4 border-yellow-400">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-yellow-400">{section.title}</h3>
                    <p className="text-gray-200 leading-relaxed text-lg">{section.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="py-20 px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Princípios <span className="text-yellow-400">Fundamentais</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Clareza Absoluta</h3>
              <p className="text-gray-300">Elimino ambiguidades e trago transparência total aos processos e decisões.</p>
            </div>
            <div className="text-center">
              <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Excelência Operacional</h3>
              <p className="text-gray-300">Cada estrutura criada é pensada para durar e evoluir com a empresa.</p>
            </div>
            <div className="text-center">
              <Quote className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Legado Sustentável</h3>
              <p className="text-gray-300">Construo bases que transcendem tendências e resistem ao tempo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Pronto para <span className="text-yellow-400">Estruturar</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Se você chegou até aqui, já entendeu que não trabalho com quem quer atalhos. 
            Trabalho com quem quer resultados duradouros.
          </p>
          <button 
            onClick={handleScheduleMeeting}
            className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors"
          >
            Vamos Conversar
          </button>
        </div>
      </section>
      
      {/* Contact Section */}
      <ContactSection onPageChange={onPageChange} />
    </div>
  );
}