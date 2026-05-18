"use client";

import { useState, useCallback } from "react";
import { ColumnDef, DataTable, RowAction } from "../../_components/data-table";
import { Edit2, Trash2 } from "lucide-react";
import { IBarcodeFormat } from "@/types/models/barcode-format.model";
import { GetBarcodeFormatsParams } from "@/services/barcode-format.service";
import { useGetBarcodeFormats } from "@/hooks/use-barcode-format";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const columns: ColumnDef<IBarcodeFormat>[] = [
    { key: "code", header: "Mã định dạng" },
    { key: "name", header: "Tên định dạng" },
    { key: "width", header: "Chiều ngang" },
    { key: "height", header: "Chiều cao" },
    { key: "description", header: "Mô tả" },
    { key: "isActive", header: "Trạng thái" },
];

const ACTIVE_FILTER_KEY = "isActive";

export default function BarcodeFormatTableClient({
    openEdit,
    openCreate,
    onDelete,
}: {
    openEdit: (row: IBarcodeFormat) => void;
    openCreate: () => void;
    onDelete: (row: IBarcodeFormat) => void;
}) {
    const [params, setParams] = useState<GetBarcodeFormatsParams>({
        page: 0,
        size: 10,
        sortBy: "name",
        sortDir: "asc",
        isActive: true,
    });

    const { data, status } = useGetBarcodeFormats(params);
    const [deleteTarget, setDeleteTarget] = useState<IBarcodeFormat | null>(
        null,
    );

    const items = data?.isError === false ? data.data.content : [];
    const totalElements = data?.isError === false ? data.data.totalElements : 0;
    const totalPages = data?.isError === false ? data.data.totalPages : 1;

    const actions = useCallback(
        (row: IBarcodeFormat): RowAction<IBarcodeFormat>[] => [
            {
                icon: <Edit2 size={13} />,
                label: "Chỉnh sửa",
                onClick: openEdit,
            },
            {
                icon: <Trash2 size={13} />,
                label: "Xóa",
                danger: true,
                onClick: (r) => setDeleteTarget(r),
            },
        ],
        [openEdit],
    );

    const handleSearchChange = useCallback(
        (value: string) =>
            setParams((p) => ({ ...p, name: value || undefined, page: 0 })),
        [],
    );

    const handleFilterChange = useCallback(
        (filters: Record<string, string>) => {
            const value = filters[ACTIVE_FILTER_KEY];
            setParams((p) => ({
                ...p,
                isActive: value === "" ? undefined : value === "true",
                page: 0,
            }));
        },
        [],
    );

    const handlePageChange = useCallback(
        (page: number) => setParams((p) => ({ ...p, page: page - 1 })),
        [],
    );

    const handlePageSizeChange = useCallback(
        (size: number) => setParams((p) => ({ ...p, size, page: 0 })),
        [],
    );

    const handleDeleteConfirm = useCallback(() => {
        if (deleteTarget) {
            onDelete(deleteTarget);
            setDeleteTarget(null);
        }
    }, [deleteTarget, onDelete]);

    const handleDeleteDialogClose = useCallback((open: boolean) => {
        if (!open) setDeleteTarget(null);
    }, []);

    return (
        <>
            <DataTable
                data={items}
                loading={status === "pending"}
                columns={columns}
                rowKey={(row) => row.id}
                actions={actions}
                manualFiltering
                pagination={{
                    page: (params.page ?? 0) + 1,
                    pageSize: params.size ?? 10,
                    totalPages,
                    totalCount: totalElements,
                    onPageChange: handlePageChange,
                    onPageSizeChange: handlePageSizeChange,
                }}
                emptyText="Không tìm thấy định dạng mã vạch nào phù hợp."
                summary={() => <span>{totalElements} định dạng</span>}
                toolbar={{
                    searchPlaceholder: "Tìm theo tên định dạng",
                    searchKeys: ["name"] as (keyof IBarcodeFormat)[],
                    onSearchChange: handleSearchChange,
                    defaultFilterValues: { [ACTIVE_FILTER_KEY]: "true" },
                    filters: [
                        {
                            key: ACTIVE_FILTER_KEY,
                            label: "Trạng thái",
                            options: [
                                { label: "Đang hoạt động", value: "true" },
                                { label: "Dừng hoạt động", value: "false" },
                            ],
                        },
                    ],
                    onFilterChange: handleFilterChange,
                    onAdd: openCreate,
                    addLabel: "Thêm mới",
                }}
            />
            <AlertDialog
                open={!!deleteTarget}
                onOpenChange={handleDeleteDialogClose}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn xóa định dạng{" "}
                            <span className="font-semibold text-foreground">
                                {deleteTarget?.name}
                            </span>{" "}
                            không? Hành động này không thể hoàn tác.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={handleDeleteConfirm}
                        >
                            Xóa
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
