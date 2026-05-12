"use client";

import { dom } from "@/utils/dom";
import { DOMRenderProps } from "@heroui/react";
import { Badge } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";

type BottomNavSize = "sm" | "md" | "lg";
type BottomNavVariant = "default" | "floating" | "inset";
type RouteMatchStrategy = "exact" | "prefix";

interface RouteEntry {
  navKey: string;
  href: string;
  routeMatch: RouteMatchStrategy;
}

interface BottomNavContextValue {
  activeKey: string;
  setActiveKey: (key: string) => void;
  size: BottomNavSize;
  variant: BottomNavVariant;
  labeled: boolean;
  registerRoute: (entry: RouteEntry) => void;
  unregisterRoute: (navKey: string) => void;
}

const BottomNavContext = createContext<BottomNavContextValue>({
  activeKey: "",
  setActiveKey: () => {},
  size: "md",
  variant: "default",
  labeled: true,
  registerRoute: () => {},
  unregisterRoute: () => {},
});

function useIsMobileOrTablet(): boolean {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    setIsMobileOrTablet(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobileOrTablet(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isMobileOrTablet;
}

function matchRoute(
  pathname: string,
  href: string,
  strategy: RouteMatchStrategy
): boolean {
  if (strategy === "exact") return pathname === href;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function useRouteVisible(
  routes: string[] | undefined,
  strategy: RouteMatchStrategy
): boolean {
  const pathname = usePathname();
  if (!routes || routes.length === 0) return true;
  return routes.some((r) => matchRoute(pathname, r, strategy));
}

interface BottomNavRootProps<
  E extends keyof React.JSX.IntrinsicElements = "nav",
> extends DOMRenderProps<E, undefined> {
  children: ReactNode;
  className?: string;
  activeKey?: string;
  defaultActiveKey?: string;
  onActiveChange?: (key: string) => void;
  size?: BottomNavSize;
  variant?: BottomNavVariant;
  labeled?: boolean;
  forceVisible?: boolean;
  routes?: string[];
  routeMatch?: RouteMatchStrategy;
}

const BottomNavRoot = <E extends keyof React.JSX.IntrinsicElements = "nav">({
  children,
  className,
  activeKey: controlledKey,
  defaultActiveKey = "",
  onActiveChange,
  size = "md",
  variant = "default",
  labeled = true,
  forceVisible = false,
  routes,
  routeMatch = "prefix",
  ...props
}: BottomNavRootProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof BottomNavRootProps<E>>) => {
  const pathname = usePathname();
  const isMobileOrTablet = useIsMobileOrTablet();
  const isRouteVisible = useRouteVisible(routes, routeMatch);

  const isVisible = (forceVisible || isMobileOrTablet) && isRouteVisible;

  const [routeRegistry, setRouteRegistry] = useState<Record<string, RouteEntry>>({});

  const registerRoute = useCallback((entry: RouteEntry) => {
    setRouteRegistry((prev) => ({ ...prev, [entry.navKey]: entry }));
  }, []);

  const unregisterRoute = useCallback((navKey: string) => {
    setRouteRegistry((prev) => {
      const next = { ...prev };
      delete next[navKey];
      return next;
    });
  }, []);

  const derivedKey = useMemo(() => {
    let best: RouteEntry | null = null;
    const entries = Object.values(routeRegistry);
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      if (matchRoute(pathname, entry.href, entry.routeMatch)) {
        if (!best || entry.href.length > best.href.length) {
          best = entry;
        }
      }
    }
    return best?.navKey ?? "";
  }, [pathname, routeRegistry]);

  const [internalKey, setInternalKey] = useState(defaultActiveKey);

  const activeKey = controlledKey ?? (derivedKey !== "" ? derivedKey : internalKey);

  const prevDerivedRef = React.useRef("");
  useEffect(() => {
    if (derivedKey && derivedKey !== prevDerivedRef.current) {
      prevDerivedRef.current = derivedKey;
      onActiveChange?.(derivedKey);
    }
  }, [derivedKey, onActiveChange]);

  const setActiveKey = useCallback(
    (key: string) => {
      if (controlledKey === undefined) setInternalKey(key);
      onActiveChange?.(key);
    },
    [controlledKey, onActiveChange]
  );

  if (!isVisible) return null;

  const variantStyles: Record<BottomNavVariant, string> = {
    default:
      "fixed bottom-0 left-0 right-0 z-50 border-t border-default-200/60 bg-background/95 backdrop-blur-xl shadow-2xl shadow-black/10",
    floating:
      "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-full border border-default-200/60 bg-background/95 backdrop-blur-xl shadow-2xl shadow-black/20 w-auto px-2",
    inset:
      "fixed bottom-4 left-4 right-4 z-50 rounded-2xl border border-default-200/60 bg-background/95 backdrop-blur-xl shadow-2xl shadow-black/15",
  };

  return (
    <BottomNavContext
      value={{
        activeKey,
        setActiveKey,
        size,
        variant,
        labeled,
        registerRoute,
        unregisterRoute,
      }}
    >
      <dom.nav
        {...(props as any)}
        data-slot="bottom-nav"
        data-variant={variant}
        className={[variantStyles[variant], className].filter(Boolean).join(" ")}
      >
        <div
          data-slot="bottom-nav-inner"
          className="flex items-center justify-around px-2 pt-2"
          style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
        >
          {children}
        </div>
      </dom.nav>
    </BottomNavContext>
  );
};

interface BottomNavItemProps<
  E extends keyof React.JSX.IntrinsicElements = "button",
> extends DOMRenderProps<E, undefined> {
  navKey: string;
  children?: ReactNode;
  className?: string;
  href?: string;
  routeMatch?: RouteMatchStrategy;
  onPress?: () => void;
  badge?: string | number;
  isDisabled?: boolean;
}

const BottomNavItem = <E extends keyof React.JSX.IntrinsicElements = "button">({
  navKey,
  children,
  className,
  href,
  routeMatch = "prefix",
  onPress,
  badge,
  isDisabled = false,
  ...props
}: BottomNavItemProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof BottomNavItemProps<E>>) => {
  const { activeKey, setActiveKey, size, labeled, registerRoute, unregisterRoute } =
    useContext(BottomNavContext);
  const router = useRouter();
  const isActive = activeKey === navKey;

  useEffect(() => {
    if (!href) return;
    registerRoute({ navKey, href, routeMatch });
    return () => unregisterRoute(navKey);
  }, [navKey, href, routeMatch, registerRoute, unregisterRoute]);

  const handlePress = () => {
    if (isDisabled) return;
    setActiveKey(navKey);
    onPress?.();
    if (href) router.push(href);
  };

  const childArray = React.Children.toArray(children);
  const iconChild = childArray.find(
    (c) =>
      React.isValidElement(c) &&
      (c.type as any)?.displayName === "BottomNavIcon"
  );
  const labelChild = childArray.find(
    (c) =>
      React.isValidElement(c) &&
      (c.type as any)?.displayName === "BottomNavLabel"
  );

  const sizeStyles: Record<BottomNavSize, string> = {
    sm: "min-h-[50px] gap-0.5",
    md: "min-h-[60px] gap-1",
    lg: "min-h-[68px] gap-1.5",
  };

  return (
    <dom.button
      {...(props as any)}
      data-slot="bottom-nav-item"
      data-active={isActive}
      data-disabled={isDisabled}
      onClick={handlePress}
      aria-current={isActive ? "page" : undefined}
      disabled={isDisabled}
      className={[
        "relative flex flex-1 flex-col items-center justify-center px-2 transition-all duration-300 select-none",
        "touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-xl",
        sizeStyles[size],
        isActive
          ? "text-primary font-bold"
          : "text-default-400 hover:text-default-600 hover:bg-white/5",
        isDisabled
          ? "opacity-40 cursor-not-allowed"
          : "cursor-pointer hover:scale-105 active:scale-95",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {badge !== undefined ? (
        <Badge
          content={String(badge)}
          color="danger"
          size="sm"
          className="text-[9px] font-mono"
        >
          {iconChild}
        </Badge>
      ) : (
        iconChild
      )}

      {labeled && labelChild}
    </dom.button>
  );
};

interface BottomNavIconProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const BottomNavIcon = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: BottomNavIconProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof BottomNavIconProps<E>>) => {
  return (
    <dom.span
      {...(props as any)}
      data-slot="bottom-nav-icon"
      className={[
        "relative flex items-center justify-center transition-all duration-300",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </dom.span>
  );
};
(BottomNavIcon as any).displayName = "BottomNavIcon";

interface BottomNavLabelProps<
  E extends keyof React.JSX.IntrinsicElements = "span",
> extends DOMRenderProps<E, undefined> {
  children?: ReactNode;
  className?: string;
}

const BottomNavLabel = <E extends keyof React.JSX.IntrinsicElements = "span">({
  children,
  className,
  ...props
}: BottomNavLabelProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof BottomNavLabelProps<E>>) => {
  const { size } = useContext(BottomNavContext);

  const sizeText: Record<BottomNavSize, string> = {
    sm: "text-[9px]",
    md: "text-[10px]",
    lg: "text-[11px]",
  };

  return (
    <dom.span
      {...(props as any)}
      data-slot="bottom-nav-label"
      className={[
        `${sizeText[size]} font-semibold leading-none mt-1 transition-all duration-300 tracking-wide`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </dom.span>
  );
};
(BottomNavLabel as any).displayName = "BottomNavLabel";

interface BottomNavDividerProps<
  E extends keyof React.JSX.IntrinsicElements = "div",
> extends DOMRenderProps<E, undefined> {
  className?: string;
}

const BottomNavDivider = <E extends keyof React.JSX.IntrinsicElements = "div">({
  className,
  ...props
}: BottomNavDividerProps<E> &
  Omit<React.JSX.IntrinsicElements[E], keyof BottomNavDividerProps<E>>) => {
  return (
    <dom.div
      {...(props as any)}
      data-slot="bottom-nav-divider"
      className={[
        "w-px self-stretch my-3 bg-gradient-to-b from-white/20 via-white/5 to-white/10",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
};

interface BottomNavActionProps {
  children?: ReactNode;
  className?: string;
  onPress?: () => void;
  href?: string;
  "aria-label"?: string;
}

const BottomNavAction = ({
  children,
  className,
  onPress,
  href,
  "aria-label": ariaLabel = "Action",
}: BottomNavActionProps) => {
  const router = useRouter();

  const handlePress = () => {
    onPress?.();
    if (href) router.push(href);
  };

  return (
    <div
      data-slot="bottom-nav-action"
      className="flex flex-1 flex-col items-center justify-center"
    >
      <button
        onClick={handlePress}
        aria-label={ariaLabel}
        className={[
          "relative flex h-14 w-14 items-center justify-center rounded-full",
          "bg-gradient-to-br from-primary to-primary/90 text-white",
          "shadow-2xl shadow-primary/40 hover:shadow-primary/60",
          "transition-all duration-300 hover:scale-110 active:scale-95",
          "outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "-mt-6",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </button>
    </div>
  );
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
  BottomNavItemProps,
  BottomNavIconProps,
  BottomNavLabelProps,
  BottomNavDividerProps,
  BottomNavActionProps,
  RouteMatchStrategy,
};

export { useIsMobileOrTablet };
