"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type AuthDemoPageProps = {
  title: string;
  intro: string;
  steps: string[];
  children: ReactNode;
};

export function AuthDemoPage({ title, intro, steps, children }: AuthDemoPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#fafafa] text-[#111]">
      <header className="h-14 border-b border-[#e5e5e5] bg-white px-6 flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.06em] text-[#888] mb-0.5">
            Supabase Auth Demo
          </p>
          <h1 className="text-[17px] font-semibold tracking-tight">{title}</h1>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-[13px] text-[#555] border border-[#e0e0e0] rounded-md px-3 py-1.5 bg-white hover:bg-[#f5f5f5] transition-colors"
        >
          ← Về trang chủ
        </Link>
      </header>

      <main className="mx-auto w-full max-w-[880px] px-4 py-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <section className="rounded-[10px] border border-[#e5e5e5] bg-white p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#aaa] mb-3.5">
              Hướng dẫn
            </p>
            <p className="text-[14px] leading-[1.7] text-[#444]">{intro}</p>
            <ol className="mt-4 flex flex-col gap-2.5 list-none">
              {steps.map((step, i) => (
                <li key={step} className="flex items-start gap-2.5 text-[13px] text-[#555] leading-relaxed">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f0f0f0] text-[11px] font-semibold text-[#888] mt-[2px]">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <div className="flex flex-col gap-4">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}