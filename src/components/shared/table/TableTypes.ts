import React from "react";

export interface TableColumn<T> {
    id: string;
    label: string;
    sortable?: boolean;
    align?: "left" | "right" | "center";
    render?: (row: T) => React.ReactNode;
}

export interface TableActions<T> {
    editPath?: (id: string | number) => string;
    onActivate?: (id: string | number) => void;
    onDeactivate?: (id: string | number) => void;
    onDelete?: (id: string | number) => void;
    onDetails?: (id: string | number) => void;
    customActions?: (row: T, popupState: any) => React.ReactNode;
    shouldShowActions?: (row: T) => boolean;
}

export interface PaginationState {
    page?: number;
    rowsPerPage?: number;
    totalCount?: number;
    onPageChange?: (event: unknown, newPage: number) => void;
    onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    enabled?: boolean; // New flag to enable/disable pagination
}

export interface SortingState<T> {
    order: "asc" | "desc";
    orderBy: keyof T | string;
    onRequestSort: (property: string) => void;
}

export interface SelectionState {
    selected: (string | number)[];
    onSelectAll: (checked: boolean) => void;
    onSelect: (id: string | number) => void;
    isSelected: (id: string | number) => boolean;
}
