// Contacts Services Interfaces

export interface IAddContactParams {
    name: string;
    address: string;
    contactType?: string | null;
    identificationType?: string | null;
    province?: string | null;
    municipality?: string | null;
    identification?: string | null;
    phone?: string | null;
    phone2?: string | null;
    email?: string | null;
}

export interface IUpdateContactParams {
    name: string;
    address: string;
    contactType?: string | null;
    identificationType?: string | null;
    province?: string | null;
    municipality?: string | null;
    identification?: string | null;
    phone?: string | null;
    phone2?: string | null;
    email?: string | null;
}

export interface IFetchContactsParams {
    page: number;
    recordsPerPage: number;
  searchTerm?: string;
}
