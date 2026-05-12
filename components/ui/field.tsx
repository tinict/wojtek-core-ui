"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Label } from "./label"

const fieldVariants = cva(
  "flex flex-col gap-1"
);

interface FieldProps {
    label: string;
    children: React.ReactNode;
    className?: VariantProps<typeof fieldVariants>
};

const Field = ({
    label,
    children,
    className
}: FieldProps) => {
    return (
        <div className={cn(fieldVariants(), className)}>
            <Label className="text-xs font-medium text-[#6e80a8]">{label}</Label>
            {children}
        </div>
    );
}

Field.displayName = "Field";

export { Field };