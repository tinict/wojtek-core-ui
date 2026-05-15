"use client"

import { useState } from "react";
import { ColumnDef, DataTable, RowAction } from "../../_components/data-table";
import { Edit2, Trash2 } from "lucide-react";
import { IReportType } from "@/types/models/report-type.model";
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
    {
        key: "typeId",
        header: "Mã loại phản ánh",
    },
    {
        key: "typeName",
        header: "Loại phản ánh",
    },
    {
        key: "description",
        header: "Nội dung phản ánh",
    },
];

export default function ReportTypeTableClient({
    openEdit,
    openCreate,
    onDelete,
}: {
    openEdit: (row: IReportType) => void;
    openCreate: () => void;
    onDelete: (row: IReportType) => void;
}) {
    const { data, status } = useGetReportTypes();
    const [deleteTarget, setDeleteTarget] = useState<IReportType | null>(null);

    const actions = (row: IReportType): RowAction<IReportType>[] => [
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
    ];

    return (
        <>
            <DataTable
                data={Array.isArray(data?.data) ? data.data : []}
                columns={columns}
                rowKey={(row) => row.typeId ?? ""}
                actions={actions}
                pageSize={10}
                emptyText="Không tìm thấy cơ sở nào phù hợp."
                summary={(count) => <span>{count} cơ sở</span>}
                toolbar={{
                    searchPlaceholder: "Nhập tìm kiếm",
                    searchKeys: ["typeName", "description"],
                    filters: [],
                    onAdd: openCreate,
                    addLabel: "Thêm mới",
                }}
            />

            <AlertDialog
                open={!!deleteTarget}
                onOpenChange={(open) => !open && setDeleteTarget(null)}
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
                            onClick={() => {
                                if (deleteTarget) {
                                    onDelete(deleteTarget);
                                    setDeleteTarget(null);
                                }
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