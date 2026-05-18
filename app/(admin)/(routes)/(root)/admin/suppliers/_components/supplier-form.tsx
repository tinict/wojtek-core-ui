import * as z from "zod";
import { DynamicForm, FieldConfig } from "../../_components/dynamic-form";

const SupplierSchema = z.object({
    supplierName: z
        .string()
        .min(1, "Tên nhà cung cấp không được để trống")
        .max(150),
    address: z.string().max(255).optional(),
    phone: z.string().max(20).optional(),
    email: z.string().email("Email không hợp lệ").max(100).optional(),
    activeFlag: z.number(),
});

export type SupplierValues = z.infer<typeof SupplierSchema>;

const supplierFields: FieldConfig<SupplierValues>[] = [
    {
        name: "supplierName",
        type: "input",
        label: "Tên nhà cung cấp",
        placeholder: "Nhập tên nhà cung cấp",
        required: true,
        fullWidth: true,
    },
    {
        name: "address",
        type: "input",
        label: "Địa chỉ",
        placeholder: "Nhập địa chỉ",
        fullWidth: true,
    },
    {
        name: "phone",
        type: "input",
        label: "Số điện thoại",
        placeholder: "Nhập số điện thoại",
        fullWidth: false,
    },
    {
        name: "email",
        type: "input",
        label: "Email",
        placeholder: "Nhập email",
        fullWidth: false,
    },
];

const EMPTY: SupplierValues = {
    supplierName: "",
    address: "",
    phone: "",
    email: "",
    activeFlag: 1,
};

export function SupplierForm({
    initialData,
    onSubmit,
}: {
    initialData?: SupplierValues | null;
    onSubmit: (v: SupplierValues) => void;
}) {
    return (
        <DynamicForm
            schema={SupplierSchema}
            fields={supplierFields}
            initialData={initialData}
            emptyValues={EMPTY}
            onSubmit={onSubmit}
            submitLabel={initialData ? "Cập nhật" : "Tạo mới"}
        />
    );
}
