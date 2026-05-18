"use client";

import { useState, useCallback } from "react";
import { ColumnDef, DataTable, RowAction } from "../../_components/data-table";
import { Edit2, Trash2, QrCode } from "lucide-react";
import { IDeviceHandover } from "@/types/models/device-handover.model";
import { GetDeviceHandoversParams } from "@/services/device-handover.service";
import { useGetDeviceHandovers } from "@/hooks/use-device-handover";
import { useGenerateBarcode } from "@/hooks/use-barcode";
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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const columns: ColumnDef<IDeviceHandover>[] = [
    { key: "deviceName", header: "Thiết bị" },
    { key: "areaName", header: "Khu vực" },
    { key: "unitReceiverName", header: "Đơn vị nhận" },
    { key: "unitRepairName", header: "Đơn vị sửa chữa" },
    { key: "handoverByUnitName", header: "Đơn vị bàn giao" },
    { key: "quantity", header: "Số lượng" },
    { key: "dateOfHandover", header: "Ngày bàn giao" },
    { key: "dateOfRetrieval", header: "Ngày thu hồi" },
    { key: "statusAtHandover", header: "Tình trạng khi bàn giao" },
    { key: "statusAtRetrieval", header: "Tình trạng khi thu hồi" },
];

export default function DeviceHandoverTableClient({
    openEdit,
    openCreate,
    onDelete,
}: {
    openEdit: (row: IDeviceHandover) => void;
    openCreate: () => void;
    onDelete: (row: IDeviceHandover) => void;
}) {
    const [params, setParams] = useState<GetDeviceHandoversParams>({
        page: 0,
        size: 10,
        sortBy: "dateOfHandover",
        sortDir: "desc",
    });

    const { data, status } = useGetDeviceHandovers(params);
    const [deleteTarget, setDeleteTarget] = useState<IDeviceHandover | null>(
        null,
    );
    const [qrTarget, setQrTarget] = useState<IDeviceHandover | null>(null);

    const {
        barcodeBase64,
        status: qrStatus,
        mutateAsync: generateBarcode,
        reset: resetQr,
    } = useGenerateBarcode();

    const handovers = data?.isError === false ? data.data.content : [];
    const totalElements = data?.isError === false ? data.data.totalElements : 0;
    const totalPages = data?.isError === false ? data.data.totalPages : 1;

    const handleOpenQr = useCallback(
        async (row: IDeviceHandover) => {
            setQrTarget(row);
            await generateBarcode({
                format: "QR_CODE",
                barcodeText: row.handoverId,
                width: 300,
                height: 300,
            });
        },
        [generateBarcode],
    );

    const handleCloseQr = useCallback(() => {
        setQrTarget(null);
        resetQr();
    }, [resetQr]);

    const actions = useCallback(
        (row: IDeviceHandover): RowAction<IDeviceHandover>[] => [
            {
                icon: <Edit2 size={13} />,
                label: "Chỉnh sửa",
                onClick: openEdit,
            },
            {
                icon: <QrCode size={13} />,
                label: "QR Code",
                onClick: handleOpenQr,
            },
            {
                icon: <Trash2 size={13} />,
                label: "Xóa",
                danger: true,
                onClick: (r) => setDeleteTarget(r),
            },
        ],
        [openEdit, handleOpenQr],
    );

    const handleSearchChange = useCallback(
        (value: string) =>
            setParams((p) => ({ ...p, deviceId: value || undefined, page: 0 })),
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
                data={handovers}
                loading={status === "pending"}
                columns={columns}
                rowKey={(row) => row.handoverId}
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
                emptyText="Không tìm thấy bàn giao thiết bị nào."
                summary={() => <span>{totalElements} bàn giao</span>}
                toolbar={{
                    searchPlaceholder: "Tìm theo tên thiết bị",
                    searchKeys: ["deviceName"] as (keyof IDeviceHandover)[],
                    onSearchChange: handleSearchChange,
                    onAdd: openCreate,
                    addLabel: "Thêm mới",
                }}
            />

            <Dialog
                open={!!qrTarget}
                onOpenChange={(open) => {
                    if (!open) handleCloseQr();
                }}
            >
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>QR Code bàn giao</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col items-center gap-4 py-2">
                        <p className="text-sm text-muted-foreground text-center">
                            <span className="font-medium text-foreground">
                                {qrTarget?.deviceName}
                            </span>
                            {qrTarget?.dateOfHandover && (
                                <> — {qrTarget.dateOfHandover}</>
                            )}
                        </p>

                        {qrStatus === "pending" && (
                            <div className="flex items-center justify-center w-[300px] h-[300px] border rounded-lg bg-muted">
                                <span className="text-sm text-muted-foreground animate-pulse">
                                    Đang tạo QR...
                                </span>
                            </div>
                        )}

                        {qrStatus === "error" && (
                            <div className="flex items-center justify-center w-[300px] h-[300px] border rounded-lg bg-destructive/10">
                                <span className="text-sm text-destructive">
                                    Lỗi tạo QR Code
                                </span>
                            </div>
                        )}

                        {qrStatus === "success" && barcodeBase64 && (
                            <img
                                src={barcodeBase64}
                                alt="QR Code"
                                className="w-[300px] h-[300px] border rounded-lg"
                            />
                        )}

                        {qrStatus === "success" && barcodeBase64 && (
                            <Button
                                size="sm"
                                variant="basic"
                                onClick={() => {
                                    const link = document.createElement("a");
                                    link.href = barcodeBase64;
                                    link.download = `qr-${qrTarget?.handoverId}.png`;
                                    link.click();
                                }}
                            >
                                Tải xuống
                            </Button>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
            
            <AlertDialog
                open={!!deleteTarget}
                onOpenChange={handleDeleteDialogClose}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn xóa bàn giao thiết bị{" "}
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
