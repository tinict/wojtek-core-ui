import type { NavMenuData, NavHrefs } from "@/types/type";
import { MegaMenuPanelQuickLink } from "@/components/wojtek-ui/mega-menu-panel/mega-menu-panel.types";

export const defaultMenuData: NavMenuData = {
    "Trang chủ": null,
    "Phản ánh kiến nghị": null,
    "Tra cứu kết quả trả lời": null,
    "Quy trình tiếp nhận xử lý": null,
};

// Map label → href cho các item không có mega menu
export const navHrefs: NavHrefs = {
    "Trang chủ": "/",
    "Phản ánh kiến nghị": "/pakn-gui-pakn",
    "Tra cứu kết quả trả lời": "/phan-anh-hien-truong",
    "Quy trình tiếp nhận xử lý": "#",
};

export const defaultQuickLinks: MegaMenuPanelQuickLink[] = [
    { label: "Trang chủ", href: "/" },
    { label: "Phản ánh kiến nghị", href: "/pakn-gui-pakn" },
    { label: "Tra cứu kết quả trả lời", href: "/phan-anh-hien-truong" },
    { label: "Quy trình tiếp nhận xử lý", href: "#" },
];