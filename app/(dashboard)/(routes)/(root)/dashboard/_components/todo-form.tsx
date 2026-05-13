import * as z from "zod";
import { DynamicForm, FieldConfig } from "./dynamic-form";

const TodoSchema = z.object({
    title: z.string().min(1).max(100),
    body: z.string().min(1).max(100),
});
export type TodoValues = z.infer<typeof TodoSchema>;

const todoFields: FieldConfig<TodoValues>[] = [
    {
        name: "title",
        type: "input",
        label: "Tiêu đề",
        placeholder: "Nhập tiêu đề",
        required: true,
        fullWidth: true
    },
    {
        name: "body",
        type: "textarea",
        label: "Mô tả",
        placeholder: "Nhập mô tả",
        required: true,
        fullWidth: true
    },
];

const EMPTY: TodoValues = {
    title: "",
    body: "",
};

export function TodoForm({
    initialData,
    onSubmit,
}: {
  initialData?: TodoValues | null;
  onSubmit: (v: TodoValues) => void;
}) {
  return (
    <DynamicForm
        schema={TodoSchema}
        fields={todoFields}
        initialData={initialData}
        emptyValues={EMPTY}
        onSubmit={onSubmit}
        submitLabel={initialData ? "Cập nhật" : "Tạo mới"}
    />
  );
}