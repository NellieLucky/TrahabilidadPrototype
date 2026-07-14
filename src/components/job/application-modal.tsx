'use client';

import React, { useState } from 'react';
import { Job, applyToJob } from '@/lib/db';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';

export interface ApplicationModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function ApplicationModal({ job, isOpen, onClose, onSuccess }: ApplicationModalProps) {
  const { toast } = useToast();
  const [selectedAccommodations, setSelectedAccommodations] = useState<string[]>([]);
  const [extraNote, setExtraNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!job) return null;

  // Flatten accommodations list to allow simple selection in form
  const accommodationsOptions = [
    ...job.accommodations.interview.map((x) => ({ label: x, category: 'Interview' })),
    ...job.accommodations.documents.map((x) => ({ label: x, category: 'Documentation' })),
    ...job.accommodations.communication.map((x) => ({ label: x, category: 'Communication' })),
    ...job.accommodations.workplace.map((x) => ({ label: x, category: 'Workplace' })),
  ];

  const handleToggle = (label: string) => {
    setSelectedAccommodations((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate network delay
    setTimeout(() => {
      try {
        applyToJob(job.id, selectedAccommodations);
        toast(`Application to ${job.company} submitted successfully!`, 'success');
        setSelectedAccommodations([]);
        setExtraNote('');
        if (onSuccess) onSuccess();
        onClose();
      } catch (err) {
        toast('Failed to submit application. Please try again.', 'error');
      } finally {
        setSubmitting(false);
      }
    }, 1200);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={`Apply to ${job.company}`}
      description={`Position: ${job.title}`}
    >
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        {/* Scrollable form body */}
        <div className="space-y-5">
          {/* Accommodations Checkbox Checklist */}
          <div>
            <fieldset>
              <legend className="text-sm font-bold text-foreground-color mb-2">
                Select Recruitment Accommodations
              </legend>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                These selections tell the hiring team what formats and adjustments you need. You have full privacy rights over this information.
              </p>
              <div className="space-y-2 border border-border-color rounded-lg p-3 bg-surface">
                {accommodationsOptions.length > 0 ? (
                  accommodationsOptions.map((opt) => (
                    <Checkbox
                      key={opt.label}
                      id={`acc-${opt.label}`}
                      label={
                        <span className="flex items-center justify-between w-full gap-2">
                          <span className="text-sm">{opt.label}</span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase shrink-0 bg-white dark:bg-[#1a1a1a] px-1.5 py-0.5 rounded border border-border-color">
                            {opt.category}
                          </span>
                        </span>
                      }
                      checked={selectedAccommodations.includes(opt.label)}
                      onChange={() => handleToggle(opt.label)}
                    />
                  ))
                ) : (
                  <p className="text-xs text-gray-500 italic">No specific pre-defined accommodations listed. You can specify custom adjustments in the notes below.</p>
                )}
              </div>
            </fieldset>
          </div>

          {/* Extra Notes */}
          <Input
            label="Additional Accessibility Notes (Optional)"
            placeholder="e.g. 'I will bring my own screen reader assistant software' or 'I need a ramp at the entry lobby'"
            value={extraNote}
            onChange={(e) => setExtraNote(e.target.value)}
          />
        </div>

        {/* Action Buttons — sticky footer */}
        <div className="flex gap-3 pt-4 mt-4 border-t border-border-color shrink-0">
          <Button variant="outline" type="button" onClick={onClose} disabled={submitting} className="flex-1">
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={submitting} className="flex-[2] font-bold">
            {submitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
