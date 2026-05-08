import {
    MobileDrawerRoot,
    MobileDrawerHeader,
    MobileDrawerSearch,
    MobileDrawerNav,
    MobileDrawerQuickLinks,
    MobileDrawerFooter,
} from "./drawer";

export const MobileDrawer = Object.assign(MobileDrawerRoot, {
    Root: MobileDrawerRoot,
    Header: MobileDrawerHeader,
    Search: MobileDrawerSearch,
    Nav: MobileDrawerNav,
    QuickLinks: MobileDrawerQuickLinks,
    Footer: MobileDrawerFooter,
});

export {
    MobileDrawerRoot,
    MobileDrawerHeader,
    MobileDrawerSearch,
    MobileDrawerNav,
    MobileDrawerQuickLinks,
    MobileDrawerFooter,
};

export type {
    MobileDrawerContextValue,
    MobileDrawerRootProps,
    MobileDrawerRootProps as MobileDrawerProps,
    MobileDrawerHeaderProps,
    MobileDrawerSearchProps,
    MobileDrawerNavProps,
    MobileDrawerQuickLinksProps,
    MobileDrawerFooterProps,
} from "./drawer.types";
