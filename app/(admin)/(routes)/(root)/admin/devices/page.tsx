"use client";

import { useState } from "react";
import SlideOverLayout from "@/app/(admin)/_layouts/slide-over-layout";
import { IDevice } from "@/types/models/device.model";
import {
    useCreateDevice,
    useDeleteDevice,
    useUpdateDevice,
} from "@/hooks/use-device";
import { DeviceForm, DeviceValues } from "./_components/device-form";
import DeviceTableClient from "./_components/device-table-client";

export default function DevicePage() {
    const [showSlide, setShowSlide] = useState(false);
    const [editTarget, setEditTarget] = useState<IDevice | null>(null);

    const { mutateAsync: createDevice } = useCreateDevice();
    const { mutateAsync: updateDevice } = useUpdateDevice();
    const { mutateAsync: deleteDevice } = useDeleteDevice();

    const openCreate = () => {
        setEditTarget(null);
        setShowSlide(true);
    };
    const openEdit = (row: IDevice) => {
        setEditTarget(row);
        setShowSlide(true);
    };
    const closeSlide = () => {
        setShowSlide(false);
        setEditTarget(null);
    };

    const handleSubmit = async (values: DeviceValues) => {
        const payload = {
            ...values,
            categoryId: values.categoryId?.trim() || undefined,
            supplierId: values.supplierId?.trim() || undefined,
            manufacturerId: values.manufacturerId?.trim() || undefined,
            assetSourceId: values.assetSourceId?.trim() || undefined,
            riskLevelId: values.riskLevelId?.trim() || undefined,
        };

        const res = editTarget
            ? await updateDevice({ deviceId: editTarget.deviceId, ...payload })
            : await createDevice(payload);
        if (!res.isError) closeSlide();
    };

    const handleDelete = async (row: IDevice) => {
        await deleteDevice(row.deviceId);
    };

    const formInitialData: DeviceValues | null = editTarget
        ? {
              deviceCode: editTarget.deviceCode,
              deviceName: editTarget.deviceName,
              categoryId: editTarget.categoryId,
              supplierId: editTarget.supplierId,
              manufacturerId: editTarget.manufacturerId,
              assetSourceId: editTarget.assetSourceId,
              riskLevelId: editTarget.riskLevelId,
              model: editTarget.model,
              serialNumber: editTarget.serialNumber,
              purchaseDate: editTarget.purchaseDate,
              status: editTarget.status,
              description: editTarget.description,
              activeFlag: editTarget.activeFlag,
          }
        : null;

    return (
        <div className="min-h-full bg-[#f4f6fb] p-3 sm:p-6">
            <DeviceTableClient
                openEdit={openEdit}
                openCreate={openCreate}
                onDelete={handleDelete}
            />
            <SlideOverLayout
                showSlide={showSlide}
                closeSlide={closeSlide}
                title={editTarget ? "Cập nhật thiết bị" : "Thêm thiết bị"}
            >
                <DeviceForm
                    initialData={formInitialData}
                    onSubmit={handleSubmit}
                />
            </SlideOverLayout>
        </div>
    );
}
