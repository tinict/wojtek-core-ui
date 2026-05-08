"use client";

import NextLink from "next/link";
import clsx from "clsx";
import { Button, Chip } from "@heroui/react";
import { ArrowRight, Phone } from "lucide-react";
import React, { createContext, useContext } from "react";
import type {
  MegaMenuPanelContextValue,
  MegaMenuPanelRootProps,
  MegaMenuPanelFeaturedProps,
  MegaMenuPanelSectionProps,
  MegaMenuPanelQuickLinksProps,
  MegaMenuPanelHotlineProps,
} from "./mega-menu-panel.types";

const MegaMenuPanelContext = createContext<MegaMenuPanelContextValue>({});

const useMegaMenuPanel = () => useContext(MegaMenuPanelContext);

const MegaMenuPanelRoot = ({
  children,
  className,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: MegaMenuPanelRootProps) => {
  return (
    <MegaMenuPanelContext value={{ onClose }}>
      <div
        data-slot="mega-menu-panel"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={clsx(
          "absolute left-0 right-0 top-full mt-0 z-40",
          "bg-white/95 backdrop-blur-xl border-b border-[#E6E8EE]",
          "shadow-[0_20px_60px_-10px_rgba(1,32,71,0.12)]",
          "animate-in fade-in slide-in-from-top-2 duration-200",
          className
        )}
      >
        <div className="mx-auto max-w-[1280px] px-6 py-8">
          <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-8">
            {children}
          </div>
        </div>
      </div>
    </MegaMenuPanelContext>
  );
};

const MegaMenuPanelFeatured = ({
  badge,
  title,
  desc,
  ctaLabel = "Tìm hiểu thêm",
  href = "#",
  className,
}: MegaMenuPanelFeaturedProps) => {
  return (
    <div
      data-slot="mega-menu-panel-featured"
      className={clsx(
        "relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0E82FD] to-[#012047] p-6 text-white cursor-pointer",
        className
      )}
    >
      <div className="absolute inset-0 opacity-60 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] " />

      {badge && (
        <Chip
          size="sm"
          variant="soft"
          className="bg-white/20 text-white border-0 mb-3 font-semibold text-xs tracking-wide"
        >
          {badge}
        </Chip>
      )}

      <h3 className="text-xl font-bold leading-tight mb-2">{title}</h3>
      <p className="text-white/75 text-sm leading-relaxed mb-5">{desc}</p>
      <NextLink href={href}>
        <Button
          size="sm"
          className="bg-white text-[#0E82FD] font-semibold rounded-full hover:bg-white/90 transition-all gap-1.5"
        >
          {ctaLabel}
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </NextLink>
    </div>
  );
};

const MegaMenuPanelSection = ({
  title,
  items,
  className,
}: MegaMenuPanelSectionProps) => {
  const { onClose } = useMegaMenuPanel();

  return (
    <div data-slot="mega-menu-panel-section" className={className}>
      <p className="text-xs font-bold uppercase tracking-widest text-[#465D7C] mb-4">
        {title}
      </p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.label}>
            <NextLink
              href={item.href ?? "#"}
              onClick={onClose}
              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#465D7C] font-medium hover:bg-[#0E82FD]/8 hover:text-[#0E82FD] transition-all"
            >
              {item.icon && (
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F6FAFF] text-[#465D7C] group-hover:bg-[#0E82FD]/10 group-hover:text-[#0E82FD] transition-all flex-shrink-0">
                  {item.icon}
                </span>
              )}
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
  );
};

const MegaMenuPanelQuickLinks = ({
  title = "Liên kết nhanh",
  links,
  className,
  children,
}: MegaMenuPanelQuickLinksProps) => {
  const { onClose } = useMegaMenuPanel();

  return (
    <div data-slot="mega-menu-panel-quick-links" className={className}>
      <p className="text-xs font-bold uppercase tracking-widest text-[#465D7C] mb-4">
        {title}
      </p>
      <ul className="space-y-1">
        {links.map((link) => (
          <li key={link.label}>
            <NextLink
              href={link.href ?? "#"}
              onClick={onClose}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-[#465D7C] font-medium hover:bg-[#F6FAFF] hover:text-[#012047] transition-all group"
            >
              <ArrowRight className="w-3.5 h-3.5 text-[#E6E8EE] group-hover:text-[#0E82FD] transition-colors flex-shrink-0" />
              {link.label}
            </NextLink>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
};

const MegaMenuPanelHotline = ({
  label = "Hotline hỗ trợ",
  phone,
  sub = "Miễn phí · 24/7",
  className,
}: MegaMenuPanelHotlineProps) => {
  return (
    <div
      data-slot="mega-menu-panel-hotline"
      className={clsx(
        "mt-6 rounded-xl border border-[#E6E8EE] bg-[#F6FAFF] p-4",
        className
      )}
    >
      <p className="text-xs text-[#465D7C] mb-1">{label}</p>
      <div className="flex items-center gap-2 text-[#0E82FD] font-bold text-base">
        <Phone className="w-4 h-4" />
        {phone}
      </div>
      {sub && <p className="text-[11px] text-[#465D7C] mt-0.5">{sub}</p>}
    </div>
  );
};

export {
  MegaMenuPanelRoot,
  MegaMenuPanelFeatured,
  MegaMenuPanelSection,
  MegaMenuPanelQuickLinks,
  MegaMenuPanelHotline,
};
