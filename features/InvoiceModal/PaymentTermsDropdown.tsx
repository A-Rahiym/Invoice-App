import { useState } from 'react';
import { inputBase } from './FormField';

const PAYMENT_TERMS = ['Net 1 Day', 'Net 7 Days', 'Net 14 Days', 'Net 30 Days'];

interface PaymentTermsDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export function PaymentTermsDropdown({ value, onChange }: PaymentTermsDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        className={`${inputBase} flex justify-between items-center cursor-pointer`}
        onClick={() => setOpen(!open)}
      >
        <span>{value}</span>
        <svg
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
          width="11"
          height="7"
          viewBox="0 0 11 7"
          fill="none"
        >
          <path d="M1 1l4.5 4.5L10 1" stroke="var(--color-primary)" strokeWidth="2" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-default rounded-lg shadow-lg z-20 overflow-hidden">
          {PAYMENT_TERMS.map((term) => (
            <button
              key={term}
              type="button"
              className="w-full text-left px-4 py-3 text-sm font-bold border-b border-default last:border-0 hover:text-primary transition-colors fg"
              style={term === value ? { color: 'var(--color-primary)' } : {}}
              onClick={() => {
                onChange(term);
                setOpen(false);
              }}
            >
              {term}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
