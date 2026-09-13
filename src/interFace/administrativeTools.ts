// Administrative Tools Services Interfaces

// Fiscal Supports Services
export interface IAddFiscalSupportParams {
    documentType: string;
    fiscalSupportType: string;
    name: string;
    warehouseId: string;
    initialSequence: number;
    finalSequence: number;
}

export interface IUpdateFiscalSupportParams {
    documentType: string;
    fiscalSupportType: string;
    name: string;
    warehouseId: string;
    initialSequence: number;
    finalSequence: number;
}

export interface IFetchFiscalSupportsParams {
    page: number;
    recordsPerPage: number;
  searchTerm?: string;
}

// Deadlines Services
export interface IAddDeadlineParams {
    name: string;
    days: number;
}

export interface IUpdateDeadlineParams {
    name: string;
    days: number;
}

export interface IFetchDeadlinesParams {
    page: number;
    recordsPerPage: number;
  searchTerm?: string;
}

// Roles Services
export interface IAddRoleParams {
    name: string;
    description: string;
}

export interface IUpdateRoleParams {
    name: string;
    description: string;
}

export interface IFetchRolesParams {
    page: number;
    recordsPerPage: number;
  searchTerm?: string;
}

export interface IFetchUsersParams {
    page: number;
    recordsPerPage: number;
  searchTerm?: string;
}

export interface IAddUserParams {
    email: string;
    password: string;
    roleId: string;
}

export interface IUpdateUserParams {
    roleId: string;
}