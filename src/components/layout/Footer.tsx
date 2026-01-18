import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container-art">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo.png"
                alt="Desi Art Hub Logo"
                className="w-12 h-12 object-contain"
              />
              <span className="font-heading text-xl font-semibold">Desi Art Hub</span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              Connecting art lovers with talented Indian artists. Every piece tells a story.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/explore" className="text-background/70 hover:text-background text-sm transition-colors">
                Explore Art
              </Link>
              <Link to="/categories" className="text-background/70 hover:text-background text-sm transition-colors">
                Categories
              </Link>
              <Link to="/upload-artwork" className="text-background/70 hover:text-background text-sm transition-colors font-semibold">
                Sell Your Art
              </Link>
              <Link to="/about" className="text-background/70 hover:text-background text-sm transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-background/70 hover:text-background text-sm transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading text-lg mb-4">Categories</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/explore?category=paintings" className="text-background/70 hover:text-background text-sm transition-colors">
                Paintings
              </Link>
              <Link to="/explore?category=sketches" className="text-background/70 hover:text-background text-sm transition-colors">
                Sketches
              </Link>
              <Link to="/explore?category=drawings" className="text-background/70 hover:text-background text-sm transition-colors">
                Drawings
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg mb-4">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-background/70">
              <p>hello@desiarthub.com</p>
              <p>+91 93721 94085</p>
              <p>Mumbai, India</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm">
            © 2025 Desi Art Hub by GD. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-background/60 text-sm">100% Handmade</span>
            <span className="text-background/60 text-sm">Secure Payments</span>
            <span className="text-background/60 text-sm">Artist Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
