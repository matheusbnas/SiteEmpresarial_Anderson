import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, LogOut, Calendar, User, Tag, Save, X } from 'lucide-react';
import { supabase, BlogPost } from '../lib/supabase';

interface AdminBlogPageProps {
  onPageChange: (page: string) => void;
}

export default function AdminBlogPage({ onPageChange }: AdminBlogPageProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [published, setPublished] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchPosts();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      onPageChange('login');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onPageChange('login');
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err: any) {
      setError('Erro ao carregar posts');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setTitle('');
    setContent('');
    setExcerpt('');
    setImageUrl('');
    setTags('');
    setLinkedinUrl('');
    setPublished(false);
    setEditingPost(null);
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const slug = title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();

      const postData = {
        title,
        content,
        excerpt,
        slug,
        author: 'Anderson Garcia',
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        linkedin_url: linkedinUrl || null,
        featured_image: imageUrl || null,
        published_at: published ? new Date().toISOString() : null
      };

      const { error } = await supabase
        .from('blog_posts')
        .insert([postData]);

      if (error) throw error;

      await fetchPosts();
      setShowForm(false);
      clearForm();
    } catch (err: any) {
      setError('Erro ao criar post: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    setLoading(true);
    setError(null);

    try {
      const slug = title.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();

      const postData = {
        title,
        content,
        excerpt,
        slug,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        linkedin_url: linkedinUrl || null,
        featured_image: imageUrl || null,
        published_at: published ? (editingPost.published_at || new Date().toISOString()) : null,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('blog_posts')
        .update(postData)
        .eq('id', editingPost.id);

      if (error) throw error;

      await fetchPosts();
      setShowForm(false);
      clearForm();
    } catch (err: any) {
      setError('Erro ao atualizar post: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
    setExcerpt(post.excerpt);
    setImageUrl(post.featured_image || '');
    setTags(post.tags.join(', '));
    setLinkedinUrl(post.linkedin_url || '');
    setPublished(!!post.published_at);
    setShowForm(true);
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Tem certeza que deseja excluir este post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;
      await fetchPosts();
    } catch (err: any) {
      setError('Erro ao excluir post: ' + err.message);
    }
  };

  const togglePublished = async (post: BlogPost) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          published_at: post.published_at ? null : new Date().toISOString()
        })
        .eq('id', post.id);

      if (error) throw error;
      await fetchPosts();
    } catch (err: any) {
      setError('Erro ao alterar status: ' + err.message);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-black text-white pt-16">
      {/* Header */}
      <div className="bg-gray-900/50 border-b border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Painel <span className="text-yellow-400">Administrativo</span>
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => {
                clearForm();
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
            >
              <Plus size={20} />
              Novo Post
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              <LogOut size={20} />
              Sair
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    {editingPost ? 'Editar Post' : 'Novo Post'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      clearForm();
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={editingPost ? handleUpdatePost : handleCreatePost} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Título *
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Resumo *
                    </label>
                    <textarea
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Conteúdo *
                    </label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={12}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        URL da Imagem
                      </label>
                      <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                        placeholder="https://exemplo.com/imagem.jpg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        URL do LinkedIn
                      </label>
                      <input
                        type="url"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                        placeholder="https://linkedin.com/posts/..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Tags (separadas por vírgula)
                    </label>
                    <input
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                      placeholder="estratégia, liderança, gestão"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="published"
                      checked={published}
                      onChange={(e) => setPublished(e.target.checked)}
                      className="rounded border-gray-600 text-yellow-400 focus:ring-yellow-400"
                    />
                    <label htmlFor="published" className="ml-2 text-sm text-gray-300">
                      Publicar imediatamente
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors disabled:opacity-50"
                    >
                      <Save size={20} />
                      {loading ? 'Salvando...' : editingPost ? 'Atualizar' : 'Criar Post'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        clearForm();
                      }}
                      className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Posts List */}
        <div className="bg-gray-900/50 rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold">Posts do Blog</h2>
          </div>

          {loading && !showForm ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto"></div>
              <p className="text-gray-400 mt-4">Carregando posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-400">Nenhum post encontrado</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Título
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Tags
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-800/30">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-white">{post.title}</div>
                        <div className="text-sm text-gray-400 truncate max-w-xs">
                          {post.excerpt}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          post.published_at
                            ? 'bg-green-900/50 text-green-300'
                            : 'bg-red-900/50 text-red-300'
                        }`}>
                          {post.published_at ? 'Publicado' : 'Rascunho'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {formatDate(post.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{post.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => togglePublished(post)}
                            className="text-blue-400 hover:text-blue-300"
                            title={post.published_at ? 'Despublicar' : 'Publicar'}
                          >
                            {post.published_at ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                          <button
                            onClick={() => handleEditPost(post)}
                            className="text-yellow-400 hover:text-yellow-300"
                            title="Editar"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="text-red-400 hover:text-red-300"
                            title="Excluir"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}