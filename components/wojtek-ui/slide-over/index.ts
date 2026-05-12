import type { ComponentProps } from "react";

import {
    SlideOverRoot,
    SlideOverHeader,
    SlideOverTitle,
    SlideOverBody,
    SlideOverSection,
    SlideOverRow,
    SlideOverFooter,
} from "./slide-over";

export const SlideOver = Object.assign(SlideOverRoot, {
    Root: SlideOverRoot,
    Header: SlideOverHeader,
    Title: SlideOverTitle,
    Body: SlideOverBody,
    Section: SlideOverSection,
    Row: SlideOverRow,
    Footer: SlideOverFooter,
});

export type SlideOver = {
    Props: ComponentProps<typeof SlideOverRoot>;
    RootProps: ComponentProps<typeof SlideOverRoot>;
    HeaderProps: ComponentProps<typeof SlideOverHeader>;
    TitleProps: ComponentProps<typeof SlideOverTitle>;
    BodyProps: ComponentProps<typeof SlideOverBody>;
    SectionProps: ComponentProps<typeof SlideOverSection>;
    RowProps: ComponentProps<typeof SlideOverRow>;
    FooterProps: ComponentProps<typeof SlideOverFooter>;
};

export {
    SlideOverRoot,
    SlideOverHeader,
    SlideOverTitle,
    SlideOverBody,
    SlideOverSection,
    SlideOverRow,
    SlideOverFooter,
};

export type {
    SlideOverRootProps,
    SlideOverRootProps as SlideOverProps,
    SlideOverHeaderProps,
    SlideOverTitleProps,
    SlideOverBodyProps,
    SlideOverSectionProps,
    SlideOverRowProps,
    SlideOverFooterProps,
} from "./slide-over";