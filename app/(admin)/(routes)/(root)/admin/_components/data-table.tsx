"use client";

import {
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import { Button } from "@/components/ui/button";
import { DataPanel } from "@/components/wojtek-ui/data-panel";

export type SelectOption = {
    value: string;
    label: string;
};

export interface ColumnDef<TData> {
    key: keyof TData | string;
    header: string;
    render?: (row: TData) => ReactNode;
    cellClassName?: string;
    headerClassName?: string;
    hidden?: boolean;
}

export interface RowAction<TData> {
    icon: ReactNode;
    label: string;
    onClick: (row: TData) => void;
    danger?: boolean;
    variant?: "default" | "danger";
    hidden?: boolean;
}

export interface FilterDef {
    key: string;
    label: string;
    options: SelectOption[];
    widthCls?: string;
}

export interface ToolbarConfig<TData> {
    searchPlaceholder?: string;
    searchKeys?: (keyof TData)[];
    filters?: FilterDef[];
    defaultFilterValues?: Record<string, string>;
    customFilter?: (
        row: TData,
        search: string,
        filters: Record<string, string>,
    ) => boolean;
    onSearchChange?: (value: string) => void;
    onFilterChange?: (filters: Record<string, string>) => void;
    onAdd?: () => void;
    addLabel?: string;
    extraControls?: ReactNode;
}

export interface PaginationConfig {
    page: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
    onPageChange: (page: number) => void;
    onPageSizeChange?: (size: number) => void;
}

export interface DataTableProps<TData> {
    data: TData[];
    columns: ColumnDef<TData>[];
    rowKey: (row: TData) => string | number;
    actions?: (row: TData) => RowAction<TData>[];
    toolbar?: ToolbarConfig<TData>;
    pagination?: PaginationConfig;
    pageSize?: number;
    loading?: boolean;
    manualFiltering?: boolean;
    emptyText?: string;
    summary?: (count: number) => ReactNode;
    rowClassName?: (row: TData, index: number) => string | undefined;
    className?: string;
}

function normalize(value: unknown): string {
    if (value === null || value === undefined) {
        return "";
    }

    return String(value).toLowerCase().trim();
}

export function DataTable<TData>({
    data,
    columns,
    rowKey,
    actions,
    toolbar,
    pagination,
    pageSize = 10,
    loading = false,
    manualFiltering = false,
    emptyText = "Không có dữ liệu.",
    summary,
    rowClassName,
    className,
}: DataTableProps<TData>) {
    const [search, setSearch] = useState("");
    const [filterValues, setFilterValues] = useState<Record<string, string>>(
        toolbar?.defaultFilterValues ?? {},
    );
    const [internalPage, setInternalPage] = useState(1);

    const onSearchChangeRef = useRef(toolbar?.onSearchChange);
    const onFilterChangeRef = useRef(toolbar?.onFilterChange);

    useEffect(() => {
        onSearchChangeRef.current = toolbar?.onSearchChange;
    });

    useEffect(() => {
        onFilterChangeRef.current = toolbar?.onFilterChange;
    });

    useEffect(() => {
        if (manualFiltering) {
            onSearchChangeRef.current?.(search);
        }
    }, [search, manualFiltering]);

    useEffect(() => {
        if (manualFiltering) {
            onFilterChangeRef.current?.(filterValues);
        }
    }, [filterValues, manualFiltering]);

    const visibleColumns = useMemo(
        () => columns.filter((column) => !column.hidden),
        [columns],
    );

    const filtered = useMemo(() => {
        if (manualFiltering) {
            return data;
        }

        const query = search.trim().toLowerCase();

        return data.filter((row) => {
            if (toolbar?.customFilter) {
                return toolbar.customFilter(row, query, filterValues);
            }

            if (query && toolbar?.searchKeys?.length) {
                const matched = toolbar.searchKeys.some((key) =>
                    normalize(row[key]).includes(query),
                );

                if (!matched) {
                    return false;
                }
            }

            for (const [key, value] of Object.entries(filterValues)) {
                if (!value) {
                    continue;
                }

                const rowValue = normalize(
                    (row as Record<string, unknown>)[key],
                );

                if (rowValue !== value.toLowerCase()) {
                    return false;
                }
            }

            return true;
        });
    }, [data, filterValues, manualFiltering, search, toolbar]);

    const isServerPagination = !!pagination;

    const totalPages = isServerPagination
        ? pagination.totalPages
        : Math.max(1, Math.ceil(filtered.length / pageSize));

    const currentPage = isServerPagination
        ? pagination.page
        : Math.min(internalPage, totalPages);

    const rows =
        isServerPagination || manualFiltering
            ? filtered
            : filtered.slice(
                  (currentPage - 1) * pageSize,
                  currentPage * pageSize,
              );

    const handleSearch = useCallback(
        (value: string) => {
            setSearch(value);

            if (!isServerPagination) {
                setInternalPage(1);
            }
        },
        [isServerPagination],
    );

    const handleFilter = useCallback(
        (key: string, value: string) => {
            setFilterValues((prev) => ({
                ...prev,
                [key]: value,
            }));

            if (!isServerPagination) {
                setInternalPage(1);
            }
        },
        [isServerPagination],
    );

    const handleClear = useCallback(() => {
        setSearch("");
        setFilterValues(toolbar?.defaultFilterValues ?? {});

        if (!isServerPagination) {
            setInternalPage(1);
        }
    }, [isServerPagination, toolbar?.defaultFilterValues]);

    const defaultFilters = toolbar?.defaultFilterValues ?? {};
    const hasDirtyFilters =
        search.trim() !== "" ||
        Object.entries(filterValues).some(
            ([k, v]) => v !== (defaultFilters[k] ?? ""),
        );

    const panelColumns = [
        ...visibleColumns.map((column) => ({
            key: String(column.key),
            label: column.header,
            headerClassName: column.headerClassName,
        })),

        ...(actions
            ? [
                  {
                      key: "__actions__",
                      label: "Thao tác",
                      headerClassName: "text-right",
                  },
              ]
            : []),
    ];

    return (
        <DataPanel className={className}>
            {toolbar && (
                <DataPanel.Control onSubmit={(e) => e.preventDefault()}>
                    <DataPanel.Control.Row>
                        {toolbar.searchKeys && (
                            <DataPanel.Control.SearchField
                                label="Tìm kiếm"
                                placeholder={
                                    toolbar.searchPlaceholder ?? "Tìm kiếm..."
                                }
                                value={search}
                                onChange={handleSearch}
                                className="w-60"
                            />
                        )}

                        {toolbar.filters?.map((filter) => (
                            <DataPanel.Control.Select
                                key={filter.key}
                                label={filter.label}
                                options={filter.options}
                                selectedKey={filterValues[filter.key] ?? ""}
                                onSelectionChange={(value) =>
                                    handleFilter(filter.key, value)
                                }
                                className={filter.widthCls ?? "w-44"}
                            />
                        ))}

                        {toolbar.extraControls}

                        <div className="flex-1" />

                        <DataPanel.Control.Actions>
                            {hasDirtyFilters && (
                                <DataPanel.Control.Button
                                    variant="secondary"
                                    onClick={handleClear}
                                >
                                    Xóa bộ lọc
                                </DataPanel.Control.Button>
                            )}

                            {toolbar.onAdd && (
                                <Button
                                    type="button"
                                    variant="basic"
                                    onClick={toolbar.onAdd}
                                >
                                    {toolbar.addLabel ?? "Thêm mới"}
                                </Button>
                            )}
                        </DataPanel.Control.Actions>
                    </DataPanel.Control.Row>
                </DataPanel.Control>
            )}

            <DataPanel.Table columns={panelColumns} loading={loading}>
                <DataPanel.Table.Body
                    rowCount={rows.length}
                    emptyText={emptyText}
                >
                    {rows.map((row, index) => (
                        <DataPanel.Table.Row
                            key={rowKey(row)}
                            className={
                                rowClassName?.(row, index) ??
                                (index % 2 !== 0 ? "bg-[#fafbfd]" : "")
                            }
                        >
                            {visibleColumns.map((column) => (
                                <DataPanel.Table.Cell
                                    key={String(column.key)}
                                    className={column.cellClassName}
                                >
                                    {column.render
                                        ? column.render(row)
                                        : String(
                                              (row as Record<string, unknown>)[
                                                  String(column.key)
                                              ] ?? "",
                                          )}
                                </DataPanel.Table.Cell>
                            ))}

                            {actions && (
                                <DataPanel.Table.Cell className="text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        {actions(row)
                                            .filter((action) => !action.hidden)
                                            .map((action, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    title={action.label}
                                                    onClick={() =>
                                                        action.onClick(row)
                                                    }
                                                    className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                                                        action.variant ===
                                                            "danger" ||
                                                        action.danger
                                                            ? "text-red-500 hover:bg-red-50"
                                                            : "text-[#6e80a8] hover:bg-[#eef2ff] hover:text-[#3b5bdb]"
                                                    }`}
                                                >
                                                    {action.icon}
                                                </button>
                                            ))}
                                    </div>
                                </DataPanel.Table.Cell>
                            )}
                        </DataPanel.Table.Row>
                    ))}
                </DataPanel.Table.Body>

                <DataPanel.Table.Footer
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={
                        isServerPagination
                            ? pagination.onPageChange
                            : setInternalPage
                    }
                    pageSize={
                        isServerPagination ? pagination.pageSize : pageSize
                    }
                    onPageSizeChange={pagination?.onPageSizeChange}
                    totalCount={
                        isServerPagination
                            ? pagination.totalCount
                            : filtered.length
                    }
                >
                    <span className="text-xs text-[#9aa3b4]">
                        {summary
                            ? summary(filtered.length)
                            : `${filtered.length} bản ghi`}
                    </span>
                </DataPanel.Table.Footer>
            </DataPanel.Table>
        </DataPanel>
    );
}
