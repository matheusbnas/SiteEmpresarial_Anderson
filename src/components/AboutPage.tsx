import React from "react";
import {
  Award,
  BookOpen,
  Users,
  TrendingUp,
  Globe,
  Briefcase,
} from "lucide-react";
import ContactSection from "./ContactSection";

interface AboutPageProps {
  onPageChange?: (page: string) => void;
}

export default function AboutPage({ onPageChange }: AboutPageProps) {
  // Remover a timeline, pois não é mais usada

  const expertise = [
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Gestão Estratégica",
      level: "Expert",
      description:
        "12+ anos desenvolvendo e implementando estratégias de negócio",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Liderança Organizacional",
      level: "Avançado",
      description:
        "Formação e desenvolvimento de líderes em diversos segmentos",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Transformação Digital",
      level: "Especialista",
      description: "Condução de processos de modernização e inovação",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Governança Corporativa",
      level: "Master",
      description: "Implementação de estruturas de governança robustas",
    },
  ];

  const achievements = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Top 10 Consultores Brasil 2023",
      organization: "Revista Exame",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Autor de 3 Livros sobre Gestão",
      organization: "Editora Campus",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Speaker em 50+ Eventos",
      organization: "Conferências Nacionais",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Mentor de 200+ Executivos",
      organization: "Programa de Mentoria",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-16">
      {/* Hero Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-8">
                Sobre <span className="text-yellow-400">Anderson Garcia</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
                Mais de uma década dedicada a transformar a forma como empresas
                pensam, operam e crescem. Especialista em estruturação
                empresarial e governança corporativa.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold">
                  Mais de 25 anos de experiência
                </div>
                <div className="bg-gray-800 text-white px-4 py-2 rounded-lg">
                  150+ Empresas Transformadas
                </div>
                <div className="bg-gray-800 text-white px-4 py-2 rounded-lg">
                  85% Taxa de Sucesso
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-400/20 to-gray-800/20 p-8 rounded-2xl border border-gray-700">
                <blockquote className="text-2xl italic text-gray-200 mb-4">
                  "Não construo carreiras. Construo legados. Não vendo soluções.
                  Entrego transformações."
                </blockquote>
                <cite className="text-yellow-400 font-semibold">
                  - Anderson Garcia
                </cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Filosofia de <span className="text-yellow-400">Trabalho</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">
                Estrutura
              </h3>
              <p className="text-gray-300">
                Toda solução deve ter base sólida e ser construída para durar,
                não para impressionar.
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">
                Essência
              </h3>
              <p className="text-gray-300">
                Preservar a identidade da empresa enquanto promove sua evolução
                e crescimento.
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">
                Execução
              </h3>
              <p className="text-gray-300">
                Estratégias sem execução são apenas sonhos. Foco total na
                implementação prática.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Sobre minha <span className="text-yellow-400">Jornada</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed text-center mb-8">
            Minha jornada começou desenvolvendo aplicativos e liderando equipes
            para criar soluções personalizadas que ajudavam clientes a vender
            melhor. Ouvindo cada história, entrando no ambiente de cada cliente,
            aprendi cedo que tecnologia só faz sentido quando está a serviço do
            negócio.
          </p>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed text-center mb-8">
            Essa visão me levou à Oracle, onde me aprofundei na gestão de
            projetos. Foram anos percorrendo mais de 100 empresas, dos mais
            variados setores, para adaptar processos e implementar ERPs que
            realmente fizessem sentido para cada realidade. Aprendi, testei e
            refinei minha habilidade central: traduzir desafios em soluções
            práticas, com as melhores práticas do mercado, sem perder a essência
            do cliente.
          </p>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed text-center mb-8">
            Com o tempo, minha atuação evoluiu para a governança e operações
            globais, onde trabalhei lado a lado com diretores executivos,
            ajudando-os a planejar estratégias, corrigir desvios, gerenciar
            orçamentos e alinhar operações para maximizar resultados. Contribuí
            para transformar a América Latina em uma das regiões de maior
            destaque dentro da companhia, sempre com foco em eficiência, ética e
            resultados concretos.
          </p>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed text-center mb-8">
            Em seguida, assumi responsabilidades ainda maiores na governança
            global: definindo práticas de transparência, padronizando operações
            em todas as regiões, liderando grandes implementações mundiais e
            garantindo que cada processo tivesse impacto positivo — não só nos
            números, mas na cultura organizacional.
          </p>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed text-center mb-8">
            Essa trajetória me levou a criar a Profit, uma empresa que
            materializa tudo que vivi e aprendi. Ela é mais do que uma
            consultoria: é um laboratório vivo que aplica, em si mesma, as
            melhores práticas que oferece aos clientes — combinando tecnologia,
            governança, estratégia e filosofia prática para criar soluções
            únicas.
          </p>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed text-center">
            Hoje, ajudo organizações e líderes a atravessarem momentos críticos,
            transformando complexidade em clareza, caos em cadência e boas
            intenções em resultados consistentes.
          </p>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Áreas de <span className="text-yellow-400">Expertise</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {expertise.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-800/50 p-6 rounded-xl border border-gray-700"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-yellow-400">{skill.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold">{skill.title}</h3>
                    <span className="text-yellow-400 text-sm font-semibold">
                      {skill.level}
                    </span>
                  </div>
                </div>
                <p className="text-gray-300">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Reconhecimentos e{" "}
            <span className="text-yellow-400">Conquistas</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-gray-700 flex items-center gap-4"
              >
                <div className="text-yellow-400">{achievement.icon}</div>
                <div>
                  <h3 className="font-bold text-white">{achievement.title}</h3>
                  <p className="text-gray-400 text-sm">
                    {achievement.organization}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection onPageChange={onPageChange} />
    </div>
  );
}
