'use client';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { CheckoutSummary } from '@/components/checkout/CheckoutSummary';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <CheckoutForm stripePromise={stripePromise} />
        </div>
        <div className="lg:w-80">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
}
