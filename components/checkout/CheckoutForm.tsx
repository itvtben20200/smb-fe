'use client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/api';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('A valid email is required'),
  company: z.string().optional(),
  phone: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

export function CheckoutForm({ stripePromise }: { stripePromise: Promise<unknown> | null }) {
  const { items } = useCartStore();
  const { user } = useAuthStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (!user) return;
    api.get('/auth/me').then((r) => {
      reset({
        name: r.data.name ?? '',
        email: r.data.email ?? '',
        phone: r.data.phone ?? '',
        company: r.data.companyName ?? '',
      });
    }).catch(() => {
      // Fallback to cached store values
      reset({
        name: user.name ?? '',
        email: user.email ?? '',
        phone: user.phone ?? '',
        company: user.companyName ?? '',
      });
    });
  }, [user, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        ...(!user && {
          guestEmail: data.email,
          guestName: data.name,
          guestPhone: data.phone || undefined,
          guestCompany: data.company || undefined,
        }),
      };

      const res = await api.post('/orders/checkout/session', payload);
      window.location.href = res.data.url;
    } catch {
      setError('root', { message: 'Failed to initiate checkout. Please try again.' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {!user && (
        <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm">
          Checking out as guest. An account will be created automatically after payment.
        </div>
      )}

      <section>
        <h2 className="font-semibold text-lg mb-3">Contact Information</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input {...register('name')} className="w-full border rounded px-3 py-2" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email{user ? '' : ' *'}</label>
            <input {...register('email')} type="email" className="w-full border rounded px-3 py-2" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Company (optional)</label>
              <input {...register('company')} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone (optional)</label>
              <input {...register('phone')} type="tel" className="w-full border rounded px-3 py-2" />
            </div>
          </div>
        </div>
      </section>

      {errors.root && <p className="text-red-500 text-sm">{errors.root.message}</p>}

      <div className="border-t pt-4">
        <p className="text-sm text-gray-500 mb-4">You will be redirected to Stripe to complete payment securely.</p>
        <button
          type="submit"
          disabled={isSubmitting || items.length === 0}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 font-medium"
        >
          {isSubmitting ? 'Redirecting to payment...' : 'Proceed to Payment →'}
        </button>
      </div>
    </form>
  );
}
