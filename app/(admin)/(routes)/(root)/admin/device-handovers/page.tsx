"use client";

import { useState } from "react";
import SlideOverLayout from "@/app/(admin)/_layouts/slide-over-layout";
import { IDeviceHandover } from "@/types/models/device-handover.model";
import {
    useCreateDeviceHandover,
    useUpdateDeviceHandover,
    useDeleteDeviceHandover,
} from "@/hooks/use-device-handover";
import {
    DeviceHandoverForm,
    DeviceHandoverValues,
} from "./_components/device-handover-form";
import DeviceHandoverTableClient from "./_components/device-handover-table-client";

export default function DeviceHandoverPage() {
    const [showSlide, setShowSlide] = useState(false);
    const [editTarget, setEditTarget] = useState<IDeviceHandover | null>(null);

    const { mutateAsync: createHandover } = useCreateDeviceHandover();
    const { mutateAsync: updateHandover } = useUpdateDeviceHandover();
    const { mutateAsync: deleteHandover } = useDeleteDeviceHandover();

    const openCreate = () => {
        setEditTarget(null);
        setShowSlide(true);
    };
    const openEdit = (row: IDeviceHandover) => {
        setEditTarget(row);
        setShowSlide(true);
    };
    const closeSlide = () => {
        setShowSlide(false);
        setEditTarget(null);
    };

    const handleSubmit = async (values: DeviceHandoverValues) => {
        const res = editTarget
            ? await updateHandover({
                  handoverId: editTarget.handoverId,
                  ...values,
              })
            : await createHandover(values);
        if (!res.isError) closeSlide();
    };

    const handleDelete = async (row: IDeviceHandover) => {
        await deleteHandover(row.handoverId);
    };

    const formInitialData: DeviceHandoverValues | null = editTarget
        ? {
              deviceId: editTarget.deviceId,
              areaName: editTarget.areaName,
              areaPathId: editTarget.areaPathId,
              areaLocation: editTarget.areaLocation,
              unitReceiverId: editTarget.unitReceiverId,
              unitRepairId: editTarget.unitRepairId,
              handoverByUnitId: editTarget.handoverByUnitId,
              handoverReceiverByUnitId: editTarget.handoverReceiverByUnitId,
              transferCount: editTarget.transferCount,
              quantity: editTarget.quantity,
              dateOfHandover: editTarget.dateOfHandover,
              dateOfRetrieval: editTarget.dateOfRetrieval,
              statusAtHandover: editTarget.statusAtHandover,
              statusAtRetrieval: editTarget.statusAtRetrieval,
              note: editTarget.note,
              purpose: editTarget.purpose,
          }
        : null;

    return (
        <div className="min-h-full bg-[#f4f6fb] p-3 sm:p-6">
            <DeviceHandoverTableClient
                openEdit={openEdit}
                openCreate={openCreate}
                onDelete={handleDelete}
            />
            <SlideOverLayout
                showSlide={showSlide}
                closeSlide={closeSlide}
                title={
                    editTarget
                        ? "Cập nhật bàn giao thiết bị"
                        : "Thêm bàn giao thiết bị"
                }
            >
                <DeviceHandoverForm
                    initialData={formInitialData}
                    onSubmit={handleSubmit}
                />
            </SlideOverLayout>
        </div>
    );
}
