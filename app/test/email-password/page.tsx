import { createClient } from "@/lib/supabase/server-client";
import EmailPasswordDemo from "./email-password";


export default async function EmailPasswordPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log( { user });
  return <EmailPasswordDemo user={user} />;
}