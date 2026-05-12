"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root
const AccordionTrigger = AccordionPrimitive.Trigger
const AccordionContent = AccordionPrimitive.Content
const AccordionHeader = AccordionPrimitive.Header

type AccordionItemProps = {
  icon?: React.ReactNode
  accordionTitle: React.ReactNode
  defaultOpen?: boolean
  value?: string
  className?: string
  children?: React.ReactNode
}

function AccordionItem({
  className,
  icon,
  accordionTitle,
  defaultOpen,
  value,
  children,
  ...props
}: AccordionItemProps) {
  const derivedValue = value ?? (typeof accordionTitle === "string" ? accordionTitle : crypto.randomUUID())

  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      defaultValue={defaultOpen ? derivedValue : undefined}
    >
      <AccordionPrimitive.Item
        value={derivedValue}
        className={cn(
          "border border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden mb-3",
          className
        )}
        {...props}
      >
        <AccordionPrimitive.Header>
          <AccordionPrimitive.Trigger
            className={cn(
              "flex w-full items-center gap-2 px-4 py-3.5 text-sm font-medium text-left",
              "hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors",
              "[&[data-state=open]>svg]:rotate-180"
            )}
          >
            {icon && (
              <span className="flex items-center text-zinc-400 dark:text-zinc-500">
                {icon}
              </span>
            )}
            <span className="flex-1">{accordionTitle}</span>
            <ChevronDown className="ml-auto h-4 w-4 text-zinc-400 transition-transform duration-200" />
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
        <AccordionPrimitive.Content className="overflow-hidden text-sm data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
          <div className="px-4 pb-4">{children}</div>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  )
}

export {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
}