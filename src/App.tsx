import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import PortfolioPage from './components/PortfolioPage';
import BlogPage from './components/BlogPage';
import BrandingPage from './components/BrandingPage';
import ManifestoPage from './components/ManifestoPage';
import AboutPage from './components/AboutPage';
import LoginPage from './components/LoginPage';
import AdminBlogPage from './components/AdminBlogPage';
import FloatingCTA from './components/FloatingCTA';
import FixedHeader from './components/FixedHeader';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Handle direct URL access to admin pages
  React.useEffect(() => {
    const path = window.location.pathname;
    if (path === '/admin') {
      setCurrentPage('admin');
    } else if (path === '/login') {
      setCurrentPage('login');
    }
  }, []);

  // Listen for navigation events from child components
  React.useEffect(() => {
    const handleNavigate = (event: CustomEvent) => {
      setCurrentPage(event.detail);
    };
    
    window.addEventListener('navigate', handleNavigate as EventListener);
    return () => window.removeEventListener('navigate', handleNavigate as EventListener);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />;
      case 'portfolio':
        return <PortfolioPage onPageChange={setCurrentPage} />;
      case 'blog':
        return <BlogPage />;
      case 'branding':
        return <BrandingPage onPageChange={setCurrentPage} />;
      case 'manifesto':
        return <ManifestoPage onPageChange={setCurrentPage} />;
      case 'about':
        return <AboutPage onPageChange={setCurrentPage} />;
      case 'login':
        return <LoginPage onPageChange={setCurrentPage} />;
      case 'admin':
        return <AdminBlogPage onPageChange={setCurrentPage} />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <FixedHeader currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPage()}
      <FloatingCTA onPageChange={setCurrentPage} />
      
      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            &copy; 2025 Anderson Garcia. Todos os direitos reservados.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Bem vindo
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;