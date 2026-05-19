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
    Truck,
    type LucideIcon,
} from "lucide-react";

export type NavItem = {
    icon: LucideIcon;
    label: string;
    href: string;
};

export const NAV_ITEMS: NavItem[] = [
    { 
        icon: LayoutDashboard, 
        label: "Bảng điều khiển", 
        href: "/admin" 
    },
    {
        icon: ClipboardList,
        label: "Nhiệm vụ cá nhân",
        href: "/admin/checklists",
    },
    { icon: ClipboardList, label: "Yêu cầu", href: "/admin/asset-maintenance" },
    {
        icon: Hospital,
        label: "Thiết bị khoa phòng",
        href: "/admin/device-handovers",
    },
    { icon: MapPinned, label: "Danh mục khu vực", href: "/admin/areas" },
    { icon: Building2, label: "Danh mục đơn vị", href: "/admin/units" },
    {
        icon: Shapes,
        label: "Phân loại thiết bị",
        href: "/admin/device-categories",
    },
    { icon: Shapes, label: "Nhà sản xuất", href: "/admin/manufacturers" },
    { icon: Truck, label: "Nhà cung cấp", href: "/admin/suppliers" },
    { icon: MonitorSmartphone, label: "Thiết bị", href: "/admin/devices" },
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
