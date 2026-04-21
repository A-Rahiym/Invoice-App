
interface ModalProps {
  title: string;
  children: React.ReactNode;
  actions: React.ReactNode;
  onDismiss: () => void;
  titleId: string;
}


export function Modal({
  title,
  children,
  actions,
  onDismiss,
  titleId,
}: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button
        type="button"
        aria-label="Close modal overlay"
        className="absolute inset-0 bg-black/50"
        onClick={onDismiss}
      />
      <section className="relative z-10 w-full max-w-md rounded-2xl bg-surface p-8 shadow-2xl sm:p-10">
        <h2 id={titleId} className="text-2xl font-bold fg sm:text-3xl">
          {title}
        </h2>
        <div className="mt-4 text-sm leading-7 text-muted sm:text-base">{children}</div>
        <div className="mt-8 flex items-center justify-end gap-3">{actions}</div>
      </section>
    </div>
  );
}