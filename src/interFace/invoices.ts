import { TInvoiceItem, TPaymentMethod } from "./interFace";

// Invoices Services Interfaces

// Sale Invoice Services
export interface IAddSaleInvoiceParams {
    currentDate?: Date | null;
    dueDate?: Date | null;
    pricingId: string;
    currencyId: string;
    warehouseId: string;
    customerId?: string | null;
    billerId?: string | null;
    documentType?: string | null;
    fiscalSupportId?: string | null;
    fiscalSupportNumber?: string | null;
    shipping?: number | null;
    discount?: number | null;
    conditionType: string;
    payments: TPaymentMethod[];
    amountReturned?: number | null;
    description?: string | null;
    note?: string | null;
    invoiceItems: TInvoiceItem[];
    montoNoFacturable?: number | null;
    saldoAnterior?: number | null;
    montoAvancePago?: number | null;
    montoPeriodo?: number | null;
    tipoIngresos?: string | null;
    indicadorEnvioDiferido?: number | null;
    indicadorMontoGral?: string | null;
}

export interface IAddSaleInvoiceWithItemParams extends IAddSaleInvoiceParams {
    itemType: number;          // 0 = Product, 1 = Service
    itemName: string;
    itemBasePrice: number;
    taxIds: string[];
}

export interface IAddNoteParams {
    currentDate?: Date | null;
    dueDate?: Date | null;
    pricingId: string;
    currencyId: string;
    warehouseId: string;
    customerId?: string | null;
    billerId?: string | null;
    documentType?: string | null;
    fiscalSupportId?: string | null;
    fiscalSupportNumber?: string | null;
    shipping?: number | null;
    discount?: number | null;
    conditionType: string;
    payments: TPaymentMethod[];
    amountReturned?: number | null;
    description?: string | null;
    note?: string | null;
    invoiceItems: TInvoiceItem[];
    montoNoFacturable?: number | null;
    saldoAnterior?: number | null;
    montoAvancePago?: number | null;
    montoPeriodo?: number | null;
    tipoIngresos?: string | null;
    indicadorEnvioDiferido?: number | null;
    indicadorMontoGral?: string | null;
    modifiedCode?: string | null;
    modifiedNcfNumber?: string | null;
}

export interface IFetchSaleInvoicesParams {
    page: number;
    recordsPerPage: number;
  searchTerm?: string;
}

export enum DgiiStatus {
    Rechazado = 1,
    Aceptado = 2,
    AceptadoCondicional = 3,
    EnProceso = 4,
    Error = 5
}

export interface IFetchLogInvoicesParams {
    page: number;
    recordsPerPage: number;
    status?: DgiiStatus | "All";
}

export interface IFetchInvoiceFiscalSupportsParams {
    supportType: number;
    warehouseId?: string;
}

export interface IFetchItemsParams {
    pricingId: string;
    warehouseId: string;
    fiscalSupportType?: string; // optional — when "43", only Exento items are returned
}

// Purchase Invoice Services
export interface IAddPurchaseInvoiceParams {
    currentDate?: Date | null;
    dueDate?: Date | null;
    pricingId: string;
    currencyId: string;
    warehouseId: string;
    supplierId?: string | null;
    billerId?: string | null;
    documentType?: string | null;
    fiscalSupportId?: string | null;
    fiscalSupportNumber?: string | null;
    shipping?: number | null;
    discount?: number | null;
    conditionType: string;
    payments: TPaymentMethod[];
    amountReturned?: number | null;
    description?: string | null;
    note?: string | null;
    invoiceItems: TInvoiceItem[];
}

export interface IFetchPurchaseInvoicesParams {
    page: number;
    recordsPerPage: number;
}

// Quotation Services
export interface IAddQuotationParams {
    dueDate?: Date | null;
    pricingId: string;
    currencyId: string;
    warehouseId: string;
    customerId: string;
    billerId: string;
    quotationNumber?: string | null;
    shipping?: number | null;
    discount?: number | null;
    invoiceItems: TInvoiceItem[];
}

export interface IAddQuotationWithItemParams extends IAddQuotationParams {
    itemType?: number | string;
    itemName?: string;
    itemBasePrice?: number | null;
    taxIds?: string[];
}

export interface IUpdateQuotationParams {
    dueDate?: Date | null;
    pricingId: string;
    currencyId: string;
    warehouseId: string;
    customerId: string;
    billerId: string;
    quotationNumber?: string | null;
    shipping?: number | null;
    discount?: number | null;
    invoiceItems: TInvoiceItem[];
}

export interface IProcessQuotationParams {
    currentDate?: Date | null;
    dueDate?: Date | null;
    pricingId: string;
    currencyId: string;
    warehouseId: string;
    customerId?: string | null;
    billerId?: string | null;
    documentType?: string | null;
    fiscalSupportId?: string | null;
    fiscalSupportNumber?: string | null;
    shipping?: number | null;
    discount?: number | null;
    conditionType: string;
    payments: TPaymentMethod[];
    amountReturned?: number | null | undefined;
    description?: string | null;
    note?: string | null;
    invoiceItems: TInvoiceItem[];
    montoNoFacturable?: number | null;
    saldoAnterior?: number | null;
    montoAvancePago?: number | null;
    montoPeriodo?: number | null;
    tipoIngresos?: string | null;
    indicadorEnvioDiferido?: number | null;
    indicadorMontoGral?: string | null;
}

export interface IFetchQuotationsParams {
    page: number;
    recordsPerPage: number;
  searchTerm?: string;
}

// Sales Services
export interface IFetchSalesParams {
    page: number;
    recordsPerPage: number;
}

// Purchases Services
export interface IFetchPurchasesParams {
    page: number;
    recordsPerPage: number;
}

// Spot Payments Services
export interface IFetchSpotPaymentsParams {
    page: number;
    recordsPerPage: number;
}

// Spot Payables Services
export interface IFetchSpotPayablesParams {
    page: number;
    recordsPerPage: number;
}
