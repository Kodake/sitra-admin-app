import { TInvoiceItem, TPaymentMethod } from "@/interFace/interFace";

export type AuthMode = "login" | "register" | "edit" | "forgot" | "reset";

export type SaleInvoiceFormValues = {
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
  paymentMethod: number[];
  payments: TPaymentMethod[];
  amountReturned?: number | null | undefined;
  description?: string | null;
  note?: string | null;
  invoiceItems: TInvoiceItem[];
  modifiedInvoiceId?: string | null;
  modificationReason?: number | null;
  modifiedInvoiceDate?: Date | null;
  indicadorEnvioDiferido?: string | null | undefined;
  indicadorMontoGral?: string | null | undefined;
  montoNoFacturable?: number | null | undefined;
  montoPeriodo?: number | null | undefined;
  montoAvancePago?: number | null | undefined;
  saldoAnterior?: number | null | undefined;
  tipoIngresos?: string | null | undefined;
};

export type QuotationFormValues = {
  currentDate?: Date | null;
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
};

export type PurchaseInvoiceFormValues = {
  currentDate?: Date | null;
  dueDate?: Date | null;
  pricingId: string;
  currencyId: string;
  warehouseId: string;
  supplierId: string;
  documentType?: string | null;
  fiscalSupportId?: string | null;
  shipping?: number | null;
  discount?: number | null;
  conditionType: string;
  paymentMethod?: string | undefined;
  description?: string | null;
  note?: string | null;
  invoiceItems: TInvoiceItem[];
};

export type ProcessQuotationFormValues = {
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
  paymentMethod: number[];
  payments: TPaymentMethod[];
  amountReturned?: number | null | undefined;
  description?: string | null;
  note?: string | null;
  invoiceItems: TInvoiceItem[];
};
