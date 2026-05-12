import { MegaMenuPanelQuickLink } from "@/components/wojtek-ui/mega-menu-panel/mega-menu-panel.types";
import type { ReactNode } from "react";

export interface NavMenuItem {
    label: string;
    icon: ReactNode;
    href?: string;
    badge?: string;
}

export interface NavMenuSection {
    title: string;
    items: NavMenuItem[];
}

export interface NavMenuFeatured {
    title: string;
    desc: string;
    badge: string;
}

export interface NavMenuEntry {
    featured: NavMenuFeatured;
    sections: NavMenuSection[];
}

// Thêm href vào để nav biết navigate đi đâu khi null (không có mega menu)
export type NavMenuData = Record<string, NavMenuEntry | null>;

export interface NavHrefs {
    [label: string]: string;
}

export interface MegaMenuPanelProps {
    data: NavMenuEntry;
    onClose: () => void;
}

export interface MobileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    menuData: NavMenuData;
    quickLinks?: MegaMenuPanelQuickLink[];  // fix: was string[]
}

export interface NavbarProps {
    menuData?: NavMenuData;
    quickLinks?: MegaMenuPanelQuickLink[];
    ctaLabel?: string;
    secondaryLabel?: string;
    hotline?: string;
}