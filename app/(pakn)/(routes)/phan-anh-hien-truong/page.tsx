"use client";

import { useState } from "react";
import NextLink from "next/link";
import {
  SlidersHorizontal,
  Search,
  MapPin,
  ChevronRight,
} from "lucide-react";
import ComplaintCard from "../../_components/complaint-card";
import StatCard from "../../_components/stat-card";
import { Label } from "@/components/ui/label";

type Status = "done" | "pending" | "new";

interface Complaint {
  id: number;
  title: string;
  description: string;
  date: string;
  status: Status;
  image?: string;
}

const COMPLAINTS: Complaint[] = [
  {
    id: 1,
    title: "Quán bia 540 đường Láng mở loa quá to, hát ầm ĩ",
    description:
      "Trong thời gian dài vừa qua, tôi và nhiều hộ dân tại chung cư thường xuyên bị ảnh hưởng bởi tiếng ồn lớn phát ra từ quán vườn bia 540 đường Láng. Cụ thể, vào các buổi tối, đặc biệt từ khoảng 19h00 đến khuya, quán thường xuyên mở nhạc với âm lượng rất lớn.",
    date: "12/10/2024",
    status: "done",
    image:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/cherries.jpeg",
  },
  {
    id: 2,
    title: "Đường Nguyễn Trãi bị ngập nước sau mỗi trận mưa lớn",
    description:
      "Khu vực giao lộ Nguyễn Trãi – Trần Phú thường xuyên xảy ra tình trạng ngập úng nghiêm trọng sau mỗi cơn mưa, gây cản trở giao thông và ảnh hưởng đến kinh doanh của các hộ dân xung quanh khu vực.",
    date: "05/11/2024",
    status: "pending",
  },
  {
    id: 3,
    title: "Bãi rác tự phát tại ngõ 18 phố Hoàng Hoa Thám gây ô nhiễm",
    description:
      "Từ nhiều tháng nay, một bãi rác tự phát đã hình thành tại đầu ngõ 18 phố Hoàng Hoa Thám, tạo ra mùi hôi thối và thu hút ruồi muỗi gây ảnh hưởng đến sức khỏe người dân xung quanh.",
    date: "20/11/2024",
    status: "new",
  },
];

const STATS_RESULT = [
  { label: "Đã giải quyết", value: 60, color: "#185FA5" },
  { label: "Đang xử lý", value: 30, color: "#3B6D11" },
  { label: "Mới tiếp nhận", value: 10, color: "#B5D4F4" },
];

const STATS_SATISFACTION = [
  { label: "Hài lòng", value: 70, color: "#3B6D11" },
  { label: "Bình thường", value: 20, color: "#FAC775" },
  { label: "Chưa hài lòng", value: 10, color: "#E24B4A" },
];

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide border transition-all duration-150 ${
        active
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white dark:bg-zinc-900 text-zinc-500 border-zinc-200 dark:border-zinc-700 hover:border-blue-400 hover:text-blue-600"
      }`}
    >
      {label}
    </button>
  );
}

type Filter = "all" | "done" | "pending";

export default function PhanAnhHienTruong() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const filtered = COMPLAINTS.filter((c) => {
    const matchFilter =
      filter === "all" ||
      (filter === "done" && c.status === "done") ||
      (filter === "pending" && c.status !== "done");
    const matchQuery =
      query.trim() === "" ||
      c.title.toLowerCase().includes(query.toLowerCase());
    return matchFilter && matchQuery;
  });

  return (
    <section className="flex flex-col py-6 mx-auto">
      <nav
        className="flex items-center gap-1.5 text-xs text-zinc-400 mb-8"
        aria-label="Điều hướng"
      >
        <NextLink href="/" className="hover:text-zinc-600 transition-colors">
          Trang chủ
        </NextLink>
        <ChevronRight size={12} className="opacity-50" />
        <span className="text-zinc-600 dark:text-zinc-300 font-medium">
          Phản ánh hiện trường
        </span>
      </nav>

      <div className="text-center mb-8">
        <Label className="text-2xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
          Danh sách <span className="text-blue-600">phản ánh</span>
        </Label>
      </div>

      <div className="flex flex-col items-center gap-3 mb-8">
        <div
          className="flex gap-2 flex-wrap justify-center"
          role="group"
          aria-label="Lọc theo trạng thái"
        >
          <FilterChip
            label="Tất cả"
            active={filter === "all"}
            onClick={() => setFilter("all")}
          />
          <FilterChip
            label="Đã xử lý"
            active={filter === "done"}
            onClick={() => setFilter("done")}
          />
          <FilterChip
            label="Đang xử lý"
            active={filter === "pending"}
            onClick={() => setFilter("pending")}
          />
        </div>

        <div className="flex items-center gap-2 w-full max-w-sm">
          <div className="flex items-center gap-2 flex-1 h-10 px-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-full focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
            <Search size={14} className="text-zinc-400 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tra cứu phản ánh..."
              aria-label="Tra cứu phản ánh"
              className="flex-1 bg-transparent text-sm text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 outline-none"
            />
          </div>
          <button
            className="w-10 h-10 flex-shrink-0 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-500 hover:border-blue-400 hover:text-blue-600 transition-all"
            aria-label="Lọc và sắp xếp"
          >
            <SlidersHorizontal size={15} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2.5 border-l-[3px] border-blue-600 pl-3 py-2 bg-blue-50/50 dark:bg-blue-950/20 rounded-r-lg mb-5">
        <MapPin size={14} className="text-blue-600 flex-shrink-0" />
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-700 dark:text-zinc-300">
          Phản ánh hiện trường
        </span>
        <span className="ml-auto mr-1 text-xs text-zinc-400">
          {filtered.length} kết quả
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
        <div className="flex flex-col gap-3">
          {filtered.length > 0 ? (
            filtered.map((item) => <ComplaintCard key={item.id} item={item} />)
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-zinc-400 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl">
              <Search size={32} className="mb-3 opacity-40" />
              <p className="text-sm">Không tìm thấy phản ánh phù hợp</p>
            </div>
          )}
        </div>

        <aside className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2">
            {[
              { val: "124", lbl: "Tổng phản ánh" },
              { val: "74", lbl: "Đã xử lý" },
            ].map((s) => (
              <div
                key={s.lbl}
                className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3 text-center"
              >
                <p className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
                  {s.val}
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">{s.lbl}</p>
              </div>
            ))}
          </div>

          <StatCard
            title="Thống kê kết quả xử lý"
            data={STATS_RESULT}
            centerText="60%"
            centerSub="xử lý xong"
          />

          <StatCard
            title="Mức độ hài lòng"
            data={STATS_SATISFACTION}
            centerText="70%"
            centerSub="hài lòng"
          />
        </aside>
      </div>
    </section>
  );
}
