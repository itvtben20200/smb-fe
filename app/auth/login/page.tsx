'use client';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto mt-16">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>
      <LoginForm />
      <p className="mt-4 text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <a href="/auth/register" className="underline">Register</a>
      </p>
    </div>
  );
}
