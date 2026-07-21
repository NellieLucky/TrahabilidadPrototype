/**
 * SalaryDisplay
 *
 * Renders a salary string accessibly:
 *  - The ₱ symbol is not reliably read by screen readers (often garbled as
 *    "cuben" or similar). We replace it with the word "pesos" in the aria-label.
 *  - The " - " range separator is read as "minus"; we replace it with "to".
 *
 * The visual output keeps the original string (₱ and –).
 * The accessible label reads e.g. "18,000 pesos to 24,000 pesos".
 *
 * Usage: <SalaryDisplay salary={job.salary} />
 */

import React from 'react';

interface SalaryDisplayProps {
  salary: string;
  className?: string;
}

/** Build an accessible readable version of the salary string. */
function toAccessibleLabel(salary: string): string {
  return (
    salary
      // Replace ₱ with empty string, then append " pesos" after each number
      .replace(/₱([\d,]+)/g, '$1 pesos')
      // Replace " - " range separator with " to "
      .replace(/ - /g, ' to ')
      // Replace " + " with " plus " for add-ons like "+ Commissions"
      .replace(/ \+ /g, ' plus ')
  );
}

export function SalaryDisplay({ salary, className }: SalaryDisplayProps) {
  const accessibleLabel = toAccessibleLabel(salary);

  // Replace " - " with " – " (en-dash) for better visual typography
  const visualSalary = salary.replace(/ - /g, ' – ');

  return (
    <span className={className} aria-label={accessibleLabel}>
      {/* aria-hidden: screen readers use the aria-label above instead */}
      <span aria-hidden="true">{visualSalary}</span>
    </span>
  );
}

