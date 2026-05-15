import * as z from "zod";

import { 
    DynamicForm, 
    FieldConfig 
} from "../../_components/dynamic-form";
import { useGetReportTypes } from "@/hooks/use-report-type";
import { useMemo } from "react";
import { IReportType } from "@/types/models/report-type.model";

const ReportSubjectSchema = z.object({
    typeId: z.string(),
    subjectName: z.string().min(1).max(100),
    description: z.string().min(1).max(100),
    active: z.boolean(),
});

export type ReportSubjectValues = z.infer<typeof ReportSubjectSchema>;

const EMPTY: ReportSubjectValues = {
    typeId: "",
    subjectName: "",
    description: "",
    active: true
};

export function ReportSubjectForm({
    initialData,
    onSubmit,
}: {
    initialData?: ReportSubjectValues | null;
    onSubmit: (v: ReportSubjectValues) => void;
}) {
    const { data, status } = useGetReportTypes();

    const reportSubjectFields = useMemo<FieldConfig<ReportSubjectValues>[]>(() => [
        {
            name: "subjectName",
            type: "input",
            label: "Tên chủ đề",
            placeholder: "Nhập tên chủ đề",
            required: true,
            fullWidth: true
        },
        {
            name: "description",
            type: "textarea",
            label: "Mô tả",
            placeholder: "Nhập mô tả",
            required: true,
            fullWidth: true
        },
        {
            name: "typeId",
            type: "select",
            label: "Loại phản ánh",
            required: true,
            fullWidth: true,
            options: (Array.isArray(data?.data) ? data.data as IReportType[] : [])
            .map((type) => ({
                value: type.typeId,
                label: type.typeName,
            }))
        },
        {
            name: "active",
            type: "select",
            label: "Trạng thái",
            required: true,
            fullWidth: true,
            options: [
                { value: "1", label: "Hoạt động" },
                { value: "0", label: "Không hoạt động" },
            ]
        },
    ], [data]);

    return (
        <DynamicForm
            schema={ReportSubjectSchema}
            fields={reportSubjectFields}
            initialData={initialData}
            emptyValues={EMPTY}
            onSubmit={onSubmit}
            submitLabel={initialData ? "Cập nhật" : "Tạo mới"}
        />
    );
}
