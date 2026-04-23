'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { api } from '@/lib/api';

const schema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Must contain at least one number'),
    confirm: z.string().min(1, 'Please confirm your password'),
  })
  .refine((d) => d.password === d.confirm, {
    message: 'Passwords do not match',
    path: ['confirm'],
  });

type FormData = z.infer<typeof schema>;

function SetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  if (!token) {
    return (
      <div className="max-w-md mx-auto py-20 text-center">
        <p className="text-gray-500 mb-4">This link is invalid or has expired.</p>
        <Link href="/auth/login" className="underline text-sm">
          Go to login →
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="max-w-md mx-auto py-20 text-center">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">Password set!</h1>
        <p className="text-gray-500 mb-6">Your account is ready. You can now log in.</p>
        <Link
          href="/auth/login"
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
        >
          Log in →
        </Link>
      </div>
    );
  }

  const onSubmit = async (data: FormData) => {
    try {
      await api.post('/auth/reset-password', { token, newPassword: data.password });
      setDone(true);
    } catch (err: any) {
      const message =
        err?.response?.data?.error || 'This link has expired. Please request a new one.';
      setError('root', { message });
    }
  };

  return (
    <div className="max-w-md mx-auto py-16">
      <div className="bg-white border rounded-xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-1">Set your password</h1>
        <p className="text-gray-500 text-sm mb-6">
          Create a password to secure your SMB Store account.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">New password</label>
            <input
              {...register('password')}
              type="password"
              className="w-full border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Min. 8 characters"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm password</label>
            <input
              {...register('confirm')}
              type="password"
              className="w-full border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Repeat your password"
            />
            {errors.confirm && (
              <p className="text-red-500 text-xs mt-1">{errors.confirm.message}</p>
            )}
          </div>

          {errors.root && (
            <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded p-3">
              {errors.root.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 font-medium mt-2"
          >
            {isSubmitting ? 'Saving…' : 'Set Password & Activate Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-5">
          Already have a password?{' '}
          <Link href="/auth/login" className="underline text-gray-600">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-400">Loading…</div>}>
      <SetPasswordForm />
    </Suspense>
  );
}
