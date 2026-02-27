'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/lib/hooks/useCart';
import { t } from '@/lib/translations';
import { Locale } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Menu, Search, ShoppingCart, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import LanguageChanger from './LanguageChanger';

interface HeaderProps {
  locale: Locale;
}

const Header: React.FC<HeaderProps> = ({ locale }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { getItemCount } = useCart();
  const cartItemCount = getItemCount();

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
        ? 'bg-white/95 backdrop-blur-lg shadow-lg py-2' 
        : 'bg-white/80 backdrop-blur-sm shadow-sm py-0'
    )}>
      <div className="container mx-auto px-4">
        <div className={cn(
          "flex items-center justify-between transition-all duration-300",
          isScrolled ? "h-16" : "h-20"
        )}>
          
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-3 group">
            <div className={cn(
              "bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110",
              isScrolled ? "w-10 h-10" : "w-12 h-12"
            )}>
              <span className={cn(
                "text-white font-bold transition-all duration-300",
                isScrolled ? "text-base" : "text-lg"
              )}>H</span>
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "font-bold text-charcoal-900 group-hover:text-gold-600 transition-all duration-300",
                isScrolled ? "text-lg" : "text-xl"
              )}>
                Himalayan Sound
              </span>
              <span className={cn(
                "text-charcoal-600 -mt-1 hidden sm:block transition-all duration-300",
                isScrolled ? "text-xs" : "text-sm"
              )}>
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
              <Button variant="ghost" size="sm" className="p-2 hover:bg-gold-50 transition-colors" aria-label="Cart">
                <ShoppingCart className="h-5 w-5 group-hover:text-gold-600 transition-colors" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-br from-gold-500 to-gold-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-md animate-bounce-gentle">
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