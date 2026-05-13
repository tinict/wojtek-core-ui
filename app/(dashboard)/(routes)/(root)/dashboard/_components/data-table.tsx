"use client";

import { useState, useMemo, useCallback, ReactNode } from "react";
import { Search, Plus, X, ChevronLeft, ChevronRight } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type SelectOption = { value: string; label: string };

export interface ColumnDef<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  cellClassName?: string;
  headerClassName?: string;
  hidden?: boolean;
}

export interface RowAction<T> {
  icon: ReactNode;
  label: string;
  onClick: (row: T) => void;
  danger?: boolean;
}

export interface FilterDef {
  key: string;
  label: string;
  options: SelectOption[];
  widthCls?: string;
}

export interface ToolbarConfig<T> {
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
  filters?: FilterDef[];
  customFilter?: (
    row: T,
    search: string,
    filters: Record<string, string>,
  ) => boolean;
  onAdd?: () => void;
  addLabel?: string;
  extraControls?: ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  rowKey: (row: T) => string | number;
  actions?: (row: T) => RowAction<T>[];
  toolbar?: ToolbarConfig<T>;
  pageSize?: number;
  emptyText?: string;
  summary?: (count: number) => ReactNode;
  className?: string;
}

function safeStr(v: unknown): string {
  if (v === null || v === undefined) return "";
  return String(v).toLowerCase();
}

