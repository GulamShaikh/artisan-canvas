import { Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';

export default function OrderConfirmation() {
  const orderId = `DAH${Date.now().toString().slice(-8)}`;

  return (
    <Layout>
      <div className="container-art py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center animate-fade-up">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="heading-display mb-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Order Confirmed!
          </h1>

          <p className="text-elegant mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Thank you for supporting handmade art. Your order has been placed successfully.
          </p>

          <div className="bg-card rounded-xl p-8 shadow-soft mb-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <Package className="w-6 h-6 text-primary" />
              <span className="font-medium">Order Details</span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Order ID</span>
                <span className="font-mono font-semibold">{orderId}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Status</span>
                <span className="text-green-600 font-medium">Confirmed</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-muted-foreground">Estimated Delivery</span>
                <span className="font-medium">5-7 Business Days</span>
              </div>
            </div>
          </div>

          <div className="bg-muted rounded-xl p-6 mb-8 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <p className="text-sm text-muted-foreground">
              📧 A confirmation email has been sent to your email address with order details and tracking information.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <Link to="/explore" className="btn-primary inline-flex items-center justify-center gap-2">
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/" className="btn-outline">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
