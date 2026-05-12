"use client";

import React, { createContext, useContext, type ReactNode } from "react";
import { Group as GroupPrimitive } from "react-aria-components/Group";
import type { ComponentPropsWithRef } from "react";
import { composeTwRenderProps } from "@/utils/compose";

/**
 * Branch Context
 */
const BranchContext = createContext<any>({});

/**
 * Branch Root
 */
interface BranchRootProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}

const BranchRoot = ({ children, className, ...props }: BranchRootProps) => {
    const branchChildren = React.useMemo(() => {
        if (typeof children === "string" || typeof children === "number") {
            return <BranchLabel>{children}</BranchLabel>;
        }
        return children;
    }, [children]);

    return (
        <BranchContext value={{}}>
            <div
                {...props}
                className={className}
                data-slot="branch"
            >
                {branchChildren}
            </div>
        </BranchContext>
    );
};

/**
 * Branch Image
 */
interface BranchImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
}

const BranchImage = ({ className, ...props }: BranchImageProps) => {
    return (
        <img
            className={className}
            data-slot="branch-image"
            {...props}
        />
    );
};

/**
 * Branch Group
 */
interface BranchGroupProps extends ComponentPropsWithRef<typeof GroupPrimitive> {}

const BranchGroup = ({ children, className, ...props }: BranchGroupProps) => {
    const { slots } = useContext(BranchContext);

    return (
        <GroupPrimitive
            className={composeTwRenderProps(className, slots?.group())}
            data-slot="branch-group"
            {...props}
        >
            {(values) => (
                <>
                    {typeof children === "function" ? children(values) : children}
                </>
            )}
        </GroupPrimitive>
    );
};

/**
 * Branch Logo
 */
interface BranchLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    children?: React.ReactNode;
    className?: string;
}

const BranchLogo = ({ children, className, src, alt = "logo", ...props }: BranchLogoProps) => {
    if (children && React.isValidElement(children)) {
        return React.cloneElement(
            children as React.ReactElement<{
                className?: string;
                "data-slot"?: string;
            }>,
            { className, "data-slot": "branch-logo" },
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            data-slot="branch-logo"
            {...props}
        />
    );
};

/**
 * Branch Label
 */
interface BranchLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
    children?: ReactNode;
    className?: string;
}

const BranchLabel = ({ children, className, ...props }: BranchLabelProps) => {
    return (
        <span
            className={className}
            data-slot="branch-label"
            {...props}
        >
            {children}
        </span>
    );
};

/**
 * Exports
 */
export {
    BranchRoot,
    BranchLabel,
    BranchGroup,
    BranchLogo,
    BranchImage,
};
export type {
    BranchRootProps,
    BranchLabelProps,
    BranchGroupProps,
    BranchLogoProps,
    BranchImageProps,
};