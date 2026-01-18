import { Palette, Heart, Users, Award } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const stats = [
  { icon: Palette, value: '500+', label: 'Artworks' },
  { icon: Users, value: '100+', label: 'Artists' },
  { icon: Heart, value: '1000+', label: 'Happy Buyers' },
  { icon: Award, value: '100%', label: 'Authentic' },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero py-20">
        <div className="container-art">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Our Story
            </span>
            <h1 className="heading-display mt-4 mb-6">About Desi Art Hub</h1>
            <p className="text-elegant">
              Connecting art lovers with talented Indian artists, one masterpiece at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container-art">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&auto=format&fit=crop"
                alt="Artist at work"
                className="rounded-2xl shadow-card"
              />
            </div>
            <div>
              <h2 className="heading-section mb-6">Our Mission</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Desi Art Hub is a platform dedicated to showcasing and selling authentic handmade artwork from talented Indian artists. We believe in the power of art to transform spaces, evoke emotions, and connect people across cultures.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Every piece on our platform is carefully curated to ensure quality, authenticity, and artistic merit. We work directly with artists to bring their creations to art lovers around the world.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Our goal is to make original art accessible to everyone while providing artists with a platform to showcase their talent and earn a fair income from their passion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-muted">
        <div className="container-art">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <p className="font-heading text-3xl font-semibold text-primary mb-1">
                  {stat.value}
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container-art">
          <div className="text-center mb-12">
            <h2 className="heading-section">What We Stand For</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-8 shadow-soft text-center">
              <h3 className="font-heading text-xl font-semibold mb-4">Authenticity</h3>
              <p className="text-muted-foreground">
                Every artwork is 100% original and handmade by skilled Indian artists. No prints, no reproductions.
              </p>
            </div>
            <div className="bg-card rounded-xl p-8 shadow-soft text-center">
              <h3 className="font-heading text-xl font-semibold mb-4">Artist Support</h3>
              <p className="text-muted-foreground">
                We ensure fair compensation for artists and help them reach a global audience for their work.
              </p>
            </div>
            <div className="bg-card rounded-xl p-8 shadow-soft text-center">
              <h3 className="font-heading text-xl font-semibold mb-4">Quality First</h3>
              <p className="text-muted-foreground">
                Each piece is carefully inspected and packaged to ensure it reaches you in perfect condition.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
