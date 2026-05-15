import * as z from "zod";
import { DynamicForm, FieldConfig } from "../../_components/dynamic-form";

const ReportTypeSchema = z.object({
    typeName: z.string().min(1).max(100),
    description: z.string().min(1).max(100),
    active: z.boolean(),
});

export type ReportTypeValues = z.infer<typeof ReportTypeSchema>;

const reportTypeFields: FieldConfig<ReportTypeValues>[] = [
    {
        name: "typeName",
        type: "input",
        label: "Loại phản ánh",
        placeholder: "Nhập loại phản ánh",
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
];

const EMPTY: ReportTypeValues = {
    typeName: "",
    description: "",
    active: true
};

export function ReportTypeForm({
    initialData,
    onSubmit,
}: {
  initialData?: ReportTypeValues | null;
  onSubmit: (v: ReportTypeValues) => void;
}) {
  return (
    <DynamicForm
        schema={ReportTypeSchema}
        fields={reportTypeFields}
        initialData={initialData}
        emptyValues={EMPTY}
        onSubmit={onSubmit}
        submitLabel={initialData ? "Cập nhật" : "Tạo mới"}
    />
  );
}