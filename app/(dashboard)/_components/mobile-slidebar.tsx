"use client";

import Link from "next/link";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { type LucideIcon } from "lucide-react";

import { SlideOver } from "@/components/wojtek-ui/slide-over";
import { Branch } from "@/components/wojtek-ui/branch";
import { siteConfig } from "@/config/site";

interface NavItems {
    icon: LucideIcon;
    label: string;
    href: string;
}

interface MobileSlidebarProps {
    open: boolean;
    onClose: () => void;
    navItems: NavItems[];
}

export default function MobileSlidebar({
    open,
    onClose,
    navItems,
}: MobileSlidebarProps) {
    const pathname = usePathname();

    return (
        <>
            {open && (
                <SlideOver
                    open={open}
                    onClose={onClose}
                    side="right"
                    width="100%"
                >
                    <SlideOver.Header>
                        <NextLink href="/" onClick={onClose}>
                            <Branch className="flex items-center gap-2 shrink-0">
                                <Branch.Group className="flex items-center gap-2">
                                    <Branch.Logo
                                        src="/logo_bv1.webp"
                                        alt="Logo bệnh viện"
                                        className="w-10 h-10 object-contain rounded-lg"
                                    />

                                    <Branch.Label className="font-bold lg:text-lg md:text-base text-sm text-primary tracking-tight uppercase">
                                        {siteConfig.name}
                                    </Branch.Label>
                                </Branch.Group>
                            </Branch>
                        </NextLink>
                    </SlideOver.Header>

                    <SlideOver.Body>
                        <div className="mt-2">
                            {navItems.map(({ icon: Icon, label, href }) => {
                                const isActive =
                                    href === "/dashboard"
                                        ? pathname === href
                                        : pathname === href ||
                                          pathname.startsWith(`${href}/`);

                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        onClick={onClose}
                                        className={`
                                            relative flex items-center gap-3
                                            mx-2 rounded-xl px-3 py-2.5
                                            text-[13px] font-medium
                                            transition-all duration-150 group
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
                                            className={`shrink-0 ${
                                                isActive
                                                    ? "text-[#3b5bdb]"
                                                    : "text-[#6e80a8] group-hover:text-[#1a2445]"
                                            }`}
                                        />

                                        <span className="truncate">
                                            {label}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </SlideOver.Body>
                </SlideOver>
            )}
        </>
    );
}
