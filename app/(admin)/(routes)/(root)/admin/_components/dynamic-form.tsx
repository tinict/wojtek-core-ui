"use client";

import * as z from "zod";
import { useEffect, useRef } from "react";
import {
  useForm,
  Path,
  DefaultValues,
  FieldValues,
  ControllerRenderProps,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@/components/ui/combobox";

export type SelectOption = { 
    value: string; 
    label: string 
};

type BaseFieldConfig<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  description?: string;
  required?: boolean;
  fullWidth?: boolean;
  hidden?: boolean;
};

export type InputFieldConfig<T extends FieldValues> = BaseFieldConfig<T> & {
  type: "input";
  inputType?: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
};

export type TextareaFieldConfig<T extends FieldValues> = BaseFieldConfig<T> & {
  type: "textarea";
  placeholder?: string;
  rows?: number;
};

export type SelectFieldConfig<T extends FieldValues> = BaseFieldConfig<T> & {
  type: "select";
  placeholder?: string;
  options: SelectOption[];
};

export type CheckboxFieldConfig<T extends FieldValues> = BaseFieldConfig<T> & {
  type: "checkbox";
  checkboxLabel?: string;
};

export type DateFieldConfig<T extends FieldValues> = BaseFieldConfig<T> & {
  type: "date";
  placeholder?: string;
};

export type CustomFieldConfig<T extends FieldValues> = BaseFieldConfig<T> & {
  type: "custom";
  render: (props: {
    value: unknown;
    onChange: (v: unknown) => void;
    onBlur: () => void;
  }) => React.ReactNode;
};

export type FieldConfig<T extends FieldValues> =
  | InputFieldConfig<T>
  | TextareaFieldConfig<T>
  | SelectFieldConfig<T>
  | CheckboxFieldConfig<T>
  | DateFieldConfig<T>
  | CustomFieldConfig<T>;


export interface DynamicFormProps<T extends FieldValues> {
  schema: z.ZodType<T, any, any>;
  fields: FieldConfig<T>[];
  initialData?: Partial<T> | null;
  emptyValues: DefaultValues<T>;
  onSubmit: (values: T) => void | Promise<void>;
  submitLabel?: string;
  onCancel?: () => void;
  cancelLabel?: string;
  className?: string;
  columns?: 1 | 2 | 3;
};

const INPUT_CLS =
  "border border-[#e8eaf0] rounded-lg bg-white px-3 h-9 text-sm w-full " +
  "focus:outline-none focus:ring-2 focus:ring-[#1a2445]/10 focus:border-[#1a2445]";

export function DynamicForm<T extends FieldValues>({
  schema,
  fields,
  initialData,
  emptyValues,
  onSubmit,
  submitLabel = "Lưu",
  onCancel,
  cancelLabel = "Hủy",
  className,
  columns = 2,
}: DynamicFormProps<T>) {
  const form = useForm<T>({
    resolver: zodResolver(schema as any),
    defaultValues: (initialData ?? emptyValues) as DefaultValues<T>,
  });

  const prevKeyRef = useRef<string>("");

  useEffect(() => {
    const key = JSON.stringify(initialData ?? null);
    if (key === prevKeyRef.current) return;
    prevKeyRef.current = key;
    form.reset((initialData ?? emptyValues) as DefaultValues<T>);
  });

  const { isSubmitting, isValid } = form.formState;

  const colClass =
    columns === 1
      ? "grid-cols-1"
      : columns === 3
      ? "grid-cols-1 sm:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2";

  return (
    <Form {...form}>
      <form
        id="dynamic-form"
        onSubmit={form.handleSubmit(onSubmit as any)}
        className={`space-y-4 ${className ?? ""}`}
      >
        <div className={`grid ${colClass} gap-4 px-5 py-4`}>
          {fields
            .filter((f) => !f.hidden)
            .map((fieldCfg) => (
              <div
                key={String(fieldCfg.name)}
                className={fieldCfg.fullWidth ? "col-span-full" : ""}
              >
                <FormField
                  control={form.control}
                  name={fieldCfg.name}
                  render={({ field }) => (
                    <FormItem>
                      {fieldCfg.type !== "checkbox" && (
                        <FormLabel>
                          {fieldCfg.label}
                          {fieldCfg.required && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </FormLabel>
                      )}

                      <FormControl>
                        <FieldRenderer fieldCfg={fieldCfg} field={field} />
                      </FormControl>

                      {fieldCfg.description && (
                        <FormDescription>{fieldCfg.description}</FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
        </div>

        <div className="flex items-center gap-3 px-5 pb-4">
            <Button
                size="sm"
                variant="basic"
                type="submit"
                disabled={!isValid || isSubmitting}
            >
                {isSubmitting ? "Đang lưu" : submitLabel}
            </Button>

            {onCancel && (
                <Button
                    type="button"
                    variant="basic"
                    size="sm"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    {cancelLabel}
                </Button>
            )}
        </div>
      </form>
    </Form>
  );
}

function FieldRenderer<T extends FieldValues>({
  fieldCfg,
  field,
}: {
  fieldCfg: FieldConfig<T>;
  field: ControllerRenderProps<T, Path<T>>;
}) {
  switch (fieldCfg.type) {
    case "input":
      return (
        <Input
          name={field.name}
          ref={field.ref}
          type={fieldCfg.inputType ?? "text"}
          value={String(field.value ?? "")}
          placeholder={fieldCfg.placeholder ?? ""}
          className={INPUT_CLS}
          onChange={field.onChange}
          onBlur={field.onBlur}
        />
      );

    case "textarea":
      return (
        <Textarea
          name={field.name}
          ref={field.ref}
          value={String(field.value ?? "")}
          placeholder={fieldCfg.placeholder ?? ""}
          rows={fieldCfg.rows ?? 3}
          className={`${INPUT_CLS} h-auto`}
          onChange={field.onChange}
          onBlur={field.onBlur}
        />
      );

    case "select":
      return (
        <Combobox
          optionLabel={fieldCfg.placeholder ?? "Chọn"}
          options={fieldCfg.options}
          value={String(field.value ?? "")}
          onChange={field.onChange}
        />
      );

    case "date":
      return (
        <Input
          name={field.name}
          ref={field.ref}
          type="date"
          value={String(field.value ?? "")}
          placeholder={fieldCfg.placeholder ?? ""}
          className={INPUT_CLS}
          onChange={field.onChange}
          onBlur={field.onBlur}
        />
      );

    case "custom":
      return (
        <>
          {fieldCfg.render({
            value: field.value,
            onChange: field.onChange,
            onBlur: field.onBlur,
          })}
        </>
      );

    default:
      return null;
  }
}
