import * as z from "zod";
import { DynamicForm, FieldConfig } from "../../_components/dynamic-form";
import { useGetBarcodeFormats } from "@/hooks/use-barcode-format";

const DeviceCategorySchema = z.object({
    categoryName: z
        .string()
        .min(1, "Tên danh mục không được để trống")
        .max(100),
    description: z.string().optional(),
    activeFlag: z.number(),
    barcodeFormatId: z.string()
});

export type DeviceCategoryValues = z.infer<typeof DeviceCategorySchema>;

const EMPTY: DeviceCategoryValues = {
    categoryName: "",
    description: "",
    barcodeFormatId: "",
    activeFlag: 1,
};

export function DeviceCategoryForm({
    initialData,
    onSubmit,
}: {
    initialData?: DeviceCategoryValues | null;
    onSubmit: (v: DeviceCategoryValues) => void;
}) {
    const {
        data: barcodeData,
    } = useGetBarcodeFormats({
        isActive: true,
        size: 999,
    });

    const barcodeOptions = 
        barcodeData?.isError === false
            ? barcodeData.data.content.map((d) => ({
                  value: d.id,
                  label: `${d.code} - ${d.name} [${d.width}x${d.height}]`,
              }))
            : [];

    const deviceCategoryFields: FieldConfig<DeviceCategoryValues>[] = [
        {
            name: "categoryName",
            type: "input",
            label: "Tên danh mục",
            placeholder: "Nhập tên danh mục thiết bị",
            required: true,
            fullWidth: true,
        },
        {
            name: "description",
            type: "textarea",
            label: "Mô tả",
            placeholder: "Nhập mô tả",
            fullWidth: true,
        },
        {
            name: "barcodeFormatId",
            type: "select",
            label: "Loại mã sử dụng",
            placeholder: "Chọn loại mã sử dụng",
            options: barcodeOptions,
            fullWidth: true,
        },
    ];
    return (
        <DynamicForm
            schema={DeviceCategorySchema}
            fields={deviceCategoryFields}
            initialData={initialData}
            emptyValues={EMPTY}
            onSubmit={onSubmit}
            submitLabel={initialData ? "Cập nhật" : "Tạo mới"}
        />
    );
}
