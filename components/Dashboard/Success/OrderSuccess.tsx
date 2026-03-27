'use client';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, ShoppingBag, ArrowRight, Home } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

export default function OrderSuccessPage() {
//   const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');

  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-16 h-16 text-success" />
          </div>
        </div>

        {/* Main Content */}
        <h1 className="text-4xl font-bold text-base-content mb-3">
          Order Received!
        </h1>
        
        <p className="text-lg text-base-content/70 mb-8">
          Thank you for your purchase. We&apos;ve successfully received your order.
        </p>

        {orderId && (
          <div className="bg-base-200 rounded-xl p-5 mb-8">
            <p className="text-sm text-base-content/60 mb-1">Order Reference</p>
            <p className="font-mono text-xl font-semibold tracking-wider">
              #{orderId}
            </p>
          </div>
        )}

        <div className="space-y-3 text-left mb-10">
          <div className="flex gap-3 items-start">
            <div className="mt-1">
              <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-success" />
              </div>
            </div>
            <div>
              <p className="font-medium">Order Confirmed</p>
              <p className="text-sm text-base-content/70">
                We&apos;ve sent a confirmation to your email and phone number.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="mt-1">
              <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-success" />
              </div>
            </div>
            <div>
              <p className="font-medium">Processing Your Order</p>
              <p className="text-sm text-base-content/70">
                Our team is now preparing your items for delivery or pickup.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link href="/dashboard" className="btn btn-primary btn-lg gap-3">
            Continue Shopping
            <ArrowRight size={20} />
          </Link>

          <Link 
            href="/" 
            className="btn btn-outline btn-lg gap-3"
          >
            <Home size={20} />
            Return to Homepage
          </Link>
        </div>

        {/* Guest Note */}
        {
            !user ?
            <div className="mt-10 text-xs text-base-content/50">
            <p>
                You checked out as a guest. 
                <Link href="/auth/new" className="link link-primary ml-1">
                Create an account
                </Link> 
                {' '}to track this order and enjoy faster checkout next time.
            </p>
            </div>:
            <div className="mt-10 text-xs text-base-content/50">
            <p>
                You checked out as {user?.email}  
                <Link href="/dashboard/orders" className="link link-primary ml-1">
                track this order
                </Link> 
            </p>
            </div>
        }
      </div>
    </div>
  );
}