function FilterSelect({
  label,
  options,
  value,
  onChange,
  widthCls = "w-40",
}: {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (v: string) => void;
  widthCls?: string;
}) {
  return (
    <div className={`flex flex-col gap-1 ${widthCls}`}>
      <label className="text-[11px] font-medium text-[#6e80a8]">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-lg border border-[#e8eaf0] bg-white px-3 text-sm text-[#1a2445] focus:border-[#1a2445] focus:outline-none focus:ring-2 focus:ring-[#1a2445]/10"
      >
        <option value="">Tất cả</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function DataTable<T>({
  data,
  columns,
  rowKey,
  actions,
  toolbar,
  pageSize = 10,
  emptyText = "Không có dữ liệu.",
  summary,
  className,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);

  const visibleColumns = columns.filter((c) => !c.hidden);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((row) => {
      if (toolbar?.customFilter) {
        return toolbar.customFilter(row, q, filterValues);
      }
      if (q && toolbar?.searchKeys?.length) {
        const hit = toolbar.searchKeys.some((k) => safeStr(row[k]).includes(q));
        if (!hit) return false;
      }
      for (const [key, val] of Object.entries(filterValues)) {
        if (!val) continue;
        if (
          safeStr((row as Record<string, unknown>)[key]) !== val.toLowerCase()
        )
          return false;
      }
      return true;
    });
  }, [data, search, filterValues, toolbar]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const rows = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handleSearch = useCallback((v: string) => {
    setSearch(v);
    setPage(1);
  }, []);
  const handleFilter = useCallback((key: string, val: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: val }));
    setPage(1);
  }, []);
  const handleClear = useCallback(() => {
    setSearch("");
    setFilterValues({});
    setPage(1);
  }, []);

  const hasDirtyFilters =
    search.trim() !== "" || Object.values(filterValues).some(Boolean);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(
      (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1,
    )
    .reduce<(number | "…")[]>((acc, p, idx, arr) => {
      if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("…");
      acc.push(p);
      return acc;
    }, []);

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-xl border border-[#e8eaf0] bg-white shadow-sm ${className ?? ""}`}
    >
      {toolbar && (
        <div className="flex flex-wrap items-end gap-3 border-b border-[#e8eaf0] px-4 py-3">
          {toolbar.searchKeys && (
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-[#6e80a8]">
                Tìm kiếm
              </label>
              <div className="relative flex items-center">
                <Search
                  size={14}
                  className="pointer-events-none absolute left-3 text-[#9aa3b4]"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder={toolbar.searchPlaceholder ?? "Tìm kiếm..."}
                  className="h-9 w-56 rounded-lg border border-[#e8eaf0] bg-white pl-8 pr-3 text-sm text-[#1a2445] placeholder:text-[#9aa3b4] focus:border-[#1a2445] focus:outline-none focus:ring-2 focus:ring-[#1a2445]/10"
                />
              </div>
            </div>
          )}

          {toolbar.filters?.map((f) => (
            <FilterSelect
              key={f.key}
              label={f.label}
              options={f.options}
              value={filterValues[f.key] ?? ""}
              onChange={(v) => handleFilter(f.key, v)}
              widthCls={f.widthCls}
            />
          ))}

          {toolbar.extraControls}
          <div className="flex-1" />

          {hasDirtyFilters && (
            <button
              type="button"
              onClick={handleClear}
              className="flex h-9 items-center gap-1.5 rounded-lg border border-[#e8eaf0] bg-white px-3 text-sm text-[#6e80a8] transition hover:border-[#cbd0de] hover:text-[#1a2445]"
            >
              <X size={13} /> Xóa bộ lọc
            </button>
          )}

          {toolbar.onAdd && (
            <button
              type="button"
              onClick={toolbar.onAdd}
              className="flex h-9 items-center gap-1.5 rounded-lg bg-[#1a2445] px-4 text-sm font-semibold text-white transition hover:bg-[#253264]"
            >
              <Plus size={14} /> {toolbar.addLabel ?? "Thêm mới"}
            </button>
          )}
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow className="bg-[#f8f9fc] hover:bg-[#f8f9fc]">
            {visibleColumns.map((col) => (
              <TableHead
                key={col.key}
                className={`whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-[#6e80a8] ${col.headerClassName ?? ""}`}
              >
                {col.header}
              </TableHead>
            ))}
            {actions && (
              <TableHead className="w-24 text-right text-[11px] font-semibold uppercase tracking-wide text-[#6e80a8]">
                Thao tác
              </TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={visibleColumns.length + (actions ? 1 : 0)}
                className="py-12 text-center text-sm text-[#9aa3b4]"
              >
                {emptyText}
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, idx) => (
              <TableRow
                key={rowKey(row)}
                className={idx % 2 !== 0 ? "bg-[#fafbfd]" : ""}
              >
                {visibleColumns.map((col) => (
                  <TableCell
                    key={col.key}
                    className={`text-[#4a5568] ${col.cellClassName ?? ""}`}
                  >
                    {col.render
                      ? col.render(row)
                      : safeStr((row as Record<string, unknown>)[col.key])}
                  </TableCell>
                ))}

                {actions && (
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {actions(row).map((action, i) => (
                        <button
                          key={i}
                          type="button"
                          title={action.label}
                          onClick={() => action.onClick(row)}
                          className={`flex h-7 w-7 items-center justify-center rounded-lg text-[#6e80a8] transition ${
                            action.danger
                              ? "hover:bg-red-50 hover:text-red-500"
                              : "hover:bg-[#eef2ff] hover:text-[#3b5bdb]"
                          }`}
                        >
                          {action.icon}
                        </button>
                      ))}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e8eaf0] px-4 py-3">
        <span className="text-xs text-[#9aa3b4]">
          {summary ? summary(filtered.length) : `${filtered.length} bản ghi`}
        </span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#e8eaf0] text-[#6e80a8] transition hover:bg-[#f0f2f7] disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft size={14} />
          </button>

          {pageNumbers.map((p, i) =>
            p === "…" ? (
              <span
                key={`ellipsis-${i}`}
                className="flex h-7 w-7 items-center justify-center text-xs text-[#9aa3b4]"
              >
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p as number)}
                className={`flex h-7 min-w-[28px] items-center justify-center rounded-lg border px-1 text-xs font-medium transition ${
                  currentPage === p
                    ? "border-[#1a2445] bg-[#1a2445] text-white"
                    : "border-[#e8eaf0] text-[#6e80a8] hover:bg-[#f0f2f7]"
                }`}
              >
                {p}
              </button>
            ),
          )}

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#e8eaf0] text-[#6e80a8] transition hover:bg-[#f0f2f7] disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
