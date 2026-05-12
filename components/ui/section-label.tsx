import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const sectionVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
);

export interface SectionLabelProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionVariants> {}

function SectionLabel({ className, children, ...props }: SectionLabelProps) {
  return (
    <div 
        className={
            cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", className)
        }
        {...props}
    >
      <span className="text-xs font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-300">
        {children}
      </span>
    </div>
  );
}

export default SectionLabel;
