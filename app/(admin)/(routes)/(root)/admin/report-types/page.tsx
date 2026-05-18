"use client";

import { useState } from "react";

import SlideOverLayout from "@/app/(admin)/_layouts/slide-over-layout";
import ReportTypeTableClient from "./_component/report-type-table-client";
import { IReportType } from "@/types/models/report-type.model";
import { 
    ReportTypeForm, 
    ReportTypeValues 
} from "./_component/report-type-form";
import {
    useCreateReportType,
    useDeleteReportType,
    useUpdateReportType,
} from "@/hooks/use-report-type";

export default function ReportTypePage() {
    const [showSlide, setShowSlide] = useState(false);
    const [editTarget, setEditTarget] = useState<IReportType | null>(null);

    const { mutateAsync: createReportType } = useCreateReportType();
    const { mutateAsync: updateReportType } = useUpdateReportType();
    const { mutateAsync: deleteReportType } = useDeleteReportType();

    const openCreate = () => {
        setEditTarget(null);
        setShowSlide(true);
    };

    const openEdit = (row: IReportType) => {
        setEditTarget(row);
        setShowSlide(true);
    };

    const closeSlide = () => {
        setShowSlide(false);
        setEditTarget(null);
    };

    const handleSubmit = async (values: ReportTypeValues) => {
        const res = editTarget
            ? await updateReportType({ typeId: editTarget.typeId, ...values })
            : await createReportType(values);

        if (!res.isError) {
            closeSlide();
        }
    };

    const handleDelete = async (row: IReportType) => {
        await deleteReportType(row.typeId);
    };

    const formInitialData: ReportTypeValues | null = editTarget
        ? {
              typeName: editTarget.typeName,
              description: editTarget.description,
              active: editTarget.active,
          }
        : null;

    return (
        <div className="min-h-full bg-[#f4f6fb] p-3 sm:p-6">
            <ReportTypeTableClient
                openEdit={openEdit}
                openCreate={openCreate}
                onDelete={handleDelete}
            />
            <SlideOverLayout
                showSlide={showSlide}
                closeSlide={closeSlide}
                title={editTarget ? "Cập nhật loại phản ánh" : "Thêm loại phản ánh"}
            >
                <ReportTypeForm
                    initialData={formInitialData}
                    onSubmit={handleSubmit}
                />
            </SlideOverLayout>
        </div>
    );
}
