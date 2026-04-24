'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});
type FormData = z.infer<typeof schema>;

export function LoginForm() {
  const { login } = useAuthStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password);
      const { user } = useAuthStore.getState();
      if (user?.role === 'ADMIN' || user?.role === 'SUPERADMIN') {
        router.push('/admin/dashboard');
      } else {
        router.push('/');
      }
    } catch {
      setError('root', { message: 'Invalid email or password' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          {...register('email')}
          type="email"
          autoComplete="email"
          className="w-full border rounded px-3 py-2"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          {...register('password')}
          type="password"
          autoComplete="current-password"
          className="w-full border rounded px-3 py-2"
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
      </div>
      {errors.root && <p className="text-red-500 text-sm">{errors.root.message}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
      >
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </button>
      <div className="text-right">
        <a href="/auth/forgot-password" className="text-sm underline">Forgot password?</a>
      </div>
    </form>
  );
}
