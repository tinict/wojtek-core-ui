import type { ComponentProps } from "react";

import {
    BranchGroup, 
    BranchImage, 
    BranchLabel, 
    BranchLogo, 
    BranchRoot
} from "./branch";

/**
 * Branch Component
 */
export const Branch = Object.assign(BranchRoot, {
    Root: BranchRoot,
    Label: BranchLabel,
    Group: BranchGroup,
    Logo: BranchLogo,
    Image: BranchImage
});

export type Branch = {
    Props: ComponentProps<typeof BranchRoot>;
    RootProps: ComponentProps<typeof BranchRoot>;
    BranchLabelProps: ComponentProps<typeof BranchLabel>;
    BranchGroupProps: ComponentProps<typeof BranchGroup>;
    BranchLogoProps: ComponentProps<typeof BranchLogo>;
    BranchImageProps: ComponentProps<typeof BranchImage>;
};

/**
 * Named Component
 */
export { 
    BranchRoot, 
    BranchLabel, 
    BranchGroup,
    BranchLogo,
    BranchImage
};
export type {
    BranchRootProps,
    BranchRootProps as BranchProps,
    BranchLabelProps,
    BranchGroupProps,
    BranchLogoProps,
    BranchImageProps
} from "./branch";
