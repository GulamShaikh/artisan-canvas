import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, Palette } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Explore Art', path: '/explore' },
  { name: 'Categories', path: '/categories' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container-art">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Desi Art Hub Logo"
              className="w-12 h-12 object-contain"
            />
            <span className="font-heading text-xl font-semibold hidden sm:block">
              Desi Art Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.path
                  ? 'text-primary'
                  : 'text-muted-foreground'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link
              to="/upload-artwork"
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full hover:shadow-lg hover:scale-105 transition-all"
            >
              <Palette className="w-4 h-4" />
              Sell Your Art
            </Link>
            <Link
              to="/cart"
              className="relative p-2 hover:bg-muted rounded-full transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-muted rounded-full transition-colors"
            >
              <User className="w-4 h-4" />
              Login
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 md:hidden hover:bg-muted rounded-full transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border animate-fade-in">
            <nav className="py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${location.pathname === link.path
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/upload-artwork"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 text-sm font-semibold bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg flex items-center gap-2 hover:shadow-lg transition-all"
              >
                <Palette className="w-4 h-4" />
                Sell Your Art
              </Link>
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium hover:bg-muted rounded-lg flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Login / Signup
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
