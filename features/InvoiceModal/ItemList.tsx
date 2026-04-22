import { FormField, inputBase, inputError, cx } from './FormField';

export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

export type ItemErrors = { name?: string; quantity?: string; price?: string }[];

interface ItemListProps {
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

interface ItemRowProps {
  item: InvoiceItem;
  errors?: { name?: string; quantity?: string; price?: string };
  showErrors: boolean;
  onRemove: () => void;
  onUpdate: (field: keyof InvoiceItem, value: string | number) => void;
}

function ItemRow({ item, errors, showErrors, onRemove, onUpdate }: ItemRowProps) {
  const labelBase = 'text-xs text-muted font-medium';
  const total = (item.quantity * item.price).toFixed(2);

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden space-y-3">
        <FormField label="Item Name" error={errors?.name} showError={showErrors}>
          <input
            className={cx(inputBase, showErrors && errors?.name && inputError)}
            value={item.name}
            onChange={(e) => onUpdate('name', e.target.value)}
          />
        </FormField>

        <div className="grid grid-cols-3 gap-3 items-end">
          <div>
            <label className={`block ${labelBase} mb-2`}>Qty.</label>
            <input
              type="number"
              min={1}
              className={cx(inputBase, showErrors && errors?.quantity && inputError)}
              value={item.quantity}
              onChange={(e) => onUpdate('quantity', Number(e.target.value))}
            />
          </div>
          <div>
            <label className={`block ${labelBase} mb-2`}>Price</label>
            <input
              type="number"
              min={0}
              step={0.01}
              className={cx(inputBase, showErrors && errors?.price && inputError)}
              value={item.price}
              onChange={(e) => onUpdate('price', Number(e.target.value))}
            />
          </div>
          <div className="flex items-center gap-3">
            <div>
              <label className={`block ${labelBase} mb-2`}>Total</label>
              <span className="block py-3 text-sm font-bold text-muted">{total}</span>
            </div>
            <button
              type="button"
              className="text-muted hover:text-danger transition-colors mt-5"
              onClick={onRemove}
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:grid md:grid-cols-[1fr_48px_96px_88px_24px] gap-4 items-center">
        <input
          className={cx(inputBase, showErrors && errors?.name && inputError)}
          value={item.name}
          onChange={(e) => onUpdate('name', e.target.value)}
        />
        <input
          type="number"
          min={1}
          className={cx(inputBase, 'text-center px-2', showErrors && errors?.quantity && inputError)}
          value={item.quantity}
          onChange={(e) => onUpdate('quantity', Number(e.target.value))}
        />
        <input
          type="number"
          min={0}
          step={0.01}
          className={cx(inputBase, showErrors && errors?.price && inputError)}
          value={item.price}
          onChange={(e) => onUpdate('price', Number(e.target.value))}
        />
        <span className="text-sm font-bold text-muted">{total}</span>
        <button
          type="button"
          className="text-muted hover:text-danger transition-colors"
          onClick={onRemove}
        >
          <TrashIcon />
        </button>
      </div>
    </>
  );
}

function TrashIcon() {
  return (
    <svg width="13" height="16" viewBox="0 0 13 16" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.47 0L9.36.9H13v1.8H0V.9h3.64L4.53 0h3.94zM1 14.1C1 15.14 1.9 16 3 16h7c1.1 0 2-.86 2-1.9V3.6H1v10.5z"
        fill="currentColor"
      />
    </svg>
  );
}
