"use client";
import {
    Checkbox,
    Menu,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
} from "@mui/material";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import Link from "next/link";
import React from "react";
import {
    PaginationState,
    SelectionState,
    SortingState,
    TableActions,
    TableColumn,
} from "./TableTypes";

interface DynamicTableProps<T extends { id: string | number; isActive?: boolean }> {
    rows: T[];
    columns: TableColumn<T>[];
    actions?: TableActions<T>;
    pagination: PaginationState;
    sorting: SortingState<T>;
    selection: SelectionState;
    t_g: (key: string) => string; // Translation function for general terms
    expandedRowRender?: (row: T) => React.ReactNode;
    isRowExpanded?: (row: T) => boolean;
}

const flattenChildren = (children: React.ReactNode): React.ReactNode[] => {
    const result: React.ReactNode[] = [];
    React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.type === React.Fragment) {
            result.push(...flattenChildren((child.props as any).children));
        } else if (child !== null && child !== undefined && child !== false) {
            result.push(child);
        }
    });
    return result;
};

const DynamicTable = <T extends { id: string | number; isActive?: boolean }>({
    rows,
    columns,
    actions,
    pagination,
    sorting,
    selection,
    t_g,
    expandedRowRender,
    isRowExpanded,
}: DynamicTableProps<T>) => {
    return (
        <Paper sx={{ width: "100%", mb: 2, backgroundColor: "transparent", boxShadow: "none" }} className="bg-transparent shadow-none">
            <TableContainer className="bg-transparent">
                <Table aria-label="enhanced table" size="medium">
                    <TableHead className="bg-slate-50 dark:bg-slate-800">
                        <TableRow>
                            <TableCell>
                                <Checkbox
                                    id="check-all"
                                    name="check-all"
                                    indeterminate={
                                        selection.selected.length > 0 &&
                                        selection.selected.length < rows.length
                                    }
                                    checked={
                                        rows.length > 0 &&
                                        selection.selected.length === rows.length
                                    }
                                    onChange={(e) => selection.onSelectAll(e.target.checked)}
                                />
                            </TableCell>
                            {columns.map((column) => (
                                <TableCell key={column.id as string} align={column.align}>
                                    {column.sortable ? (
                                        <TableSortLabel
                                            active={sorting.orderBy === column.id}
                                            direction={sorting.orderBy === column.id ? sorting.order : "asc"}
                                            onClick={() => sorting.onRequestSort(column.id as string)}
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    ) : (
                                        column.label
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length === 0 ? (
                            <TableRow key="no-data-row">
                                <TableCell colSpan={columns.length + 1} style={{ textAlignLast: "center" }}>
                                    {t_g("dataNotFound")}
                                </TableCell>
                            </TableRow>
                        ) : (
                            rows.map((row) => (
                                <React.Fragment key={row.id}>
                                    <TableRow
                                        hover
                                    onClick={() => selection.onSelect(row.id)}
                                    role="checkbox"
                                    aria-checked={selection.isSelected(row.id)}
                                    selected={selection.isSelected(row.id)}
                                >
                                    <TableCell>
                                        <Checkbox
                                            checked={selection.isSelected(row.id)}
                                            id={`checkbox-${row.id}`}
                                            name={`checkbox-${row.id}`}
                                        />
                                    </TableCell>
                                    {columns.map((column) => (
                                        <TableCell key={column.id as string} align={column.align}>
                                            {column.render ? (
                                                column.render(row)
                                            ) : column.id === "status" ? (
                                                row.isActive !== undefined ? (
                                                    row.isActive ? (
                                                        <span className="badge-stroke badge-success">{t_g("activated")}</span>
                                                    ) : (
                                                        <span className="badge-stroke badge-danger">{t_g("deactivated")}</span>
                                                    )
                                                ) : (row as any).status !== undefined ? (
                                                    typeof (row as any).status === "boolean" ? (
                                                        (row as any).status ? (
                                                            <span className="badge-stroke badge-success">{t_g("activated")}</span>
                                                        ) : (
                                                            <span className="badge-stroke badge-danger">{t_g("deactivated")}</span>
                                                        )
                                                    ) : (
                                                        <span className="badge-stroke badge-gray">{String((row as any).status)}</span>
                                                    )
                                                ) : null
                                            ) : column.id === "action" ? (
                                                actions && (!actions.shouldShowActions || actions.shouldShowActions(row)) ? (
                                                    <div className="inventual-list-action-style">
                                                        <PopupState variant="popover">
                                                            {(popupState: any) => (
                                                                <React.Fragment>
                                                                    <button
                                                                        className=""
                                                                        type="button"
                                                                        {...bindTrigger(popupState)}
                                                                    >
                                                                        {t_g("action")}{" "}
                                                                        <i className="fa-sharp fa-solid fa-sort-down"></i>
                                                                    </button>
                                                                    <Menu {...bindMenu(popupState)}>
                                                                        {React.Children.toArray(flattenChildren([
                                                                            actions.editPath && (
                                                                                <MenuItem key="edit-action" onClick={popupState.close}>
                                                                                    <i className="fa-regular fa-pen-to-square"></i>
                                                                                    <Link href={actions.editPath(row.id)}>
                                                                                        {t_g("edit")}
                                                                                    </Link>
                                                                                </MenuItem>
                                                                            ),
                                                                            actions.onDetails && (
                                                                                <MenuItem key="details-action" onClick={() => {
                                                                                    actions.onDetails?.(row.id);
                                                                                    popupState.close();
                                                                                }}>
                                                                                    <i className="fa-regular fa-eye"></i>
                                                                                    {t_g("details")}
                                                                                </MenuItem>
                                                                            ),
                                                                            actions.customActions && actions.customActions(row, popupState),
                                                                            actions.onDeactivate && row.isActive && (
                                                                                <MenuItem
                                                                                    key="deactivate-action"
                                                                                    onClick={() => {
                                                                                        actions.onDeactivate?.(row.id);
                                                                                        popupState.close();
                                                                                    }}
                                                                                >
                                                                                    <i className="fa-light fa-ban"></i>{" "}
                                                                                    {t_g("deactivate")}
                                                                                </MenuItem>
                                                                            ),
                                                                            actions.onActivate && !row.isActive && (
                                                                                <MenuItem
                                                                                    key="activate-action"
                                                                                    onClick={() => {
                                                                                        actions.onActivate?.(row.id);
                                                                                        popupState.close();
                                                                                    }}
                                                                                >
                                                                                    <i className="fa-light fa-check"></i>{" "}
                                                                                    {t_g("patch")}
                                                                                </MenuItem>
                                                                            ),
                                                                            actions.onDelete && (
                                                                                <MenuItem
                                                                                    key="delete-action"
                                                                                    onClick={() => {
                                                                                        actions.onDelete?.(row.id);
                                                                                        popupState.close();
                                                                                    }}
                                                                                >
                                                                                    <i className="fa-light fa-trash-can"></i>{" "}
                                                                                    {t_g("delete")}
                                                                                </MenuItem>
                                                                            )
                                                                        ]))}
                                                                    </Menu>
                                                                </React.Fragment>
                                                            )}
                                                        </PopupState>
                                                    </div>
                                                ) : (
                                                    <span className="text-slate-400 dark:text-slate-500 text-xs italic">
                                                        {t_g("protected")}
                                                    </span>
                                                )
                                            ) : (
                                                (row[column.id as keyof T] as unknown as string)
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                                {isRowExpanded && isRowExpanded(row) && expandedRowRender && (
                                    <TableRow>
                                        <TableCell colSpan={columns.length + 1} style={{ padding: 0, borderBottom: "none" }}>
                                            {expandedRowRender(row)}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </React.Fragment>
                        ))
                    )}
                </TableBody>
                </Table>
            </TableContainer>
            {pagination.enabled !== false && (
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={pagination.totalCount || 0}
                    rowsPerPage={pagination.rowsPerPage || 10}
                    page={pagination.page || 0}
                    onPageChange={pagination.onPageChange || (() => { })}
                    onRowsPerPageChange={pagination.onRowsPerPageChange || (() => { })}
                    labelRowsPerPage={t_g("rowsPerPage")}
                    slotProps={{
                        select: {
                            inputProps: {
                                id: "rows-per-page-select",
                                name: "rows-per-page-select",
                            },
                        },
                    }}
                />
            )}
        </Paper>
    );
};

export default DynamicTable;
