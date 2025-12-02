import React, { useState, useEffect } from 'react';
import { Menu, X, Search, User, Shield } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '首页', href: '#home' },
    { name: '关于俱乐部', href: '#about' },
    { name: '球队', href: '#team' },
    { name: '新闻', href: '#news' },
    { name: '票务', href: '#tickets' },
    { name: '商店', href: '#shop' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-yanyi-blue/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center group cursor-pointer">
            <div className="bg-gradient-to-br from-yanyi-red to-red-800 p-2 rounded-full shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Shield className="h-8 w-8 text-white" fill="currentColor" />
            </div>
            <div className="ml-3">
                <span className="block text-white font-black text-xl tracking-tighter uppercase leading-none">岩意</span>
                <span className="block text-gray-300 text-xs tracking-widest uppercase">足球俱乐部</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-yanyi-red font-medium text-sm uppercase tracking-wide transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-white hover:text-yanyi-red transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="bg-yanyi-red hover:bg-red-700 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase transition-colors flex items-center gap-2">
              <User className="h-4 w-4" />
              登录
            </button>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-yanyi-red focus:outline-none"
            >
              {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-yanyi-blue/98 backdrop-blur-xl absolute top-full left-0 w-full border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-3 text-base font-medium text-white hover:bg-gray-900 hover:text-yanyi-red rounded-md text-center uppercase"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 pb-2 border-t border-gray-800 flex justify-center gap-4">
                 <button className="text-white"><Search /></button>
                 <button className="text-yanyi-red font-bold">登录</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};