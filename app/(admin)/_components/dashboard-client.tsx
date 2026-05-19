"use client";

import { useDetectMobile } from "@/hooks/use-detect-mobile";
import { useState } from "react";
import SubNavbar from "../_components/sub-navbar";
import Sidebar from "../_components/sidebar";
import MobileSlidebar from "../_components/mobile-slidebar";
import { NAV_ITEMS } from "@/config/nav-items";

export default function DashboardClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const isMobile = useDetectMobile();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleToggle = () => {
        if (isMobile) {
            setMobileOpen((prev) => !prev);
        } else {
            setSidebarCollapsed((prev) => !prev);
        }
    };

    return (
        <>
            <SubNavbar onToggle={handleToggle} />
            <div className="flex flex-1 min-h-0 overflow-hidden">
                <Sidebar collapsed={sidebarCollapsed} navItems={NAV_ITEMS} />
                <div className="lg:hidden">
                    <MobileSlidebar
                        open={mobileOpen}
                        onClose={() => setMobileOpen(false)}
                        navItems={NAV_ITEMS}
                    />
                </div>
                {children}
            </div>
        </>
    );
}