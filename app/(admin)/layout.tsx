import Dashboard from "@/app/(admin)/_layouts/dashboard-layout";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Dashboard>
            <main className="flex-1 overflow-y-auto bg-[#f4f6fb]">
                {children}
            </main>
        </Dashboard>
    );
}