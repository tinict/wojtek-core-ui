"use client";

import { useState, useCallback } from "react";
import { ColumnDef, DataTable, RowAction } from "../../_components/data-table";
import { Edit2, Trash2 } from "lucide-react";
import { IDeviceCategory } from "@/types/models/device-category.model";
import { GetDeviceCategoriesParams } from "@/services/device-category.service";
import { useGetDeviceCategories } from "@/hooks/use-device-category";
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

const columns: ColumnDef<IDeviceCategory>[] = [
    { key: "categoryName", header: "Tên danh mục" },
    { key: "description", header: "Mô tả" },
    { key: "activeFlag", header: "Trạng thái" },
];

const ACTIVE_FILTER_KEY = "activeFlag";

export default function DeviceCategoryTableClient({
    openEdit,
    openCreate,
    onDelete,
}: {
    openEdit: (row: IDeviceCategory) => void;
    openCreate: () => void;
    onDelete: (row: IDeviceCategory) => void;
}) {
    const [params, setParams] = useState<GetDeviceCategoriesParams>({
        page: 0,
        size: 10,
        sortBy: "categoryName",
        sortDir: "asc",
        activeFlag: 1,
    });

    const { data, status } = useGetDeviceCategories(params);
    const [deleteTarget, setDeleteTarget] = useState<IDeviceCategory | null>(
        null,
    );

    const categories = data?.isError === false ? data.data.content : [];
    const totalElements = data?.isError === false ? data.data.totalElements : 0;
    const totalPages = data?.isError === false ? data.data.totalPages : 1;

    const actions = useCallback(
        (row: IDeviceCategory): RowAction<IDeviceCategory>[] => [
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
                categoryName: value || undefined,
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
                data={categories}
                loading={status === "pending"}
                columns={columns}
                rowKey={(row) => row.categoryId ?? ""}
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
                emptyText="Không tìm thấy danh mục nào phù hợp."
                summary={() => <span>{totalElements} danh mục</span>}
                toolbar={{
                    searchPlaceholder: "Tìm theo tên danh mục",
                    searchKeys: ["categoryName"] as (keyof IDeviceCategory)[],
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
                            Bạn có chắc chắn muốn xóa danh mục{" "}
                            <span className="font-semibold text-foreground">
                                {deleteTarget?.categoryName}
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
