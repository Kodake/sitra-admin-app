// Warehouses Services Interfaces

// Warehouses Services
export interface IAddWarehouseParams {
    name: string;
    address: string;
    phone?: string | null | undefined;
    email?: string | null | undefined;
    city?: string | null | undefined;
    country?: string | null | undefined;
    zipCode?: string | null | undefined;
}

export interface IUpdateWarehouseParams {
    name: string;
    address: string;
    phone?: string | null | undefined;
    email?: string | null | undefined;
    city?: string | null | undefined;
    country?: string | null | undefined;
    zipCode?: string | null | undefined;
}

export interface IFetchWarehousesParams {
    page: number;
    recordsPerPage: number;
  searchTerm?: string;
}

// Stocks Services
export interface IAddStockParams {
    itemId: string;
    warehouseId: string;
    qty: number;
    minQty?: number | null | undefined;
    maxQty?: number | null | undefined;
}

export interface IUpdateStockParams {
    itemId: string;
    warehouseId: string;
    qty: number;
    minQty?: number | null | undefined;
    maxQty?: number | null | undefined;
}

export interface IFetchStocksParams {
    page: number;
    recordsPerPage: number;
}

// Transfers Services
export interface IAddTransferParams {
    productId: string;
    originWarehouseId: string;
    destinationWarehouseId: string;
    qty: number;
    comments?: string | null | undefined;
    availableQty?: number;
}

export interface IReceivedTransferParams {
    comments?: string | null | undefined;
}

export interface ICancelledTransferParams {
    comments?: string | null | undefined;
}

export interface IFetchTransfersParams {
    page: number;
    recordsPerPage: number;
}

// Stock Reports Services
export interface IFetchStockReportsParams {
    page: number;
    recordsPerPage: number;
}
