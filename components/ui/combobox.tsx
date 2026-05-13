"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ComboboxProps {
  options: { label: string; value: string }[]
  value?: string
  onChange: (value: string) => void
  optionLabel?: string
}

export const Combobox = ({
  options,
  value,
  onChange,
  optionLabel = "Select option...",
}: ComboboxProps) => {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")

  const selectedOption = React.useMemo(
    () => options.find((o) => o.value === value),
    [options, value]
  )

  const filteredOptions = React.useMemo(() => {
    if (!search.trim()) return options

    return options.filter((option) =>
      option.label
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  }, [options, search])

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)

    if (!nextOpen) {
      setSearch("")
    }
  }

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue)
    setOpen(false)
    setSearch("")
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-[#FFFFFF]"
        >
          <span className="truncate">
            {selectedOption?.label ?? optionLabel}
          </span>

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] p-0 bg-[#FFFFFF]"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Tìm kiếm..."
            value={search}
            onValueChange={setSearch}
          />

          <CommandList>
            {filteredOptions.length === 0 && (
              <CommandEmpty>
                Không tìm thấy.
              </CommandEmpty>
            )}

            <CommandGroup>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() =>
                    handleSelect(option.value)
                  }
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 shrink-0",
                      value === option.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />

                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}