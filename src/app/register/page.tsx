'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Accessibility, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/toast';
import { useAccessibility } from '@/components/accessibility/settings-provider';

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { updateSetting } = useAccessibility();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pwdType, setPwdType] = useState('none');
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const pwdOptions = [
    { value: 'none', label: 'Prefer not to disclose / Ally' },
    { value: 'visual', label: 'Visual Impairment (Screen Reader User)' },
    { value: 'hearing', label: 'Hearing Impairment (Deaf / Hard of Hearing)' },
    { value: 'mobility', label: 'Mobility / Orthopedic Limitation' },
    { value: 'neurodivergent', label: 'Neurodivergence (Autism, ADHD, Dyslexia)' },
    { value: 'other', label: 'Other Accessibility Accommodations' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tempErrors: Record<string, string> = {};

    if (!name) tempErrors.name = 'Full name is required.';
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
    if (!agree) {
      tempErrors.agree = 'You must agree to the data collection policy.';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      toast('Please correct the validation errors below.', 'error');
      return;
    }

    setErrors({});
    setSubmitting(true);

    // Apply auto toggles based on PWD type to assist candidate!
    if (pwdType === 'visual') {
      updateSetting('screenReaderMode', true);
      updateSetting('readableFont', false);
    } else if (pwdType === 'neurodivergent') {
      updateSetting('readableFont', true);
      updateSetting('reduceMotion', true);
    }

    // Save profile settings to localStorage
    try {
      localStorage.setItem('trahabilidad-candidate-profile', JSON.stringify({ name, email, pwdType }));
    } catch (err) {
      console.error(err);
    }

    setTimeout(() => {
      setSubmitting(false);
      toast('Registration successful! Tailoring dashboard to your profile...', 'success');
      router.push('/dashboard');
    }, 1200);
  };

  return (
    <main className="min-h-screen flex flex-col justify-center bg-surface dark:bg-black p-4 py-8">
      {/* Back button */}
      <div className="max-w-md w-full mx-auto mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-foreground-color focus:outline-none focus:underline"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to landing page
        </Link>
      </div>

      {/* Register Card */}
      <div className="max-w-md w-full mx-auto rounded-2xl border border-border-color bg-background-color p-6 md:p-8 shadow-xl space-y-5">
        {/* Brand Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary text-[#212121] mb-2">
            <Accessibility className="w-6 h-6" aria-hidden="true" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-foreground-color">
            Create Account
          </h2>
          <p className="text-sm text-gray-500">
            Join the inclusive Philippine employment network
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="e.g. Joshua Santos"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
            }}
            error={errors.name}
            required
            autoComplete="name"
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="e.g. joshua@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
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
                if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
              }}
              error={errors.password}
              required
              autoComplete="new-password"
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

          <Select
            label="Primary Accessibility Classification"
            options={pwdOptions}
            value={pwdType}
            onChange={(e) => setPwdType(e.target.value)}
            helperText="We will automatically adjust theme, motion, and readable font styling to support your selection."
          />

          <Checkbox
            id="agree-checkbox"
            label="I consent to securely saving my accessibility preferences to optimize my recruitment matching."
            checked={agree}
            onChange={() => {
              setAgree(!agree);
              if (errors.agree) setErrors((prev) => ({ ...prev, agree: '' }));
            }}
            error={errors.agree}
          />

          <Button type="submit" variant="primary" fullWidth disabled={submitting}>
            {submitting ? 'Registering...' : 'Create Account'}
          </Button>
        </form>

        {/* Switch to Login */}
        <div className="border-t border-border-color pt-4 text-center text-sm font-semibold text-gray-500">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-primary hover:underline focus:outline-none focus:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}
