"use client";

import { useState, useCallback } from "react";
import { ColumnDef, DataTable, RowAction } from "../../_components/data-table";
import { Edit2, Trash2 } from "lucide-react";
import { IUnit } from "@/types/models/unit.model";
import { GetUnitsParams } from "@/services/unit.service";
import { useGetUnits } from "@/hooks/use-unit";
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

const columns: ColumnDef<IUnit>[] = [
    { key: "unitCode", header: "Mã đơn vị" },
    { key: "unitName", header: "Tên đơn vị" },
    { key: "shortName", header: "Tên ngắn" },
    { key: "parentUnitName", header: "Đơn vị cha" },
    { key: "unitLevel", header: "Cấp" },
    { key: "organizationName", header: "Tổ chức" },
    { key: "activeFlag", header: "Trạng thái" },
];

const ACTIVE_FILTER_KEY = "activeFlag";

export default function UnitTableClient({
    openEdit,
    openCreate,
    onDelete,
}: {
    openEdit: (row: IUnit) => void;
    openCreate: () => void;
    onDelete: (row: IUnit) => void;
}) {
    const [params, setParams] = useState<GetUnitsParams>({
        page: 0,
        size: 10,
        sortBy: "unitName",
        sortDir: "asc",
        activeFlag: 1,
    });

    const { data, status } = useGetUnits(params);
    const [deleteTarget, setDeleteTarget] = useState<IUnit | null>(null);

    const units = data?.isError === false ? data.data.content : [];
    const totalElements = data?.isError === false ? data.data.totalElements : 0;
    const totalPages = data?.isError === false ? data.data.totalPages : 1;

    const actions = useCallback(
        (row: IUnit): RowAction<IUnit>[] => [
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
            setParams((prev) => ({
                ...prev,
                unitName: value || undefined,
                page: 0,
            })),
        [],
    );

    const handleFilterChange = useCallback(
        (filters: Record<string, string>) => {
            const value = filters[ACTIVE_FILTER_KEY];
            setParams((prev) => ({
                ...prev,
                activeFlag: value === "" ? undefined : Number(value),
                page: 0,
            }));
        },
        [],
    );

    const handlePageChange = useCallback(
        (page: number) => setParams((prev) => ({ ...prev, page: page - 1 })),
        [],
    );

    const handlePageSizeChange = useCallback(
        (size: number) => setParams((prev) => ({ ...prev, size, page: 0 })),
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
                data={units}
                loading={status === "pending"}
                columns={columns}
                rowKey={(row) => row.id ?? ""}
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
                emptyText="Không tìm thấy đơn vị nào phù hợp."
                summary={() => <span>{totalElements} đơn vị</span>}
                toolbar={{
                    searchPlaceholder: "Tìm theo tên đơn vị",
                    searchKeys: ["unitName"] as (keyof IUnit)[],
                    onSearchChange: handleSearchChange,
                    defaultFilterValues: {
                        [ACTIVE_FILTER_KEY]: "1",
                    },
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
                            Bạn có chắc chắn muốn xóa đơn vị{" "}
                            <span className="font-semibold text-foreground">
                                {deleteTarget?.unitName}
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
