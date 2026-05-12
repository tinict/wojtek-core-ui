"use client";

import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
    useCallback,
    type ReactNode,
    type ComponentPropsWithRef,
} from "react";

import {
    Spinner,
    Separator,
    DateRangePicker,
} from "@heroui/react";

import type { Selection, SortDescriptor } from "@heroui/react";
import { Inbox, Search, X } from "lucide-react";
import { cx } from "tailwind-variants";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";

export interface SelectOption {
    value: string;
    label: string;
    description?: string;
};

export interface CheckboxOption {
    value: string;
    label: string;
    description?: string;
}

export interface RadioOption {
    value: string;
    label: string;
    description?: string;
}

interface DataPanelCtx {
    size?: "sm" | "md" | "lg";
};
const DataPanelContext = createContext<DataPanelCtx>({});

interface TableSlotCtx {
    setEmptySlot: (node: ReactNode) => void;
    setFooterSlot: (node: ReactNode) => void;
}
const TableSlotContext = createContext<TableSlotCtx>({
    setEmptySlot: () => {},
    setFooterSlot: () => {},
});

export interface DataPanelRootProps {
    children: ReactNode;
    size?: "sm" | "md" | "lg";
    className?: string;
}

const DataPanelRoot = ({ children, size = "md", className = "" }: DataPanelRootProps) => (
    <DataPanelContext value={{ size }}>
        <div
            data-slot="data-panel"
            className={`rounded-2xl overflow-hidden border border-[#e8eaf0] shadow-sm bg-white ${className}`}
        >
            {children}
        </div>
    </DataPanelContext>
);

export interface DataPanelControlProps extends React.FormHTMLAttributes<HTMLFormElement> {
    children: ReactNode;
};

const DataPanelControl = ({ children, className = "", ...props }: DataPanelControlProps) => (
    <form
        data-slot="data-panel-control"
        noValidate
        className={`flex flex-col gap-3 px-4 py-4 border-b border-[#e8eaf0] bg-[#f8f9fc] ${className}`}
        {...props}
    >
        {children}
    </form>
);

export interface DataPanelControlRowProps {
    children: ReactNode;
    className?: string;
}

const DataPanelControlRow = ({ children, className = "" }: DataPanelControlRowProps) => (
    <div data-slot="data-panel-control-row" className={`flex flex-wrap items-end gap-3 ${className}`}>
        {children}
    </div>
);

export interface DataPanelControlFieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
    children: ReactNode;
};

const DataPanelControlFieldset = ({ children, className = "", ...props }: DataPanelControlFieldsetProps) => (
    <fieldset
        data-slot="data-panel-control-fieldset"
        className={`flex flex-wrap gap-3 border-0 p-0 m-0 ${className}`}
        {...props}
    >
        {children}
    </fieldset>
);

export interface DataPanelControlTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    description?: string;
    inputClassName?: string;
    error?: string;
};

const DataPanelControlTextField = ({
    label,
    description,
    placeholder,
    inputClassName = "",
    className = "",
    error,
    id,
    ...props
}: DataPanelControlTextFieldProps) => {
    const fieldId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
        <div data-slot="data-panel-control-textfield" className={`flex flex-col gap-1 ${className}`}>
            {label && (
                <label htmlFor={fieldId} className="text-xs font-medium text-[#6e80a8]">
                    {label}
                </label>
            )}
            {description && <span className="text-xs text-[#9aa3b8]">{description}</span>}
            <input
                id={fieldId}
                placeholder={placeholder}
                className={`border border-[#e8eaf0] rounded-lg bg-white px-3 h-9 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a2445]/20 focus:border-[#1a2445] ${inputClassName}`}
                {...props}
            />
            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
};

export interface DataPanelControlTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    description?: string;
    textareaClassName?: string;
    error?: string;
};

const DataPanelControlTextArea = ({
    label,
    description,
    placeholder,
    rows = 3,
    textareaClassName = "",
    className = "",
    error,
    id,
    ...props
}: DataPanelControlTextAreaProps) => {
    const fieldId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
        <div data-slot="data-panel-control-textarea" className={`flex flex-col gap-1 ${className}`}>
            {label && (
                <label htmlFor={fieldId} className="text-xs font-medium text-[#6e80a8]">
                    {label}
                </label>
            )}
            {description && <span className="text-xs text-[#9aa3b8]">{description}</span>}
            <textarea
                id={fieldId}
                placeholder={placeholder}
                rows={rows}
                className={`border border-[#e8eaf0] rounded-lg bg-white px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#1a2445]/20 focus:border-[#1a2445] ${textareaClassName}`}
                {...props}
            />
            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
};

