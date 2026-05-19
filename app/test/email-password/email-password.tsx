"use client";

import { signInWithGoogle } from "@/actions/signInWithGoogle";
import { signOut } from "@/actions/signOut";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/browser-client";
import { User } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

type Mode = "signup" | "signin";

export default function AuthForm({ user }: { user: User | null }) {
    const [mode, setMode] = useState<Mode>("signin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState<{ msg: string; type: "success" | "error" } | null>(null);
    const supabase = createClient();
    const [currentUser, setCurrentUser] = useState<User | null>(user);

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
            setCurrentUser(session?.user ?? null);
        });
        return () => listener?.subscription.unsubscribe();
    }, [supabase]);

    function switchMode(m: Mode) {
        setMode(m);
        setStatus(null);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus(null);

        if (mode === "signup") {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: { emailRedirectTo: `${window.location.origin}/welcome` },
            });
            setStatus(
                error
                    ? { msg: error.message, type: "error" }
                    : { msg: "Kiểm tra hộp thư để xác nhận tài khoản.", type: "success" }
            );
        } else {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) setStatus({ msg: error.message, type: "error" });
        }
    }

    return (
        <div className="grid h-screen w-screen grid-cols-1 md:grid-cols-2">
            <div className="hidden flex-col justify-between bg-[#1a1f2e] px-12 py-14 md:flex">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#4f7eff]">
                        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="text-[15px] font-medium text-white">
                        WOJEK VIỆT NAM
                    </span>
                </div>

                <div className="space-y-5">
                    <h1 className="text-[28px] font-medium leading-snug tracking-tight text-white">
                        Quản lý yêu cầu phản ánh
                    </h1>
                    <p className="max-w-[300px] text-sm leading-relaxed text-[#8892a4]">
                        Quản lý công việc, cộng tác theo thời gian thực và ra quyết định nhanh hơn.
                    </p>
                </div>

                <p className="text-xs text-[#3d4455]">© 2026 Acme Inc.</p>
            </div>

            {/* Cột phải */}
            <div className="flex items-center justify-center bg-[#f8f9fc] px-8 py-12">
                <div className="w-full max-w-[380px]">

                    {currentUser ? (
                        <div className="space-y-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eff4ff]">
                                <svg className="h-6 w-6 text-[#4f7eff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[15px] font-medium text-[#111827]">{currentUser.email}</p>
                                <p className="text-sm text-[#6b7280]">Đã đăng nhập thành công</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => signOut()}
                                className="inline-flex items-center gap-2 rounded-[10px] border border-red-200 px-5 py-2 text-[13px] font-medium text-red-600 transition-colors hover:bg-red-50"
                            >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Đăng xuất
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="mb-7 flex gap-1 rounded-[11px] bg-[#eceef2] p-1">
                                {(["signup", "signin"] as Mode[]).map((m) => (
                                    <button
                                        key={m}
                                        type="button"
                                        onClick={() => switchMode(m)}
                                        className={[
                                            "flex-1 rounded-[8px] py-2 text-[13px] font-medium transition-all",
                                            mode === m
                                                ? "border border-[#e0e2e7] bg-white text-[#111827]"
                                                : "text-[#6b7280]",
                                        ].join(" ")}
                                    >
                                        {m === "signup" ? "Đăng ký" : "Đăng nhập"}
                                    </button>
                                ))}
                            </div>

                            <p className="text-[21px] font-medium text-[#111827]">
                                {mode === "signup" ? "Tạo tài khoản" : "Chào mừng trở lại"}
                            </p>
                            <p className="mb-6 mt-1 text-[13px] text-[#6b7280]">
                                {mode === "signup"
                                    ? "Miễn phí, không cần thẻ tín dụng."
                                    : "Đăng nhập để tiếp tục."}
                            </p>

                            <div className="mb-3.5">
                                <label
                                    htmlFor="email"
                                    className="mb-1.5 block text-[12px] font-medium text-[#374151]"
                                >
                                    Email
                                </label>
                                <div className="relative">
                                    <svg
                                        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="ban@email.com"
                                        className="h-[42px] rounded-[10px] border-[#e0e2e7] bg-white pl-9 text-[13px] text-[#111827] placeholder:text-[#c4c9d4] focus-visible:ring-[#4f7eff]/20 focus-visible:border-[#4f7eff]"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="mb-4">
                                <div className="mb-1.5 flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="text-[12px] font-medium text-[#374151]"
                                    >
                                        Mật khẩu
                                    </label>
                                    {mode === "signin" && (
                                        <button
                                            type="button"
                                            onClick={() => window.location.href = "/forgot-password"}
                                            className="text-[12px] text-[#4f7eff] hover:underline"
                                        >
                                            Quên mật khẩu?
                                        </button>
                                    )}
                                </div>
                                <div className="relative">
                                    <svg
                                        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={6}
                                        placeholder="Ít nhất 6 ký tự"
                                        className="h-[42px] rounded-[10px] border-[#e0e2e7] bg-white pl-9 text-[13px] text-[#111827] placeholder:text-[#c4c9d4] focus-visible:ring-[#4f7eff]/20 focus-visible:border-[#4f7eff]"
                                    />
                                </div>
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                className="h-[42px] w-full rounded-[10px] bg-[#4f7eff] text-[14px] font-medium text-white hover:bg-[#3d6ef5] active:scale-[0.99]"
                            >
                                {mode === "signup" ? "Tạo tài khoản" : "Đăng nhập"}
                            </Button>

                            {status && (
                                <p
                                    role="status"
                                    className={[
                                        "mt-2.5 rounded-[8px] px-3.5 py-2.5 text-[12px]",
                                        status.type === "error"
                                            ? "border border-red-100 bg-red-50 text-red-700"
                                            : "border border-green-100 bg-green-50 text-green-700",
                                    ].join(" ")}
                                >
                                    {status.msg}
                                </p>
                            )}

                            {/* Divider */}
                            <div className="my-4 flex items-center gap-3">
                                <div className="h-px flex-1 bg-[#e5e7eb]" />
                                <span className="text-[11px] text-[#9ca3af]">hoặc</span>
                                <div className="h-px flex-1 bg-[#e5e7eb]" />
                            </div>

                            {/* Google */}
                            <button
                                type="button"
                                onClick={() => signInWithGoogle()}
                                className="flex h-[42px] w-full items-center justify-center gap-2.5 rounded-[10px] border border-[#e0e2e7] bg-white text-[13px] font-medium text-[#374151] transition-colors hover:border-[#d1d5db] hover:bg-[#f9fafb]"
                            >
                                <GoogleIcon />
                                Tiếp tục với Google
                            </button>

                            <p className="mt-5 text-center text-[12px] text-[#9ca3af]">
                                {mode === "signup" ? "Đã có tài khoản? " : "Chưa có tài khoản? "}
                                <button
                                    type="button"
                                    onClick={() => switchMode(mode === "signup" ? "signin" : "signup")}
                                    className="font-medium text-[#4f7eff] hover:underline"
                                >
                                    {mode === "signup" ? "Đăng nhập" : "Đăng ký"}
                                </button>
                            </p>

                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

function GoogleIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    );
}