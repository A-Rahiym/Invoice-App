import { create } from 'zustand';
import type { FilterOptions } from '../types/filter';
import type { Invoice } from '../types/invoice';
import type { Status } from '../types/status';

interface InvoiceState {
    invoices: Invoice[];
    activefilter: FilterOptions;
    addInvoice: (invoice: Invoice) => void;
    removeInvoice: (id: string) => void;
    update: (id: string, patch: Partial<Invoice>) => void;
    setFilter: (filter: FilterOptions) => void;
    updateInvoiceStatus: (id: string, status: Status) => void;
}

export const useInvoiceStore = create<InvoiceState>((set, get) => ({
    invoices: [],
    activefilter: 'all',
    init: () => {
        set({ invoices: [] });
    },

    // Add a new invoice to the store
    addInvoice: (invoice) => set((state) => ({ invoices: [...state.invoices, invoice] })),

    // Remove an invoice by its ID
    removeInvoice: (id) => set((state) => ({ invoices: state.invoices.filter((inv) => inv.id !== id) })),
    
    // Update an existing invoice by its ID with a patch object
    update: (id, patch) => set((state) => ({ invoices: state.invoices.map((inv) => inv.id === id ? { ...inv, ...patch } : inv) })),

    // Set the active filter
    setFilter: (filter) => set((state) => ({ activefilter: filter })),

    // Update the status of an existing invoice by its ID
    updateInvoiceStatus: (id, status) => set((state) => ({ invoices: state.invoices.map((inv) => inv.id === id ? { ...inv, status } : inv) })),


}));
