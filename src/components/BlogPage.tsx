import React, { useState, useEffect } from 'react';
import { Calendar, User, Tag, ExternalLink, ArrowLeft, Search } from 'lucide-react';
import { supabase, BlogPost } from '../lib/supabase';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      setError('Erro ao carregar posts do blog');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-black text-white pt-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            Voltar ao Blog
          </button>
          
          <article>
            {selectedPost.featured_image && (
              <img
                src={selectedPost.featured_image}
                alt={selectedPost.title}
                className="w-full h-64 object-cover rounded-xl mb-8"
              />
            )}
            
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{selectedPost.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-8 text-gray-400">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{selectedPost.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{formatDate(selectedPost.published_at)}</span>
              </div>
              {selectedPost.linkedin_url && (
                <a
                  href={selectedPost.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  <ExternalLink size={16} />
                  Ver no LinkedIn
                </a>
              )}
            </div>
            
            {selectedPost.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedPost.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-800 text-yellow-400 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            <div 
              className="prose prose-invert prose-yellow max-w-none text-gray-200 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: selectedPost.content }}
            />
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-16">
      {/* Hero Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            Blog <span className="text-yellow-400">Estratégico</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            Insights, reflexões e estratégias para líderes que querem transformar suas empresas com propósito.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
              <p className="text-gray-400 mt-4">Carregando posts...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400 mb-4">{error}</p>
              <p className="text-gray-400 mb-6">
                Para ver o blog funcionando, conecte-se ao Supabase clicando no botão no topo direito.
              </p>
              <button
                onClick={fetchPosts}
                className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
              >
                Tentar Novamente
              </button>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              {searchTerm ? (
                <div>
                  <p className="text-gray-400 text-xl mb-4">
                    Nenhum post encontrado para "{searchTerm}"
                  </p>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    Limpar busca
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-gray-400 text-xl mb-4">
                    Em breve, novos conteúdos estratégicos serão publicados aqui.
                  </p>
                  <p className="text-gray-500 mb-6">
                    Acompanhe também no{' '}
                    <a
                      href="https://www.linkedin.com/in/angarciabr/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-400 hover:text-yellow-300 transition-colors"
                    >
                      LinkedIn
                    </a>
                  </p>
                  <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 max-w-md mx-auto">
                    <h3 className="text-lg font-semibold mb-2">Como adicionar posts?</h3>
                    <p className="text-gray-400 text-sm">
                      Conecte-se ao Supabase e use o painel administrativo para adicionar novos posts ao blog.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden hover:border-yellow-400/50 transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedPost(post)}
                >
                  {post.featured_image && (
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{formatDate(post.published_at)}</span>
                      </div>
                      
                      {post.linkedin_url && (
                        <div className="flex items-center gap-1 text-yellow-400">
                          <ExternalLink size={14} />
                          <span>LinkedIn</span>
                        </div>
                      )}
                    </div>
                    
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-700 text-yellow-400 px-2 py-1 rounded text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-gray-500 text-xs px-2 py-1">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}