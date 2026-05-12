import Dashboard from "@/app/(dashboard)/_layouts/dashboard";

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