import type { ComponentProps } from "react";

import {
    BottomNavRoot,
    BottomNavItem,
    BottomNavIcon,
    BottomNavLabel,
    BottomNavDivider,
    BottomNavAction,
} from "./bottomTabNavigator";

export const BottomNav = Object.assign(BottomNavRoot, {
    Root: BottomNavRoot,
    Item: BottomNavItem,
    Icon: BottomNavIcon,
    Label: BottomNavLabel,
    Divider: BottomNavDivider,
    Action: BottomNavAction,
});

export type BottomNav = {
    Props: ComponentProps<typeof BottomNavRoot>;
    RootProps: ComponentProps<typeof BottomNavRoot>;
    ItemProps: ComponentProps<typeof BottomNavItem>;
    IconProps: ComponentProps<typeof BottomNavIcon>;
    LabelProps: ComponentProps<typeof BottomNavLabel>;
    DividerProps: ComponentProps<typeof BottomNavDivider>;
    ActionProps: ComponentProps<typeof BottomNavAction>;
};

export {
    BottomNavRoot,
    BottomNavItem,
    BottomNavIcon,
    BottomNavLabel,
    BottomNavDivider,
    BottomNavAction,
};

export type {
    BottomNavRootProps,
    BottomNavRootProps as BottomNavProps,
    BottomNavItemProps,
    BottomNavIconProps,
    BottomNavLabelProps,
    BottomNavDividerProps,
    BottomNavActionProps,
} from "./bottomTabNavigator";

export { useIsMobileOrTablet } from "./bottomTabNavigator";
