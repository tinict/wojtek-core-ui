"use client";

import { useState, useCallback } from "react";
import { ColumnDef, DataTable, RowAction } from "../../_components/data-table";
import { Edit2, Trash2 } from "lucide-react";
import { IReportType } from "@/types/models/report-type.model";
import { GetReportTypesParams } from "@/services/report-types.service";
import { useGetReportTypes } from "@/hooks/use-report-type";
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

const columns: ColumnDef<IReportType>[] = [
    { key: "typeId", header: "Mã loại phản ánh" },
    { key: "typeName", header: "Loại phản ánh" },
    { key: "description", header: "Nội dung phản ánh" },
    { key: "active", header: "Trạng thái" },
];

const ACTIVE_FILTER_KEY = "active";

export default function ReportTypeTableClient({
    openEdit,
    openCreate,
    onDelete,
}: {
    openEdit: (row: IReportType) => void;
    openCreate: () => void;
    onDelete: (row: IReportType) => void;
}) {
    const [params, setParams] = useState<GetReportTypesParams>({
        page: 0,
        size: 10,
        sortBy: "typeName",
        sortDir: "asc",
        active: true,
    });

    const { data, status } = useGetReportTypes(params);
    const [deleteTarget, setDeleteTarget] = useState<IReportType | null>(null);

    const reportTypes = data?.isError === false ? data.data.content : [];
    const totalElements = data?.isError === false ? data.data.totalElements : 0;
    const totalPages = data?.isError === false ? data.data.totalPages : 1;

    const actions = useCallback(
        (row: IReportType): RowAction<IReportType>[] => [
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
                typeName: value || undefined,
                page: 0,
            })),
        [],
    );

    const handleFilterChange = useCallback(
        (filters: Record<string, string>) => {
            const value = filters[ACTIVE_FILTER_KEY];
            setParams((prev) => ({
                ...prev,
                active: value === "" ? undefined : value === "true",
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
                data={reportTypes}
                loading={status === "pending"}
                columns={columns}
                rowKey={(row) => row.typeId ?? ""}
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
                emptyText="Không tìm thấy loại phản ánh nào phù hợp."
                summary={() => <span>{totalElements} loại phản ánh</span>}
                toolbar={{
                    searchPlaceholder: "Tìm theo tên loại phản ánh",
                    searchKeys: ["typeName"] as (keyof IReportType)[],
                    onSearchChange: handleSearchChange,
                    defaultFilterValues: {
                        [ACTIVE_FILTER_KEY]: "true",
                    },
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
                            Bạn có chắc chắn muốn xóa loại phản ánh{" "}
                            <span className="font-semibold text-foreground">
                                {deleteTarget?.typeName}
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
