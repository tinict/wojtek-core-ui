"use client";

import React, { useEffect, useState } from "react";
import {
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItems {
    icon: LucideIcon;
    label: string;
    href: string;
};

interface SidebarProps {
    collapsed: boolean;
    navItems?: NavItems[];
};

export default function Sidebar({
  collapsed,
  navItems = [],
}: SidebarProps) {

    const pathname = usePathname();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <aside
          className={`hidden lg:flex flex-col h-full bg-white border-r border-[#e8eaf0] pt-2 pb-4 shrink-0 transition-all duration-200 ${collapsed ? "w-[56px]" : "w-[220px]"}`}
        >
            {navItems.map(({ icon: Icon, label, href }) => {
                const isActive = pathname === href;

                return (
                    <Link
                        key={href}
                        href={href}
                        title={collapsed ? label : undefined}
                        className={`
                          relative flex items-center gap-3 mx-2 rounded-xl
                          text-[13px] font-medium transition-all duration-150 group
                          ${collapsed ? "px-0 py-2.5 justify-center" : "px-3 py-2.5"}
                          ${
                              isActive
                                  ? "bg-[#eef2ff] text-[#1a2445]"
                                  : "text-[#4a5568] hover:bg-[#f5f7fa] hover:text-[#1a2445]"
                          }
                        `}
                    >
                        {isActive && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[#3b5bdb] rounded-r-full" />
                        )}

                        <Icon
                            size={17}
                            className={`shrink-0 ${isActive ? "text-[#3b5bdb]" : "text-[#6e80a8] group-hover:text-[#1a2445]"}`}
                        />

                        {!collapsed && (
                            <span className="truncate">{label}</span>
                        )}
                    </Link>
                );
            })}
        </aside>
    );
}