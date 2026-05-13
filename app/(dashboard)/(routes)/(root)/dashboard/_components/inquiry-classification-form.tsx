import * as z from "zod";
import { DynamicForm, FieldConfig } from "./dynamic-form";

const InquiryClassificationSchema = z.object({
    inquiry_classification_name: z.string().min(1).max(20),
    inquiry_classification_name_e: z.string().min(1).max(20),
    inquiry_classification_type: z.string().min(1).max(20),
    description: z.string().min(1).max(20),
    active_flag: z.string().min(1),
});
type InquiryClassificationValues = z.infer<typeof InquiryClassificationSchema>;

const areaFields: FieldConfig<InquiryClassificationValues>[] = [
  {
    name: "inquiry_classification_name",
    type: "input",
    label: "Tên loại phản ánh",
    placeholder: "Nhập tên loại phản ánh",
    required: true,
  },
  {
    name: "inquiry_classification_type",
    type: "input",
    label: "Mã loại phản ánh",
    placeholder: "Mã loại phản ánh",
    required: true,
  },
  {
    name: "inquiry_classification_name_e",
    type: "input",
    label: "Tên loại phản ánh (EN)",
    placeholder: "Tên loại khu vực (EN)",
  },
  {
    name: "active_flag",
    type: "select",
    label: "Trạng thái",
    placeholder: "Trạng thái",
    options: [
      { value: "1", label: "Hoạt động" },
      { value: "0", label: "Không hoạt động" }
    ]
  },
  {
    name: "description",
    type: "textarea",
    label: "Mô tả",
    fullWidth: true,
    placeholder: "Nhập mô tả",
  },
];

const AREA_EMPTY: InquiryClassificationValues = {
  inquiry_classification_name: "",
  inquiry_classification_name_e: "",
  inquiry_classification_type: "",
  description: "",
  active_flag: "",
};

export function InquiryClassificationForm({
  initialData,
  onSubmit,
}: {
  initialData?: InquiryClassificationValues | null;
  onSubmit: (v: InquiryClassificationValues) => void;
}) {
  return (
    <DynamicForm
      schema={InquiryClassificationSchema}
      fields={areaFields}
      initialData={initialData}
      emptyValues={AREA_EMPTY}
      onSubmit={onSubmit}
      submitLabel={initialData ? "Cập nhật" : "Tạo mới"}
    />
  );
}