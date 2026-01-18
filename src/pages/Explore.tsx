import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import ArtworkCard from '@/components/art/ArtworkCard';
import { artworks } from '@/data/artworks';

const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹5,000', min: 0, max: 5000 },
  { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
  { label: '₹10,000 - ₹15,000', min: 10000, max: 15000 },
  { label: 'Above ₹15,000', min: 15000, max: Infinity },
];

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const categoryParam = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);

  const filteredArtworks = useMemo(() => {
    return artworks.filter((artwork) => {
      const categoryMatch = selectedCategory === 'all' || artwork.category === selectedCategory;
      const priceRange = priceRanges[selectedPriceRange];
      const priceMatch = artwork.price >= priceRange.min && artwork.price <= priceRange.max;
      return categoryMatch && priceMatch;
    });
  }, [selectedCategory, selectedPriceRange]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedPriceRange(0);
    setSearchParams({});
  };

  return (
    <Layout>
      <div className="container-art py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="heading-section">Explore Art</h1>
            <p className="text-muted-foreground mt-1">
              {filteredArtworks.length} artwork{filteredArtworks.length !== 1 ? 's' : ''} available
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="flex gap-8">
          {/* Filters - Desktop Sidebar */}
          <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-background p-6 overflow-auto md:static md:p-0' : 'hidden'} md:block w-full md:w-64 flex-shrink-0`}>
            <div className="flex items-center justify-between mb-6 md:hidden">
              <h2 className="font-heading text-xl font-semibold">Filters</h2>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-8">
              <h3 className="font-medium text-sm uppercase tracking-wider mb-4 text-muted-foreground">
                Category
              </h3>
              <div className="space-y-2">
                {['all', 'paintings', 'sketches', 'drawings'].map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors capitalize ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-8">
              <h3 className="font-medium text-sm uppercase tracking-wider mb-4 text-muted-foreground">
                Price Range
              </h3>
              <div className="space-y-2">
                {priceRanges.map((range, index) => (
                  <button
                    key={range.label}
                    onClick={() => setSelectedPriceRange(index)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${
                      selectedPriceRange === index
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {(selectedCategory !== 'all' || selectedPriceRange !== 0) && (
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2.5 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                Clear All Filters
              </button>
            )}

            <button
              onClick={() => setShowFilters(false)}
              className="w-full mt-4 btn-primary md:hidden"
            >
              Apply Filters
            </button>
          </aside>

          {/* Artwork Grid */}
          <div className="flex-1">
            {filteredArtworks.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArtworks.map((artwork) => (
                  <ArtworkCard key={artwork.id} artwork={artwork} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No artworks found matching your filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-primary font-medium hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
