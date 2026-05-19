import {
    Building2, ClipboardList, Hospital, LayoutDashboard,
    MapPinned, MessageSquareWarning, MonitorSmartphone,
    PackageSearch, QrCode, Shapes, ShieldAlert, Truck,
} from "lucide-react";
import { LucideProps } from "lucide-react";

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
    LayoutDashboard,
    ClipboardList,
    Hospital,
    MapPinned,
    Building2,
    Shapes,
    Truck,
    MonitorSmartphone,
    MessageSquareWarning,
    PackageSearch,
    ShieldAlert,
    QrCode,
};

export function NavIcon({ name, ...props }: { name: string } & LucideProps) {
    const Icon = iconMap[name];
    if (!Icon) return null;
    return <Icon {...props} />;
}