"use client";

import { useState } from "react";
import SlideOverLayout from "@/app/(admin)/_layouts/slide-over-layout";
import RiskLevelTableClient from "./_components/risk-level-table-client";
import { IRiskLevel } from "@/types/models/risk-level.model";
import { RiskLevelForm, RiskLevelValues } from "./_components/risk-level-form";
import {
    useCreateRiskLevel,
    useDeleteRiskLevel,
    useUpdateRiskLevel,
} from "@/hooks/use-risk-level";

export default function RiskLevelPage() {
    const [showSlide, setShowSlide] = useState(false);
    const [editTarget, setEditTarget] = useState<IRiskLevel | null>(null);

    const { mutateAsync: createRiskLevel } = useCreateRiskLevel();
    const { mutateAsync: updateRiskLevel } = useUpdateRiskLevel();
    const { mutateAsync: deleteRiskLevel } = useDeleteRiskLevel();

    const openCreate = () => {
        setEditTarget(null);
        setShowSlide(true);
    };
    const openEdit = (row: IRiskLevel) => {
        setEditTarget(row);
        setShowSlide(true);
    };
    const closeSlide = () => {
        setShowSlide(false);
        setEditTarget(null);
    };

    const handleSubmit = async (values: RiskLevelValues) => {
        const res = editTarget
            ? await updateRiskLevel({ id: editTarget.id, ...values })
            : await createRiskLevel(values);
        if (!res.isError) closeSlide();
    };

    const handleDelete = async (row: IRiskLevel) => {
        await deleteRiskLevel(row.id);
    };

    const formInitialData: RiskLevelValues | null = editTarget
        ? {
              code: editTarget.code,
              name: editTarget.name,
              levelOrder: editTarget.levelOrder,
              description: editTarget.description,
              isActive: editTarget.isActive,
          }
        : null;

    return (
        <div className="min-h-full bg-[#f4f6fb] p-3 sm:p-6">
            <RiskLevelTableClient
                openEdit={openEdit}
                openCreate={openCreate}
                onDelete={handleDelete}
            />
            <SlideOverLayout
                showSlide={showSlide}
                closeSlide={closeSlide}
                title={
                    editTarget ? "Cập nhật mức độ rủi ro" : "Thêm mức độ rủi ro"
                }
            >
                <RiskLevelForm
                    initialData={formInitialData}
                    onSubmit={handleSubmit}
                />
            </SlideOverLayout>
        </div>
    );
}
