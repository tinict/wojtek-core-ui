import * as z from "zod";
import { DynamicForm, FieldConfig } from "../../_components/dynamic-form";

const RiskLevelSchema = z.object({
    code: z.string().min(1, "Mã không được để trống").max(10),
    name: z.string().min(1, "Tên không được để trống").max(100),
    levelOrder: z.number(),
    description: z.string().optional(),
    isActive: z.boolean(),
});

export type RiskLevelValues = z.infer<typeof RiskLevelSchema>;

const fields: FieldConfig<RiskLevelValues>[] = [
    {
        name: "code",
        type: "input",
        label: "Mã mức độ rủi ro",
        placeholder: "Nhập mã",
        required: true,
        fullWidth: false,
    },
    {
        name: "name",
        type: "input",
        label: "Tên mức độ rủi ro",
        placeholder: "Nhập tên",
        required: true,
        fullWidth: false,
    },
    {
        name: "levelOrder",
        type: "input",
        label: "Thứ tự",
        placeholder: "Nhập thứ tự",
        required: true,
        fullWidth: false,
        inputType: "number",
    },
    {
        name: "description",
        type: "textarea",
        label: "Mô tả",
        placeholder: "Nhập mô tả",
        fullWidth: true,
    },
];

const EMPTY: RiskLevelValues = {
    code: "",
    name: "",
    levelOrder: 1,
    description: "",
    isActive: true,
};

export function RiskLevelForm({
    initialData,
    onSubmit,
}: {
    initialData?: RiskLevelValues | null;
    onSubmit: (v: RiskLevelValues) => void;
}) {
    return (
        <DynamicForm
            schema={RiskLevelSchema}
            fields={fields}
            initialData={initialData}
            emptyValues={EMPTY}
            onSubmit={onSubmit}
            submitLabel={initialData ? "Cập nhật" : "Tạo mới"}
        />
    );
}
