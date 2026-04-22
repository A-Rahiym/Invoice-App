import { useState } from 'react';
import type { Invoice } from '../types/invoice';
import type { InvoiceItem } from '@/features/InvoiceModal/ItemList';
import type { Status } from '@/types/status';

export type InvoiceFormMode = 'create' | 'edit';

interface UseInvoiceFormOptions {
  mode: InvoiceFormMode;
  initialInvoice?: Invoice;
}

export interface FormErrors {
  senderStreet?: string;
  senderCity?: string;
  senderPostCode?: string;
  senderCountry?: string;
  clientName?: string;
  clientEmail?: string;
  clientStreet?: string;
  clientCity?: string;
  clientPostCode?: string;
  clientCountry?: string;
  invoiceDate?: string;
  projectDescription?: string;
  items?: string;
  itemErrors?: { name?: string; quantity?: string; price?: string }[];
}

const TERM_DAYS: Record<string, number> = {
  'Net 1 Day': 1,
  'Net 7 Days': 7,
  'Net 14 Days': 14,
  'Net 30 Days': 30,
};

function generateId(): string {
  const L = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return (
    L[Math.floor(Math.random() * 26)] +
    L[Math.floor(Math.random() * 26)] +
    String(Math.floor(Math.random() * 9000) + 1000)
  );
}

function toInputDate(value: string): string {
  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString().split('T')[0];
  }
  return new Date().toISOString().split('T')[0];
}

function paymentTermsLabel(days?: number): string {
  const normalized = days ?? 30;
  if (normalized === 1) return 'Net 1 Day';
  if (normalized === 7) return 'Net 7 Days';
  if (normalized === 14) return 'Net 14 Days';
  return 'Net 30 Days';
}

export function useInvoiceForm({ mode, initialInvoice }: UseInvoiceFormOptions) {
  const existing = mode === 'edit' ? initialInvoice : undefined;
  const today = new Date().toISOString().split('T')[0];

  const [senderStreet, setSenderStreet] = useState(existing?.senderAddress.street ?? '');
  const [senderCity, setSenderCity] = useState(existing?.senderAddress.city ?? '');
  const [senderPostCode, setSenderPostCode] = useState(existing?.senderAddress.postCode ?? '');
  const [senderCountry, setSenderCountry] = useState(existing?.senderAddress.country ?? '');

  const [clientName, setClientName] = useState(existing?.clientName ?? '');
  const [clientEmail, setClientEmail] = useState(existing?.clientEmail ?? '');
  const [clientStreet, setClientStreet] = useState(existing?.clientAddress.street ?? '');
  const [clientCity, setClientCity] = useState(existing?.clientAddress.city ?? '');
  const [clientPostCode, setClientPostCode] = useState(existing?.clientAddress.postCode ?? '');
  const [clientCountry, setClientCountry] = useState(existing?.clientAddress.country ?? '');

  const [invoiceDate, setInvoiceDate] = useState(existing ? toInputDate(existing.createdAt) : today);
  const [paymentTerms, setPaymentTerms] = useState(paymentTermsLabel(existing?.paymentTerms));
  const [projectDescription, setProjectDescription] = useState(existing?.description ?? '');

  const [items, setItems] = useState<InvoiceItem[]>(
    existing?.items.length
      ? existing.items.map((item) => ({ name: item.name, quantity: item.quantity, price: item.price }))
      : [{ name: '', quantity: 1, price: 0 }],
  );

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(status: Status): FormErrors {
    if (status === 'draft') return {};
    const e: FormErrors = {};

    if (!senderStreet.trim()) e.senderStreet = "can't be empty";
    if (!senderCity.trim()) e.senderCity = "can't be empty";
    if (!senderPostCode.trim()) e.senderPostCode = "can't be empty";
    if (!senderCountry.trim()) e.senderCountry = "can't be empty";

    if (!clientName.trim()) e.clientName = "can't be empty";
    if (!clientEmail.trim()) e.clientEmail = "can't be empty";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) e.clientEmail = 'invalid email';
    if (!clientStreet.trim()) e.clientStreet = "can't be empty";
    if (!clientCity.trim()) e.clientCity = "can't be empty";
    if (!clientPostCode.trim()) e.clientPostCode = "can't be empty";
    if (!clientCountry.trim()) e.clientCountry = "can't be empty";

    if (!invoiceDate) e.invoiceDate = "can't be empty";
    if (!projectDescription.trim()) e.projectDescription = "can't be empty";

    if (items.length === 0) {
      e.items = 'An item must be added';
    } else {
      const itemErrors = items.map((item) => {
        const ie: { name?: string; quantity?: string; price?: string } = {};
        if (!item.name.trim()) ie.name = "can't be empty";
        if (item.quantity < 1) ie.quantity = 'min 1';
        if (item.price < 0) ie.price = 'invalid';
        return ie;
      });
      if (itemErrors.some((ie) => Object.keys(ie).length > 0)) e.itemErrors = itemErrors;
    }

    return e;
  }

  function buildInvoice(status: 'draft' | 'pending'): Invoice {
    const days = TERM_DAYS[paymentTerms] ?? 30;
    const created = new Date(invoiceDate);
    const due = new Date(created);
    due.setDate(due.getDate() + days);

    const toIso = (d: Date) => d.toISOString().split('T')[0];

    return {
      id: existing?.id ?? generateId(),
      createdAt: toIso(created),
      paymentDue: toIso(due),
      description: projectDescription,
      paymentTerms: days,
      clientName,
      clientEmail,
      status,
      senderAddress: { street: senderStreet, city: senderCity, postCode: senderPostCode, country: senderCountry },
      clientAddress: { street: clientStreet, city: clientCity, postCode: clientPostCode, country: clientCountry },
      items: items.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price, total: i.quantity * i.price })),
      total: items.reduce((sum, i) => sum + i.quantity * i.price, 0),
    } as Invoice;
  }

  function submit(status: 'draft' | 'pending'): Invoice | null {
    const e = validate(status);
    setErrors(e);
    setSubmitted(true);
    if (Object.keys(e).length > 0) return null;
    return buildInvoice(status);
  }

  // Item handlers
  const addItem = () => setItems((prev) => [...prev, { name: '', quantity: 1, price: 0 }]);
  const removeItem = (idx: number) => setItems((prev) => prev.filter((_, i) => i !== idx));
  const updateItem = (idx: number, field: keyof InvoiceItem, value: string | number) =>
    setItems((prev) => prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item)));

  return {
    // Sender fields
    senderStreet, setSenderStreet,
    senderCity, setSenderCity,
    senderPostCode, setSenderPostCode,
    senderCountry, setSenderCountry,
    // Client fields
    clientName, setClientName,
    clientEmail, setClientEmail,
    clientStreet, setClientStreet,
    clientCity, setClientCity,
    clientPostCode, setClientPostCode,
    clientCountry, setClientCountry,
    // Invoice meta
    invoiceDate, setInvoiceDate,
    paymentTerms, setPaymentTerms,
    projectDescription, setProjectDescription,
    // Items
    items, addItem, removeItem, updateItem,
    // Validation
    errors, submitted, submit,
  };
}