const CHEVRON_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236e80a8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`;

export interface DataPanelControlSelectProps {
    label?: string;
    description?: string;
    placeholder?: string;
    options: SelectOption[];
    selectedKey?: string | null;
    onSelectionChange?: (key: string) => void;
    className?: string;
    disabled?: boolean;
};

const DataPanelControlSelect = ({
    label,
    description,
    placeholder = "Chọn...",
    options,
    selectedKey,
    onSelectionChange,
    className = "",
    disabled = false,
}: DataPanelControlSelectProps) => (
    <div data-slot="data-panel-control-select" className={`flex flex-col gap-1 ${className}`}>
        {label && <label className="text-xs font-medium text-[#6e80a8]">{label}</label>}
        {description && <span className="text-xs text-[#9aa3b8]">{description}</span>}
        <select
            value={selectedKey ?? ""}
            onChange={(e) => onSelectionChange?.(e.target.value)}
            disabled={disabled}
            className="border border-[#e8eaf0] rounded-xl h-9 pl-3 pr-8 bg-white text-sm text-[#1a2445] appearance-none cursor-pointer w-full focus:outline-none focus:ring-2 focus:ring-[#1a2445]/20 focus:border-[#1a2445] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundImage: CHEVRON_SVG, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}
        >
            <option value="" disabled hidden>{placeholder}</option>
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
    </div>
);

export interface DataPanelControlSearchFieldProps {
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
}

const DataPanelControlSearchField = ({
    label,
    placeholder = "Tìm kiếm...",
    className = "",
    value,
    onChange,
}: DataPanelControlSearchFieldProps) => (
    <div data-slot="data-panel-control-searchfield" className={`flex flex-col gap-1 ${className}`}>
        {label && <span className="text-xs font-medium text-[#6e80a8]">{label}</span>}
        <div className="relative h-9 rounded-lg border border-[#e8eaf0] bg-white w-full focus-within:border-[#1a2445] focus-within:ring-2 focus-within:ring-[#1a2445]/20 transition-all flex items-center">
            <input
                type="search"
                placeholder={placeholder}
                value={value ?? ""}
                onChange={(e) => onChange?.(e.target.value)}
                className="text-sm bg-transparent border-none outline-none focus:outline-none w-full h-full px-3 [&::-webkit-search-cancel-button]:hidden"
            />
            {value && (
                <button
                    type="button"
                    onClick={() => onChange?.("")}
                    aria-label="Xóa"
                    className="shrink-0 px-2 text-[#9aa3b8] hover:text-[#1a2445] transition-colors"
                >
                    <X size={13} />
                </button>
            )}
        </div>
    </div>
);

export interface DataPanelControlAutocompleteProps {
    label?: string;
    description?: string;
    placeholder?: string;
    options: SelectOption[];
    selectedKey?: string | null;
    onSelectionChange?: (key: string) => void;
    renderOption?: (opt: SelectOption) => ReactNode;
    className?: string;
};

const DataPanelControlAutocomplete = ({
    label,
    description,
    placeholder = "Tìm kiếm...",
    options,
    selectedKey,
    onSelectionChange,
    renderOption,
    className = "",
}: DataPanelControlAutocompleteProps) => {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const filtered = options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));
    const selected = options.find((o) => o.value === selectedKey);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={ref} data-slot="data-panel-control-autocomplete" className={`flex flex-col gap-1 ${className}`}>
            {label && <label className="text-xs font-medium text-[#6e80a8]">{label}</label>}
            {description && <span className="text-xs text-[#9aa3b8]">{description}</span>}
            <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa3b8] pointer-events-none">
                    <Search size={13} />
                </div>
                <input
                    type="text"
                    value={open ? query : (selected?.label ?? "")}
                    placeholder={placeholder}
                    onFocus={() => { setOpen(true); setQuery(""); }}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border border-[#e8eaf0] rounded-xl h-9 pl-8 pr-8 bg-white text-sm text-[#1a2445] w-full focus:outline-none focus:ring-2 focus:ring-[#1a2445]/20 focus:border-[#1a2445]"
                />
                {selectedKey && !open && (
                    <button
                        type="button"
                        onClick={() => { onSelectionChange?.(""); setQuery(""); }}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9aa3b8] hover:text-[#1a2445]"
                    >
                        <X size={12} />
                    </button>
                )}
                {open && (
                    <div className="absolute z-50 mt-1 w-full bg-white border border-[#e8eaf0] rounded-xl shadow-lg overflow-hidden">
                        <div className="max-h-48 overflow-y-auto py-1">
                            {filtered.length === 0 ? (
                                <div className="px-3 py-4 text-xs text-[#9aa3b8] text-center">Không có kết quả</div>
                            ) : (
                                filtered.map((opt) => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => { onSelectionChange?.(opt.value); setOpen(false); setQuery(""); }}
                                        className={`w-full text-left px-3 py-2 text-sm transition ${opt.value === selectedKey ? "bg-[#eef2ff] text-[#3b5bdb] font-medium" : "text-[#1a2445] hover:bg-[#f4f6fb]"}`}
                                    >
                                        {renderOption ? renderOption(opt) : opt.label}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export interface DataPanelControlCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
};

const DataPanelControlCheckbox = ({ label, className = "", id, ...props }: DataPanelControlCheckboxProps) => {
    const fieldId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
        <label className={`flex items-center gap-2 cursor-pointer text-sm text-[#1a2445] ${className}`}>
            <input type="checkbox" id={fieldId} className="rounded border-[#e8eaf0]" {...props} />
            {label}
        </label>
    );
};

