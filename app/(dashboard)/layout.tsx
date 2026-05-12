import { useState } from "react";
import { User } from "lucide-react";

import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import SubNavbar from "./_components/sub-navbar";
import MobileSlidebar from "./_components/mobile-slidebar";

import { useDetectMobile } from "@/hooks/use-detect-mobile";

const NAV_ITEMS = [
    {
        icon: User,
        label: "Trang chủ",
        href: "/dashboard",
    },
    {
        icon: User,
        label: "Danh mục đơn vị",
        href: "/dashboard/units",
    },
];

export default function DashboardLayout({
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
            return;
        }

        setSidebarCollapsed((prev) => !prev);
    };

    return (
        <div className="flex flex-col h-screen w-full overflow-hidden">
            <Navbar />

            <SubNavbar onToggle={handleToggle} />

            <div className="flex flex-1 min-h-0 overflow-hidden">
                <Sidebar
                    collapsed={sidebarCollapsed}
                    navItems={NAV_ITEMS}
                />

                <div className="lg:hidden">
                    <MobileSlidebar
                        open={mobileOpen}
                        onClose={() => setMobileOpen(false)}
                        navItems={NAV_ITEMS}
                    />
                </div>

                <main className="flex-1 overflow-y-auto bg-[#f4f6fb]">
                    {children}
                </main>
            </div>
        </div>
    );
}