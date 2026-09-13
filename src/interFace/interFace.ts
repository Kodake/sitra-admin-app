import { StaticImageData } from "next/image";
import React from "react";

// context api data type
export interface AppContextType {
  scrollDirection?: string;
  setScrollDirection?: React.Dispatch<React.SetStateAction<string>> | undefined;
  filterType: string;
  setFilterType: React.Dispatch<React.SetStateAction<string>>;
  dynamicId: number;
  setDynamicId: React.Dispatch<React.SetStateAction<number>>;
  niceSelectData: string;
  setNiceSelectData: React.Dispatch<React.SetStateAction<string>>;
  modalId: number;
  setModalId: React.Dispatch<React.SetStateAction<number>>;
  setShowingNavigationDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  showingNavigationDropdown: boolean;
  theme?: string;
  toggleTheme?: () => void;
}

export interface GenericDialogProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  content: string;
  onAgree?: () => void;
}

export interface TPettyCashList {
  id: string;
  invoiceId: string;
  fiscalSupportNumber: string;
  amount: number;
}

export interface TContactList {
  id: string;
  contactType: string;
  identificationType: number;
  identification: string;
  name: string;
  address: string;
  province: string;
  isActive: boolean;
  isDefault: boolean;
}

export interface TItem {
  id: string;
  image: string;
  name: string;
  reference: string;
  barcode: string;
  itemType: number;
  unitMeasure: number;
  brand: string;
  initialCost: number;
  basePrice: number;
  totalPrice: number;
  discount: number;
  percentage: number;
  taxes: TTaxList[];
  qty: number;
  isActive: boolean;
}

export interface TInvoiceItem {
  itemId: string;
  itemType: number;
  qty: number;
}

export interface TPaymentMethod {
  paymentId: string;
  amount: number;
}

export interface TPaymentMethodList {
  method: number;
  amount: number;
}

export interface TWithdrawalList {
  id: string;
  amount: number;
  createdAt: Date;
}

export interface TItemList {
  id: string;
  name: string;
  itemType: number;
  brand: [];
  category: [];
  initialCost: number;
  basePrice: number;
  totalPrice: number;
  taxes: [];
  isActive: boolean;
}

export interface TBrand {
  id: string;
  name: string;
  imageUrl: string;
}

export interface TModelList {
  id: string;
  name: string;
  description: string;
  brandId: string;
  brandName: string;
  isActive: boolean;
}

