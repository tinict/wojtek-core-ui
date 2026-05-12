import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  required?: boolean
  requiredColor?: string
  minLength?: number
  maxLength?: number
  minLengthMessage?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      required,
      requiredColor = "text-red-500",
      minLength,
      maxLength,
      minLengthMessage,
      onChange,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(
      (defaultValue as string) ?? ""
    )

    const isControlled = value !== undefined
    const currentValue = isControlled ? (value as string) : internalValue
    const charCount = currentValue.length

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) setInternalValue(e.target.value)
      onChange?.(e)
    }

    const showMinError =
      minLength !== undefined && charCount > 0 && charCount < minLength

    return (
      <div className="w-full">
        {label && (
          <Label className="block text-xs font-semibold text-zinc-500 mb-1.5 uppercase tracking-wide">
            {label}{" "}
            {required && (
              <span className={requiredColor}>*</span>
            )}
          </Label>
        )}

        <textarea
          ref={ref}
          value={isControlled ? value : internalValue}
          onChange={handleChange}
          maxLength={maxLength}
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />

        {(minLength !== undefined || maxLength !== undefined) && (
          <div className="flex justify-between mt-1.5">
            {showMinError ? (
              <span className="text-xs text-red-400">
                {minLengthMessage ?? `Tối thiểu ${minLength} ký tự`}
              </span>
            ) : (
              <span />
            )}

            {maxLength !== undefined && (
              <span
                className={cn(
                  "text-xs ml-auto",
                  charCount > maxLength * 0.9
                    ? "text-amber-500"
                    : "text-zinc-400"
                )}
              >
                {charCount}/{maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    )
  }
)

Textarea.displayName = "Textarea"

export { Textarea }
