"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import { supabase } from '@/app/lib/supabaseClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Lock } from 'lucide-react';

// Zod schema
const signupSchema = z.object({
  fullName: z.string().min(1, 'Full name is required.'),
  email: z.string().min(1, 'Email is required.').email('Invalid email format.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the Terms and Privacy Policy.' }),
  }),
});

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const handleSignup = async () => {
    // Validate using Zod
    const result = signupSchema.safeParse({ fullName, email, password, agreeTerms });

    if (!result.success) {
      const errors: { [key: string]: string } = {};
      for (const err of result.error.errors) {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      }
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setError('');

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) setError(error.message);
    else router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <div className="flex flex-col items-center space-y-6">
          <img src="/akinia-logo.png" alt="Logo" className="h-16 w-auto" />
          <h1 className="text-2xl font-semibold text-gray-800">Sign Up</h1>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Email Input */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700 relative">
            Email<span className="absolute -top-1 -right-2">*</span>
          </label>
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
          <label htmlFor="password" className="text-sm font-medium text-gray-700 relative">
            Password<span className="absolute -top-1 -right-2">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="password"
              type="password"
              placeholder="Password"
              className="pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {fieldErrors.password && <p className="text-red-500 text-xs">{fieldErrors.password}</p>}
        </div>

        {/* Full Name Input */}
        <div className="space-y-2">
          <label htmlFor="fullName" className="text-sm font-medium text-gray-700 relative">
            Full Name<span className="absolute -top-1 -right-2">*</span>
          </label>
          <Input
            id="fullName"
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {fieldErrors.fullName && <p className="text-red-500 text-xs">{fieldErrors.fullName}</p>}
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            id="terms"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="accent-amber-950 mt-1"
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            I agree to the <a href="/terms" className="text-blue-600 underline">Terms</a> and <a href="/privacy" className="text-blue-600 underline">Privacy Policy</a>
          </label>
        </div>
        {fieldErrors.agreeTerms && <p className="text-red-500 text-xs">{fieldErrors.agreeTerms}</p>}

        {/* Buttons */}
        <div className="space-y-3">
          <Button className="w-full bg-amber-950 hover:cursor-pointer" onClick={handleSignup}>
            Sign Up
          </Button>
          <Button
            variant="link"
            className="w-full text-blue-600 hover:bg-transparent hover:cursor-pointer"
            onClick={() => router.push('/auth/login')}
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}
