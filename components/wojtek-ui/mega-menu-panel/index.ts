import {
    MegaMenuPanelRoot,
    MegaMenuPanelFeatured,
    MegaMenuPanelSection,
    MegaMenuPanelQuickLinks,
    MegaMenuPanelHotline
} from "./megaMenuPanel";

export const MegaMenuPanel = Object.assign(MegaMenuPanelRoot, {
    Root: MegaMenuPanelRoot,
    Featured: MegaMenuPanelFeatured,
    Section: MegaMenuPanelSection,
    QuickLinks: MegaMenuPanelQuickLinks,
    Hotline: MegaMenuPanelHotline,
});

export {
    MegaMenuPanelRoot,
    MegaMenuPanelFeatured,
    MegaMenuPanelSection,
    MegaMenuPanelQuickLinks,
    MegaMenuPanelHotline,
};

export type {
    MegaMenuPanelRootProps,
    MegaMenuPanelRootProps as MegaMenuPanelProps,
    MegaMenuPanelFeaturedProps,
    MegaMenuPanelSectionProps,
    MegaMenuPanelSectionItem,
    MegaMenuPanelQuickLinksProps,
    MegaMenuPanelQuickLink,
    MegaMenuPanelHotlineProps,
} from "./mega-menu-panel.types";
