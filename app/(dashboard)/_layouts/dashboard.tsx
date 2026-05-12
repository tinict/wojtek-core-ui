"use client";

import { useDetectMobile } from "@/hooks/use-detect-mobile";
import { useState } from "react";
import Navbar from "../_components/navbar";
import SubNavbar from "../_components/sub-navbar";
import Sidebar from "../_components/sidebar";
import MobileSlidebar from "../_components/mobile-slidebar";
import { User } from "lucide-react";

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

export default function Dashboard({
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
    </div>
  );
}
