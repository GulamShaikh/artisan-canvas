import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';

export default function Cart() {
  const { items, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-art py-20 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="heading-section mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any artwork yet.
          </p>
          <Link to="/explore" className="btn-primary inline-block">
            Explore Art
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-art py-12">
        <h1 className="heading-section mb-8">Your Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 bg-card rounded-xl shadow-soft"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">by {item.artist}</p>
                  <p className="text-sm text-muted-foreground">{item.size} • {item.medium}</p>
                  <p className="font-semibold text-primary mt-2">
                    ₹{item.price.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="self-start p-2 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl p-6 shadow-soft sticky top-28">
              <h2 className="font-heading text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({items.length} item{items.length > 1 ? 's' : ''})</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-primary">₹{totalPrice.toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes</p>
              </div>

              <Link
                to="/checkout"
                className="btn-primary w-full text-center block"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/explore"
                className="block text-center mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
