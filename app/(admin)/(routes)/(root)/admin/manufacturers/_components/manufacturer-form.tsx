import * as z from "zod";
import { DynamicForm, FieldConfig } from "../../_components/dynamic-form";

const ManufacturerSchema = z.object({
    manufacturerName: z
        .string()
        .min(1, "Tên hãng sản xuất không được để trống")
        .max(150),
    country: z.string().max(100).optional(),
    address: z.string().max(255).optional(),
    phone: z.string().max(20).optional(),
    email: z
        .string()
        .email("Email không hợp lệ")
        .max(100)
        .optional()
        .or(z.literal("")),
    activeFlag: z.number(),
});

export type ManufacturerValues = z.infer<typeof ManufacturerSchema>;

const manufacturerFields: FieldConfig<ManufacturerValues>[] = [
    {
        name: "manufacturerName",
        type: "input",
        label: "Tên hãng sản xuất",
        placeholder: "Nhập tên hãng sản xuất",
        required: true,
        fullWidth: true,
    },
    {
        name: "country",
        type: "input",
        label: "Quốc gia",
        placeholder: "Nhập quốc gia",
        fullWidth: false,
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
    {
        name: "address",
        type: "input",
        label: "Địa chỉ",
        placeholder: "Nhập địa chỉ",
        fullWidth: true,
    },
];

const EMPTY: ManufacturerValues = {
    manufacturerName: "",
    country: "",
    address: "",
    phone: "",
    email: "",
    activeFlag: 1,
};

export function ManufacturerForm({
    initialData,
    onSubmit,
}: {
    initialData?: ManufacturerValues | null;
    onSubmit: (v: ManufacturerValues) => void;
}) {
    return (
        <DynamicForm
            schema={ManufacturerSchema}
            fields={manufacturerFields}
            initialData={initialData}
            emptyValues={EMPTY}
            onSubmit={onSubmit}
            submitLabel={initialData ? "Cập nhật" : "Tạo mới"}
        />
    );
}
