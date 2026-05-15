"use client";

import { useState } from "react";

import SlideOverLayout from "@/app/(dashboard)/_layouts/slide-over-layout";
import ReportTypeTableClient from "./_component/report-type-table-client";
import { 
    useCreateReportTypes, 
    useDeleteReportType, 
    useUpdateReportTypes 
} from "@/hooks/use-report-type";
import { IReportSubject } from "@/types/models/report-subject.model";
import { 
    ReportSubjectForm, 
    ReportSubjectValues 
} from "./_component/report-type-form";

export default function ReportSubjectPage() {
    const [showSlide, setShowSlide] = useState(false);
    const [editTarget, setEditTarget] = useState<IReportSubject | null>(null);

    const { mutateAsync: createReportTypes } = useCreateReportTypes();
    const { mutateAsync: updateReportTypes } = useUpdateReportTypes();
    const { mutateAsync: deleteReportType } = useDeleteReportType();

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

    const handleSubmit = (values: ReportSubjectValues) => {
        if (editTarget) {
            // updateReportTypes({
            //     typeId: editTarget.,
            //     ...values,
            // }).then(closeSlide);
        } else {
            // createReportTypes(values).then(closeSlide);
        }
    };

    const handleDelete = (row: IReportSubject) => {
        // deleteReportType(row.typeId);
    };

    const formInitialData: ReportSubjectValues | null = editTarget
        ? {
            description: editTarget.description,
            subjectName: editTarget.subjectName,
            typeId: editTarget.typeId,
            active: editTarget.active

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
                <ReportSubjectForm
                    initialData={formInitialData}
                    onSubmit={handleSubmit}
                />
            </SlideOverLayout>
        </div>
    );
}
