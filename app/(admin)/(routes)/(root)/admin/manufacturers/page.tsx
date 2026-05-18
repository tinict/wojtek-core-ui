"use client";

import { useState } from "react";
import SlideOverLayout from "@/app/(admin)/_layouts/slide-over-layout";
import { IManufacturer } from "@/types/models/manufacturer.model";
import {
    useCreateManufacturer,
    useDeleteManufacturer,
    useUpdateManufacturer,
} from "@/hooks/use-manufacturer";
import {
    ManufacturerForm,
    ManufacturerValues,
} from "./_components/manufacturer-form";
import ManufacturerTableClient from "./_components/manufacturer-table-client";

export default function ManufacturerPage() {
    const [showSlide, setShowSlide] = useState(false);
    const [editTarget, setEditTarget] = useState<IManufacturer | null>(null);

    const { mutateAsync: createManufacturer } = useCreateManufacturer();
    const { mutateAsync: updateManufacturer } = useUpdateManufacturer();
    const { mutateAsync: deleteManufacturer } = useDeleteManufacturer();

    const openCreate = () => {
        setEditTarget(null);
        setShowSlide(true);
    };
    const openEdit = (row: IManufacturer) => {
        setEditTarget(row);
        setShowSlide(true);
    };
    const closeSlide = () => {
        setShowSlide(false);
        setEditTarget(null);
    };

    const handleSubmit = async (values: ManufacturerValues) => {
        const res = editTarget
            ? await updateManufacturer({
                  manufacturerId: editTarget.manufacturerId,
                  ...values,
              })
            : await createManufacturer(values);
        if (!res.isError) closeSlide();
    };

    const handleDelete = async (row: IManufacturer) => {
        await deleteManufacturer(row.manufacturerId);
    };

    const formInitialData: ManufacturerValues | null = editTarget
        ? {
              manufacturerName: editTarget.manufacturerName,
              country: editTarget.country,
              address: editTarget.address,
              phone: editTarget.phone,
              email: editTarget.email,
              activeFlag: editTarget.activeFlag,
          }
        : null;

    return (
        <div className="min-h-full bg-[#f4f6fb] p-3 sm:p-6">
            <ManufacturerTableClient
                openEdit={openEdit}
                openCreate={openCreate}
                onDelete={handleDelete}
            />
            <SlideOverLayout
                showSlide={showSlide}
                closeSlide={closeSlide}
                title={
                    editTarget ? "Cập nhật hãng sản xuất" : "Thêm hãng sản xuất"
                }
            >
                <ManufacturerForm
                    initialData={formInitialData}
                    onSubmit={handleSubmit}
                />
            </SlideOverLayout>
        </div>
    );
}
