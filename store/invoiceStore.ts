import { create } from 'zustand';
import type { FilterOptions } from '../types/filter';
import type { Invoice } from '../types/invoice';
import type { Status } from '../types/status';
import { mockInvoices } from '../utils/mockInvoices';

interface InvoiceState {
    invoices: Invoice[];
    activefilter: FilterOptions;
    addInvoice: (invoice: Invoice) => void;
    removeInvoice: (id: string) => void;
    update: (id: string, patch: Partial<Invoice>) => void;
    setFilter: (filter: FilterOptions) => void;
    updateInvoiceStatus: (id: string, status: Status) => void;
}

export const useInvoiceStore = create<InvoiceState>((set) => ({
    invoices: mockInvoices,
    activefilter: 'all',

    addInvoice: (invoice) => set((state) => ({ invoices: [...state.invoices, invoice] })),

    removeInvoice: (id) => set((state) => ({ invoices: state.invoices.filter((inv) => inv.id !== id) })),
    
    update: (id, patch) => set((state) => ({ invoices: state.invoices.map((inv) => inv.id === id ? { ...inv, ...patch } : inv) })),

    setFilter: (filter) => set({ activefilter: filter }),

    updateInvoiceStatus: (id, status) => set((state) => ({ invoices: state.invoices.map((inv) => inv.id === id ? { ...inv, status } : inv) })),


}));
