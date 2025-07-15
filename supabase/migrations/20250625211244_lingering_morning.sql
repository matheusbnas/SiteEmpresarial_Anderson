/*
  # Correção da estrutura do banco de dados

  1. Limpeza e reorganização
    - Remove tabelas duplicadas ou problemáticas
    - Recria a estrutura de forma limpa
    - Garante que não há conflitos

  2. Tabela blog_posts
    - Estrutura otimizada e consistente
    - Campos obrigatórios e opcionais bem definidos
    - Índices para performance
    - Triggers para automação

  3. Segurança
    - RLS habilitado corretamente
    - Políticas de acesso bem definidas
    - Separação entre acesso público e administrativo

  4. Dados de exemplo
    - Posts iniciais para demonstração
    - Conteúdo em português
    - Tags e categorias relevantes
*/

-- Limpar estrutura existente se houver problemas
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Criar função para atualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Criar tabela blog_posts com estrutura otimizada
CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL CHECK (length(title) > 0),
  content text NOT NULL CHECK (length(content) > 0),
  excerpt text CHECK (length(excerpt) > 0),
  slug text UNIQUE NOT NULL CHECK (length(slug) > 0),
  published_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  author text DEFAULT 'Anderson Garcia' NOT NULL,
  tags text[] DEFAULT '{}' NOT NULL,
  linkedin_url text CHECK (linkedin_url IS NULL OR linkedin_url ~ '^https?://'),
  featured_image text CHECK (featured_image IS NULL OR featured_image ~ '^https?://')
);

-- Habilitar Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Política para leitura pública de posts publicados
CREATE POLICY "Public can read published posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (published_at IS NOT NULL AND published_at <= now());

