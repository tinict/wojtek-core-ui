import type { ReactNode } from "react";
import type {
    MegaMenuPanelFeatured,
    MegaMenuPanelHotline,
    MegaMenuPanelQuickLinks,
    MegaMenuPanelRoot,
    MegaMenuPanelSection
} from "./megaMenuPanel";

export interface MegaMenuPanelContextValue {
    onClose?: () => void;
}

export interface MegaMenuPanelRootProps {
    children: ReactNode;
    className?: string;
    onClose?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export interface MegaMenuPanelFeaturedProps {
    badge?: string;
    title: string;
    desc: string;
    ctaLabel?: string;
    href?: string;
    className?: string;
}

export interface MegaMenuPanelSectionItem {
    label: string;
    icon?: ReactNode;
    badge?: string;
    href?: string;
}

export interface MegaMenuPanelSectionProps {
    title: string;
    items: MegaMenuPanelSectionItem[];
    className?: string;
}

export interface MegaMenuPanelQuickLink {
    label: string;
    href?: string;
}

export interface MegaMenuPanelQuickLinksProps {
    title?: string;
    links: MegaMenuPanelQuickLink[];
    className?: string;
    children?: ReactNode;
}

export interface MegaMenuPanelHotlineProps {
    label?: string;
    phone: string;
    sub?: string;
    className?: string;
}


export type MegaMenuPanelComponents = {
    Root: typeof MegaMenuPanelRoot;
    Featured: typeof MegaMenuPanelFeatured;
    Section: typeof MegaMenuPanelSection;
    QuickLinks: typeof MegaMenuPanelQuickLinks;
    Hotline: typeof MegaMenuPanelHotline;
};