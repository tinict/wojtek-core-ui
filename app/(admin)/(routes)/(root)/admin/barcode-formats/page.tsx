"use client";

import { useState } from "react";
import SlideOverLayout from "@/app/(admin)/_layouts/slide-over-layout";
import BarcodeFormatTableClient from "./_components/barcode-format-table-client";
import { IBarcodeFormat } from "@/types/models/barcode-format.model";
import {
    BarcodeFormatForm,
    BarcodeFormatValues,
} from "./_components/barcode-format-form";
import {
    useCreateBarcodeFormat,
    useDeleteBarcodeFormat,
    useUpdateBarcodeFormat,
} from "@/hooks/use-barcode-format";

export default function BarcodeFormatPage() {
    const [showSlide, setShowSlide] = useState(false);
    const [editTarget, setEditTarget] = useState<IBarcodeFormat | null>(null);

    const { mutateAsync: createBarcodeFormat } = useCreateBarcodeFormat();
    const { mutateAsync: updateBarcodeFormat } = useUpdateBarcodeFormat();
    const { mutateAsync: deleteBarcodeFormat } = useDeleteBarcodeFormat();

    const openCreate = () => {
        setEditTarget(null);
        setShowSlide(true);
    };
    const openEdit = (row: IBarcodeFormat) => {
        setEditTarget(row);
        setShowSlide(true);
    };
    const closeSlide = () => {
        setShowSlide(false);
        setEditTarget(null);
    };

    const handleSubmit = async (values: BarcodeFormatValues) => {
        const res = editTarget
            ? await updateBarcodeFormat({ id: editTarget.id, ...values })
            : await createBarcodeFormat(values);
        if (!res.isError) closeSlide();
    };

    const handleDelete = async (row: IBarcodeFormat) => {
        await deleteBarcodeFormat(row.id);
    };

    const formInitialData: BarcodeFormatValues | null = editTarget
        ? {
              code: editTarget.code,
              name: editTarget.name,
              width: editTarget.width,
              height: editTarget.height,
              description: editTarget.description,
              isActive: editTarget.isActive,
          }
        : null;

    return (
        <div className="min-h-full bg-[#f4f6fb] p-3 sm:p-6">
            <BarcodeFormatTableClient
                openEdit={openEdit}
                openCreate={openCreate}
                onDelete={handleDelete}
            />
            <SlideOverLayout
                showSlide={showSlide}
                closeSlide={closeSlide}
                title={
                    editTarget
                        ? "Cập nhật định dạng mã vạch"
                        : "Thêm định dạng mã vạch"
                }
            >
                <BarcodeFormatForm
                    initialData={formInitialData}
                    onSubmit={handleSubmit}
                />
            </SlideOverLayout>
        </div>
    );
}
