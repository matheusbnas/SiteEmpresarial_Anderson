/*
  # Create blog posts table - Manual Migration
  
  Run this SQL in your Supabase Studio SQL Editor to create the blog_posts table.
  
  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `content` (text, required) 
      - `excerpt` (text, optional)
      - `slug` (text, unique, required)
      - `published_at` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `author` (text, default 'Anderson Garcia')
      - `tags` (text array)
      - `linkedin_url` (text, optional)
      - `featured_image` (text, optional)

  2. Security
    - Enable RLS on `blog_posts` table
    - Add policy for public read access to published posts
    - Add policy for authenticated users to manage posts

  3. Performance
    - Add indexes for published_at, slug, and tags
    - Add trigger for automatic updated_at timestamp
*/

-- Drop table if it exists (to handle any partial creation)
DROP TABLE IF EXISTS blog_posts CASCADE;

-- Create the blog_posts table
CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  slug text UNIQUE NOT NULL,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  author text DEFAULT 'Anderson Garcia',
  tags text[] DEFAULT '{}',
  linkedin_url text,
  featured_image text
);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read published blog posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (published_at IS NOT NULL AND published_at <= now());

CREATE POLICY "Authenticated users can manage blog posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_tags ON blog_posts USING GIN(tags);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data (optional)
INSERT INTO blog_posts (title, content, excerpt, slug, author, tags, linkedin_url) VALUES
(
  'Bem-vindo ao Blog Estratégico',
  '<p>Este é o primeiro post do nosso blog estratégico. Aqui você encontrará insights valiosos sobre liderança, estratégia empresarial e transformação organizacional.</p><p>Nosso objetivo é compartilhar conhecimento prático que pode ser aplicado imediatamente em sua empresa.</p>',
  'Primeiro post do blog com uma introdução aos temas que serão abordados.',
  'bem-vindo-ao-blog-estrategico',
  'Anderson Garcia',
  ARRAY['estratégia', 'liderança', 'transformação'],
  'https://www.linkedin.com/in/angarciabr/'
),
(
  'Os 5 Pilares da Liderança Estratégica',
  '<h2>1. Visão Clara</h2><p>Um líder estratégico deve ter uma visão clara do futuro da organização.</p><h2>2. Comunicação Efetiva</h2><p>A capacidade de comunicar a estratégia de forma clara e inspiradora.</p><h2>3. Tomada de Decisão</h2><p>Habilidade para tomar decisões difíceis com base em dados e intuição.</p><h2>4. Adaptabilidade</h2><p>Flexibilidade para ajustar a estratégia conforme necessário.</p><h2>5. Desenvolvimento de Pessoas</h2><p>Investir no crescimento da equipe é fundamental para o sucesso.</p>',
  'Descubra os cinco pilares fundamentais que todo líder estratégico deve dominar.',
  'cinco-pilares-lideranca-estrategica',
  'Anderson Garcia',
  ARRAY['liderança', 'estratégia', 'gestão', 'desenvolvimento'],
  'https://www.linkedin.com/in/angarciabr/'
);