export interface DataPanelControlCheckboxGroupProps {
    label?: string;
    description?: string;
    options: CheckboxOption[];
    value?: string[];
    onChange?: (value: string[]) => void;
    orientation?: "horizontal" | "vertical";
    className?: string;
};

const DataPanelControlCheckboxGroup = ({
    label,
    description,
    options,
    value = [],
    onChange,
    orientation = "horizontal",
    className = "",
}: DataPanelControlCheckboxGroupProps) => (
    <div data-slot="data-panel-control-checkbox-group" className={`flex flex-col gap-1 ${className}`}>
        {label && <span className="text-xs font-medium text-[#6e80a8]">{label}</span>}
        {description && <span className="text-xs text-[#9aa3b8]">{description}</span>}
        <div className={`flex gap-3 ${orientation === "vertical" ? "flex-col" : "flex-row flex-wrap"}`}>
            {options.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2 cursor-pointer text-sm text-[#1a2445]">
                    <input
                        type="checkbox"
                        checked={value.includes(opt.value)}
                        onChange={(e) => {
                            const next = e.target.checked
                                ? [...value, opt.value]
                                : value.filter((v) => v !== opt.value);
                            onChange?.(next);
                        }}
                        className="rounded border-[#e8eaf0]"
                    />
                    {opt.label}
                </label>
            ))}
        </div>
    </div>
);

export interface DataPanelControlRadioGroupProps {
    label?: string;
    description?: string;
    options: RadioOption[];
    value?: string;
    onChange?: (value: string) => void;
    orientation?: "horizontal" | "vertical";
    className?: string;
    name?: string;
};

const DataPanelControlRadioGroup = ({
    label,
    description,
    options,
    value,
    onChange,
    orientation = "horizontal",
    className = "",
    name,
}: DataPanelControlRadioGroupProps) => (
    <div data-slot="data-panel-control-radio-group" className={`flex flex-col gap-1 ${className}`}>
        {label && <span className="text-xs font-medium text-[#6e80a8]">{label}</span>}
        {description && <span className="text-xs text-[#9aa3b8]">{description}</span>}
        <div className={`flex gap-3 ${orientation === "vertical" ? "flex-col" : "flex-row flex-wrap"}`}>
            {options.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2 cursor-pointer text-sm text-[#1a2445]">
                    <input
                        type="radio"
                        name={name}
                        value={opt.value}
                        checked={value === opt.value}
                        onChange={() => onChange?.(opt.value)}
                    />
                    {opt.label}
                </label>
            ))}
        </div>
    </div>
);

export interface DataPanelControlDateRangeProps extends ComponentPropsWithRef<typeof DateRangePicker> {
    label?: string;
    description?: string;
};