-- Política para usuários autenticados gerenciarem posts
CREATE POLICY "Authenticated users can manage posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Criar índices para performance
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC) WHERE published_at IS NOT NULL;
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_tags ON blog_posts USING GIN(tags);
CREATE INDEX idx_blog_posts_author ON blog_posts(author);

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Inserir dados de exemplo
INSERT INTO blog_posts (
  title, 
  content, 
  excerpt, 
  slug, 
  author, 
  tags, 
  linkedin_url,
  published_at
) VALUES 
(
  'Bem-vindo ao Blog Estratégico de Anderson Garcia',
  '<h2>Transformação estratégica com essência</h2>
  
  <p>Este é o espaço onde compartilho insights, reflexões e estratégias para líderes que querem transformar suas empresas com propósito. Aqui você não encontrará receitas prontas ou soluções mágicas.</p>
  
  <p>O que você vai encontrar:</p>
  <ul>
    <li><strong>Análises profundas</strong> sobre liderança e gestão estratégica</li>
    <li><strong>Cases reais</strong> de transformação organizacional</li>
    <li><strong>Frameworks práticos</strong> para estruturação empresarial</li>
    <li><strong>Reflexões</strong> sobre governança corporativa</li>
  </ul>
  
  <p>Não estou aqui para entreter. Estou aqui para estruturar. Se você chegou até aqui, provavelmente já entendeu que não trabalho com quem quer atalhos. Trabalho com quem quer resultados duradouros.</p>
  
  <blockquote>
    <p>"Não escalo promessas. Escalo estruturas."</p>
  </blockquote>
  
  <p>Seja bem-vindo a uma jornada de transformação real.</p>',
  'Primeiro post do blog estratégico. Conheça a proposta e o que você pode esperar deste espaço de conhecimento.',
  'bem-vindo-blog-estrategico',
  'Anderson Garcia',
  ARRAY['estratégia', 'liderança', 'transformação', 'governança'],
  'https://www.linkedin.com/in/angarciabr/',
  now()
),
(
  'Os 5 Pilares da Liderança Estratégica Moderna',
  '<h2>A liderança que constrói legados</h2>
  
  <p>Depois de mais de uma década trabalhando com líderes de diferentes segmentos, identifiquei cinco pilares fundamentais que separam quem apenas ocupa um cargo de quem realmente lidera com propósito.</p>
  
  <h3>1. Visão Sistêmica</h3>
  <p>Um líder estratégico não vê apenas partes isoladas. Ele compreende como cada elemento da organização se conecta e impacta o todo. Isso significa:</p>
  <ul>
    <li>Entender as interdependências entre departamentos</li>
    <li>Antecipar consequências de decisões</li>
    <li>Pensar em múltiplos horizontes temporais</li>
  </ul>
  
  <h3>2. Comunicação com Propósito</h3>
  <p>Não basta ter uma estratégia brilhante se ela não for compreendida e abraçada pela equipe. A comunicação estratégica é:</p>
  <ul>
    <li>Clara e objetiva</li>
    <li>Consistente em todos os níveis</li>
    <li>Inspiradora e mobilizadora</li>
  </ul>
  
  <h3>3. Tomada de Decisão Baseada em Dados e Intuição</h3>
  <p>O equilíbrio entre análise racional e experiência acumulada. Isso envolve:</p>
  <ul>
    <li>Coletar e interpretar dados relevantes</li>
    <li>Considerar fatores qualitativos</li>
    <li>Decidir com velocidade adequada</li>
  </ul>
  
  <h3>4. Adaptabilidade Estruturada</h3>
  <p>Flexibilidade não significa falta de direção. Significa ter estruturas que permitem ajustes sem perder o rumo:</p>
  <ul>
    <li>Processos que suportam mudanças</li>
    <li>Cultura de aprendizado contínuo</li>
    <li>Capacidade de pivotar quando necessário</li>
  </ul>
  
  <h3>5. Desenvolvimento de Pessoas como Estratégia</h3>
  <p>O crescimento sustentável só acontece quando as pessoas crescem junto. Isso significa:</p>
  <ul>
    <li>Investir no desenvolvimento da equipe</li>
    <li>Criar sucessores, não dependentes</li>
    <li>Construir uma cultura de alta performance</li>
  </ul>
  
  <h2>A implementação prática</h2>
  <p>Estes pilares não são conceitos abstratos. São competências que podem ser desenvolvidas através de:</p>
  <ul>
    <li>Autoavaliação honesta</li>
    <li>Feedback estruturado</li>
    <li>Prática deliberada</li>
    <li>Mentoria especializada</li>
  </ul>
  
  <p>Lembre-se: liderança estratégica não é um cargo. É uma escolha diária de como você decide impactar sua organização e as pessoas ao seu redor.</p>',
  'Descubra os cinco pilares fundamentais que todo líder estratégico deve dominar para construir organizações duradouras.',
  'cinco-pilares-lideranca-estrategica',
  'Anderson Garcia',
  ARRAY['liderança', 'estratégia', 'gestão', 'desenvolvimento', 'governança'],
  'https://www.linkedin.com/in/angarciabr/',
  now() - interval '2 days'
),
(
  'Governança Corporativa: Além do Compliance',
  '<h2>Estruturas que realmente funcionam</h2>
  
  <p>Governança corporativa virou buzzword. Todo mundo fala, poucos realmente implementam. E quando implementam, muitas vezes focam apenas no compliance, perdendo a essência do que realmente importa.</p>
  
  <h3>O que governança NÃO é</h3>
  <ul>
    <li>Uma pilha de documentos para auditoria</li>
    <li>Burocracia que trava decisões</li>
    <li>Modismo para impressionar investidores</li>
    <li>Cópia de estruturas de outras empresas</li>
  </ul>
  
  <h3>O que governança realmente é</h3>
  <p>Governança é a arquitetura de como sua empresa toma decisões, aloca recursos e se responsabiliza por resultados. É sobre criar clareza em três dimensões fundamentais:</p>
  
  <h4>1. Clareza de Papéis</h4>
  <p>Quem decide o quê, quando e como. Isso inclui:</p>
  <ul>
    <li>Matriz de responsabilidades clara</li>
    <li>Limites de alçada bem definidos</li>
    <li>Fluxos de escalação estruturados</li>
  </ul>
  
  <h4>2. Clareza de Processos</h4>
  <p>Como as decisões são tomadas e executadas:</p>
  <ul>
    <li>Critérios objetivos para decisões</li>
    <li>Pontos de controle e validação</li>
    <li>Mecanismos de feedback e ajuste</li>
  </ul>
  
  <h4>3. Clareza de Accountability</h4>
  <p>Como medimos e respondemos por resultados:</p>
  <ul>
    <li>KPIs que realmente importam</li>
    <li>Consequências claras para performance</li>
    <li>Reconhecimento baseado em mérito</li>
  </ul>
  
  <h3>Implementação prática</h3>
  <p>A governança efetiva começa pequena e evolui. Minha abordagem segue três fases:</p>
  
  <h4>Fase 1: Diagnóstico</h4>
  <ul>
    <li>Mapeamento de decisões críticas</li>
    <li>Identificação de gargalos atuais</li>
    <li>Análise de riscos operacionais</li>
  </ul>
  
  <h4>Fase 2: Design</h4>
  <ul>
    <li>Estrutura de governança customizada</li>
    <li>Definição de políticas essenciais</li>
    <li>Criação de ferramentas de gestão</li>
  </ul>
  
  <h4>Fase 3: Implementação</h4>
  <ul>
    <li>Rollout gradual e monitorado</li>
    <li>Treinamento das equipes</li>
    <li>Ajustes baseados na prática</li>
  </ul>
  
  <h3>O resultado</h3>
  <p>Quando bem implementada, a governança não trava a empresa. Ela acelera. Porque elimina a dependência de heróis, reduz retrabalho e cria previsibilidade.</p>
  
  <p>Lembre-se: governança não é sobre controle. É sobre clareza. E clareza liberta.</p>',
  'Entenda como implementar governança corporativa que realmente funciona, indo além do compliance para criar estruturas que aceleram resultados.',
  'governanca-corporativa-alem-compliance',
  'Anderson Garcia',
  ARRAY['governança', 'compliance', 'estrutura', 'processos', 'gestão'],
  'https://www.linkedin.com/in/angarciabr/',
  now() - interval '5 days'
);

-- Verificar se a estrutura foi criada corretamente
DO $$
BEGIN
  -- Verificar se a tabela existe
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'blog_posts') THEN
    RAISE EXCEPTION 'Tabela blog_posts não foi criada corretamente';
  END IF;
  
  -- Verificar se RLS está habilitado
  IF NOT EXISTS (
    SELECT FROM pg_tables 
    WHERE tablename = 'blog_posts' 
    AND rowsecurity = true
  ) THEN
    RAISE EXCEPTION 'RLS não está habilitado na tabela blog_posts';
  END IF;
  
  RAISE NOTICE 'Estrutura do banco de dados criada com sucesso!';
END $$;