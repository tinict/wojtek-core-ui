"use client";

import { useMemo, useState } from "react";
import { Edit2, Plus, Trash2 } from "lucide-react";

import { useGetReportSubjects } from "@/hooks/use-report-subject";
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

import { IReportSubject } from "@/types/models/report-subject.model";
import { DataTable } from "../../_components/data-table";

export default function ReportSubjectTableClient({
    openEdit,
    openCreate,
    onDelete,
}: {
    openEdit: (row: IReportSubject) => void;
    openCreate: () => void;
    onDelete: (row: IReportSubject) => void;
}) {
    const [deleteTarget, setDeleteTarget] = useState<IReportSubject | null>(
        null,
    );
    const [typeId, setTypeId] = useState("");
    const { data: subjectData, status } = useGetReportSubjects(typeId);
    const { data: typeData } = useGetReportTypes();

    const rows: IReportSubject[] = Array.isArray(subjectData?.data)
        ? subjectData.data
        : [];

    const typeOptions = useMemo(
        () => [
            {
                value: "",
                label: "Tất cả",
            },

            ...(Array.isArray(typeData?.data)
                ? typeData.data.map((type) => ({
                      value: String(type.typeId),

                      label: type.typeName ?? String(type.typeId),
                  }))
                : []),
        ],
        [typeData],
    );

    const activeOptions = [
        {
            value: "",
            label: "Tất cả",
        },
        {
            value: "true",
            label: "Hoạt động",
        },
        {
            value: "false",
            label: "Ngừng hoạt động",
        },
    ];

    return (
        <>
            <DataTable<IReportSubject>
                data={rows}
                loading={status === "pending"}
                manualFiltering
                rowKey={(row) => row.subjectId}
                emptyText="Không tìm thấy đối tượng phản ánh nào."
                columns={[
                    {
                        key: "subjectId",
                        header: "Mã chủ đề",
                    },

                    {
                        key: "subjectName",
                        header: "Tên chủ đề",
                    },

                    {
                        key: "description",
                        header: "Mô tả",
                    },

                    {
                        key: "typeId",
                        header: "Loại phản ánh",
                    },

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
                ]}
                actions={(row) => [
                    {
                        icon: <Edit2 size={14} />,
                        label: "Sửa",
                        onClick: () => openEdit(row),
                    },
                    {
                        icon: <Trash2 size={14} />,
                        label: "Xóa",
                        variant: "danger",
                        onClick: () => setDeleteTarget(row),
                    },
                ]}
                toolbar={{
                    searchPlaceholder: "Tìm kiếm tên, mô tả...",
                    searchKeys: ["subjectName"],
                    filters: [
                        {
                            key: "typeId",
                            label: "Loại phản ánh",
                            options: typeOptions,
                            widthCls: "w-52",
                        },
                        {
                            key: "active",
                            label: "Trạng thái",
                            options: activeOptions,
                            widthCls: "w-44",
                        },
                    ],
                    onAdd: openCreate,
                    addLabel: "Thêm mới",
                    extraControls: <Plus size={0} className="hidden" />,
                    onFilterChange: (filters) => {
                        setTypeId(filters.typeId ?? "");
                    },
                }}
            />
            <AlertDialog
                open={!!deleteTarget}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeleteTarget(null);
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>

                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn xóa đối tượng phản ánh{" "}
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
                            onClick={() => {
                                if (!deleteTarget) {
                                    return;
                                }

                                onDelete(deleteTarget);

                                setDeleteTarget(null);
                            }}
                        >
                            Xóa
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
