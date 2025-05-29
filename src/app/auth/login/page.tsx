"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { z } from 'zod';

// Define Zod schema
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const handleLogin = async () => {
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const errors: { [key: string]: string } = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) errors[err.path[0]] = err.message;
      });
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) setError(error.message);
    else router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
        {/* Logo & Title */}
        <div className="flex flex-col items-center space-y-6">
        <Image src="/akinia-logo.png" alt="Logo" width={64} height={64} className="h-16 w-auto" />
          <h1 className="text-2xl font-semibold text-gray-800">Sign In</h1>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Email Input */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="email"
              type="email"
              placeholder="Email"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {fieldErrors.email && <p className="text-red-500 text-xs">{fieldErrors.email}</p>}
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {fieldErrors.password && <p className="text-red-500 text-xs">{fieldErrors.password}</p>}
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Button className="w-full hover:cursor-pointer bg-amber-950" onClick={handleLogin}>
            Sign In
          </Button>
          <Button
            variant="link"
            className="w-full text-gray-600 hover:bg-transparent hover:cursor-pointer"
            onClick={() => router.push('/auth/signup')}
          >
            Sign Up
          </Button>
          <Button
            variant="link"
            className="w-full text-blue-600 hover:bg-transparent hover:cursor-pointer"
            onClick={() => {}}
          >
            Having trouble signing in?
          </Button>
        </div>
      </div>
    </div>
  );
}
