import * as z from "zod";
import { MapPinIcon } from "lucide-react";
import { DynamicForm, FieldConfig } from "../../_components/dynamic-form";

const areaSchema = z.object({
    areaName: z.string().min(1, "Bắt buộc").max(200),
    areaNameE: z.string().max(200).optional().or(z.literal("")),
    areaNameL: z.string().max(200).optional().or(z.literal("")),
    areaTypeRcd: z.string().min(1, "Bắt buộc").max(20),
    shortCode: z.string().min(1, "Bắt buộc").max(50),
    parentAreaId: z.string().nullable().optional(),
    seqNum: z.coerce.number().int().min(0).default(0),
    activeFlag: z.boolean().default(true),
    availableFlag: z.boolean().default(true),
});

export type AreaValues = z.infer<typeof areaSchema>;

const areaFields: FieldConfig<AreaValues>[] = [
    {
        name: "areaName",
        type: "input",
        label: "Tên khu vực",
        placeholder: "Tên khu vực",
        required: true,
    },
    {
        name: "areaNameE",
        type: "input",
        label: "Tên khu vực (EN)",
        placeholder: "Tên khu vực bằng (EN)",
    },
    {
        name: "areaNameL",
        type: "input",
        label: "Tên khu vực (gọi khác)",
        placeholder: "Tên gọi khác",
    },
    {
        name: "areaTypeRcd",
        type: "select",
        label: "Loại khu vực",
        placeholder: "Chọn loại khu vực",
        required: true,
        options: [
            { value: "BLD", label: "Tòa nhà (Building)" },
            { value: "FLR", label: "Tầng (Floor)" },
            { value: "RM", label: "Phòng (Room)" },
            { value: "WARD", label: "Khoa (Ward)" },
            { value: "ZONE", label: "Khu vực (Zone)" },
        ],
    },
    {
        name: "shortCode",
        type: "input",
        label: "Mã ngắn",
        placeholder: "BVTWHT",
        required: true,
    },
    {
        name: "seqNum",
        type: "input",
        label: "Số thứ tự",
        placeholder: "0",
    },
    {
        name: "activeFlag",
        type: "select",
        label: "Trạng thái hoạt động",
        placeholder: "Chọn trạng thái",
        options: [
            { value: "true", label: "Hoạt động" },
            { value: "false", label: "Không hoạt động" },
        ],
    },
    {
        name: "availableFlag",
        type: "select",
        label: "Khả dụng",
        placeholder: "Chọn trạng thái khả dụng",
        options: [
            { value: "true", label: "Khả dụng" },
            { value: "false", label: "Không khả dụng" },
        ],
    },
];

const AREA_EMPTY: AreaValues = {
    areaName: "",
    areaNameE: "",
    areaNameL: "",
    areaTypeRcd: "",
    shortCode: "",
    parentAreaId: null,
    seqNum: 0,
    activeFlag: true,
    availableFlag: true,
};

export function AreaTypeRefForm({
    initialData,
    onSubmit,
    parentAreaId,
    parentAreaName,
}: {
    initialData?: AreaValues | null;
    onSubmit: (v: AreaValues) => void;
    parentAreaId?: string | null;
    parentAreaName?: string | null;
}) {
    const defaultData: AreaValues = parentAreaId
        ? { ...AREA_EMPTY, parentAreaId }
        : AREA_EMPTY;

    return (
        <div className="space-y-4">
            {parentAreaId && parentAreaName && (
              <div className="p-4">
                <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", margin: "0 0 4px", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  Thuộc khu vực
                </p>
                <div className="flex items-center gap-2 rounded-md border border-border px-3 py-2">
                  <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{parentAreaName}</span>
                </div>
              </div>
            )}
            <DynamicForm
                schema={areaSchema}
                fields={areaFields}
                initialData={initialData ?? defaultData}
                emptyValues={AREA_EMPTY}
                onSubmit={onSubmit}
                submitLabel={initialData ? "Cập nhật" : "Tạo mới"}
            />
        </div>
    );
}
