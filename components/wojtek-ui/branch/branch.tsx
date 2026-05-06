"use client";
import { dom } from "@/utils/dom";
import { DOMRenderProps } from "@heroui/react";
import React, { createContext, useContext, type ReactNode } from "react";
import { Group as GroupPrimitive } from "react-aria-components/Group";
import type { ComponentPropsWithRef } from "react";
import { composeTwRenderProps } from "@/utils/compose";
import { Avatar } from "@heroui/react";

/**
 * Branch Context
 */
const BranchContext = createContext<any>({});

interface BranchRootProps<
    E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
    children: ReactNode;
    className?: string;
}

const BranchRoot = <E extends keyof React.JSX.IntrinsicElements = "div">({
    children,
    className,
    ...props
}: BranchRootProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof BranchRootProps<E>>) => {
    const branchChildren = React.useMemo(() => {
        if (typeof children === "string" || typeof children === "number") {
            return <BranchLabel>{children}</BranchLabel>;
        }

        return children;
    }, [children]);

    return (
        <BranchContext value={{}}>
            <dom.div
                {...(props as any)}
                className={className}
                data-slot="branch"
            >
                {branchChildren}
            </dom.div>
        </BranchContext>
    );
};

/**
 * Branch Image
 */
interface BranchImageProps<
    E extends keyof React.JSX.IntrinsicElements = "img",
> extends DOMRenderProps<E, undefined> {
    className?: string;
}

const BranchImage = <E extends keyof React.JSX.IntrinsicElements = "img">({
    className,
    ...props
}: BranchImageProps<E> & Omit<React.JSX.IntrinsicElements[E], keyof BranchImageProps<E>>) => {

    return (
        <dom.img
            className={className}
            data-slot="branch-image"
            {...(props as any)}
        />
    );
};


/**
 * Branch Group
 */

interface BranchGroupProps extends ComponentPropsWithRef<
    typeof GroupPrimitive
> {}

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
                    {typeof children === "function"
                        ? children(values)
                        : children}
                </>
            )}
        </GroupPrimitive>
    );
};

/**
 * Branch Logo
 */

interface BranchLogoProps extends ComponentPropsWithRef<typeof Avatar.Image> {
    children?: React.ReactNode;
    className?: string;
    customLogo?: ComponentPropsWithRef<typeof Avatar>;
};

const BranchLogo = ({
  children,
  className,
  ...props
}: BranchLogoProps) => {

  if (children && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{
        className?: string;
        "data-slot"?: string;
      }>,
      {
        ...props,
        className: className,
        "data-slot": "branch-logo",
      },
    );
  }

  return (
    <Avatar
        {...props.customLogo}
    >
        <Avatar.Image
          className={className}
          data-slot="branch-logo"
          {...props}
        />
    </Avatar>
  );
};


/**
 * Branch Label
 */
interface BranchLabelProps<
    E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
    children?: ReactNode;
    className?: string;
}

const BranchLabel = <E extends keyof React.JSX.IntrinsicElements = "span">({
    children,
    className,
    ...props
}: BranchLabelProps<E> &
    Omit<React.JSX.IntrinsicElements[E], keyof BranchLabelProps<E>>) => {
    return (
        <dom.span
            className={className}
            data-slot="branch-label"
            {...(props as any)}
        >
            {children}
        </dom.span>
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
    BranchImage
};
export type { 
    BranchRootProps, 
    BranchLabelProps, 
    BranchGroupProps, 
    BranchLogoProps,
    BranchImageProps
};
