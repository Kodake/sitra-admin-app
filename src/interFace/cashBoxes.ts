// Cash Boxes Services Interfaces

// Petty Cashes Services
export interface IAddPettyCashParams {
    openingAmount: number;
}

export interface IUpdatePettyCashParams {
    comments: string;
}

export interface IFetchPettyCashesByIdParams {
    page: number;
    recordsPerPage: number;
    id: string;
}

// Withdrawals Services
export interface IAddWithdrawalParams {
    amount: number;
}

export interface IFetchWithdrawalsByIdParams {
    page: number;
    recordsPerPage: number;
    id: string;
}
