import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { categories, artworks } from '@/data/artworks';

export default function Categories() {
  return (
    <Layout>
      <div className="container-art py-12">
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Browse By Style
          </span>
          <h1 className="heading-section mt-2">Art Categories</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Explore our curated collection of handmade Indian artwork across different styles and mediums.
          </p>
        </div>

        <div className="grid gap-8">
          {categories.map((category) => {
            const categoryArtworks = artworks.filter((a) => a.category === category.id);
            
            return (
              <div key={category.id} className="bg-card rounded-2xl overflow-hidden shadow-card">
                <div className="grid md:grid-cols-2">
                  <div className="aspect-[4/3] md:aspect-auto">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="font-heading text-3xl font-semibold mb-3">
                      {category.name}
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    <p className="text-sm text-muted-foreground mb-6">
                      {categoryArtworks.length} artwork{categoryArtworks.length !== 1 ? 's' : ''} available
                    </p>
                    <Link
                      to={`/explore?category=${category.id}`}
                      className="btn-primary inline-flex items-center gap-2 self-start"
                    >
                      View {category.name}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
