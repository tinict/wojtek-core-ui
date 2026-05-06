"use client";

import { useState, useEffect } from "react";
import NextLink from "next/link";
import clsx from "clsx";
import { Button, Chip, SearchField } from "@heroui/react";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/icons";
import { MobileDrawerProps } from "@/types/type";
import { X, ArrowRight, ChevronDown, Phone } from "lucide-react";

export function MobileDrawer({
  isOpen,
  onClose,
  menuData,
  quickLinks = [],
}: MobileDrawerProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const navLinks = Object.keys(menuData);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setExpanded(null);
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={clsx(
          "fixed inset-0 z-40 lg:hidden",
          "bg-[#012047]/50 backdrop-blur-sm",
          "transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      <aside
        className={clsx(
          "fixed top-0 left-0 z-50 h-full w-[300px] max-w-[85vw] lg:hidden",
          "flex flex-col bg-white",
          "shadow-[6px_0_40px_rgba(1,32,71,0.18)]",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-[#E6E8EE] shrink-0">
          <NextLink href="/" onClick={onClose} className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#0E82FD] to-[#012047] text-white shadow-md shadow-[#0E82FD]/30">
              <Logo />
            </span>
            <span className="font-bold text-[16px] tracking-tight text-[#012047]">
              {siteConfig.name}
            </span>
          </NextLink>
          <button
            onClick={onClose}
            aria-label="Đóng menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#465D7C] hover:bg-[#F6FAFF] hover:text-[#012047] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-4 py-3 border-b border-[#E6E8EE] shrink-0">
          <SearchField name="search-mobile-drawer" aria-label="Tìm kiếm" className="w-full">
            <SearchField.Group className="h-9 rounded-full border border-[#E6E8EE] bg-[#F6FAFF] px-3 w-full focus-within:border-[#0E82FD] focus-within:ring-2 focus-within:ring-[#0E82FD]/15 transition-all">
              <SearchField.SearchIcon className="text-[#465D7C] h-4 w-4" />
              <SearchField.Input className="text-sm placeholder:text-[#465D7C]" placeholder="Tìm kiếm dịch vụ, bác sĩ..." />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-3">
          <div className="h-0.5 w-10 rounded-full bg-gradient-to-r from-[#0E82FD] to-[#519EFF] mx-2 mb-4" />

          <ul className="space-y-0.5">
            {navLinks.map((label) => {
              const entry = menuData[label];
              const hasMega = entry !== null;
              const isExpanded = expanded === label;

              return (
                <li key={label}>
                  <button
                    className={clsx(
                      "flex w-full items-center justify-between rounded-xl px-4 py-3",
                      "text-sm font-semibold transition-colors duration-150",
                      isExpanded
                        ? "bg-[#0E82FD]/8 text-[#0E82FD]"
                        : "text-[#012047] hover:bg-[#F6FAFF] hover:text-[#0E82FD]"
                    )}
                    onClick={() =>
                      hasMega ? setExpanded(isExpanded ? null : label) : onClose()
                    }
                  >
                    <span>{label}</span>
                    {hasMega && (
                      <ChevronDown
                        className={clsx(
                          "w-4 h-4 transition-transform duration-200",
                          isExpanded ? "rotate-180 text-[#0E82FD]" : "text-[#465D7C]"
                        )}
                      />
                    )}
                  </button>

                  <div
                    className={clsx(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      isExpanded ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    {hasMega && entry && (
                      <ul className="mt-1 ml-3 space-y-0.5 pb-2 border-l-2 border-[#0E82FD]/20 pl-3">
                        {entry.sections.flatMap((s) =>
                          s.items.map((item) => (
                            <li key={item.label}>
                              <NextLink
                                href="#"
                                onClick={onClose}
                                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#465D7C] hover:bg-[#F6FAFF] hover:text-[#0E82FD] transition-colors group"
                              >
                                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F6FAFF] text-[#465D7C] group-hover:bg-[#0E82FD]/10 group-hover:text-[#0E82FD] transition-all flex-shrink-0">
                                  {item.icon}
                                </span>
                                <span className="flex-1">{item.label}</span>
                                {item.badge && (
                                  <Chip size="sm" color="success" className="h-4 text-[10px] ml-auto">
                                    {item.badge}
                                  </Chip>
                                )}
                              </NextLink>
                            </li>
                          ))
                        )}
                      </ul>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          {quickLinks.length > 0 && (
            <>
              <div className="my-4 border-t border-[#E6E8EE]" />
              <ul className="space-y-0.5">
                {quickLinks.map((label) => (
                  <li key={label}>
                    <NextLink
                      href="#"
                      onClick={onClose}
                      className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-[#465D7C] font-medium hover:bg-[#F6FAFF] hover:text-[#0E82FD] transition-colors group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-[#E6E8EE] group-hover:text-[#0E82FD] transition-colors flex-shrink-0" />
                      {label}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </>
          )}
        </nav>

        <div className="border-t border-[#E6E8EE] px-4 py-4 space-y-2.5 bg-[#F6FAFF] shrink-0">
          <Button
            variant="ghost"
            className="rounded-full h-10 text-sm font-semibold text-[#012047] border border-[#E6E8EE] bg-white hover:border-[#0E82FD] hover:text-[#0E82FD] transition-all"
            fullWidth
          >
            Hướng dẫn thăm khám
          </Button>
          <Button
            className={clsx(
              "rounded-full h-10 text-sm font-bold text-white w-full",
              "bg-gradient-to-r from-[#0E82FD] to-[#012047]",
              "shadow-md shadow-[#0E82FD]/25 hover:shadow-lg hover:shadow-[#0E82FD]/35",
              "transition-all hover:scale-[1.01] active:scale-[0.99]"
            )}
            fullWidth
          >
            Đặt lịch ngay
          </Button>
          <div className="flex items-center justify-center gap-2 pt-1 text-sm text-[#465D7C]">
            <Phone className="w-4 h-4 text-[#0E82FD]" />
            <span>Hotline:</span>
            <span className="font-bold text-[#0E82FD]">1800 599 920</span>
            <Chip size="sm" color="success" className="text-[10px] h-4">Miễn phí</Chip>
          </div>
        </div>
      </aside>
    </>
  );
}