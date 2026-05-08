"use client";

import { useState, useEffect, useRef } from "react";
import NextLink from "next/link";
import clsx from "clsx";
import { Button, SearchField } from "@heroui/react";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/icons";
import { ChevronDown, Menu } from "lucide-react";

import { NavbarProps } from "@/types/type";
import { defaultMenuData, defaultQuickLinks } from "@/config/menu-data";
import {MegaMenuPanelFeatured, MegaMenuPanelHotline, MegaMenuPanelQuickLinks, MegaMenuPanelRoot, MegaMenuPanelSection } from "./wojtek-ui/mega-menu-panel";
import { MobileDrawer } from "./wojtek-ui/drawer";

export function Navbar({
  menuData = defaultMenuData,
  quickLinks = defaultQuickLinks,
  ctaLabel = "Đặt lịch ngay",
  secondaryLabel = "Hướng dẫn khám",
  hotline = "1800 599 920",
}: NavbarProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
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
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMega(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    return () => clearTimeout(megaTimeout.current);
  }, []);

  const handleNavEnter = (label: string) => {
    clearTimeout(megaTimeout.current);
    if (menuData[label] !== undefined) setActiveMega(label);
  };

  const handleNavLeave = () => {
    megaTimeout.current = setTimeout(() => setActiveMega(null), 120);
  };

  const handlePanelEnter = () => {
    clearTimeout(megaTimeout.current);
  };

  const handlePanelLeave = () => {
    megaTimeout.current = setTimeout(() => setActiveMega(null), 120);
  };

  const navLinks = Object.keys(menuData);

  return (
    <>
      <nav
        ref={navRef}
        className={clsx(
          "sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl transition-all duration-300",
          "border-b border-[#E6E8EE]",
          scrolled ? "shadow-[0_4px_24px_-4px_rgba(1,32,71,0.10)]" : "shadow-none"
        )}
      >
        <header className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-6">
          {/* <NextLink className="group flex items-center gap-2.5 shrink-0" href="/">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#0E82FD] to-[#012047] text-white shadow-md shadow-[#0E82FD]/30 group-hover:shadow-[#0E82FD]/50 transition-all">
              <Logo />
            </span>
            <span className="font-bold text-[17px] tracking-tight text-[#012047]">
              {siteConfig.name}
            </span>
          </NextLink> */}

          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((label) => {
              const hasMega = menuData[label] !== null;
              const isActive = activeMega === label;
              return (
                <li key={label}>
                  <button
                    onMouseEnter={() => handleNavEnter(label)}
                    onMouseLeave={handleNavLeave}
                    onClick={() => {
                      if (hasMega) setActiveMega(isActive ? null : label);
                    }}
                    className={clsx(
                      "relative flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-all",
                      "outline-none focus-visible:ring-2 focus-visible:ring-[#0E82FD]/50",
                      isActive
                        ? "bg-[#0E82FD]/8 text-[#0E82FD]"
                        : "text-[#465D7C] hover:bg-[#F6FAFF] hover:text-[#012047]"
                    )}
                  >
                    {label}
                    {hasMega && (
                      <ChevronDown
                        className={clsx(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          isActive ? "rotate-180 text-[#0E82FD]" : "text-[#465D7C]"
                        )}
                      />
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-[#0E82FD]" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* <div className="hidden sm:flex items-center gap-2 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full h-9 px-4 text-sm font-semibold text-[#465D7C] hover:text-[#012047] hover:bg-[#F6FAFF]"
            >
              <span className="hidden md:inline">{secondaryLabel}</span>
            </Button>
            <Button
              size="sm"
              className={clsx(
                "rounded-full h-9 px-5 text-sm font-bold text-white",
                "bg-gradient-to-r from-[#0E82FD] to-[#012047]",
                "shadow-md shadow-[#0E82FD]/25 hover:shadow-lg hover:shadow-[#0E82FD]/35",
                "transition-all hover:scale-[1.02] active:scale-[0.98]"
              )}
            >
              {ctaLabel}
            </Button>
          </div> */}

          <Button
            isIconOnly
            variant="ghost"
            size="sm"
            aria-label="Mở menu"
            className="flex lg:hidden rounded-xl h-9 w-9 text-[#465D7C]"
            onPress={() => setIsDrawerOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
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

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <MobileDrawer.Header />
        <MobileDrawer.Search />
        <MobileDrawer.Nav menuData={menuData} />
        <MobileDrawer.QuickLinks links={quickLinks} />
        <MobileDrawer.Footer
          hotline={hotline}
          ctaLabel={ctaLabel}
          secondaryLabel={secondaryLabel}
        />
      </MobileDrawer>
    </>
  );
}