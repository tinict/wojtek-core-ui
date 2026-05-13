"use client"

import { useGetTodos } from "@/hooks/use-todo";
import { ColumnDef, DataTable, RowAction } from "../../_components/data-table";
import { Todo } from "../types";
import { Edit2, Trash2 } from "lucide-react";

const columns: ColumnDef<Todo>[] = [
    {
        key: "id",
        header: "Mã bài viết",
    },
    {
        key: "title",
        header: "Tiêu đề",
    },
    {
        key: "body",
        header: "Nội dung",
    },
];

export default function TodoTableClient({
    openEdit,
    openCreate,
}: {
    openEdit: (row: Todo) => void;
    openCreate: () => void;
}) {
    const { data, status } = useGetTodos();

    const actions = (row: Todo): RowAction<Todo>[] => [
        {
            icon: <Edit2 size={13} />,
            label: "Chỉnh sửa",
            onClick: openEdit,
        },
        {
            icon: <Trash2 size={13} />,
            label: "Xóa",
            danger: true,
            onClick: (r) => console.log("DELETE", r.id),
        },
    ];

    return (
        <DataTable
            data={Array.isArray(data?.data) ? data.data : []}
            columns={columns}
            rowKey={(row) => row.id ?? ""}
            actions={actions}
            pageSize={10}
            emptyText="Không tìm thấy cơ sở nào phù hợp."
            summary={(count) => <span>{count} cơ sở</span>}
            toolbar={{
                searchPlaceholder: "Tên cơ sở, mã cơ sở...",
                searchKeys: ["title", "body"],
                filters: [],
                onAdd: openCreate,
                addLabel: "Thêm mới",
            }}
        />
    );
};