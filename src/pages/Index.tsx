import { Link } from 'react-router-dom';
import { ArrowRight, Palette, Shield, Heart } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ArtworkCard from '@/components/art/ArtworkCard';
import { artworks, categories } from '@/data/artworks';

const featuredArtworks = artworks.filter((a) => a.featured);

const features = [
  {
    icon: Palette,
    title: '100% Handmade',
    description: 'Every piece is crafted by hand with love and dedication.',
  },
  {
    icon: Heart,
    title: 'Support Artists',
    description: 'Your purchase directly supports independent Indian artists.',
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'Secure payments and safe delivery to your doorstep.',
  },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-hero min-h-[90vh] flex items-center">
        <div className="container-art py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                Authentic Indian Art
              </span>
              <h1 className="heading-display mb-6">
                Discover <span className="text-primary">Authentic</span> Handmade Art
              </h1>
              <p className="text-elegant mb-8 max-w-lg">
                Original paintings, sketches, and drawings made by talented Indian artists. 
                Bring home a piece of culture and creativity.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/explore" className="btn-primary inline-flex items-center gap-2">
                  Explore Art
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/categories" className="btn-outline">
                  View Categories
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&auto=format&fit=crop"
                    alt="Featured artwork"
                    className="rounded-lg shadow-card w-full"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&auto=format&fit=crop"
                    alt="Featured sketch"
                    className="rounded-lg shadow-card w-full"
                  />
                </div>
                <div className="pt-8 space-y-4">
                  <img
                    src="https://images.unsplash.com/photo-1549887534-1541e9326642?w=400&auto=format&fit=crop"
                    alt="Featured painting"
                    className="rounded-lg shadow-card w-full"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&auto=format&fit=crop"
                    alt="Featured drawing"
                    className="rounded-lg shadow-card w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-card">
        <div className="container-art">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="text-center p-8 rounded-xl bg-background shadow-soft"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-20">
        <div className="container-art">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Curated Collection
              </span>
              <h2 className="heading-section mt-2">Featured Artworks</h2>
            </div>
            <Link
              to="/explore"
              className="mt-4 md:mt-0 text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-muted">
        <div className="container-art">
          <div className="text-center mb-12">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Browse By Style
            </span>
            <h2 className="heading-section mt-2">Art Categories</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/explore?category=${category.id}`}
                className="group relative overflow-hidden rounded-xl aspect-[4/3] shadow-card"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-heading text-2xl text-background font-semibold mb-1">
                    {category.name}
                  </h3>
                  <p className="text-background/80 text-sm">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container-art text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">
            Ready to Find Your Perfect Artwork?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Explore our collection of handmade Indian art and bring home a piece of culture.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 rounded-md font-medium hover:opacity-90 transition-opacity"
          >
            Start Exploring
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