const DataPanelControlDateRange = ({ label, description, className = "", ...props }: DataPanelControlDateRangeProps) => (
    <div className={`flex flex-col gap-1 ${className}`}>
        {label && <span className="text-xs font-medium text-[#6e80a8]">{label}</span>}
        {description && <span className="text-xs text-[#9aa3b8]">{description}</span>}
        <DateRangePicker data-slot="data-panel-control-date-range" {...props} />
    </div>
);

export interface DataPanelControlActionsProps {
    children: ReactNode;
    className?: string;
};

const DataPanelControlActions = ({ children, className = "" }: DataPanelControlActionsProps) => (
    <div
        data-slot="data-panel-control-actions"
        className={cx("flex flex-wrap items-center gap-2 self-end", className)}
    >
        {children}
    </div>
);

export interface DataPanelControlButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    icon?: ReactNode;
    isDisabled?: boolean;
    variant?: "primary" | "secondary" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
    onPress?: () => void;
};

const DataPanelControlButton = ({
    loading = false,
    icon,
    children,
    className = "",
    isDisabled,
    disabled,
    variant = "secondary",
    size = "md",
    onPress,
    onClick,
    type = "button",
    ...props
}: DataPanelControlButtonProps) => (
    <button
        data-slot="data-panel-control-button"
        type={type as "button" | "submit" | "reset"}
        disabled={loading || isDisabled || disabled}
        onClick={(e) => { onClick?.(e); onPress?.(); }}
        className={`button button--${size} button--${variant} flex items-center gap-2 ${className}`}
        {...props}
    >
        {loading ? (
            <Spinner size="sm" />
        ) : icon ? (
            <span className="[&>svg]:w-3.5 [&>svg]:h-3.5 shrink-0">{icon}</span>
        ) : null}
        {children as ReactNode}
    </button>
);

// ─── Table types ────────────────────────────────────────────────────────────

export interface DataPanelTableColumnDef {
    key: string;
    label: ReactNode;
    className?: string;
    headerClassName?: string;
}

export interface DataPanelTableProps {
    columns: DataPanelTableColumnDef[];
    children?: ReactNode;
    loading?: boolean;
    className?: string;
    "aria-label"?: string;
    sortDescriptor?: SortDescriptor;
    onSortChange?: (descriptor: SortDescriptor) => void;
    selectionMode?: "none" | "single" | "multiple";
    selectedKeys?: Selection;
    onSelectionChange?: (keys: Selection) => void;
}

