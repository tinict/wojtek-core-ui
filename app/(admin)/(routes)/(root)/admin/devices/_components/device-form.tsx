import * as z from "zod";
import { DynamicForm, FieldConfig } from "../../_components/dynamic-form";
import { useGetDeviceCategories } from "@/hooks/use-device-category";
import { useGetSuppliers } from "@/hooks/use-supplier";
import { useGetManufacturers } from "@/hooks/use-manufacturer";
import { useGetAssetSources } from "@/hooks/use-asset-source";
import { useGetRiskLevels } from "@/hooks/use-risk-level";

const DeviceSchema = z.object({
    deviceCode: z.string().min(1, "Mã thiết bị không được để trống").max(50),
    deviceName: z.string().min(1, "Tên thiết bị không được để trống").max(150),
    categoryId: z.string().optional(),
    supplierId: z.string().optional(),
    manufacturerId: z.string().optional(),
    assetSourceId: z.string().optional(),
    riskLevelId: z.string().optional(),
    model: z.string().max(100).optional(),
    serialNumber: z.string().max(100).optional(),
    purchaseDate: z.string().optional(),
    status: z.string().max(50).optional(),
    description: z.string().optional(),
    activeFlag: z.number(),
});

export type DeviceValues = z.infer<typeof DeviceSchema>;

const STATUS_OPTIONS = [
    { value: "ACTIVE", label: "Đang sử dụng" },
    { value: "MAINTENANCE", label: "Đang bảo trì" },
    { value: "BROKEN", label: "Hỏng" },
    { value: "INACTIVE", label: "Ngừng sử dụng" },
];

const ACTIVE_FLAG_OPTIONS = [
    { value: "1", label: "Đang hoạt động" },
    { value: "0", label: "Dừng hoạt động" },
];

const EMPTY: DeviceValues = {
    deviceCode: "",
    deviceName: "",
    categoryId: "",
    supplierId: "",
    manufacturerId: "",
    assetSourceId: "",
    riskLevelId: "",
    model: "",
    serialNumber: "",
    purchaseDate: "",
    status: "",
    description: "",
    activeFlag: 1,
};

export function DeviceForm({
    initialData,
    onSubmit,
}: {
    initialData?: DeviceValues | null;
    onSubmit: (v: DeviceValues) => void;
}) {
    const { data: categoryData } = useGetDeviceCategories({
        activeFlag: 1,
        size: 999,
    });
    const { data: supplierData } = useGetSuppliers({
        activeFlag: 1,
        size: 999,
    });
    const { data: manufacturerData } = useGetManufacturers({
        activeFlag: 1,
        size: 999,
    });
    const { data: assetSourceData } = useGetAssetSources({
        isActive: true,
        size: 999,
    });
    const { data: riskLevelData } = useGetRiskLevels({
        isActive: true,
        size: 999,
    });

    const categoryOptions =
        categoryData?.isError === false
            ? categoryData.data.content.map((c) => ({
                  value: c.categoryId,
                  label: c.categoryName,
              }))
            : [];

    const supplierOptions =
        supplierData?.isError === false
            ? supplierData.data.content.map((s) => ({
                  value: s.supplierId,
                  label: s.supplierName,
              }))
            : [];

    const manufacturerOptions =
        manufacturerData?.isError === false
            ? manufacturerData.data.content.map((m) => ({
                  value: m.manufacturerId,
                  label: m.manufacturerName,
              }))
            : [];

    const assetSourceOptions =
        assetSourceData?.isError === false
            ? assetSourceData.data.content.map((a) => ({
                  value: a.id,
                  label: a.name,
              }))
            : [];

    const riskLevelOptions =
        riskLevelData?.isError === false
            ? riskLevelData.data.content.map((r) => ({
                  value: r.id,
                  label: r.name,
              }))
            : [];

    const deviceFields: FieldConfig<DeviceValues>[] = [
        {
            name: "deviceCode",
            type: "input",
            label: "Mã thiết bị",
            placeholder: "Nhập mã thiết bị",
            required: true,
            fullWidth: false,
        },
        {
            name: "deviceName",
            type: "input",
            label: "Tên thiết bị",
            placeholder: "Nhập tên thiết bị",
            required: true,
            fullWidth: false,
        },
        {
            name: "categoryId",
            type: "select",
            label: "Danh mục",
            placeholder: "Chọn danh mục",
            options: categoryOptions,
            fullWidth: false,
        },
        {
            name: "supplierId",
            type: "select",
            label: "Nhà cung cấp",
            placeholder: "Chọn nhà cung cấp",
            options: supplierOptions,
            fullWidth: false,
        },
        {
            name: "manufacturerId",
            type: "select",
            label: "Hãng sản xuất",
            placeholder: "Chọn hãng sản xuất",
            options: manufacturerOptions,
            fullWidth: false,
        },
        {
            name: "assetSourceId",
            type: "select",
            label: "Nguồn tài sản",
            placeholder: "Chọn nguồn tài sản",
            options: assetSourceOptions,
            fullWidth: false,
        },
        {
            name: "riskLevelId",
            type: "select",
            label: "Mức độ rủi ro",
            placeholder: "Chọn mức độ rủi ro",
            options: riskLevelOptions,
            fullWidth: false,
        },
        {
            name: "model",
            type: "input",
            label: "Model",
            placeholder: "Nhập model",
            fullWidth: false,
        },
        {
            name: "serialNumber",
            type: "input",
            label: "Số serial",
            placeholder: "Nhập số serial",
            fullWidth: false,
        },
        {
            name: "purchaseDate",
            type: "date",
            label: "Ngày mua",
            placeholder: "Chọn ngày mua",
            fullWidth: false,
        },
        {
            name: "status",
            type: "select",
            label: "Tình trạng",
            placeholder: "Chọn tình trạng",
            options: STATUS_OPTIONS,
            fullWidth: false,
        },
        {
            name: "activeFlag",
            type: "select",
            label: "Trạng thái",
            placeholder: "Chọn trạng thái",
            options: ACTIVE_FLAG_OPTIONS,
            fullWidth: false,
            hidden: !initialData,
        },
        {
            name: "description",
            type: "textarea",
            label: "Mô tả",
            placeholder: "Nhập mô tả",
            fullWidth: true,
        },
    ];

    return (
        <DynamicForm
            schema={DeviceSchema}
            fields={deviceFields}
            initialData={initialData}
            emptyValues={EMPTY}
            onSubmit={onSubmit}
            submitLabel={initialData ? "Cập nhật" : "Tạo mới"}
        />
    );
}
