"use client";

import { useState, useCallback } from "react";
import { ColumnDef, DataTable, RowAction } from "../../_components/data-table";
import { Edit2, Trash2 } from "lucide-react";
import { IManufacturer } from "@/types/models/manufacturer.model";
import { GetManufacturersParams } from "@/services/manufacturer.service";
import { useGetManufacturers } from "@/hooks/use-manufacturer";
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

const columns: ColumnDef<IManufacturer>[] = [
    { key: "manufacturerName", header: "Tên hãng sản xuất" },
    { key: "country", header: "Quốc gia" },
    { key: "address", header: "Địa chỉ" },
    { key: "phone", header: "Số điện thoại" },
    { key: "email", header: "Email" },
    { key: "activeFlag", header: "Trạng thái" },
];

const ACTIVE_FILTER_KEY = "activeFlag";

export default function ManufacturerTableClient({
    openEdit,
    openCreate,
    onDelete,
}: {
    openEdit: (row: IManufacturer) => void;
    openCreate: () => void;
    onDelete: (row: IManufacturer) => void;
}) {
    const [params, setParams] = useState<GetManufacturersParams>({
        page: 0,
        size: 10,
        sortBy: "manufacturerName",
        sortDir: "asc",
        activeFlag: 1,
    });

    const { data, status } = useGetManufacturers(params);
    const [deleteTarget, setDeleteTarget] = useState<IManufacturer | null>(
        null,
    );

    const manufacturers = data?.isError === false ? data.data.content : [];
    const totalElements = data?.isError === false ? data.data.totalElements : 0;
    const totalPages = data?.isError === false ? data.data.totalPages : 1;

    const actions = useCallback(
        (row: IManufacturer): RowAction<IManufacturer>[] => [
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
            setParams((p) => ({
                ...p,
                manufacturerName: value || undefined,
                page: 0,
            })),
        [],
    );

    const handleFilterChange = useCallback(
        (filters: Record<string, string>) => {
            const value = filters[ACTIVE_FILTER_KEY];
            setParams((p) => ({
                ...p,
                activeFlag: value === "" ? undefined : Number(value),
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
                data={manufacturers}
                loading={status === "pending"}
                columns={columns}
                rowKey={(row) => row.manufacturerId ?? ""}
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
                emptyText="Không tìm thấy hãng sản xuất nào phù hợp."
                summary={() => <span>{totalElements} hãng sản xuất</span>}
                toolbar={{
                    searchPlaceholder: "Tìm theo tên hãng sản xuất",
                    searchKeys: ["manufacturerName"] as (keyof IManufacturer)[],
                    onSearchChange: handleSearchChange,
                    defaultFilterValues: { [ACTIVE_FILTER_KEY]: "1" },
                    filters: [
                        {
                            key: ACTIVE_FILTER_KEY,
                            label: "Trạng thái",
                            options: [
                                { label: "Đang hoạt động", value: "1" },
                                { label: "Dừng hoạt động", value: "0" },
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
                            Bạn có chắc chắn muốn xóa hãng sản xuất{" "}
                            <span className="font-semibold text-foreground">
                                {deleteTarget?.manufacturerName}
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
