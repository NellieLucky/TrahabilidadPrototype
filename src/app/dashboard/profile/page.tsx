'use client';

import React, { useState, useEffect } from 'react';
import { User, ShieldCheck, Mail, Briefcase, FileUp, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/toast';
import { useAccessibility } from '@/components/accessibility/settings-provider';

interface ProfileData {
  name: string;
  email: string;
  title: string;
  bio: string;
  pwdType: string;
  preferredInterview: string;
  preferredCommunication: string;
  extendedTime: boolean;
  signLanguage: boolean;
  screenReaderDocs: boolean;
}

const defaultProfile: ProfileData = {
  name: 'Joshua Santos',
  email: 'joshua.santos@example.com',
  title: 'Junior Accessibility Engineer',
  bio: 'A passionate developer focusing on building inclusive interfaces and validating WCAG standards. Seeking to contribute to accessible designs.',
  pwdType: 'visual',
  preferredInterview: 'remote',
  preferredCommunication: 'slack',
  extendedTime: true,
  signLanguage: false,
  screenReaderDocs: true,
};

export default function ProfilePage() {
  const { toast } = useToast();
  const { updateProfile } = useAccessibility();
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Load existing profile from storage or fallback to default
    const storedReg = localStorage.getItem('trahabilidad-candidate-profile');
    const storedFull = localStorage.getItem('trahabilidad-candidate-full-profile');

    if (storedFull) {
      setProfile(JSON.parse(storedFull));
    } else if (storedReg) {
      const reg = JSON.parse(storedReg);
      setProfile((prev) => ({
        ...prev,
        name: reg.name || prev.name,
        email: reg.email || prev.email,
        pwdType: reg.pwdType || prev.pwdType,
      }));
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      localStorage.setItem('trahabilidad-candidate-full-profile', JSON.stringify(profile));
      // Sync basic profile too
      localStorage.setItem(
        'trahabilidad-candidate-profile',
        JSON.stringify({ name: profile.name, email: profile.email, pwdType: profile.pwdType })
      );
      updateProfile(profile.name, profile.pwdType);
      setSubmitting(false);
      toast('Accessibility resume profile saved successfully!', 'success');
    }, 1000);
  };

  const pwdTypes = [
    { value: 'none', label: 'Prefer not to disclose / Ally' },
    { value: 'visual', label: 'Visual Impairment (Screen Reader User)' },
    { value: 'hearing', label: 'Hearing Impairment (Deaf / Hard of Hearing)' },
    { value: 'mobility', label: 'Mobility / Orthopedic Limitation' },
    { value: 'neurodivergent', label: 'Neurodivergence (Autism, ADHD, Dyslexia)' },
    { value: 'other', label: 'Other Accessibility Accommodations' },
  ];

  const interviewOptions = [
    { value: 'remote', label: '100% Remote Video Interview' },
    { value: 'written', label: 'Written Questionnaire / Text Chat Interview' },
    { value: 'physical', label: 'In-Person Accessible Interview' },
  ];

  const commOptions = [
    { value: 'slack', label: 'Text Channels (Slack, Email, Discord)' },
    { value: 'voice', label: 'Standard Phone Call' },
    { value: 'captioned', label: 'Closed Captioned Video Calls' },
  ];

  return (
    <div className="space-y-6">
      {/* Description banner */}
      <section
        aria-label="Profile explanation"
        className="p-5 rounded-2xl border border-border-color bg-background-color shadow-sm space-y-2"
      >
        <p className="text-base text-gray-700 dark:text-gray-300 font-semibold leading-relaxed">
          Configure your TrahAbilidad Accessibility Profile. When submitting applications, these values are combined with your resume to help companies accommodate your skills.
        </p>
      </section>

      {/* Main Form */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 columns: Professional Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          <section
            aria-labelledby="prof-heading"
            className="p-6 rounded-2xl border border-border-color bg-background-color shadow-sm space-y-4"
          >
            <h3 id="prof-heading" className="text-lg font-bold text-foreground-color flex items-center gap-2">
              <User className="w-5 h-5 text-primary" aria-hidden="true" />
              Professional Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                required
              />
              <Input
                label="Email Address"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                required
              />
            </div>

            <Input
              label="Professional Headline"
              placeholder="e.g. Junior Web Designer / Admin Associate"
              value={profile.title}
              onChange={(e) => setProfile({ ...profile, title: e.target.value })}
            />

            <div className="flex flex-col gap-1.5">
              <label htmlFor="bio-textarea" className="text-sm font-semibold text-foreground-color">
                Summary / Bio
              </label>
              <textarea
                id="bio-textarea"
                rows={4}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="flex w-full rounded-md border border-border-color bg-transparent px-3 py-2 text-base transition-colors placeholder:text-gray-500 hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 text-foreground-color"
                placeholder="Brief summary of your expertise..."
              />
            </div>

            {/* Resume Upload mock */}
            <div className="border border-dashed border-border-color rounded-xl p-6 text-center space-y-3 bg-surface">
              <FileUp className="w-8 h-8 text-gray-400 mx-auto" aria-hidden="true" />
              <div>
                <span className="text-sm font-bold text-foreground-color block">Upload Professional Resume</span>
                <span className="text-xs text-gray-500">Supports PDF, DOCX up to 5MB (Accessible formats preferred)</span>
              </div>
              <Button type="button" variant="outline" size="sm" className="h-9 px-4 font-bold border-gray-300">
                Choose File
              </Button>
            </div>
          </section>
        </div>

        {/* Right column: Accessibility Preferences Credentials */}
        <aside aria-labelledby="acc-pref-heading" className="space-y-6">
          <section
            id="accessibility-profile-builder"
            className="p-6 rounded-2xl border border-primary/20 bg-primary/5 shadow-md space-y-5"
          >
            <div className="border-b border-primary/10 pb-3">
              <h3 id="acc-pref-heading" className="text-lg font-extrabold text-foreground-color flex items-center gap-2">
                <ShieldCheck className="w-5.5 h-5.5 text-primary" aria-hidden="true" />
                Accessibility Resume
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Establish default settings for inclusive recruitment matches.
              </p>
            </div>

            <Select
              label="PWD Classification"
              options={pwdTypes}
              value={profile.pwdType}
              onChange={(e) => setProfile({ ...profile, pwdType: e.target.value })}
            />

            <Select
              label="Preferred Interview Mode"
              options={interviewOptions}
              value={profile.preferredInterview}
              onChange={(e) => setProfile({ ...profile, preferredInterview: e.target.value })}
            />

            <Select
              label="Preferred Communication Channel"
              options={commOptions}
              value={profile.preferredCommunication}
              onChange={(e) => setProfile({ ...profile, preferredCommunication: e.target.value })}
            />

            {/* Accommodations checklist toggles */}
            <fieldset className="space-y-3 pt-2">
              <legend className="text-xs font-black uppercase text-gray-400 tracking-wider">
                Recruitment Accommodations
              </legend>
              <Checkbox
                id="pref-extended-time"
                label="Request Extended Response Times"
                checked={profile.extendedTime}
                onChange={() => setProfile({ ...profile, extendedTime: !profile.extendedTime })}
              />
              <Checkbox
                id="pref-screen-reader"
                label="Require Screen Reader Compliant Docs"
                checked={profile.screenReaderDocs}
                onChange={() => setProfile({ ...profile, screenReaderDocs: !profile.screenReaderDocs })}
              />
              <Checkbox
                id="pref-sign-lang"
                label="Require Sign Language Interpreter"
                checked={profile.signLanguage}
                onChange={() => setProfile({ ...profile, signLanguage: !profile.signLanguage })}
              />
            </fieldset>

            <div className="border-t border-primary/10 pt-4">
              <Button type="submit" variant="primary" fullWidth disabled={submitting}>
                {submitting ? 'Saving Profile...' : 'Save Accessibility Resume'}
              </Button>
            </div>
          </section>
        </aside>
      </form>
    </div>
  );
}
