import React from "react";
import { Compass, BookOpen, Lightbulb, Check } from "lucide-react";
import { scheduleGoogleCalendarMeeting } from "../utils/calendar";
import ContactSection from "./ContactSection";

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export default function HomePage({ onPageChange }: HomePageProps) {
  const handleScheduleMeeting = () => {
    scheduleGoogleCalendarMeeting();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-start">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/mathec.png)",
            filter: "brightness(0.4)",
          }}
        />
        <div className="relative z-10 w-full px-6 lg:px-12">
          <div className="max-w-3xl">
            <div className="mb-8">
              <p className="text-lg text-gray-300 italic mb-4">
                Transformação estratégica com essência
              </p>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-8">BEM VINDO,</h1>

            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              Você está no lugar certo se está procurando alguém que possa:
            </h2>

            <ul className="space-y-4 mb-12 text-lg md:text-xl text-gray-200">
              {[
                "Implementar governança real e decisões com peso",
                "Tirar sua operação do improviso crônico",
                "Crescer com propósito – sem perder a essência",
                "Estruturar sua empresa para durar, ser mais rentável",
                "Aconselhar sua empresa em tomada de decisões estratégicas",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check
                    className="text-yellow-400 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              Entenda mais sobre como fazemos essa transformação
            </h2>

            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={() => onPageChange("portfolio")}
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors"
              >
                Portfólio
              </button>
              <button
                onClick={() => onPageChange("branding")}
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors"
              >
                Branding
              </button>
              <button
                onClick={() => onPageChange("about")}
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors"
              >
                Sobre Eu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="relative min-h-screen flex items-center justify-start">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/fundo_teia.png)",
            filter: "brightness(0.4)",
          }}
        />
        <div className="relative z-10 w-full px-6 lg:px-12">
          <div className="max-w-3xl">
            <div className="mb-6">
              <p className="text-lg text-gray-300 italic">
                Transformação estratégica com essência
              </p>
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold mb-6 leading-tight">
              O QUE VOCÊ VÊ AQUI NÃO É UM CURRÍCULO.
              <br />
              <span className="text-yellow-400">
                É A ARQUITETURA DE QUEM DECIDIU SER O QUE ENTREGA.
              </span>
            </h2>

            <div className="mb-12">
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8">
                Esse é meu Branding Book. Não feito para agradar. Feito para
                alinhar.
                <br />
                Aqui você vai entender quem sou, por que faço o que faço — e com
                quem faço questão de caminhar.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mb-16">
              <button
                onClick={() => onPageChange("portfolio")}
                className="flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
              >
                <Compass size={20} />
                Ver Frameworks
              </button>
              <button
                onClick={() => onPageChange("manifesto")}
                className="flex items-center gap-2 border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors"
              >
                <BookOpen size={20} />
                Ler Manifesto
              </button>
              <button
                onClick={handleScheduleMeeting}
                className="flex items-center gap-2 border border-yellow-400 text-yellow-400 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 hover:text-black transition-colors"
              >
                <Lightbulb size={20} />
                Agendar Diagnóstico
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection onPageChange={onPageChange} />
    </div>
  );
}
