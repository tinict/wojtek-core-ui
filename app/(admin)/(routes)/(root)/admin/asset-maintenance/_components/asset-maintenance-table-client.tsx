"use client";

import { useState, useCallback } from "react";
import { ColumnDef, DataTable, RowAction } from "../../_components/data-table";
import { Edit2, Trash2 } from "lucide-react";
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
import { useGetReports } from "@/hooks/use-report";
import { GetReportParams } from "@/services/report.service";
import { IReport } from "@/types/models/report.model";

const columns: ColumnDef<IReport>[] = [
    { key: "reportId", header: "Mã yêu cầu" },
    { key: "content", header: "Nội dung" },
    { key: "typeName", header: "Loại yêu cầu" },
    { key: "subjectName", header: "Chủ đề yêu cầu" },
];

const ACTIVE_FILTER_KEY = "isActive";

export default function RiskLevelTableClient({
    openEdit,
    openCreate,
    onDelete,
}: {
    openEdit: (row: IReport) => void;
    openCreate: () => void;
    onDelete: (row: IReport) => void;
}) {
    const [params, setParams] = useState<GetReportParams>({
        pageNumber: 10,
        offset: 0,
        paged: true,
    });

    const { data, status } = useGetReports(params);
    const [deleteTarget, setDeleteTarget] = useState<IReport | null>(null);

    const items = data?.isError === false ? data.data.content : [];
    const totalElements = data?.isError === false ? data.data.totalElements : 0;
    const totalPages = data?.isError === false ? data.data.totalPages : 1;

    const actions = useCallback(
        (row: IReport): RowAction<IReport>[] => [
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

    // const handleSearchChange = useCallback(
    //     (value: string) =>
    //         setParams((p) => ({ ...p, name: value || undefined, page: 0 })),
    //     [],
    // );

    // const handleFilterChange = useCallback(
    //     (filters: Record<string, string>) => {
    //         const value = filters[ACTIVE_FILTER_KEY];
    //         setParams((p) => ({
    //             ...p,
    //             isActive: value === "" ? undefined : value === "true",
    //             page: 0,
    //         }));
    //     },
    //     [],
    // );

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
                rowKey={(row) => row.reportId}
                actions={actions}
                manualFiltering
                pagination={{
                    page: (params.offset ?? 0) + 1,
                    pageSize: params.pageNumber ?? 10,
                    totalPages,
                    totalCount: totalElements,
                    onPageChange: handlePageChange,
                    onPageSizeChange: handlePageSizeChange,
                }}
                emptyText="Không tìm thấy mức độ rủi ro nào phù hợp."
                summary={() => <span>{totalElements} mức độ rủi ro</span>}
                toolbar={{
                    searchPlaceholder: "Tìm theo tên mức độ rủi ro",
                    searchKeys: ["content"] as (keyof IReport)[],
                    // onSearchChange: handleSearchChange,
                    // defaultFilterValues: { [ACTIVE_FILTER_KEY]: "true" },
                    filters: [],
                    // onFilterChange: handleFilterChange,
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
                            Bạn có chắc chắn muốn xóa mức độ rủi ro{" "}
                            <span className="font-semibold text-foreground">
                                {deleteTarget?.content}
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
