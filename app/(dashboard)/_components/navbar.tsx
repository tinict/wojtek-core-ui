"use client";

import { User } from "lucide-react";

export default function Navbar() {
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
        <button
          aria-label="Account"
          className="w-8 h-8 flex items-center justify-center rounded-full text-[#8fa3c8] hover:text-white hover:bg-white/10 transition"
        >
          <User size={16} />
        </button>

        <span className="text-white text-[13px] font-medium ml-0.5">
          Tin Nguyễn
        </span>
      </div>
    </header>
  );
}