import type { Status } from "./status";

export interface Address {
    street: string;
    city: string;
    postCode: string;
    country: string;
}

export interface InvoiceItem {
    name: string;
    quantity: number;
    price: number;
    total: number;
}

export interface Invoice {
    id: string;
    status: Status;
    createdAt: string;
    paymentDue: string;
    description:string;
    paymentTerms: number;
    clientName:string;
    clientEmail:string;
    senderAddress: Address;
    clientAddress: Address;
    items:InvoiceItem[];
    total:number;
}