const DataPanelTable = ({
    columns,
    children,
    loading = false,
    className = "",
}: DataPanelTableProps) => {
    const [emptySlot, setEmptySlotRaw] = useState<ReactNode>(null);
    const [footerSlot, setFooterSlotRaw] = useState<ReactNode>(null);

    const setEmptySlot = useCallback((node: ReactNode) => setEmptySlotRaw(node), []);
    const setFooterSlot = useCallback((node: ReactNode) => setFooterSlotRaw(node), []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-16 gap-2 text-[#9aa3b8]">
                <Spinner size="sm" />
                <span className="text-sm">Đang tải...</span>
            </div>
        );
    }

    const footerChildren: ReactNode[] = [];
    const bodyChildren: ReactNode[] = [];

    React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.type === DataPanelTableFooter) {
            footerChildren.push(child);
        } else {
            bodyChildren.push(child);
        }
    });

    return (
        <TableSlotContext value={{ setEmptySlot, setFooterSlot }}>
            <div data-slot="data-panel-table-wrapper" className={`p-3 ${className}`}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((col) => (
                                <TableHead
                                    key={col.key}
                                    className={`text-xs font-semibold text-[#6e80a8] uppercase tracking-wide ${col.headerClassName ?? ""}`}
                                >
                                    {col.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bodyChildren}
                    </TableBody>
                </Table>
                {footerChildren}
                {emptySlot}
                {footerSlot}
            </div>
        </TableSlotContext>
    );
};

export interface DataPanelTableBodyProps {
    children?: ReactNode;
    rowCount?: number;
    emptyText?: string;
    emptyIcon?: ReactNode;
};

const DataPanelTableBody = ({ children, rowCount, emptyText = "Không có dữ liệu", emptyIcon }: DataPanelTableBodyProps) => {
    const { setEmptySlot } = useContext(TableSlotContext);

    const isEmpty =
        rowCount === 0 ||
        (rowCount === undefined && (!children || (Array.isArray(children) && children.length === 0)));

    useEffect(() => {
        setEmptySlot(
            isEmpty ? (
                <div className="flex flex-col items-center gap-2 text-[#9aa3b8] py-16">
                    {emptyIcon ?? <Inbox size={36} strokeWidth={1.5} />}
                    <span className="text-sm">{emptyText}</span>
                </div>
            ) : null,
        );
    }, [isEmpty, emptyText, setEmptySlot]);

    return <>{isEmpty ? null : children}</>;
};

export interface DataPanelTableRowProps {
    children: ReactNode;
    className?: string;
}

const DataPanelTableRow = ({ children, className = "" }: DataPanelTableRowProps) => (
    <TableRow className={`hover:bg-[#f8f9fc] transition-colors ${className}`}>
        {children}
    </TableRow>
);

export interface DataPanelTableCellProps {
    children?: ReactNode;
    className?: string;
}

const DataPanelTableCell = ({ children, className = "" }: DataPanelTableCellProps) => (
    <TableCell className={`text-sm text-[#1a2445] py-3 px-4 ${className}`}>
        {children}
    </TableCell>
);

export interface DataPanelTableFooterProps {
    children?: ReactNode;
    totalPages?: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
    className?: string;
}

const DataPanelTableFooter = ({ children, totalPages, currentPage = 1, onPageChange, className = "" }: DataPanelTableFooterProps) => {
    const { setFooterSlot } = useContext(TableSlotContext);

    useEffect(() => {
        const pages = totalPages ? Array.from({ length: totalPages }, (_, i) => i + 1) : [];
        setFooterSlot(
            <div className={`flex items-center justify-between px-4 py-3 border-t border-[#e8eaf0] text-xs text-[#9aa3b8] ${className}`}>
                <div>{children}</div>
                {totalPages !== undefined && (
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
                            disabled={currentPage <= 1}
                            className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#e8eaf0] text-[#6e80a8] hover:bg-[#f4f6fb] disabled:opacity-40 disabled:cursor-not-allowed transition"
                        >‹</button>
                        {pages.map((p) => (
                            <button
                                key={p}
                                onClick={() => onPageChange?.(p)}
                                className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-medium transition ${p === currentPage ? "bg-[#1a2445] text-white border border-[#1a2445]" : "border border-[#e8eaf0] text-[#6e80a8] hover:bg-[#f4f6fb]"}`}
                                aria-current={p === currentPage ? "page" : undefined}
                            >{p}</button>
                        ))}
                        <button
                            onClick={() => onPageChange?.(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage >= totalPages}
                            className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#e8eaf0] text-[#6e80a8] hover:bg-[#f4f6fb] disabled:opacity-40 disabled:cursor-not-allowed transition"
                        >›</button>
                    </div>
                )}
            </div>,
        );
    }, [children, totalPages, currentPage, className, setFooterSlot]);

    return null;
};

// ─── Compound objects ────────────────────────────────────────────────────────

const DataPanelControl_ = Object.assign(DataPanelControl, {
    Row: DataPanelControlRow,
    Fieldset: DataPanelControlFieldset,
    TextField: DataPanelControlTextField,
    TextArea: DataPanelControlTextArea,
    Select: DataPanelControlSelect,
    SearchField: DataPanelControlSearchField,
    Autocomplete: DataPanelControlAutocomplete,
    Checkbox: DataPanelControlCheckbox,
    CheckboxGroup: DataPanelControlCheckboxGroup,
    RadioGroup: DataPanelControlRadioGroup,
    DateRange: DataPanelControlDateRange,
    Actions: DataPanelControlActions,
    Button: DataPanelControlButton,
    Separator,
});

const DataPanelTable_ = Object.assign(DataPanelTable, {
    Body: DataPanelTableBody,
    Row: DataPanelTableRow,
    Cell: DataPanelTableCell,
    Footer: DataPanelTableFooter,
});

export const DataPanel = Object.assign(DataPanelRoot, {
    Root: DataPanelRoot,
    Control: DataPanelControl_,
    Table: DataPanelTable_,
});

export type { Selection, SortDescriptor };