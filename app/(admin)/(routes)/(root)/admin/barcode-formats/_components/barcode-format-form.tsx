import * as z from "zod";
import { DynamicForm, FieldConfig } from "../../_components/dynamic-form";

const BarcodeFormatSchema = z.object({
    code: z.string().min(1, "Mã không được để trống").max(50),
    name: z.string().min(1, "Tên không được để trống").max(100),
    width: z.string(),
    height: z.string(),
    description: z.string().optional(),
    isActive: z.boolean(),
});

export type BarcodeFormatValues = z.infer<typeof BarcodeFormatSchema>;

const fields: FieldConfig<BarcodeFormatValues>[] = [
    {
        name: "code",
        type: "input",
        label: "Mã định dạng",
        placeholder: "VD: QR_CODE, CODE_128",
        required: true,
        fullWidth: false,
    },
    {
        name: "name",
        type: "input",
        label: "Tên định dạng",
        placeholder: "Nhập tên định dạng",
        required: true,
        fullWidth: false,
    },
    {
        name: "width",
        type: "input",
        inputType: "number",
        label: "Chiều ngang",
        placeholder: "Nhập chiều ngang",
        fullWidth: false,
        required: true,
    },
    {
        name: "height",
        type: "input",
        inputType: "number",
        label: "Chiều cao",
        placeholder: "Nhập chiều cao",
        fullWidth: false,
        required: true,
    },
    {
        name: "description",
        type: "textarea",
        label: "Mô tả",
        placeholder: "Nhập mô tả",
        fullWidth: true,
    },
];

const EMPTY: BarcodeFormatValues = {
    code: "",
    name: "",
    description: "",
    width: "0",
    height: "0",
    isActive: true,
};

export function BarcodeFormatForm({
    initialData,
    onSubmit,
}: {
    initialData?: BarcodeFormatValues | null;
    onSubmit: (v: BarcodeFormatValues) => void;
}) {
    return (
        <DynamicForm
            schema={BarcodeFormatSchema}
            fields={fields}
            initialData={initialData}
            emptyValues={EMPTY}
            onSubmit={onSubmit}
            submitLabel={initialData ? "Cập nhật" : "Tạo mới"}
        />
    );
}
