"use client";

import { useState } from "react";
import SlideOverLayout from "@/app/(admin)/_layouts/slide-over-layout";
import { IUnit } from "@/types/models/unit.model";
import { useCreateUnit, useDeleteUnit, useUpdateUnit } from "@/hooks/use-unit";
import { UnitForm, UnitValues } from "./_components/unit-form";
import UnitTableClient from "./_components/unit-table-client";

export default function UnitPage() {
    const [showSlide, setShowSlide] = useState(false);
    const [editTarget, setEditTarget] = useState<IUnit | null>(null);

    const { mutateAsync: createUnit } = useCreateUnit();
    const { mutateAsync: updateUnit } = useUpdateUnit();
    const { mutateAsync: deleteUnit } = useDeleteUnit();

    const openCreate = () => {
        setEditTarget(null);
        setShowSlide(true);
    };

    const openEdit = (row: IUnit) => {
        setEditTarget(row);
        setShowSlide(true);
    };

    const closeSlide = () => {
        setShowSlide(false);
        setEditTarget(null);
    };

    const handleSubmit = async (values: UnitValues) => {
        const payload = {
            ...values,
            parentUnitId: values.parentUnitId?.trim() || undefined,
        };

        const res = editTarget
            ? await updateUnit({ id: editTarget.id, ...payload })
            : await createUnit(payload);

        if (!res.isError) {
            closeSlide();
        }
    };

    const handleDelete = async (row: IUnit) => {
        await deleteUnit(row.id);
    };

    const formInitialData: UnitValues | null = editTarget
        ? {
              unitCode: editTarget.unitCode,
              unitName: editTarget.unitName,
              shortName: editTarget.shortName,
              parentUnitId: editTarget.parentUnitId,
              unitLevel: editTarget.unitLevel,
              organizationName: editTarget.organizationName,
              activeFlag: editTarget.activeFlag,
          }
        : null;

    return (
        <div className="min-h-full bg-[#f4f6fb] p-3 sm:p-6">
            <UnitTableClient
                openEdit={openEdit}
                openCreate={openCreate}
                onDelete={handleDelete}
            />
            <SlideOverLayout
                showSlide={showSlide}
                closeSlide={closeSlide}
                title={editTarget ? "Cập nhật đơn vị" : "Thêm đơn vị"}
            >
                <UnitForm
                    initialData={formInitialData}
                    onSubmit={handleSubmit}
                />
            </SlideOverLayout>
        </div>
    );
}
