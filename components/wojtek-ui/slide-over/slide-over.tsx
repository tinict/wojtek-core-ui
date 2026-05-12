"use client";

import React, {
    createContext,
    useContext,
    useEffect,
    type ReactNode,
} from "react";
import { X } from "lucide-react";
import { cx } from "tailwind-variants";

interface SlideOverCtx {
    open: boolean;
    side: "left" | "right";
    onClose: () => void;
}

const SlideOverContext = createContext<SlideOverCtx>({
    open: false,
    side: "right",
    onClose: () => {},
});

export interface SlideOverRootProps {
    open: boolean;
    onClose: () => void;
    side?: "left" | "right";
    width?: string;
    children: ReactNode;
    className?: string;
}

const SlideOverRoot = ({
    open,
    onClose,
    side = "right",
    width = "480px",
    children,
    className = "",
}: SlideOverRootProps) => {
    useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [open, onClose]);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    const translateOut = side === "right" ? "translate-x-full" : "-translate-x-full";

    return (
        <SlideOverContext value={{ open, side, onClose }}>
            <div
                aria-hidden="true"
                onClick={onClose}
                className={cx(
                    "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
                    open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                )}
            />
            <div
                role="dialog"
                aria-modal="true"
                data-slot="slide-over"
                style={{ width: `min(100vw, ${width})` }}
                className={cx(
                    "fixed inset-y-0 z-50 flex flex-col bg-white shadow-2xl",
                    "transition-transform duration-300 ease-in-out",
                    side === "right" ? "right-0" : "left-0",
                    open ? "translate-x-0" : translateOut,
                    "w-full md:w-auto",
                    className,
                )}
            >
                {children}
            </div>
        </SlideOverContext>
    );
};

export interface SlideOverHeaderProps {
    children: ReactNode;
    className?: string;
    showClose?: boolean;
}

const SlideOverHeader = ({
    children,
    className = "",
    showClose = true,
}: SlideOverHeaderProps) => {
    const { onClose } = useContext(SlideOverContext);
    return (
        <div
            data-slot="slide-over-header"
            className={cx(
                "flex items-center justify-between gap-3 px-5 py-4 border-b border-[#e8eaf0] shrink-0",
                className,
            )}
        >
            <div className="flex items-center gap-3 min-w-0">{children}</div>
            {showClose && (
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Đóng"
                    className="w-8 h-8 shrink-0 flex items-center justify-center rounded-lg text-[#9aa3b8] hover:bg-[#f4f6fb] hover:text-[#1a2445] transition"
                >
                    <X size={16} />
                </button>
            )}
        </div>
    );
};

export interface SlideOverTitleProps {
    children: ReactNode;
    className?: string;
}

const SlideOverTitle = ({ children, className = "" }: SlideOverTitleProps) => (
    <h2
        data-slot="slide-over-title"
        className={cx("text-[15px] font-bold text-[#1a2445] truncate", className)}
    >
        {children}
    </h2>
);

export interface SlideOverBodyProps {
    children: ReactNode;
    className?: string;
}

const SlideOverBody = ({ children, className = "" }: SlideOverBodyProps) => (
    <div
        data-slot="slide-over-body"
        className={cx("flex-1 overflow-y-auto", className)}
    >
        {children}
    </div>
);

export interface SlideOverSectionProps {
    children: ReactNode;
    className?: string;
}

const SlideOverSection = ({ children, className = "" }: SlideOverSectionProps) => (
    <div
        data-slot="slide-over-section"
        className={cx(
            "divide-y divide-[#e8eaf0] border border-[#e8eaf0] rounded-xl mx-5 my-4 overflow-hidden",
            className,
        )}
    >
        {children}
    </div>
);

export interface SlideOverRowProps {
    label: ReactNode;
    children: ReactNode;
    className?: string;
}

const SlideOverRow = ({ label, children, className = "" }: SlideOverRowProps) => (
    <div
        data-slot="slide-over-row"
        className={cx("flex items-start gap-4 px-4 py-3", className)}
    >
        <span className="text-sm text-[#6e80a8] w-36 shrink-0 pt-0.5">{label}</span>
        <span className="text-sm text-[#1a2445] min-w-0 break-all">{children}</span>
    </div>
);

export interface SlideOverFooterProps {
    children: ReactNode;
    className?: string;
}

const SlideOverFooter = ({ children, className = "" }: SlideOverFooterProps) => (
    <div
        data-slot="slide-over-footer"
        className={cx(
            "flex items-center justify-end gap-2 px-5 py-4 border-t border-[#e8eaf0] bg-[#f8f9fc] shrink-0",
            className,
        )}
    >
        {children}
    </div>
);

export const SlideOver = Object.assign(SlideOverRoot, {
    Header: SlideOverHeader,
    Title: SlideOverTitle,
    Body: SlideOverBody,
    Section: SlideOverSection,
    Row: SlideOverRow,
    Footer: SlideOverFooter,
});

export {
    SlideOverContext,
    SlideOverRoot,
    SlideOverHeader,
    SlideOverTitle,
    SlideOverBody,
    SlideOverSection,
    SlideOverRow,
    SlideOverFooter,
};

export type { SlideOverCtx };
