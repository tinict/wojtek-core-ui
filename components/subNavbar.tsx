"use client";

import { useState, useEffect } from "react";
import { Link, SearchField } from "@heroui/react";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { Logo } from "@/components/icons";
import { Button } from "@heroui/react";
import { Branch } from "./wojtek-ui/branch";
import { Size } from "react-aria-components";

export const SubNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const searchInput = (
        <SearchField
            name="search"
            aria-label="Tìm kiếm dịch vụ"
            className="w-[340px]"
        >
            <SearchField.Group className="rounded-full border border-gray-200 bg-gray-50 hover:border-[#0d9bac] transition-colors h-10 px-2">
                <SearchField.SearchIcon className="text-gray-400" />
                <SearchField.Input
                    className="text-sm text-gray-700 placeholder:text-gray-400"
                    placeholder="Tìm kiếm dịch vụ..."
                />
                <SearchField.ClearButton />
            </SearchField.Group>
        </SearchField>
    );

    return (
        <nav
            className={clsx(
                "sticky top-0 z-50 w-full bg-white transition-shadow duration-300 border-b border-gray-100",
                scrolled ? "shadow-md" : "shadow-sm",
            )}
        >
            <header className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-6 px-6">
                <NextLink href="/">
                    <Branch className="flex items-center gap-2 shrink-0">
                        <Branch.Group className="flex items-center gap-2">
                            <Branch.Logo
                                customlogo={{
                                    size: "lg",
                                    className: "bg-[#FFFFFF]",
                                }}
                                src={"logo_bv1.webp"}
                            />
                            <Branch.Label className="font-bold lg:text-lg md:text-base text-sm text-primary tracking-tight uppercase">
                                {siteConfig.name}
                            </Branch.Label>
                        </Branch.Group>
                    </Branch>
                </NextLink>

                <div className="hidden lg:flex flex-1 justify-center">
                    {searchInput}
                </div>

                <div className="hidden sm:flex items-center gap-3 shrink-0">
                    <Button
                        variant="primary"
                        size="sm"
                        className="text-sm font-semibold rounded-full px-5 bg-primary hover:bg-[#0b8a99]"
                        onPress={() => console.log("Đặt lịch")}
                    >
                        Đăng nhập
                    </Button>
                </div>
            </header>

            <div
                className={clsx(
                    "sm:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-gray-100",
                    isMenuOpen
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0",
                )}
            >
                <div className="px-6 pt-4 pb-2">
                    <SearchField
                        name="search-mobile"
                        aria-label="Tìm kiếm dịch vụ"
                        fullWidth
                    >
                        <SearchField.Group className="rounded-full border border-gray-200 bg-gray-50 h-10 px-2 w-full">
                            <SearchField.SearchIcon className="text-gray-400" />
                            <SearchField.Input
                                className="text-sm text-gray-700 placeholder:text-gray-400"
                                placeholder="Tìm kiếm dịch vụ..."
                            />
                            <SearchField.ClearButton />
                        </SearchField.Group>
                    </SearchField>
                </div>

                <ul className="flex flex-col px-6 pb-4 gap-1">
                    {siteConfig.navMenuItems.map((item, index) => (
                        <li key={`${item.label}-${index}`}>
                            <Link
                                href="#"
                                className={clsx(
                                    "block py-2.5 px-3 rounded-xl text-sm font-medium no-underline transition-colors hover:bg-gray-50",
                                    index === 2
                                        ? "text-[#0d9bac]"
                                        : index ===
                                            siteConfig.navMenuItems.length - 1
                                          ? "text-danger"
                                          : "text-foreground",
                                )}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex flex-col gap-2 px-6 pb-5">
                    <Button
                        variant="outline"
                        fullWidth
                        className="rounded-full text-sm font-medium"
                    >
                        Hướng dẫn thăm khám
                    </Button>
                    <Button
                        variant="primary"
                        fullWidth
                        className="rounded-full text-sm font-semibold bg-[#0d9bac] hover:bg-[#0b8a99]"
                    >
                        Đặt lịch ngay
                    </Button>
                </div>
            </div>
        </nav>
    );
};
