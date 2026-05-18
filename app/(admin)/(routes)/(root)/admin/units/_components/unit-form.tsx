import * as z from "zod";
import { DynamicForm, FieldConfig } from "../../_components/dynamic-form";

const UnitSchema = z.object({
    unitCode: z.string().min(1, "Mã đơn vị không được để trống").max(50),
    unitName: z.string().min(1, "Tên đơn vị không được để trống").max(255),
    shortName: z.string().max(150).optional(),
    parentUnitId: z.string().optional(),
    unitLevel: z.number().optional(),
    organizationName: z.string().max(255).optional(),
    activeFlag: z.number(),
});

export type UnitValues = z.infer<typeof UnitSchema>;

const unitFields: FieldConfig<UnitValues>[] = [
    {
        name: "unitCode",
        type: "input",
        label: "Mã đơn vị",
        placeholder: "Nhập mã đơn vị",
        required: true,
        fullWidth: true,
    },
    {
        name: "unitName",
        type: "input",
        label: "Tên đơn vị",
        placeholder: "Nhập tên đơn vị",
        required: true,
        fullWidth: true,
    },
    {
        name: "shortName",
        type: "input",
        label: "Tên ngắn",
        placeholder: "Nhập tên ngắn",
        fullWidth: true,
    },
    {
        name: "organizationName",
        type: "input",
        label: "Tổ chức / Bệnh viện",
        placeholder: "Nhập tên tổ chức",
        fullWidth: true,
    },
    {
        name: "unitLevel",
        type: "input",
        label: "Cấp đơn vị",
        placeholder: "Nhập cấp đơn vị",
        fullWidth: false,
    },
    {
        name: "parentUnitId",
        type: "input",
        label: "Mã đơn vị cha",
        placeholder: "Nhập mã đơn vị cha",
        fullWidth: false,
    },
];

const EMPTY: UnitValues = {
    unitCode: "",
    unitName: "",
    shortName: "",
    parentUnitId: "",
    unitLevel: undefined,
    organizationName: "",
    activeFlag: 1,
};

export function UnitForm({
    initialData,
    onSubmit,
}: {
    initialData?: UnitValues | null;
    onSubmit: (v: UnitValues) => void;
}) {
    return (
        <DynamicForm
            schema={UnitSchema}
            fields={unitFields}
            initialData={initialData}
            emptyValues={EMPTY}
            onSubmit={onSubmit}
            submitLabel={initialData ? "Cập nhật" : "Tạo mới"}
        />
    );
}
