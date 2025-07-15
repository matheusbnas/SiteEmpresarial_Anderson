import React from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const pages = [
    { id: 'home', label: 'Home' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'blog', label: 'Blog' },
    { id: 'branding', label: 'Branding' },
    { id: 'about', label: 'Sobre Eu' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-white">Anderson Garcia</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => onPageChange(page.id)}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${
                    currentPage === page.id
                      ? 'text-yellow-400 border-b-2 border-yellow-400'
                      : 'text-gray-300 hover:text-white hover:scale-105'
                  }`}
                >
                  {page.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/95">
              {pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => {
                    onPageChange(page.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block px-3 py-2 text-base font-medium w-full text-left transition-all duration-300 ${
                    currentPage === page.id
                      ? 'text-yellow-400'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50 rounded'
                  }`}
                >
                  {page.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}