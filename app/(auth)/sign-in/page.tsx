import AuthForm from "@/app/test/email-password/email-password";
import { createClient } from "@/lib/supabase/server-client";

export default async function LoginPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <main className="h-screen w-screen overflow-hidden">
            <AuthForm user={user} />
        </main>
    );
}