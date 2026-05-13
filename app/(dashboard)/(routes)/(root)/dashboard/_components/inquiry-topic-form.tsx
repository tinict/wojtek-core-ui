import * as z from "zod";
import { DynamicForm, FieldConfig } from "./dynamic-form";

const InquiryTopicSchema = z.object({
    inquiry_topic_name: z.string().min(1).max(20),
    inquiry_topic_name_e: z.string().min(1).max(20),
    inquiry_classification_id: z.string().min(1).max(20),
    inquiry_topic_department_id: z.string().min(1).max(20),
    description: z.string().min(1).max(20),
    active_flag: z.string().min(1),
});
type InquiryTopicValues = z.infer<typeof InquiryTopicSchema>;

const inquiryTopicFields: FieldConfig<InquiryTopicValues>[] = [
  {
    name: "inquiry_topic_name",
    type: "input",
    label: "Tên chủ đề phản ánh",
    placeholder: "Nhập tên chủ đề phản ánh",
    required: true,
  },
  {
    name: "inquiry_topic_name_e",
    type: "input",
    label: "Tên chủ đề phản ánh (E)",
    placeholder: "Nhập tên chủ đề phản ánh (E)",
    required: true,
  },
  {
    name: "inquiry_classification_id",
    type: "select",
    label: "Loại phản ánh",
    placeholder: "Chọn loại phản ánh",
    required: true,
    options: []
  },
  {
    name: "inquiry_topic_department_id",
    type: "select",
    label: "Khoa phòng",
    placeholder: "Chọn khoa phòng",
    options: []
  },
  {
    name: "active_flag",
    type: "select",
    label: "Hoạt động",
    placeholder: "Hoạt động",
    required: true,
    options: [
      { value: "1", label: "Hoạt động" },
      { value: "0", label: "Không hoạt động" }
    ]
  },
];

const AREA_EMPTY: InquiryTopicValues = {
  inquiry_topic_name: "",
  inquiry_topic_name_e: "",
  inquiry_topic_department_id: "",
  inquiry_classification_id: "",
  description: "",
  active_flag: "1",
};

export function InquiryTopicForm({
  initialData,
  onSubmit,
}: {
  initialData?: InquiryTopicValues | null;
  onSubmit: (v: InquiryTopicValues) => void;
}) {
  return (
    <DynamicForm
      schema={InquiryTopicSchema}
      fields={inquiryTopicFields}
      initialData={initialData}
      emptyValues={AREA_EMPTY}
      onSubmit={onSubmit}
      submitLabel={initialData ? "Cập nhật" : "Tạo mới"}
    />
  );
}