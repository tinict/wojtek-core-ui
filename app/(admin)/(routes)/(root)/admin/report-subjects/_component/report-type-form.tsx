import * as z from "zod";
import { useMemo, useRef } from "react";

import { DynamicForm, FieldConfig } from "../../_components/dynamic-form";
import { useGetReportTypes } from "@/hooks/use-report-type";

const ReportSubjectSchema = z.object({
    typeId: z.string().min(1, "Vui lòng chọn loại phản ánh"),
    subjectName: z.string().min(1, "Vui lòng nhập tên chủ đề").max(100),
    description: z.string().min(1, "Vui lòng nhập mô tả").max(100),
    active: z.enum(["true", "false"]),
});

export type ReportSubjectValues = z.infer<typeof ReportSubjectSchema>;

const EMPTY: ReportSubjectValues = {
    typeId: "",
    subjectName: "",
    description: "",
    active: "true",
};

export function ReportSubjectForm({
    initialData,
    onSubmit,
}: {
    initialData?: ReportSubjectValues | null;
    onSubmit: (v: ReportSubjectValues) => void;
}) {
    const { data: typeData } = useGetReportTypes({ size: 999, active: true });

    const typeOptions = useMemo(
        () =>
            typeData?.isError === false
                ? typeData.data.content.map((t) => ({
                      value: String(t.typeId),
                      label: t.typeName ?? String(t.typeId),
                  }))
                : [],
        [typeData],
    );

    const fields = useMemo<FieldConfig<ReportSubjectValues>[]>(
        () => [
            {
                name: "typeId",
                type: "select",
                label: "Loại phản ánh",
                placeholder: "Chọn loại phản ánh",
                required: true,
                fullWidth: true,
                options: typeOptions,
            },
            {
                name: "subjectName",
                type: "input",
                label: "Tên chủ đề",
                placeholder: "Nhập tên chủ đề",
                required: true,
                fullWidth: true,
            },
            {
                name: "description",
                type: "textarea",
                label: "Mô tả",
                placeholder: "Nhập mô tả",
                required: true,
                fullWidth: true,
            },
            {
                name: "active",
                type: "select",
                label: "Trạng thái",
                fullWidth: true,
                options: [
                    { value: "true", label: "Hoạt động" },
                    { value: "false", label: "Ngừng hoạt động" },
                ],
            },
        ],
        [typeOptions],
    );

    const stableInitial = useRef(initialData);
    if (
        initialData?.typeId !== stableInitial.current?.typeId ||
        initialData?.subjectName !== stableInitial.current?.subjectName
    ) {
        stableInitial.current = initialData;
    }

    return (
        <DynamicForm
            schema={ReportSubjectSchema}
            fields={fields}
            initialData={stableInitial.current}
            emptyValues={EMPTY}
            onSubmit={onSubmit}
            submitLabel={initialData ? "Cập nhật" : "Tạo mới"}
        />
    );
}
