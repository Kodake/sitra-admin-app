// Accounts Services Interfaces

// Payable Receipt Services
export interface IFetchPayableReceiptsParams {
    id: string;
    page: number;
    recordsPerPage: number;
}

export interface IAddPayableMethodParams {
    paymentMethod: string;
    amount: number;
}

export interface IDeactivatePayableReceiptParams {
    id: string;
    paymentReceiptId: string;
}

// Payables Services
export interface IFetchPayablesParams {
    page: number;
    recordsPerPage: number;
  searchTerm?: string;
}

// Payment Receipt Services
export interface IFetchPaymentReceiptsParams {
    id: string;
    page: number;
    recordsPerPage: number;
}

export interface IAddPaymentMethodParams {
    paymentMethod: string;
    amount: number;
}

export interface IDeactivatePaymentReceiptParams {
    id: string;
    paymentReceiptId: string;
}

// Receivables Services
export interface IFetchReceivablesParams {
    page: number;
    recordsPerPage: number;
  searchTerm?: string;
}
