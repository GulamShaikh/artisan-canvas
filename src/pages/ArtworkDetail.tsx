import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Zap } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { artworks } from '@/data/artworks';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

export default function ArtworkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const artwork = artworks.find((a) => a.id === id);

  if (!artwork) {
    return (
      <Layout>
        <div className="container-art py-20 text-center">
          <h1 className="heading-section mb-4">Artwork Not Found</h1>
          <Link to="/explore" className="text-primary hover:underline">
            Back to Explore
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart(artwork);
    toast({
      title: 'Added to Cart',
      description: `${artwork.title} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    addToCart(artwork);
    navigate('/cart');
  };

  return (
    <Layout>
      <div className="container-art py-8 md:py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-[4/5] overflow-hidden rounded-xl shadow-card">
            <img
              src={artwork.image}
              alt={artwork.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <span className="text-primary font-medium text-sm uppercase tracking-wider mb-2">
              {artwork.category}
            </span>
            <h1 className="font-heading text-3xl md:text-4xl font-semibold mb-2">
              {artwork.title}
            </h1>
            <p className="text-muted-foreground text-lg mb-6">by {artwork.artist}</p>

            <p className="text-foreground/80 leading-relaxed mb-8">
              {artwork.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Size</p>
                <p className="font-medium">{artwork.size}</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Medium</p>
                <p className="font-medium">{artwork.medium}</p>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-soft mb-8">
              <p className="text-sm text-muted-foreground mb-1">Price</p>
              <p className="font-heading text-3xl font-semibold text-primary">
                ₹{artwork.price.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground mt-1">Inclusive of all taxes</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-outline flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Buy Now
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">✓ Original Artwork</span>
                <span className="flex items-center gap-1">✓ Certificate of Authenticity</span>
                <span className="flex items-center gap-1">✓ Safe Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
