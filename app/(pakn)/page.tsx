"use client";

import { useState } from "react";
import NextLink from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import StatCard from "./_components/stat-card";
import ComplaintCard from "./_components/complaint-card";
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

const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    alt: "Phong cảnh thiên nhiên",
    title: "Cổng thông tin phản ánh hiện trường",
    subtitle:
      "Gửi phản ánh, theo dõi tiến độ và nhận kết quả xử lý trực tuyến.",
  },
  {
    src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    alt: "Thành phố",
    title: "Minh bạch – Nhanh chóng – Hiệu quả",
    subtitle: "Mọi phản ánh đều được tiếp nhận và xử lý kịp thời.",
  },
];

const COMPLAINTS: Complaint[] = [
  {
    id: 1,
    title: "Quán bia 540 đường Láng mở loa quá to, hát ầm ĩ",
    description:
      "Trong thời gian dài vừa qua, tôi và nhiều hộ dân tại chung cư thường xuyên bị ảnh hưởng bởi tiếng ồn lớn phát ra từ quán vườn bia 540 đường Láng vào các buổi tối.",
    date: "12/10/2024",
    status: "done",
    image:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/cherries.jpeg",
  },
  {
    id: 2,
    title: "Đường Nguyễn Trãi bị ngập nước sau mỗi trận mưa lớn",
    description:
      "Khu vực giao lộ Nguyễn Trãi – Trần Phú thường xuyên ngập úng nghiêm trọng sau mỗi cơn mưa, gây cản trở giao thông và ảnh hưởng kinh doanh xung quanh.",
    date: "05/11/2024",
    status: "pending",
  },
  {
    id: 3,
    title: "Bãi rác tự phát tại ngõ 18 phố Hoàng Hoa Thám gây ô nhiễm",
    description:
      "Từ nhiều tháng nay, bãi rác tự phát hình thành tại đầu ngõ 18 phố Hoàng Hoa Thám tạo mùi hôi và thu hút ruồi muỗi ảnh hưởng sức khỏe người dân.",
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

const SUMMARY_STATS = [
  { val: "1.240", lbl: "Tổng phản ánh", color: "text-blue-600" },
  { val: "892", lbl: "Đã xử lý", color: "text-green-600" },
  { val: "271", lbl: "Đang xử lý", color: "text-amber-500" },
  { val: "77", lbl: "Chờ tiếp nhận", color: "text-zinc-400" },
];

function HeroSwiper() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a === 0 ? SLIDES.length - 1 : a - 1));
  const next = () => setActive((a) => (a === SLIDES.length - 1 ? 0 : a + 1));

  return (
    <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden select-none">
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="text-white font-bold text-lg leading-snug drop-shadow mb-1">
              {slide.title}
            </p>
            <p className="text-white/80 text-sm leading-relaxed drop-shadow">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      <button
        onClick={prev}
        aria-label="Ảnh trước"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={next}
        aria-label="Ảnh tiếp theo"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors"
      >
        <ChevronRight size={16} />
      </button>

      <div className="absolute bottom-3 right-4 flex gap-1.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Ảnh ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === active ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <section className="flex flex-col gap-5 py-4">
      <HeroSwiper />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {SUMMARY_STATS.map((s) => (
          <div
            key={s.lbl}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-3.5 text-center"
          >
            <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
            <p className="text-xs text-zinc-400 mt-0.5">{s.lbl}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
        <div>
          <Label className="flex items-center gap-2.5 border-l-[3px] border-blue-600 pl-3 py-2 bg-blue-50/50 dark:bg-blue-950/20 rounded-r-lg mb-4 text-xs font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-300">
            Phản ánh hiện trường
          </Label>

          <div className="flex flex-col gap-3">
            {COMPLAINTS.map((item) => (
              <ComplaintCard key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <NextLink
              href="/phan-anh-hien-truong"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Xem tất cả phản ánh
              <ArrowRight size={14} />
            </NextLink>
          </div>
        </div>

        <aside className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2">
            {[
              { val: "1.240", lbl: "Tổng phản ánh" },
              { val: "892", lbl: "Đã xử lý" },
            ].map((s) => (
              <div
                key={s.lbl}
                className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-3 text-center"
              >
                <p className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
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
