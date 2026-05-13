import * as z from "zod";
import { DynamicForm, FieldConfig } from "./dynamic-form";

const areaTypeRefSchema = z.object({
    area_type_rcd: z.string().min(1).max(20),
    area_type_name: z.string().min(1).max(100),
    area_type_name_e: z.string().min(1).max(100),
    active_flag: z.string().min(1),
});
type AreaTypeRefValues = z.infer<typeof areaTypeRefSchema>;

const areaFields: FieldConfig<AreaTypeRefValues>[] = [
  {
    name: "area_type_rcd",
    type: "input",
    label: "Mã loại khu vực",
    placeholder: "BLD",
    required: true,
  },
  {
    name: "area_type_name",
    type: "input",
    label: "Tên loại khu vực",
    placeholder: "Tòa nhà",
    required: true,
  },
  {
    name: "area_type_name_e",
    type: "input",
    label: "Tên loại khu vực (EN)",
    placeholder: "Tên loại khu vực (EN)",
  },
  {
    name: "active_flag",
    type: "select",
    label: "Tên loại khu vực (EN)",
    placeholder: "Tên loại khu vực (EN)",
    options: [
      { value: "1", label: "Hoạt động" },
      { value: "0", label: "Không hoạt động" }
    ]
  },
];

const AREA_EMPTY: AreaTypeRefValues = {
    area_type_rcd: "",
    area_type_name: "",
    area_type_name_e: "",
    active_flag: ""
};

export function AreaTypeRefForm({
  initialData,
  onSubmit,
}: {
  initialData?: AreaTypeRefValues | null;
  onSubmit: (v: AreaTypeRefValues) => void;
}) {
  return (
    <DynamicForm
      schema={areaTypeRefSchema}
      fields={areaFields}
      initialData={initialData}
      emptyValues={AREA_EMPTY}
      onSubmit={onSubmit}
      submitLabel={initialData ? "Cập nhật" : "Tạo mới"}
    />
  );
}