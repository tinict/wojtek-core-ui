"use client";

import { useState } from "react";
import SlideOverLayout from "@/app/(admin)/_layouts/slide-over-layout";
import { IDeviceCategory } from "@/types/models/device-category.model";
import {
    useCreateDeviceCategory,
    useDeleteDeviceCategory,
    useUpdateDeviceCategory,
} from "@/hooks/use-device-category";
import {
    DeviceCategoryForm,
    DeviceCategoryValues,
} from "./_components/device-category-form";
import DeviceCategoryTableClient from "./_components/device-category-table-client";

export default function DeviceCategoryPage() {
    const [showSlide, setShowSlide] = useState(false);
    const [editTarget, setEditTarget] = useState<IDeviceCategory | null>(null);

    const { mutateAsync: createDeviceCategory } = useCreateDeviceCategory();
    const { mutateAsync: updateDeviceCategory } = useUpdateDeviceCategory();
    const { mutateAsync: deleteDeviceCategory } = useDeleteDeviceCategory();

    const openCreate = () => {
        setEditTarget(null);
        setShowSlide(true);
    };
    const openEdit = (row: IDeviceCategory) => {
        setEditTarget(row);
        setShowSlide(true);
    };
    const closeSlide = () => {
        setShowSlide(false);
        setEditTarget(null);
    };

    const handleSubmit = async (values: DeviceCategoryValues) => {
        const res = editTarget
            ? await updateDeviceCategory({
                  categoryId: editTarget.categoryId,
                  ...values,
              })
            : await createDeviceCategory(values);
        if (!res.isError) closeSlide();
    };

    const handleDelete = async (row: IDeviceCategory) => {
        await deleteDeviceCategory(row.categoryId);
    };

    const formInitialData: DeviceCategoryValues | null = editTarget
        ? {
              categoryName: editTarget.categoryName,
              description: editTarget.description,
              activeFlag: editTarget.activeFlag,
              barcodeFormatId: editTarget.barcodeFormatId!,
          }
        : null;

    return (
        <div className="min-h-full bg-[#f4f6fb] p-3 sm:p-6">
            <DeviceCategoryTableClient
                openEdit={openEdit}
                openCreate={openCreate}
                onDelete={handleDelete}
            />
            <SlideOverLayout
                showSlide={showSlide}
                closeSlide={closeSlide}
                title={
                    editTarget
                        ? "Cập nhật danh mục thiết bị"
                        : "Thêm danh mục thiết bị"
                }
            >
                <DeviceCategoryForm
                    initialData={formInitialData}
                    onSubmit={handleSubmit}
                />
            </SlideOverLayout>
        </div>
    );
}
