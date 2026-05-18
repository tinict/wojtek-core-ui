"use client";

import { useState, useCallback } from "react";
import { ColumnDef, DataTable, RowAction } from "../../_components/data-table";
import { Edit2, Trash2 } from "lucide-react";
import { IDevice } from "@/types/models/device.model";
import { GetDevicesParams } from "@/services/device.service";
import { useGetDevices } from "@/hooks/use-device";
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

const columns: ColumnDef<IDevice>[] = [
    { key: "deviceCode", header: "Mã thiết bị" },
    { key: "deviceName", header: "Tên thiết bị" },
    { key: "categoryName", header: "Danh mục" },
    { key: "supplierName", header: "Nhà cung cấp" },
    { key: "manufacturerName", header: "Hãng sản xuất" },
    { key: "assetSourceName", header: "Nguồn tài sản" },
    { key: "riskLevelName", header: "Mức độ rủi ro" },
    { key: "model", header: "Model" },
    { key: "status", header: "Tình trạng" },
    { key: "activeFlag", header: "Trạng thái" },
];

const ACTIVE_FILTER_KEY = "activeFlag";

export default function DeviceTableClient({
    openEdit,
    openCreate,
    onDelete,
}: {
    openEdit: (row: IDevice) => void;
    openCreate: () => void;
    onDelete: (row: IDevice) => void;
}) {
    const [params, setParams] = useState<GetDevicesParams>({
        page: 0,
        size: 10,
        sortBy: "deviceName",
        sortDir: "asc",
        activeFlag: 1,
    });

    const { data, status } = useGetDevices(params);
    const [deleteTarget, setDeleteTarget] = useState<IDevice | null>(null);

    const devices = data?.isError === false ? data.data.content : [];
    const totalElements = data?.isError === false ? data.data.totalElements : 0;
    const totalPages = data?.isError === false ? data.data.totalPages : 1;

    const actions = useCallback(
        (row: IDevice): RowAction<IDevice>[] => [
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
                deviceName: value || undefined,
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
                data={devices}
                loading={status === "pending"}
                columns={columns}
                rowKey={(row) => row.deviceId ?? ""}
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
                emptyText="Không tìm thấy thiết bị nào phù hợp."
                summary={() => <span>{totalElements} thiết bị</span>}
                toolbar={{
                    searchPlaceholder: "Tìm theo tên thiết bị",
                    searchKeys: ["deviceName"] as (keyof IDevice)[],
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
                            Bạn có chắc chắn muốn xóa thiết bị{" "}
                            <span className="font-semibold text-foreground">
                                {deleteTarget?.deviceName}
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
