import * as z from "zod";
import { DynamicForm, FieldConfig } from "./dynamic-form";

const areaSchema = z.object({
  short_code: z.string().min(1).max(20),
  area_name: z.string().min(1).max(100),
  area_name_e: z.string().min(1).max(100),
  area_type_rcd: z.string().min(1),
  parent_area_id: z.string().min(1),
  active_flag: z.string().min(1),
});
type AreaValues = z.infer<typeof areaSchema>;

const areaFields: FieldConfig<AreaValues>[] = [
  {
    name: "short_code",
    type: "input",
    label: "Mã khu vực",
    placeholder: "VD: ODA1TD03",
    required: true,
  },
  {
    name: "area_name",
    type: "input",
    label: "Tên khu vực",
    placeholder: "Tên khu vực",
    required: true,
  },
  {
    name: "area_name_e",
    type: "input",
    label: "Tên khu vực (EN)",
    placeholder: "Area name",
  },
  {
    name: "area_type_rcd",
    type: "select",
    label: "Loại",
    placeholder: "Chọn loại",
    options: [
      { value: "ward", label: "Phường" },
      { value: "district", label: "Quận" },
    ],
  },
  {
    name: "parent_area_id",
    type: "select",
    label: "Thuộc khu vực",
    placeholder: "Chọn khu vực",
    options: [
      { value: "1", label: "Khu A" },
      { value: "2", label: "Khu B" },
    ],
  },
  {
    name: "active_flag",
    type: "select",
    label: "Trạng thái",
    placeholder: "Chọn trạng thái",
    options: [
      { value: "1", label: "Hoạt động" },
      { value: "0", label: "Không hoạt động" },
    ],
  },
];

const AREA_EMPTY: AreaValues = {
  short_code: "",
  area_name: "",
  area_name_e: "",
  area_type_rcd: "",
  parent_area_id: "",
  active_flag: "",
};

export function AreaForm({
  initialData,
  onSubmit,
}: {
  initialData?: AreaValues | null;
  onSubmit: (v: AreaValues) => void;
}) {
  return (
    <DynamicForm
      schema={areaSchema}
      fields={areaFields}
      initialData={initialData}
      emptyValues={AREA_EMPTY}
      onSubmit={onSubmit}
      submitLabel={initialData ? "Cập nhật" : "Tạo mới"}
    />
  );
}

const userSchema = z.object({
  full_name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().optional(),
  role: z.string().min(1, "Chọn vai trò"),
  active: z.boolean(),
  bio: z.string().max(300).optional(),
  start_date: z.string().optional(),
});
type UserValues = z.infer<typeof userSchema>;

const userFields: FieldConfig<UserValues>[] = [
  {
    name: "full_name",
    type: "input",
    label: "Họ và tên",
    placeholder: "Nguyễn Văn A",
    required: true,
  },
  {
    name: "email",
    type: "input",
    label: "Email",
    inputType: "email",
    placeholder: "user@example.com",
    required: true,
  },
  {
    name: "phone",
    type: "input",
    label: "Điện thoại",
    inputType: "tel",
    placeholder: "0901...",
  },
  {
    name: "role",
    type: "select",
    label: "Vai trò",
    placeholder: "Chọn vai trò",
    options: [
      { value: "admin", label: "Admin" },
      { value: "staff", label: "Nhân viên" },
    ],
    required: true,
  },
  { name: "start_date", type: "date", label: "Ngày vào làm" },
  {
    name: "bio",
    type: "textarea",
    label: "Ghi chú",
    placeholder: "Mô tả thêm",
    rows: 3,
    fullWidth: true,
  },
];

const USER_EMPTY: UserValues = {
  full_name: "",
  email: "",
  phone: "",
  role: "",
  active: true,
  bio: "",
  start_date: "",
};

export function UserForm({
  initialData,
  onSubmit,
  onCancel,
}: {
  initialData?: UserValues | null;
  onSubmit: (v: UserValues) => void;
  onCancel?: () => void;
}) {
  return (
    <DynamicForm
      schema={userSchema}
      fields={userFields}
      initialData={initialData}
      emptyValues={USER_EMPTY}
      onSubmit={onSubmit}
      onCancel={onCancel}
      submitLabel={initialData ? "Cập nhật người dùng" : "Tạo người dùng"}
      columns={2}
    />
  );
}
