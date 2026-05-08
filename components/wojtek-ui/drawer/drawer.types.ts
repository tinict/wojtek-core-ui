import type { ReactNode } from "react";
import type { MegaMenuPanelQuickLink } from "@/components/wojtek-ui/mega-menu-panel/mega-menu-panel.types";
import type { NavMenuData } from "@/types/type";

export interface MobileDrawerContextValue {
    onClose?: () => void;
}

export interface MobileDrawerRootProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
}

export interface MobileDrawerHeaderProps {
    onClose?: () => void;
    className?: string;
}

export interface MobileDrawerSearchProps {
    placeholder?: string;
    className?: string;
}

export interface MobileDrawerNavProps {
    menuData: NavMenuData;
    className?: string;
}

export interface MobileDrawerQuickLinksProps {
    links: MegaMenuPanelQuickLink[];
    title?: string;
    className?: string;
};

export interface MobileDrawerFooterProps {
    hotline?: string;
    ctaLabel?: string;
    secondaryLabel?: string;
    className?: string;
};
