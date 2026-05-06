"use client";

import NextLink from "next/link";
import clsx from "clsx";
import { Button, Chip } from "@heroui/react";
import { ArrowRight, Phone } from "lucide-react";
import { MegaMenuPanelProps } from "@/types/type";

export function MegaMenuPanel({ data, onClose }: MegaMenuPanelProps) {
  return (
    <div
      className={clsx(
        "absolute left-0 right-0 top-full mt-0 z-40",
        "bg-white/95 backdrop-blur-xl border-b border-[#E6E8EE]",
        "shadow-[0_20px_60px_-10px_rgba(1,32,71,0.12)]",
        "animate-in fade-in slide-in-from-top-2 duration-200"
      )}
    >
      <div className="mx-auto max-w-[1280px] px-6 py-8">
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-8">

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0E82FD] to-[#012047] p-6 text-white cursor-pointer">
            <div className="absolute inset-0 opacity-60 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] " />
            <Chip
              size="sm"
              variant="soft"
              className="bg-white/20 text-white border-0 mb-3 font-semibold text-xs tracking-wide"
            >
              {data.featured.badge}
            </Chip>
            <h3 className="text-xl font-bold leading-tight mb-2">{data.featured.title}</h3>
            <p className="text-white/75 text-sm leading-relaxed mb-5">{data.featured.desc}</p>
            <Button
              size="sm"
              className="bg-white text-[#0E82FD] font-semibold rounded-full hover:bg-white/90 transition-all gap-1.5"
            >
              Tìm hiểu thêm
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          {data.sections.map((section) => (
            <div key={section.title}>
              <p className="text-xs font-bold uppercase tracking-widest text-[#465D7C] mb-4">
                {section.title}
              </p>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <NextLink
                      href="#"
                      onClick={onClose}
                      className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#465D7C] font-medium hover:bg-[#0E82FD]/8 hover:text-[#0E82FD] transition-all"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F6FAFF] text-[#465D7C] group-hover:bg-[#0E82FD]/10 group-hover:text-[#0E82FD] transition-all flex-shrink-0">
                        {item.icon}
                      </span>
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <Chip
                          size="sm"
                          variant="soft"
                          color="success"
                          className="h-4 text-[10px] font-bold px-1.5"
                        >
                          {item.badge}
                        </Chip>
                      )}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#465D7C] mb-4">
              Liên kết nhanh
            </p>
            <ul className="space-y-1">
              {[
                "Đặt lịch khám",
                "Tra cứu kết quả",
                "Hướng dẫn thăm khám",
                "Bảng giá dịch vụ",
                "Hỏi đáp sức khỏe",
              ].map((label) => (
                <li key={label}>
                  <NextLink
                    href="#"
                    onClick={onClose}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-[#465D7C] font-medium hover:bg-[#F6FAFF] hover:text-[#012047] transition-all group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-[#E6E8EE] group-hover:text-[#0E82FD] transition-colors flex-shrink-0" />
                    {label}
                  </NextLink>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl border border-[#E6E8EE] bg-[#F6FAFF] p-4">
              <p className="text-xs text-[#465D7C] mb-1">Hotline hỗ trợ</p>
              <div className="flex items-center gap-2 text-[#0E82FD] font-bold text-base">
                <Phone className="w-4 h-4" />
                1800 599 920
              </div>
              <p className="text-[11px] text-[#465D7C] mt-0.5">Miễn phí · 24/7</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}