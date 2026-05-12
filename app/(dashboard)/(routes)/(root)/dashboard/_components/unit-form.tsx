"use client";

import * as z from "zod";

import { useEffect, useMemo } from "react";

import { useForm, Path } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import type { FacilityPayload } from "../units/types";

import { EMPTY_FORM } from "../units/constants";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    short_code: z.string().min(1, "Mã đơn vị khôn với 1 ky tự").max(20, "Mã đơn vị khôn với 20 ky tự"),
    area_name: z.string().min(1, "Tên đơn vị khôn với 1 ky tự").max(100, "Tên đơn vị khôn với 100 ky tự"),
    area_type_rcd: z.string().min(1, "Loại khôn với 1 ky tự").max(100, "Loại khôn với 100 ky tự"),
    area_name_l: z.string().min(1, "T	TokenName khôn với 1 ky tự").max(100, "Mã khu vực với 100 ky tự"),
    area_name_e: z.string().min(1, "T	TokenName khôn với 1 ky tự").max(100, "Mã khu vực với 100 ky tự"),
    parent_area_id: z.string().min(1, "Mã đơn vị khôn với 1 ky tự").max(20, "Mã đơn vị khôn với 20 ky tự"),
    active_flag: z.string().min(1, "Mã đơn vị khôn với 1 ky tự").max(20, "Mã đơn vị khôn với 20 ky tự"),
    lu_user_id: z.string().min(1, "Mã đơn vị khôn với 1 ky tự").max(20, "Mã đơn vị khôn với 20 ky tự"),
    lu_updated: z.string().min(1, "Mã đơn vị khôn với 1 ky tự").max(20, "Mã đơn vị khôn với 20 ky tự"),
    lu_created: z.string().min(1, "Mã đơn vị khôn với 1 ky tự").max(20, "Mã đơn vị khôn với 20 ky tự"),
});

type FacilityFormValues = z.infer<typeof formSchema>;

export type Option = {
    value: string;
    label: string;
};

interface FacilityFormProps {
    initialData?: FacilityPayload | null;
    parentUnitOptions?: Option[];
    typeOptions?: Option[];
    statusOptions?: Option[];
    onSubmit: (values: FacilityPayload) => void;
}

type BaseField = {
    name: Path<FacilityFormValues>;
    label: string;
    required?: boolean;
};

type InputField = BaseField & {
    component: "input";
    placeholder?: string;
    inputType?: string;
};

type SelectField = BaseField & {
    component: "select";
    placeholder?: string;
    options?: Option[];
    optionsApi?: string;
};

type FieldConfig = InputField | SelectField;

const INPUT_CLS =
    "border border-[#e8eaf0] rounded-lg bg-white px-3 h-9 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#1a2445]/10 focus:border-[#1a2445]";

export function UnitForm({
    initialData,
    parentUnitOptions = [],
    typeOptions = [],
    onSubmit,
}: FacilityFormProps) {
    const form = useForm<FacilityFormValues>({
        resolver: zodResolver(formSchema),

        defaultValues: initialData ?? (EMPTY_FORM as FacilityFormValues),
    });

    useEffect(() => {
        form.reset((initialData ?? EMPTY_FORM) as FacilityFormValues);
    }, [initialData, form]);

   const fields: FieldConfig[] = useMemo(
        () => [
            {
                name: "short_code",
                label: "Mã mã khu vực",
                component: "input",
                placeholder: "VD: ODA1TD03",
            },
            {
                name: "area_name",
                label: "Tên khu vực",
                component: "input",
                placeholder: "Tên khu vực",
            },
            {
                name: "area_name_e",
                label: "Tên khu vực English",
                component: "input",
                placeholder: "Tên khu vực",
            },
            {
                name: "area_type_rcd",
                label: "Loại",
                component: "select",
                placeholder: "Chọn loại",
                options: typeOptions,
            },
            {
                name: "parent_area_id",
                label: "Thuộc khu vực",
                component: "select",
                placeholder: "Chọn khu vực",
                options: parentUnitOptions,
            }
        ],
        [parentUnitOptions, typeOptions]
    );

    const { isSubmitting, isValid } = form.formState;

    const handleSubmit = (values: FacilityFormValues) => {
        onSubmit(values);
    };

    return (
        <Form {...form}>
            <form
                id="facility-form"
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-5 py-4">
                    {fields.map((item) => (
                        <FormField
                            key={item.name}
                            control={form.control}
                            name={item.name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{item.label}</FormLabel>

                                    <FormControl>
                                        {item.component === "select" ? (
                                            <Combobox
                                                optionLabel={
                                                    item.placeholder ?? "Chọn"
                                                }
                                                options={item.options ?? []}
                                                value={String(field.value ?? "")}
                                                onChange={field.onChange}
                                            />
                                        ) : (
                                            <Input
                                                {...field}
                                                type={item.inputType ?? "text"}
                                                value={String(field.value ?? "")}
                                                placeholder={item.placeholder ?? ""}
                                                className={INPUT_CLS}
                                            />
                                        )}
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 px-5">
                    <Button
                        disabled={!isValid || isSubmitting}
                        type="submit"
                        size="sm"
                    >
                        Lưu
                    </Button>
                </div>
            </form>
        </Form>
    );
}
