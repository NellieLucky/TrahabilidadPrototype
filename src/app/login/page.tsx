'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Accessibility, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tempErrors: { email?: string; password?: string } = {};

    if (!email) {
      tempErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      tempErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters.';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      toast('Please correct the validation errors below.', 'error');
      return;
    }

    setErrors({});
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      toast('Login successful!', 'success');
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <main className="min-h-screen flex flex-col justify-center bg-surface dark:bg-black p-4">
      {/* Back button */}
      <div className="max-w-md w-full mx-auto mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-foreground-color focus:outline-none focus:underline"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to landing page
        </Link>
      </div>

      {/* Login Card */}
      <div className="max-w-md w-full mx-auto rounded-2xl border border-border-color bg-background-color p-6 md:p-8 shadow-xl space-y-6">
        {/* Brand Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-[#212121] mb-3">
            <Accessibility className="w-7 h-7" aria-hidden="true" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-foreground-color">
            Sign In to TrahAbilidad
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Access your inclusive candidate profile
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="e.g. joshua@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            error={errors.email}
            required
            autoComplete="email"
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Min 6 characters"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              error={errors.password}
              required
              autoComplete="current-password"
            />
            {/* View Password Toggle */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-[34px] p-1 text-gray-400 hover:text-foreground-color focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 rounded cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Eye className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>

          <div className="text-right">
            <a
              href="#"
              className="text-xs font-bold text-gray-500 hover:text-gray-700 hover:underline focus:outline-none focus:underline"
              onClick={(e) => {
                e.preventDefault();
                toast('Password reset link sent to email.', 'info');
              }}
            >
              Forgot password?
            </a>
          </div>

          <Button type="submit" variant="primary" fullWidth disabled={submitting}>
            {submitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {/* Switch to Register */}
        <div className="border-t border-border-color pt-4 text-center text-sm font-semibold text-gray-500">
          New to TrahAbilidad?{' '}
          <Link
            href="/register"
            className="text-primary hover:underline focus:outline-none focus:underline"
          >
            Create an Account
          </Link>
        </div>
      </div>
    </main>
  );
}
