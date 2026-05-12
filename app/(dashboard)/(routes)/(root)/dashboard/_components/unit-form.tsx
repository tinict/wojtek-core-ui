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

const FACILITY_TYPES = [
    "Bệnh viện",
    "Phòng khám",
    "Trung tâm y tế",
    "Nhà thuốc",
] as const;

const FACILITY_STATUS = ["Hoạt động", "Tạm dừng", "Đóng cửa"] as const;

const formSchema = z.object({
    code: z.string().min(1, "Vui lòng nhập mã đơn vị"),

    name: z.string().min(1, "Vui lòng nhập tên đơn vị"),

    type: z.enum(FACILITY_TYPES),

    parentUnit: z.string().optional(),

    province: z.string().min(1, "Vui lòng nhập tỉnh/thành phố"),

    district: z.string().min(1, "Vui lòng nhập quận/huyện"),

    address: z.string().min(1, "Vui lòng nhập địa chỉ"),

    phone: z.string().min(1, "Vui lòng nhập số điện thoại"),

    status: z.enum(FACILITY_STATUS),

    createdAt: z.string().min(1, "Vui lòng chọn ngày tạo"),
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
    statusOptions = [],
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
                name: "code",
                label: "Mã đơn vị",
                component: "input",
                placeholder: "VD: BV-001",
            },

            {
                name: "name",
                label: "Tên đơn vị",
                component: "input",
                placeholder: "Tên đơn vị",
            },

            {
                name: "type",
                label: "Loại cơ sở",
                component: "select",
                placeholder: "Chọn loại cơ sở",
                options: typeOptions,
            },

            {
                name: "status",
                label: "Trạng thái",
                component: "select",
                placeholder: "Chọn trạng thái",
                options: statusOptions,
            },

            {
                name: "parentUnit",
                label: "Đơn vị cấp trên",
                component: "select",
                placeholder: "Chọn đơn vị",
                options: parentUnitOptions,
            },

            {
                name: "province",
                label: "Tỉnh / Thành phố",
                component: "input",
                placeholder: "VD: Hồ Chí Minh",
            },

            {
                name: "district",
                label: "Quận / Huyện",
                component: "input",
                placeholder: "VD: Quận 1",
            },

            {
                name: "address",
                label: "Địa chỉ",
                component: "input",
                placeholder: "Số nhà, tên đường...",
            },

            {
                name: "phone",
                label: "Điện thoại",
                component: "input",
                placeholder: "VD: 0909123456",
            },

            {
                name: "createdAt",
                label: "Ngày tạo",
                component: "input",
                inputType: "date",
            },
        ],
        [parentUnitOptions, typeOptions, statusOptions],
    );

    const handleSubmit = (values: FacilityFormValues) => {
        onSubmit(values);
    };

    return (
        <Form {...form}>
            <form
                id="facility-form"
                onSubmit={form.handleSubmit(handleSubmit)}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-5 py-4"
            >
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
            </form>
        </Form>
    );
}
