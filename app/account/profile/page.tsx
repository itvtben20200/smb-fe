'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/api';

const schema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  phone: z.string().max(30).optional(),
  companyName: z.string().max(200).optional(),
});
type FormData = z.infer<typeof schema>;

interface Profile {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  companyName: string | null;
  createdAt: string;
}

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
    setError,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    api.get('/auth/me').then((r) => {
      setProfile(r.data);
      reset({
        name: r.data.name ?? '',
        phone: r.data.phone ?? '',
        companyName: r.data.companyName ?? '',
      });
    });
  }, [reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const res = await api.patch('/auth/me', data);
      setProfile((p) => p ? { ...p, ...res.data } : p);
      setSaved(true);
      reset(data); // clear isDirty
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError('root', { message: 'Could not save changes. Please try again.' });
    }
  };

  if (!profile) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Update your personal information.</p>
      </div>

      {/* Account info card */}
      <div className="bg-gray-50 border rounded-xl px-5 py-4 flex items-center gap-4">
        <div className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
          {(profile.name ?? profile.email)[0].toUpperCase()}
        </div>
        <div>
          <p className="font-semibold">{profile.name ?? '—'}</p>
          <p className="text-sm text-gray-500">{profile.email}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            Member since {new Date(profile.createdAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Edit form */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="font-semibold mb-4">Personal Information</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email — read-only */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Email address</label>
            <input
              value={profile.email}
              disabled
              className="w-full border rounded-lg px-3 py-2.5 bg-gray-50 text-gray-400 cursor-not-allowed text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              {...register('name')}
              className="w-full border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-black text-sm"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Phone (optional)</label>
              <input
                {...register('phone')}
                type="tel"
                className="w-full border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-black text-sm"
                placeholder="+49 ..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Company (optional)</label>
              <input
                {...register('companyName')}
                className="w-full border rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-black text-sm"
                placeholder="Your company"
              />
            </div>
          </div>

          {errors.root && (
            <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded p-3">
              {errors.root.message}
            </p>
          )}

          {saved && (
            <p className="text-green-700 text-sm bg-green-50 border border-green-200 rounded p-3">
              ✓ Profile saved successfully.
            </p>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !isDirty}
              className="bg-black text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 disabled:opacity-40 font-medium text-sm"
            >
              {isSubmitting ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
