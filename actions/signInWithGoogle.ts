'use server'

import { createClient } from '@/lib/supabase/server-client';
import { redirect } from 'next/navigation';

export async function signInWithGoogle() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `http://localhost:3000/auth/callback`,
        },
    });

    if (error) throw new Error(error.message);
    if (data?.url) redirect(data.url);
}