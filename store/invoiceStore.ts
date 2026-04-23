import { create } from 'zustand';
import type { FilterOptions } from '../types/filter';
import type { Invoice } from '../types/invoice';
import type { Status } from '../types/status';
import { mockInvoices } from '../utils/mockInvoices';
import { safeGetItem, safeSetItem } from '@/utils/localStorage';

const INVOICES_STORAGE_KEY = 'invoiceapp_invoices';

interface InvoiceState {
    invoices: Invoice[];
    hydrated: boolean;
    hydratedInvoices: () => void;
    activefilter: FilterOptions;
    addInvoice: (invoice: Invoice) => void;
    removeInvoice: (id: string) => void;
    update: (id: string, patch: Partial<Invoice>) => void;
    setFilter: (filter: FilterOptions) => void;
    updateInvoiceStatus: (id: string, status: Status) => void;
}
export const useInvoiceStore = create<InvoiceState>((set) => ({
    invoices: mockInvoices,
    hydrated: false,
    hydratedInvoices: () => {
        const stored = safeGetItem<Invoice[]>(INVOICES_STORAGE_KEY);
        set({
            invoices: stored ?? mockInvoices,
            hydrated: true,
        });
    },
    
    activefilter: ['draft', 'pending', 'paid'],
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
