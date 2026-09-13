// Products Services Interfaces

// Common product/combo fields
export interface IProductBaseParams {
    name: string;
    reference?: string | null | undefined;
    barcode?: string | null | undefined;
    description?: string | null | undefined;
    initialCost: number;
    basePrice: number;
    taxIds: string[];
    brandId?: string | null | undefined;
    modelId?: string | null | undefined;
    categoryId?: string | null | undefined;
    subCategoryId?: string | null | undefined;
    unitMeasure?: string | null | undefined;
}

// Products Services
export interface IAddProductParams extends IProductBaseParams {
    warehouseId?: string | null | undefined;
}

export interface IUpdateProductParams extends IProductBaseParams { }

export interface IFetchProductsParams {
    page: number;
    recordsPerPage: number;
  searchTerm?: string;
}

// Combos Services
export interface IComboItem {
    id: string;
    qty: number;
}

export interface IAddComboParams extends IProductBaseParams {
    items: IComboItem[];
    warehouseId?: string | null | undefined;
}

export interface IUpdateComboParams extends IProductBaseParams {
    items: IComboItem[];
}

// Brands Services
export interface IAddBrandParams {
    name: string;
}

export interface IUpdateBrandParams {
    name: string;
}

export interface IFetchBrandsParams {
    page: number;
    recordsPerPage: number;
  searchTerm?: string;
}

// Categories Services
export interface IAddCategoryParams {
    name: string;
    description?: string | null;
}

export interface IUpdateCategoryParams {
    name: string;
    description?: string | null;
}

export interface IFetchCategoriesParams {
    page: number;
    recordsPerPage: number;
  searchTerm?: string;
}

// SubCategories Services
export interface IAddSubCategoryParams {
    name: string;
    description?: string | null;
    categoryId: string;
}

export interface IUpdateSubCategoryParams {
    name: string;
    description?: string | null;
    categoryId: string;
}

export interface IFetchSubCategoriesParams {
    page: number;
    recordsPerPage: number;
}

// Models Services
export interface IAddModelParams {
    name: string;
    description?: string | null;
    brandId: string;
}

export interface IUpdateModelParams {
    name: string;
    description?: string | null;
    brandId: string;
}

export interface IFetchModelsParams {
    page: number;
    recordsPerPage: number;
}

// Units Services
export interface IAddUnitParams {
    name: string;
    shortName: string;
}

export interface IUpdateUnitParams {
    name: string;
    shortName: string;
}

export interface IFetchUnitsParams {
    page: number;
    recordsPerPage: number;
}

// Pricings Services
export interface IAddPricingParams {
    name: string;
    pricingType: string;
    percentage: number;
}

export interface IUpdatePricingParams {
    name: string;
    pricingType: string;
    percentage: number;
}

export interface IFetchPricingsParams {
    page: number;
    recordsPerPage: number;
  searchTerm?: string;
}

// Pricing Items Services
export interface IAddPricingItemParams {
    itemId: string;
    pricingId: string;
    percentage: number;
}

export interface IUpdatePricingItemParams {
    itemId: string;
    pricingId: string;
    percentage: number;
}

export interface IFetchPricingItemsParams {
    page: number;
    recordsPerPage: number;
}

// Services Services (for service items, not products)
export interface IAddServiceParams extends IProductBaseParams {
    warehouseId?: string | null | undefined;
}

export interface IUpdateServiceParams extends IProductBaseParams { }

export interface IFetchServicesParams {
    page: number;
    recordsPerPage: number;
}
