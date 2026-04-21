import { create } from 'zustand';
import type { FilterOptions } from '../types/filter';
import type { Invoice } from '../types/invoice';
import type { Status } from '../types/status';
import { mockInvoices } from '../utils/mockInvoices';
import { safeGetItem, safeSetItem } from '@/utils/localStorage';

const INVOICES_STORAGE_KEY = 'invoiceapp_invoices';

interface InvoiceState {
    invoices: Invoice[];
    activefilter: FilterOptions;
    addInvoice: (invoice: Invoice) => void;
    removeInvoice: (id: string) => void;
    update: (id: string, patch: Partial<Invoice>) => void;
    setFilter: (filter: FilterOptions) => void;
    updateInvoiceStatus: (id: string, status: Status) => void;
}

const initialInvoices = safeGetItem<Invoice[]>(INVOICES_STORAGE_KEY) ?? mockInvoices;

export const useInvoiceStore = create<InvoiceState>((set) => ({
    invoices: initialInvoices,
    activefilter: 'all',

    addInvoice: (invoice) =>
        set((state) => {
            const invoices = [...state.invoices, invoice];
            safeSetItem(INVOICES_STORAGE_KEY, invoices);
            return { invoices };
        }),

    removeInvoice: (id) =>
        set((state) => {
            const invoices = state.invoices.filter((inv) => inv.id !== id);
            safeSetItem(INVOICES_STORAGE_KEY, invoices);
            return { invoices };
        }),
    
    update: (id, patch) =>
        set((state) => {
            const invoices = state.invoices.map((inv) => (inv.id === id ? { ...inv, ...patch } : inv));
            safeSetItem(INVOICES_STORAGE_KEY, invoices);
            return { invoices };
        }),

    setFilter: (filter) => set({ activefilter: filter }),

    updateInvoiceStatus: (id, status) =>
        set((state) => {
            const invoices = state.invoices.map((inv) => (inv.id === id ? { ...inv, status } : inv));
            safeSetItem(INVOICES_STORAGE_KEY, invoices);
            return { invoices };
        }),


}));
