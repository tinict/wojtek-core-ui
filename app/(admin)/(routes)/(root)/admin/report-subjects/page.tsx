"use client";

import { useState } from "react";

import SlideOverLayout from "@/app/(admin)/_layouts/slide-over-layout";
import {
    useCreateReportSubject,
    useUpdateReportSubject,
    useDeleteReportSubject,
} from "@/hooks/use-report-subject";
import { IReportSubject } from "@/types/models/report-subject.model";
import {
    ReportSubjectForm,
    ReportSubjectValues,
} from "./_component/report-type-form";
import ReportSubjectTableClient from "./_component/report-type-table-client";

export default function ReportSubjectPage() {
    const [showSlide, setShowSlide] = useState(false);
    const [editTarget, setEditTarget] = useState<IReportSubject | null>(null);

    const { mutateAsync: createReportSubject } = useCreateReportSubject();
    const { mutateAsync: updateReportSubject } = useUpdateReportSubject();
    const { mutateAsync: deleteReportSubject } = useDeleteReportSubject();

    const openCreate = () => {
        setEditTarget(null);
        setShowSlide(true);
    };

    const openEdit = (row: IReportSubject) => {
        setEditTarget(row);
        setShowSlide(true);
    };

    const closeSlide = () => {
        setShowSlide(false);
        setEditTarget(null);
    };

    const handleSubmit = async (values: ReportSubjectValues) => {
        const payload = {
            ...values,
            active: values.active === "true",
        };

        if (editTarget) {
            await updateReportSubject({
                subjectId: editTarget.subjectId,
                ...payload,
            });
        } else {
            await createReportSubject(payload);
        }
        closeSlide();
    };

    const handleDelete = async (row: IReportSubject) => {
        await deleteReportSubject(row.subjectId);
    };

    const formInitialData: ReportSubjectValues | null = editTarget
        ? {
              description: editTarget.description,
              subjectName: editTarget.subjectName,
              typeId: String(editTarget.typeId),
              active: editTarget.active ? "true" : "false",
          }
        : null;

    return (
        <div className="min-h-full bg-[#f4f6fb] p-3 sm:p-6">
            <ReportSubjectTableClient
                openEdit={openEdit}
                openCreate={openCreate}
                onDelete={handleDelete}
            />
            <SlideOverLayout
                showSlide={showSlide}
                closeSlide={closeSlide}
                title={
                    editTarget
                        ? "Cập nhật chủ đề phản ánh"
                        : "Thêm chủ đề phản ánh"
                }
            >
                <ReportSubjectForm
                    initialData={formInitialData}
                    onSubmit={handleSubmit}
                />
            </SlideOverLayout>
        </div>
    );
}
