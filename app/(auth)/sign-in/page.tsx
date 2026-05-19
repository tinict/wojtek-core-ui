import { createClient } from "@/lib/supabase/server-client";
import AuthForm from "./_components/auth-form";

export default async function LoginPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <main className="h-screen w-screen overflow-hidden">
            <AuthForm user={user} />
        </main>
    );
}