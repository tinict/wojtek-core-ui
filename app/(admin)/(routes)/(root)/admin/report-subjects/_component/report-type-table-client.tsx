"use client";

import { useCallback, useMemo, useState } from "react";
import { Edit2, Trash2 } from "lucide-react";

import { useGetReportSubjects } from "@/hooks/use-report-subject";
import { useGetReportTypes } from "@/hooks/use-report-type";
import { GetReportSubjectsParams } from "@/services/report-subject.service";

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

import { IReportSubject } from "@/types/models/report-subject.model";
import { ColumnDef, DataTable, RowAction } from "../../_components/data-table";

const columns: ColumnDef<IReportSubject>[] = [
    { key: "subjectId", header: "Mã chủ đề" },
    { key: "subjectName", header: "Tên chủ đề" },
    { key: "typeName", header: "Loại phản ánh" },
    { key: "description", header: "Mô tả" },
    {
        key: "active",
        header: "Trạng thái",
        render: (row) => (
            <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                    row.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                }`}
            >
                {row.active ? "Hoạt động" : "Ngừng hoạt động"}
            </span>
        ),
    },
];

const ACTIVE_FILTER_KEY = "active";
const TYPE_FILTER_KEY = "typeId";

export default function ReportSubjectTableClient({
    openEdit,
    openCreate,
    onDelete,
}: {
    openEdit: (row: IReportSubject) => void;
    openCreate: () => void;
    onDelete: (row: IReportSubject) => void;
}) {
    const [params, setParams] = useState<GetReportSubjectsParams>({
        page: 0,
        size: 10,
        active: true,
    });

    const [deleteTarget, setDeleteTarget] = useState<IReportSubject | null>(
        null,
    );

    const { data: subjectData, status } = useGetReportSubjects(params);
    const { data: typeData } = useGetReportTypes({ size: 999 });

    const rows = subjectData?.isError === false ? subjectData.data.content : [];
    const totalElements =
        subjectData?.isError === false ? subjectData.data.totalElements : 0;
    const totalPages =
        subjectData?.isError === false ? subjectData.data.totalPages : 1;

    const typeOptions = useMemo(
        () => [
            ...(typeData?.isError === false
                ? typeData.data.content.map((t) => ({
                      value: String(t.typeId),
                      label: t.typeName ?? String(t.typeId),
                  }))
                : []),
        ],
        [typeData],
    );

    const actions = useCallback(
        (row: IReportSubject): RowAction<IReportSubject>[] => [
            {
                icon: <Edit2 size={14} />,
                label: "Sửa",
                onClick: openEdit,
            },
            {
                icon: <Trash2 size={14} />,
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
                subjectName: value || undefined,
                page: 0,
            })),
        [],
    );

    const handleFilterChange = useCallback(
        (filters: Record<string, string>) => {
            const active = filters[ACTIVE_FILTER_KEY];
            const typeId = filters[TYPE_FILTER_KEY];
            setParams((prev) => ({
                ...prev,
                typeId: typeId || undefined,
                active: active === "" ? undefined : active === "true",
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
            <DataTable<IReportSubject>
                data={rows}
                loading={status === "pending"}
                manualFiltering
                columns={columns}
                rowKey={(row) => row.subjectId}
                actions={actions}
                emptyText="Không tìm thấy chủ đề phản ánh nào."
                pagination={{
                    page: (params.page ?? 0) + 1,
                    pageSize: params.size ?? 10,
                    totalPages,
                    totalCount: totalElements,
                    onPageChange: handlePageChange,
                    onPageSizeChange: handlePageSizeChange,
                }}
                summary={() => <span>{totalElements} chủ đề</span>}
                toolbar={{
                    searchPlaceholder: "Tìm theo tên chủ đề",
                    searchKeys: ["subjectName"] as (keyof IReportSubject)[],
                    onSearchChange: handleSearchChange,
                    defaultFilterValues: {
                        [ACTIVE_FILTER_KEY]: "true",
                    },
                    filters: [
                        {
                            key: TYPE_FILTER_KEY,
                            label: "Loại phản ánh",
                            options: typeOptions,
                            widthCls: "w-52",
                        },
                        {
                            key: ACTIVE_FILTER_KEY,
                            label: "Trạng thái",
                            options: [
                                { label: "Tất cả", value: "" },
                                { label: "Hoạt động", value: "true" },
                                { label: "Ngừng hoạt động", value: "false" },
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
                            Bạn có chắc chắn muốn xóa chủ đề{" "}
                            <span className="font-semibold text-foreground">
                                {deleteTarget?.subjectName}
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
