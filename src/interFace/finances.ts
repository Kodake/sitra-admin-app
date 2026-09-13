// Finances Services Interfaces

import { TaxType } from "@/enums/appEnums";

// Currencies Services
export interface IAddCurrencyParams {
    code: string;
    name: string;
    symbol: string;
    rate: number;
}

export interface IUpdateCurrencyParams {
    code: string;
    name: string;
    symbol: string;
    rate: number;
}

export interface IFetchCurrenciesParams {
    page: number;
    recordsPerPage: number;
  searchTerm?: string;
}

// Taxes Services
export interface IAddTaxParams {
    name: string;
    amount: number;
    taxType: TaxType;
}

export interface IUpdateTaxParams {
    name: string;
    amount: number;
    taxType: TaxType;
}

export interface IFetchTaxesParams {
    page: number;
    recordsPerPage: number;
  searchTerm?: string;
}

// Expenses Services
export interface IAddExpenseParams {
    date: Date;
    description: string;
    amount: number;
}

export interface IUpdateExpenseParams {
    date: Date;
    description: string;
    amount: number;
}

export interface IFetchExpensesParams {
    page: number;
    recordsPerPage: number;
  searchTerm?: string;
}
