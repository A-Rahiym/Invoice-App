interface FormFieldProps {
  label: string;
  error?: string;
  showError?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormField({ label, error, showError, children, className = '' }: FormFieldProps) {
  return (
    <div className={className}>
      <div className="flex justify-between mb-2">
        <label className="text-xs text-muted font-medium">{label}</label>
        {showError && error && <span className="text-xs text-danger">{error}</span>}
      </div>
      {children}
    </div>
  );
}

export const inputBase =
  'w-full border border-default rounded-md px-4 py-3 bg-surface fg font-bold text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors';

export const inputError = 'input-error';

export function cx(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
