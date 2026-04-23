'use client';
import { RegisterForm } from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto mt-16">
      <h1 className="text-2xl font-bold mb-6">Create Account</h1>
      <RegisterForm />
      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{' '}
        <a href="/auth/login" className="underline">Sign in</a>
      </p>
    </div>
  );
}
