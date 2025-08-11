'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { t } from '@/lib/translations';
import { Locale } from '@/lib/types';
import LanguageChanger from './LanguageChanger';

interface HeaderProps {
  cartItemCount?: number;
  locale: Locale;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount = 0, locale }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { href: `/${locale}`, label: t('nav.home', locale) },
    { href: `/${locale}/shop`, label: t('nav.shop', locale) },
    { href: `/${locale}/about`, label: t('nav.about', locale) },
    { href: `/${locale}/blog`, label: t('nav.blog', locale) },
    { href: `/${locale}/contact`, label: t('nav.contact', locale) },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-md' 
        : 'bg-transparent'
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2 group">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm lg:text-base">H</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg lg:text-xl text-charcoal-900 group-hover:text-gold-600 transition-colors">
                Himalayan Sound
              </span>
              <span className="text-xs text-charcoal-600 -mt-1 hidden sm:block">
                Authentic Sound Healing
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-200 hover:text-gold-600',
                  pathname === item.href
                    ? 'text-gold-600'
                    : isScrolled
                    ? 'text-charcoal-700'
                    : 'text-charcoal-800'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <Input
                    type="text"
                    placeholder={t('common.search', locale)}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-32 lg:w-48 h-9 text-sm"
                    autoFocus
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-1 p-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Language Changer */}
            <LanguageChanger />

            {/* Cart */}
            <Link href={`/${locale}/cart`} className="relative group">
              <Button variant="ghost" size="sm" className="p-2" aria-label="Cart">
                <ShoppingCart className="h-4 w-4" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-gold-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2"
              aria-label="Open menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t animate-slide-up">
            <nav className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-3">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      'text-base font-medium py-2 transition-colors duration-200 hover:text-gold-600',
                      pathname === item.href
                        ? 'text-gold-600'
                        : 'text-charcoal-700'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;