export interface TCategoryList {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

export interface TSubCategoryList {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  categoryName: string;
  isActive: boolean;
}

export interface TPricingList {
  id: string;
  name: string;
  pricingType: number;
  percentage: number;
  isDefault: boolean;
}

export interface TPricingItemList {
  pricing: TPricingList;
  id: string;
  itemId: string;
  pricingId: string;
  initialCost: number;
  basePrice: number;
  percentage: number;
  isPrincipal: boolean;
}

export interface TFiscalSupportList {
  id: string;
  documentType: number;
  fiscalSupportType: number;
  name: string;
  warehouseId: string;
  warehouse: TGenericData;
  fiscalSupportNumber: string;
  isActive: boolean;
  isDefault: boolean;
}

export interface TTaxList {
  id: string;
  name: string;
  amount: number;
  isActive: boolean;
}

export interface TBrandList {
  id: string;
  name: string;
  isActive: boolean;
}

export interface TDeadlineList {
  id: string;
  name: string;
  days: number;
  isActive: boolean;
}

export interface TCurrencyList {
  id: string;
  code: string;
  name: string;
  symbol: string;
  rate: number;
  isActive: boolean;
  isDefault: boolean;
}

export interface TExpenseList {
  id: string;
  date: Date;
  description: string;
  amount: number;
  isActive: boolean;
}

export interface TWarehouseList {
  id: string;
  name: string;
  phone: string;
  country: string;
  isActive: boolean;
  isDefault: boolean;
  stocks: TStockList[];
}

export interface TStockList {
  id: string;
  productId: string;
  product: TGenericData;
  warehouseId: string;
  warehouse: TGenericData;
  qty: number;
  minQty: number;
  maxQty: number;
}

export interface TStockReportList extends TStockList { }

export interface TTransferList {
  id: string;
  productId: string;
  product: TGenericData;
  destinationWarehouseId: string;
  destinationWarehouse: TGenericData;
  qty: number;
  stock: TStockList;
  status: number;
}

export interface TPaymentReceiptList {
  id: string;
  invoiceId: string;
  invoice: Invoice;
  contactId: string;
  buyer: Buyer;
  totalAmountDue: number;
  totalOutstanding: number;
  status: number;
  paymentReceipts: PaymentReceipt[];
}

export interface TPayableReceiptList {
  id: string;
  invoiceId: string;
  invoice: Invoice;
  contactId: string;
  supplier: Buyer;
  totalAmountDue: number;
  totalOutstanding: number;
  status: number;
  payableReceipts: PayableReceipt[];
}

export interface Buyer {
  id: string;
  contactType: number;
  identificationType: number;
  identification: string;
  name: string;
  province: string;
  address: string;
  phone: null;
  phone2: null;
  email: null;
}

export interface Supplier extends Buyer { }

export interface PaymentReceipt {
  id: string;
  amount: number;
  transactionType: number;
  paymentDate: Date;
  paymentMethod: number;
  isActive: boolean;
}

export interface PayableReceipt extends PaymentReceipt { }

export interface TReceivableList {
  id: string;
  invoiceId: string;
  invoice: Invoice;
  contactId: string;
  buyer: Buyer;
  totalAmountDue: number;
  totalOutstanding: number;
  status: number;
}

export interface TPayableList {
  id: string;
  invoiceId: string;
  invoice: Invoice;
  contactId: string;
  supplier: Supplier;
  totalAmountDue: number;
  totalOutstanding: number;
  status: number;
}

export interface TSalesReportList {
  id: string;
  fiscalSupportNumber: string;
  contactId: string;
  buyer: Buyer;
  totalAmount: number;
  totalPrice: number;
  totalTaxes: number;
  createdAt: Date;
}

export interface TPurchasesReportList {
  id: string;
  fiscalSupportNumber: string;
  supplierId: string;
  supplier: Supplier;
  totalAmount: number;
  totalPrice: number;
  totalTaxes: number;
  createdAt: Date;
}

export interface TSpotPaymentList {
  id: string;
  invoiceId: string;
  invoice: Invoice;
  contactId: string;
  buyer: Buyer;
  amountReceived: number;
  amountReturned: number;
  isActive: boolean;
  createdAt: Date;
}

export interface TSpotPayableList {
  id: string;
  invoiceId: string;
  invoice: Invoice;
  contactId: string;
  supplier: Supplier;
  amountReceived: number;
  amountReturned: number;
  isActive: boolean;
  createdAt: Date;
}

export interface TQuotationList {
  id: string;
  invoiceId: string;
  invoice: Invoice;
  contactId: string;
  buyer: Buyer;
  quotationNumber: string;
}

export interface Buyer {
  id: string;
  identification: string;
  name: string;
}

export interface Invoice {
  id: string;
  date: Date;
  dueDate: Date;
  fiscalSupportNumber: string;
  totalPrice: number;
  totalTaxes: number;
  totalAmount: number;
  createdAt: Date;
}

export interface TGenericData {
  id: string;
  name: string;
}

export interface TContactList {
  id: string;
  name: string;
  identification: string;
  phoneNumber: string;
  isActive: boolean;
  isDefault: boolean;
}

export interface TCountry {
  code: string;
  name: string;
}

export interface TProvince {
  code: string;
  name: string;
}

export interface TIdentificationType {
  type: string;
  name: string;
}

export interface TContactType {
  type: string;
  name: string;
}

export interface TPricingType {
  type: string;
  name: string;
}

export interface TFiscalSupport {
  id: string;
  code: string;
  documentType: number;
  fiscalSupportType: number;
  name: string;
  description: string;
  warehouseId: string;
  warehouse: TGenericData;
  fiscalSupportNumber: string;
}

export interface TFiscalSupportType {
  id: string;
  code: string;
  description: string;
}

export interface TDocumentTypeData {
  id: string;
  name: string;
  fiscalSupports: TFiscalSupportType[];
}

export interface TAppointmentList {
  id: string;
  description: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  scheduledAt: Date;
  isActive: boolean;
}

// possale tab data
export interface TProduct {
  id: string;
  image: StaticImageData;
  title: string;
  productNum: number;
  brand: string;
  is_featured: boolean;
  batchNo: string;
  category: string;
  price: number;
  quantity: number;
  subtotal: number;
  tax: number;
  discount: number;
  unit: string;
}

// build list data type
export interface billedList {
  id: number | string;
  name: string;
  phone: string;
  email: string;
  billerCode: string;
  adress: string;
  protein: string;
}

// sidebar menu data
export interface MenuItem {
  label: string;
  routeLink: string;
  iconClas?: string;
  subItems?: MenuItem[];
  subSubItems?: MenuItem[];
  permission?: string;
}

export interface TSaleInvoice {
  id: string;
  date: string; // ISO date string
  dueDate?: string | null;

  // Relations
  customer?: TContactList | null;
  biller?: TContactList | null;

  // Fiscal support / document type
  documentType?: number | null;
  fiscalSupportId?: string | null;
  fiscalSupportNumber?: string | null;

  // Condition / payment
  conditionType: number; // invoiceCondition enum
  paymentMethod?: number[]; // multiple methods allowed
  payments?: {
    paymentId: string;
    amount: number;
  }[];

  // Monetary fields
  currencyId: string;
  shipping?: number;
  discount?: number;

  // Items
  items: TItem[];

  // Calculated totals
  totalAmount: number;
  totalTaxes: number;
  grandTotal: number;
  totalPaid: number;
  amountReturned?: number;

  // Extra info
  description?: string | null;
  note?: string | null;

  status?: number; // if you want to mirror account_data
}

export interface TBalanceSummary {
  expenses: number;
  totalIncome: number;
  spotSales: number;
  receivablesPayments: number;
  balance: number;
}

export interface TSaleInvoiceWithBalance {
  invoices: TSalesReportList[];
  balance: TBalanceSummary;
}

export interface TRoleList {
  id: string;
  name: string;
  description: string;
}

export interface TUserList {
  id: string;
  name: string;
  email: string;
  roleId: string;
  roleName: string;
}