"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/browser-client";
import { useEffect, useState } from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { signOut } from "@/actions/signOut";
import { User } from "lucide-react";

const supabase = createClient();

type AuthLoginProps = {
    user: SupabaseUser | null;
};

export default function Navbar({ user }: AuthLoginProps) {
    const [currentUser, setCurrentUser] = useState<SupabaseUser | null>(user);

    async function handleSignOut() {
        await signOut();
        setCurrentUser(null);
    };

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setCurrentUser(session?.user ?? null);
            },
        );

        return () => {
            listener?.subscription.unsubscribe();
        };
    }, []);

    const displayName =
        currentUser?.user_metadata?.full_name ?? currentUser?.email;

    return (
        <header className="flex items-center justify-between px-4 h-12 bg-[#1a2445] shrink-0 w-full z-20">
            <div className="flex items-center gap-2">
                <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                    <polygon
                        points="14,2 25,8 25,20 14,26 3,20 3,8"
                        fill="none"
                        stroke="#f5a623"
                        strokeWidth="2"
                    />
                    <polygon
                        points="14,7 20,10.5 20,17.5 14,21 8,17.5 8,10.5"
                        fill="#f5a623"
                    />
                </svg>
                <span className="text-white font-bold text-[14px] tracking-wide">
                    WOJTEK
                </span>
            </div>

            <div className="flex items-center gap-1">
                <div className="w-px h-5 bg-white/20 mx-1" />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-1.5 px-2 py-1 rounded-md text-white hover:bg-white/10 transition outline-none">
                            <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center text-[#8fa3c8]">
                                <User size={14} />
                            </div>
                            <span className="text-[13px] font-medium max-w-[160px] truncate">
                                {displayName}
                            </span>
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="end"
                        className="w-56 bg-[#F5F5F5] border-black/8 text-[#1a2445]"
                    >
                        <DropdownMenuItem
                            className="text-red-500 focus:bg-red-500/10 focus:text-red-500 cursor-pointer"
                            onClick={handleSignOut}
                        >
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
