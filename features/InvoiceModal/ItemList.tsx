import { ItemRow } from "./ItemRow";
export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}


export type ItemErrors = { name?: string; quantity?: string; price?: string }[];interface ItemListProps {
  items: InvoiceItem[];
  itemErrors?: ItemErrors;
  showErrors: boolean;
  onAdd: () => void;
  onRemove: (idx: number) => void;
  onUpdate: (idx: number, field: keyof InvoiceItem, value: string | number) => void;
}

export function ItemList({
  items,
  itemErrors,
  showErrors,
  onAdd,
  onRemove,
  onUpdate,
}: ItemListProps) {
  const labelBase = 'text-xs text-muted font-medium';

  return (
    <section>
      <h2 className="text-lg font-bold text-[#777F98] mb-4">Item List</h2>

      {/* Column headers — desktop only */}
      <div className="hidden md:grid md:grid-cols-[1fr_48px_96px_88px_24px] gap-4 mb-2">
        <span className={labelBase}>Item Name</span>
        <span className={labelBase}>Qty.</span>
        <span className={labelBase}>Price</span>
        <span className={labelBase}>Total</span>
        <span />
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => (
          <ItemRow
            key={idx}
            item={item}
            errors={itemErrors?.[idx]}
            showErrors={showErrors}
            onRemove={() => onRemove(idx)}
            onUpdate={(field, value) => onUpdate(idx, field, value)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="w-full mt-4 py-3 rounded-full bg-surface border border-default text-sm font-bold text-muted hover:text-primary hover:border-[var(--color-primary)] transition-colors"
      >
        + Add New Item
      </button>
    </section>
  );
}