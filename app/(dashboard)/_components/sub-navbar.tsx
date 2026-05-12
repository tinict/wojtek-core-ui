"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

const BREADCRUMB_MAP: Record<string, string> = {
  "/dashboard": "Trang chủ",
  "/dashboard/units": "Danh mục đơn vị",
};

interface SubNavbarProps {
    onToggle: () => void;
};

export default function SubNavbar({ onToggle }: SubNavbarProps) {
    const pathname = usePathname();
    const currentLabel = BREADCRUMB_MAP[pathname] ?? "";

    return (
        <div className="flex items-center h-10 px-3 bg-white border-b border-[#e8eaf0] shrink-0 w-full z-10">
            <button
                onClick={onToggle}
                aria-label="Toggle sidebar"
                className="w-8 h-8 flex items-center justify-center rounded text-[#6e80a8] hover:bg-[#f4f6fb] hover:text-[#1a2445] transition mr-2"
            >
                <Menu size={17} />
            </button>

            <span className="w-px h-4 bg-[#e8eaf0] mr-3" />

            <nav className="flex items-center gap-1.5 text-xs text-[#9aa3b8]">
                <span className="hover:text-[#1a2445] cursor-pointer transition-colors">
                  Dashboard
                </span>
                {currentLabel && currentLabel !== "Account Info" && (
                    <>
                        <span className="text-[#d1d5db]">/</span>
                        <span className="text-[#1a2445] font-medium">
                            {currentLabel}
                        </span>
                    </>
                )}
            </nav>
        </div>
    );
}
