"use client";

import { useDetectMobile } from "@/hooks/use-detect-mobile";
import { useState } from "react";
import Navbar from "../_components/navbar";
import SubNavbar from "../_components/sub-navbar";
import Sidebar from "../_components/sidebar";
import MobileSlidebar from "../_components/mobile-slidebar";
import { 
  Building2, 
  ClipboardList, 
  Hospital, 
  LayoutDashboard, 
  MapPinned, 
  MessageSquareWarning, 
  MonitorSmartphone, 
  PackageSearch, 
  QrCode, 
  Shapes, 
  ShieldAlert, 
  Truck 
} from "lucide-react";

const NAV_ITEMS = [
  {
    icon: LayoutDashboard,
    label: "Bảng điều khiển",
    href: "/admin",
  },
  {
    icon: ClipboardList,
    label: "Nhiệm vụ cá nhân",
    href: "/admin/checklists",
  },
  {
    icon: ClipboardList,
    label: "Yêu cầu",
    href: "/admin/asset-maintenance",
  },
  {
    icon: Hospital,
    label: "Thiết bị khoa phòng",
    href: "/admin/device-handovers",
  },
  {
    icon: MapPinned,
    label: "Danh mục khu vực",
    href: "/admin/areas",
  },
  {
    icon: Building2,
    label: "Danh mục đơn vị",
    href: "/admin/units",
  },
  {
    icon: Shapes,
    label: "Phân loại thiết bị",
    href: "/admin/device-categories",
  },
  {
    icon: Shapes,
    label: "Nhà sản xuất",
    href: "/admin/manufacturers",
  },
  {
    icon: Truck,
    label: "Nhà cung cấp",
    href: "/admin/suppliers",
  },
  {
    icon: MonitorSmartphone,
    label: "Thiết bị",
    href: "/admin/devices",
  },
  {
    icon: ClipboardList,
    label: "Phân loại yêu cầu",
    href: "/admin/report-types",
  },
  {
    icon: MessageSquareWarning,
    label: "Chủ đề yêu cầu",
    href: "/admin/report-subjects",
  },
  {
    icon: PackageSearch,
    label: "Nguồn tài sản",
    href: "/admin/asset-sources",
  },
  {
    icon: ShieldAlert,
    label: "Phân loại rủi ro",
    href: "/admin/risk-levels",
  },
  {
    icon: QrCode,
    label: "Phân loại QR code",
    href: "/admin/barcode-formats",
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
