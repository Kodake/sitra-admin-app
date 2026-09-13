// Wizard Services Interfaces
// Note: Wizard service already has its own interfaces defined in the service file
// These are exported from the service file itself and can be imported// Wizard Services Interfaces
export interface ICurrencyData {
    code: string;
    name: string;
    symbol: string;
    rate: number;
}

export interface ITaxData {
    name: string;
    amount: number;
}

export interface IProductData {
    name: string;
    initialCost: number;
    basePrice: number;
    taxIds?: string[];
}

export interface IWarehouseData {
    name: string;
    address: string;
}

export interface IStockData {
    qty: number;
}

export interface IWizardData {
    currency?: ICurrencyData;
    tax?: ITaxData;
    product?: IProductData;
    warehouse?: IWarehouseData;
    stock?: IStockData;
}
