"use client";

import { useState, useEffect, useRef } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Button } from "@heroui/react";
import { ChevronDown, Menu, User } from "lucide-react";

import { NavbarProps } from "@/types/type";
import { defaultMenuData, defaultQuickLinks, navHrefs } from "@/config/menu-data";
import {
    MegaMenuPanelFeatured,
    MegaMenuPanelHotline,
    MegaMenuPanelQuickLinks,
    MegaMenuPanelRoot,
    MegaMenuPanelSection,
} from "./wojtek-ui/mega-menu-panel";

export function Navbar({
    menuData = defaultMenuData,
    hotline = "1800 599 920",
}: NavbarProps) {
    const pathname = usePathname();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeMega, setActiveMega] = useState<string | null>(null);
    const navRef = useRef<HTMLElement>(null);
    const megaTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node))
                setActiveMega(null);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    useEffect(() => () => clearTimeout(megaTimeout.current), []);

    useEffect(() => {
        setActiveMega(null);
        setIsDrawerOpen(false);
    }, [pathname]);

    const handleNavEnter = (label: string) => {
        clearTimeout(megaTimeout.current);
        if (menuData[label] !== undefined) setActiveMega(label);
    };
    const handleNavLeave = () => {
        megaTimeout.current = setTimeout(() => setActiveMega(null), 120);
    };
    const handlePanelEnter = () => clearTimeout(megaTimeout.current);
    const handlePanelLeave = () => {
        megaTimeout.current = setTimeout(() => setActiveMega(null), 120);
    };

    const navLinks = Object.keys(menuData);

    const isLinkActive = (label: string) => {
        const href = navHrefs[label];
        if (!href || href === "#") return false;
        return href === "/" ? pathname === "/" : pathname.startsWith(href);
    };

    const plainLinks = navLinks.filter((l) => menuData[l] === null);
    const megaLinks = navLinks.filter((l) => menuData[l] !== null);

    const navLinkBase = [
        "relative flex items-center gap-1 px-[13px] py-2 text-[13.5px] font-medium transition-colors duration-200",
        "outline-none focus-visible:ring-2 focus-visible:ring-[#1A56DB]/30 rounded-sm",
        "after:absolute after:bottom-[6px] after:left-[13px] after:right-[13px] after:h-[2.5px]",
        "after:rounded-full after:bg-[#1A56DB]",
        "after:scale-x-0 after:origin-center after:transition-transform after:duration-[250ms] after:ease-[cubic-bezier(0.4,0,0.2,1)]",
    ].join(" ");

    const navLinkHover = "hover:text-[#01285F] hover:after:scale-x-50";
    const navLinkActive = "!text-[#1A56DB] font-semibold after:!scale-x-100";
    const navLinkDefault = "text-[#4E5F74]";

    return (
        <>
            <nav
                ref={navRef}
                className={clsx(
                    "sticky top-0 z-50 w-full bg-white transition-shadow duration-200",
                    "border-b border-[#D8E0EA]",
                    scrolled ? "shadow-[0_2px_14px_rgba(1,32,71,0.08)]" : "",
                )}
            >
                <header className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-6">
                    <div className="hidden lg:flex items-center">
                        <NextLink href="/" className="flex items-center gap-2.5 mr-7 shrink-0">
                            <span className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#01285F]">
                                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                </svg>
                            </span>
                            <span className="text-[12.5px] font-bold text-[#01285F] leading-[1.3] tracking-[0.01em] max-w-[130px]">
                                CỔNG PHẢN ÁNH KIẾN NGHỊ
                            </span>
                        </NextLink>

                        <span className="w-px h-[18px] bg-[#DDE4ED] mr-2" />

                        <ul className="flex items-center">
                            {plainLinks.map((label) => {
                                const isActive = isLinkActive(label);
                                return (
                                    <li key={label}>
                                        <NextLink
                                            href={navHrefs[label] ?? "/"}
                                            onMouseEnter={() => handleNavEnter(label)}
                                            onMouseLeave={handleNavLeave}
                                            className={clsx(
                                                navLinkBase,
                                                navLinkHover,
                                                isActive ? navLinkActive : navLinkDefault,
                                            )}
                                        >
                                            {label}
                                        </NextLink>
                                    </li>
                                );
                            })}
                        </ul>

                        {megaLinks.length > 0 && plainLinks.length > 0 && (
                            <span className="w-px h-[18px] bg-[#DDE4ED] mx-2" />
                        )}

                        <ul className="flex items-center">
                            {megaLinks.map((label) => {
                                const isMegaActive = activeMega === label;
                                return (
                                    <li key={label}>
                                        <button
                                            onMouseEnter={() => handleNavEnter(label)}
                                            onMouseLeave={handleNavLeave}
                                            onClick={() =>
                                                setActiveMega(isMegaActive ? null : label)
                                            }
                                            className={clsx(
                                                navLinkBase,
                                                navLinkHover,
                                                isMegaActive ? navLinkActive : navLinkDefault,
                                            )}
                                        >
                                            {label}
                                            <ChevronDown
                                                className={clsx(
                                                    "w-3.5 h-3.5 transition-transform duration-200 text-[#9AAABB]",
                                                    isMegaActive && "rotate-180 !text-[#1A56DB]",
                                                )}
                                            />
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="hidden lg:flex items-center shrink-0">
                        <Button
                            size="sm"
                            className="flex items-center gap-1.5 rounded-full h-9 px-5 text-[13px] font-semibold text-white bg-[#01285F] hover:bg-[#01245A] transition-colors"
                        >
                            <User className="w-3.5 h-3.5" />
                            Đăng nhập
                        </Button>
                    </div>

                    <NextLink href="/" className="flex lg:hidden items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#01285F]">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            </svg>
                        </span>
                        <span className="text-[12px] font-bold text-[#01285F] leading-tight max-w-[120px]">
                            CỔNG PHẢN ÁNH KIẾN NGHỊ
                        </span>
                    </NextLink>
                </header>

                {activeMega !== null && menuData[activeMega] != null && (() => {
                    const entry = menuData[activeMega]!;
                    return (
                        <MegaMenuPanelRoot
                            onClose={() => setActiveMega(null)}
                            onMouseEnter={handlePanelEnter}
                            onMouseLeave={handlePanelLeave}
                        >
                            <MegaMenuPanelFeatured
                                badge={entry.featured.badge}
                                title={entry.featured.title}
                                desc={entry.featured.desc}
                            />
                            {entry.sections.map((section) => (
                                <MegaMenuPanelSection
                                    key={section.title}
                                    title={section.title}
                                    items={section.items}
                                />
                            ))}
                            <MegaMenuPanelQuickLinks links={defaultQuickLinks}>
                                <MegaMenuPanelHotline phone={hotline} />
                            </MegaMenuPanelQuickLinks>
                        </MegaMenuPanelRoot>
                    );
                })()}
            </nav>
        </>
    );
}