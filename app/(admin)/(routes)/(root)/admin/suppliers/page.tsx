"use client";

import { useState } from "react";
import SlideOverLayout from "@/app/(admin)/_layouts/slide-over-layout";
import { ISupplier } from "@/types/models/supplier.model";
import {
    useCreateSupplier,
    useDeleteSupplier,
    useUpdateSupplier,
} from "@/hooks/use-supplier";
import { SupplierForm, SupplierValues } from "./_components/supplier-form";
import SupplierTableClient from "./_components/supplier-table-client";

export default function SupplierPage() {
    const [showSlide, setShowSlide] = useState(false);
    const [editTarget, setEditTarget] = useState<ISupplier | null>(null);

    const { mutateAsync: createSupplier } = useCreateSupplier();
    const { mutateAsync: updateSupplier } = useUpdateSupplier();
    const { mutateAsync: deleteSupplier } = useDeleteSupplier();

    const openCreate = () => {
        setEditTarget(null);
        setShowSlide(true);
    };
    const openEdit = (row: ISupplier) => {
        setEditTarget(row);
        setShowSlide(true);
    };
    const closeSlide = () => {
        setShowSlide(false);
        setEditTarget(null);
    };

    const handleSubmit = async (values: SupplierValues) => {
        const res = editTarget
            ? await updateSupplier({
                  supplierId: editTarget.supplierId,
                  ...values,
              })
            : await createSupplier(values);
        if (!res.isError) closeSlide();
    };

    const handleDelete = async (row: ISupplier) => {
        await deleteSupplier(row.supplierId);
    };

    const formInitialData: SupplierValues | null = editTarget
        ? {
              supplierName: editTarget.supplierName,
              address: editTarget.address,
              phone: editTarget.phone,
              email: editTarget.email,
              activeFlag: editTarget.activeFlag,
          }
        : null;

    return (
        <div className="min-h-full bg-[#f4f6fb] p-3 sm:p-6">
            <SupplierTableClient
                openEdit={openEdit}
                openCreate={openCreate}
                onDelete={handleDelete}
            />
            <SlideOverLayout
                showSlide={showSlide}
                closeSlide={closeSlide}
                title={
                    editTarget ? "Cập nhật nhà cung cấp" : "Thêm nhà cung cấp"
                }
            >
                <SupplierForm
                    initialData={formInitialData}
                    onSubmit={handleSubmit}
                />
            </SlideOverLayout>
        </div>
    );
}
