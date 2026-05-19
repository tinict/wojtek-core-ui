import Navbar from "../_components/navbar";
import DashboardClient from "../_components/dashboard-client";
import { createClient } from "@/lib/supabase/server-client";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div className="flex flex-col h-screen w-full overflow-hidden">
            <Navbar user={user} />
            <DashboardClient>{children}</DashboardClient>
        </div>
    );
}