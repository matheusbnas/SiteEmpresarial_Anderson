import React from 'react';
import { Target, Users, TrendingUp, Shield, Zap, Building, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { scheduleGoogleCalendarMeeting } from '../utils/calendar';
import ContactSection from './ContactSection';

interface PortfolioPageProps {
  onPageChange?: (page: string) => void;
}

export default function PortfolioPage({ onPageChange }: PortfolioPageProps) {
  const services = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Governança Essencial",
      problem: "Empresas em crescimento muitas vezes operam com decisões dispersas, sem clareza de papéis ou rituais de governança. Isso gera confusão, retrabalho e lentidão estratégica.",
      benefit: "Estrutura clara de tomada de decisão, aumento da confiança entre áreas e velocidade estratégica sem perder coerência institucional.",
      method: "Implantação de mapa de governança, definição de cadência de reuniões, rituais de alinhamento e integração com conselhos ou lideranças chave. Tudo com base nos frameworks RAMAL, VRIO e Service Blueprint.",
      cta: "Vamos estruturar a governança que sustenta seu crescimento."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Mentoria Executiva",
      problem: "Líderes maduros em transição ou sobrecarga costumam se sentir isolados, desorientados e sem espaço seguro para reflexão estratégica.",
      benefit: "Clareza para decisões críticas, suporte emocional com lógica estruturada e aceleração de próximos passos com segurança e propósito.",
      method: "Sessões individuais com frameworks de decisão, provocações filosóficas e planos de ação táticos com metas claras por fase.",
      cta: "Agende sua sessão de mentoria estratégica e recomece com profundidade."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Estratégia Aplicada",
      problem: "Muitas empresas têm planos estratégicos que ficam na gaveta, sem conexão real com a operação diária e sem mecanismos de execução efetivos.",
      benefit: "Estratégia que sai do papel e vira realidade, com indicadores claros, responsabilidades definidas e ritmo de execução sustentável.",
      method: "Desenvolvimento de roadmap estratégico integrado, definição de OKRs por área, criação de rituais de acompanhamento e ajuste contínuo baseado em resultados.",
      cta: "Transforme sua estratégia em resultados concretos."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Transformação Operacional",
      problem: "Processos fragmentados, dependência excessiva de pessoas-chave e falta de padronização geram ineficiência e limitam o crescimento sustentável.",
      benefit: "Operação enxuta, previsível e escalável, com redução de custos operacionais e aumento significativo da produtividade das equipes.",
      method: "Mapeamento completo de processos críticos, implementação de automações estratégicas, criação de manuais operacionais e treinamento de equipes para autonomia.",
      cta: "Otimize sua operação para crescer sem limites."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Gestão de Crises",
      problem: "Crises expõem fragilidades estruturais e muitas empresas não têm protocolos claros para navegar momentos críticos sem perder a essência.",
      benefit: "Capacidade de resposta rápida e estruturada, preservação da reputação e transformação de crises em oportunidades de fortalecimento organizacional.",
      method: "Desenvolvimento de planos de contingência, criação de comitês de crise, treinamento de lideranças e implementação de comunicação estratégica.",
      cta: "Prepare-se para transformar crises em oportunidades."
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Estruturação para Investimento",
      problem: "Empresas com potencial de crescimento frequentemente carecem da estrutura e governança necessárias para atrair e gerenciar capital externo.",
      benefit: "Organização preparada para due diligence, processos auditáveis e governança que gera confiança em investidores e parceiros estratégicos.",
      method: "Auditoria completa de estruturas, adequação de governança corporativa, criação de relatórios gerenciais e preparação de documentação para investidores.",
      cta: "Estruture sua empresa para o próximo nível de crescimento."
    }
  ];

  const cases = [
    {
      title: "A Reinvenção da Profit",
      description: "Aplicamos na própria Profit tudo que entregamos para os clientes. Desde a governança até o ciclo comercial, o que você vê aqui é vivido na prática.",
      challenge: "Escalar com propósito e coerência.",
      solution: "Implantação completa da metodologia, incluindo dashboards, governança e filosofia aplicada.",
      result: "Estrutura enxuta, confiável e preparada para crescer com capital externo."
    },
    {
      title: "Mentoria de Transição com Executiva Sênior",
      description: "Ela chegou esgotada e sem clareza. Saiu com um plano de três etapas e coragem para recomeçar do próprio jeito.",
      challenge: "Liderança em transição de carreira e sobrecarga emocional.",
      solution: "Sessões estruturadas de mentoria com frameworks de decisão e suporte estratégico.",
      result: "Clareza de propósito, plano de ação definido e confiança para novos desafios."
    },
    {
      title: "Auditoria Estratégica em Grupo Educacional",
      description: "Acharam que era só um ajuste operacional. Mas o buraco era ético. Mapear os riscos invisíveis salvou a reputação da marca.",
      challenge: "Problemas operacionais mascarando questões éticas profundas.",
      solution: "Auditoria completa com foco em riscos reputacionais e compliance.",
      result: "Identificação e correção de vulnerabilidades críticas, preservação da marca."
    }
  ];

  const insights = [
    {
      title: "Quando Voltar é a Prova Máxima de Maturidade",
      description: "O retorno à disciplina como sinal de crescimento real.",
      category: "Filosofia Aplicada"
    },
    {
      title: "Antifragilidade Organizacional",
      description: "Como construir empresas que se fortalecem com a pressão.",
      category: "Estratégia"
    },
    {
      title: "A Lógica da Simplicidade Complexa",
      description: "Por que as melhores soluções parecem óbvias depois de implementadas.",
      category: "Liderança"
    },
    {
      title: "Foco Produtivo vs. Ativismo Corporativo",
      description: "A diferença entre estar ocupado e estar produzindo resultados.",
      category: "Produtividade"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-16">
      {/* Hero Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            Portfolio de <span className="text-yellow-400">Serviços</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Soluções estruturadas para empresas que querem parar de improvisar e começar a construir legado.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Serviços <span className="text-yellow-400">Estratégicos</span>
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-yellow-400/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-yellow-400">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <span>🚨</span> Problema Típico Enfrentado
                    </h4>
                    <p className="text-gray-300 leading-relaxed">{service.problem}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <span>✅</span> Benefício Direto
                    </h4>
                    <p className="text-gray-300 leading-relaxed">{service.benefit}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <span>⚙️</span> Método Aplicado
                    </h4>
                    <p className="text-gray-300 leading-relaxed">{service.method}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <button 
                      onClick={() => scheduleGoogleCalendarMeeting(service.title)}
                      className="flex items-center gap-2 text-yellow-400 font-semibold hover:text-yellow-300 transition-colors"
                    >
                      {service.cta}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Prova Social — <span className="text-yellow-400">O Método em Ação</span>
          </h2>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            Resultados reais de transformações que fizeram a diferença na prática.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {cases.map((case_, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-xl border border-gray-700">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-yellow-400 font-bold">📍</span>
                  <h3 className="text-xl font-bold">Caso {index + 1}</h3>
                </div>
                
                <h4 className="text-lg font-semibold mb-3 text-yellow-400">{case_.title}</h4>
                <p className="text-gray-300 mb-6 italic">"{case_.description}"</p>
                
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold">🎯 Desafio:</span>
                    <span className="text-gray-300 ml-2">{case_.challenge}</span>
                  </div>
                  <div>
                    <span className="font-semibold">💡 Solução:</span>
                    <span className="text-gray-300 ml-2">{case_.solution}</span>
                  </div>
                  <div>
                    <span className="font-semibold">🚀 Resultado:</span>
                    <span className="text-gray-300 ml-2">{case_.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-20 px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Insights <span className="text-yellow-400">Estratégicos</span>
          </h2>
          <p className="text-xl text-gray-300 text-center mb-16">
            Reflexões que Guiam Líderes de Verdade
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {insights.map((insight, index) => (
              <div 
                key={index} 
                onClick={() => onPageChange?.('blog')}
                className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-yellow-400/50 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold">
                    {insight.category}
                  </span>
                  <ArrowRight className="text-gray-400 group-hover:text-yellow-400 transition-colors" size={16} />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-400 transition-colors">
                  {insight.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {insight.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={() => onPageChange?.('blog')}
              className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
            >
              Ver Todos os Insights
            </button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Resultados que <span className="text-yellow-400">Falam</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <div className="text-3xl font-bold text-yellow-400 mb-2">150+</div>
              <div className="text-gray-300">Empresas Transformadas</div>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <div className="text-3xl font-bold text-yellow-400 mb-2">85%</div>
              <div className="text-gray-300">Aumento Médio de Eficiência</div>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <div className="text-3xl font-bold text-yellow-400 mb-2">12</div>
              <div className="text-gray-300">Anos de Experiência</div>
            </div>
          </div>
          
          <blockquote className="text-xl md:text-2xl italic text-gray-300 border-l-4 border-yellow-400 pl-6">
            "Não escalo promessas. Escalo estruturas."
          </blockquote>
        </div>
      </section>
      
      {/* Contact Section */}
      <ContactSection onPageChange={onPageChange} />
    </div>
  );
}