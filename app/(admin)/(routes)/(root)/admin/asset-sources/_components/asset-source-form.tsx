import * as z from "zod";
import { DynamicForm, FieldConfig } from "../../_components/dynamic-form";

const AssetSourceSchema = z.object({
    code: z.string().min(1, "Mã không được để trống").max(50),
    name: z.string().min(1, "Tên không được để trống").max(255),
    description: z.string().optional(),
    isActive: z.boolean(),
});

export type AssetSourceValues = z.infer<typeof AssetSourceSchema>;

const fields: FieldConfig<AssetSourceValues>[] = [
    {
        name: "code",
        type: "input",
        label: "Mã nguồn tài sản",
        placeholder: "Nhập mã nguồn tài sản",
        required: true,
        fullWidth: false,
    },
    {
        name: "name",
        type: "input",
        label: "Tên nguồn tài sản",
        placeholder: "Nhập tên nguồn tài sản",
        required: true,
        fullWidth: false,
    },
    {
        name: "description",
        type: "textarea",
        label: "Mô tả",
        placeholder: "Nhập mô tả",
        fullWidth: true,
    },
];

const EMPTY: AssetSourceValues = {
    code: "",
    name: "",
    description: "",
    isActive: true,
};

export function AssetSourceForm({
    initialData,
    onSubmit,
}: {
    initialData?: AssetSourceValues | null;
    onSubmit: (v: AssetSourceValues) => void;
}) {
    return (
        <DynamicForm
            schema={AssetSourceSchema}
            fields={fields}
            initialData={initialData}
            emptyValues={EMPTY}
            onSubmit={onSubmit}
            submitLabel={initialData ? "Cập nhật" : "Tạo mới"}
        />
    );
}
