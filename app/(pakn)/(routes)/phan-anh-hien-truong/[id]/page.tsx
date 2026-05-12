"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import NextLink from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  Clock,
  FolderOpen,
  CircleCheck,
  MapPin,
  Info,
  FileCheck2,
  MessageSquare,
  Send,
  ThumbsUp,
  User,
  ListChecks,
  ClipboardList,
  Search,
  Wrench,
  BadgeCheck,
  Images,
  ZoomIn,
  X,
} from "lucide-react";
import StatCard from "@/app/(pakn)/_components/stat-card";
import { AccordionItem } from "@/components/ui/accordion";

interface Comment {
  id: number;
  author: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
}

type StepStatus = "done" | "active" | "pending";

interface ProcessStep {
  id: number;
  label: string;
  description: string;
  date: string | null;
  status: StepStatus;
}

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  caption?: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    label: "Tiếp nhận phản ánh",
    description:
      "Hệ thống ghi nhận và xác nhận phản ánh của công dân thành công.",
    date: "06/05/2026 09:24",
    status: "done",
  },
  {
    id: 2,
    label: "Phân loại & chuyển đơn vị",
    description:
      "Phản ánh được phân loại lĩnh vực và chuyển đến Phòng Quản lý Đô thị xử lý.",
    date: "06/05/2026 11:00",
    status: "done",
  },
  {
    id: 3,
    label: "Kiểm tra thực tế",
    description:
      "Cán bộ được cử đến địa điểm để kiểm tra, ghi nhận và lập biên bản hiện trường.",
    date: "08/05/2026 14:00",
    status: "done",
  },
  {
    id: 4,
    label: "Xử lý vi phạm",
    description:
      "Lập biên bản xử phạt hành chính, yêu cầu đối tượng cam kết không tái phạm.",
    date: "15/05/2026 09:30",
    status: "done",
  },
  {
    id: 5,
    label: "Hoàn tất & thông báo",
    description: "Kết quả xử lý được ghi nhận và thông báo đến người phản ánh.",
    date: "20/05/2026 14:30",
    status: "done",
  },
];

const COMPLAINT = {
  title: "Quán bia 540 đường Láng mở loa quá to, hát ầm ĩ",
  content:
    "Trong thời gian dài vừa qua, tôi và nhiều hộ dân tại chung cư thường xuyên bị ảnh hưởng bởi tiếng ồn lớn phát ra từ quán vườn bia 540 đường Láng. Cụ thể, vào các buổi tối, đặc biệt từ khoảng 19h00 đến khuya, quán thường xuyên mở nhạc với âm lượng rất lớn, kèm theo việc hát hò, gây ra tiếng ồn ảnh hưởng nghiêm trọng đến sinh hoạt và giấc ngủ của người dân.\n\nĐây là vấn đề kéo dài nhiều tháng, chúng tôi đã nhiều lần phản ánh trực tiếp với chủ quán nhưng không có kết quả. Kính đề nghị cơ quan chức năng xem xét và xử lý.",
  date: "06/05/2026 09:24",
  field: "Trật tự đô thị",
  status: "done" as const,
  location: "540 Đường Láng, Đống Đa, Hà Nội",
  result:
    "Sau khi tiếp nhận phản ánh, UBND phường đã cử cán bộ đến kiểm tra thực tế tại địa điểm. Qua kiểm tra xác nhận vi phạm quy định về tiếng ồn. Đã lập biên bản và xử phạt hành chính theo Nghị định 100/2019/NĐ-CP. Quán bia đã cam kết không tái phạm và giảm âm lượng về mức cho phép sau 22h.",
  resultDate: "20/05/2026 14:30",
};

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 1,
    src: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/cherries.jpeg",
    alt: "Ảnh phản ánh 1",
    caption:
      "Quán bia hoạt động lúc 21h30, loa ngoài trời hướng thẳng vào khu dân cư",
  },
];

const COMMENTS: Comment[] = [
  {
    id: 1,
    author: "Nguyễn Văn An",
    avatar: "NA",
    date: "07/05/2026",
    content:
      "Tôi cũng là cư dân khu này, vấn đề tiếng ồn đã kéo dài rất lâu. Cảm ơn bạn đã phản ánh!",
    likes: 4,
  },
  {
    id: 2,
    author: "Trần Thị Bình",
    avatar: "TB",
    date: "10/05/2026",
    content:
      "Rất vui khi vấn đề đã được giải quyết. Mong cơ quan chức năng tiếp tục theo dõi để đảm bảo không tái phạm.",
    likes: 2,
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

function Lightbox({
  images,
  initialIndex,
  isOpen,
  onClose,
}: {
  images: GalleryImage[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initialIndex);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrent(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const thumb = strip.children[current] as HTMLElement | undefined;
    thumb?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [current]);

  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setCurrent((i) => (i + 1) % images.length),
    [images.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, prev, next, onClose]);

  if (!isOpen) return null;

  const img = images[current];

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "rgba(0,0,0,0.93)" }}
      role="dialog"
      aria-modal="true"
      aria-label="Xem ảnh toàn màn hình"
    >
      <div className="flex items-center justify-between px-4 py-3 flex-shrink-0 border-b border-white/10">
        <span className="text-white/60 text-xs font-medium tabular-nums">
          {current + 1} / {images.length}
        </span>
        {img.caption && (
          <p className="text-white/50 text-xs flex-1 text-center px-4 line-clamp-1 hidden sm:block">
            {img.caption}
          </p>
        )}
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          aria-label="Đóng"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center relative overflow-hidden px-14">
        <button
          onClick={prev}
          className="absolute left-3 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          style={{ background: "rgba(255,255,255,0.12)" }}
          aria-label="Ảnh trước"
        >
          <ChevronLeft size={22} />
        </button>

        <img
          key={img.id}
          src={img.src}
          alt={img.alt}
          className="max-h-full max-w-full object-contain select-none"
          style={{ maxHeight: "calc(100vh - 160px)" }}
          draggable={false}
        />

        <button
          onClick={next}
          className="absolute right-3 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          style={{ background: "rgba(255,255,255,0.12)" }}
          aria-label="Ảnh tiếp theo"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {img.caption && (
        <p className="text-white/50 text-xs text-center px-4 pb-2 sm:hidden line-clamp-2 flex-shrink-0">
          {img.caption}
        </p>
      )}

      <div className="flex-shrink-0 border-t border-white/10 px-4 py-3">
        <div
          ref={stripRef}
          className="flex gap-2 overflow-x-auto pb-0.5"
          style={{ scrollbarWidth: "none" }}
        >
          {images.map((thumb, i) => (
            <button
              key={thumb.id}
              onClick={() => setCurrent(i)}
              className="flex-shrink-0 rounded-lg overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-all"
              style={{
                width: 52,
                height: 40,
                border:
                  i === current ? "2px solid #3b82f6" : "2px solid transparent",
                opacity: i === current ? 1 : 0.4,
                transform: i === current ? "scale(1.06)" : "scale(1)",
                transition: "all 0.15s ease",
              }}
              aria-label={`Xem ảnh ${i + 1}`}
              aria-pressed={i === current}
            >
              <img
                src={thumb.src}
                alt={thumb.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ImageGallery({ images }: { images: GalleryImage[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!images.length) return null;

  const main = images[0];
  const thumbs = images.slice(1, 5);
  const remaining = images.length - 5;

  return (
    <>
      <div className="border border-zinc-200 dark:border-zinc-700 rounded-2xl overflow-hidden mb-4">
        <div className="flex items-center gap-2 px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
          <Images size={15} className="text-blue-600" />
          <span className="text-sm font-semibold uppercase tracking-wide text-zinc-700 dark:text-zinc-200">
            Ảnh phản ánh
          </span>
          <span className="ml-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full px-2 py-0.5 font-medium">
            {images.length}
          </span>
        </div>

        <div className="p-3 flex flex-col gap-2 bg-white dark:bg-zinc-900">
          <button
            className="relative w-full rounded-xl overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            onClick={() => setLightboxIndex(0)}
            aria-label="Xem ảnh 1 toàn màn hình"
          >
            <img
              src={main.src}
              alt={main.alt}
              className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              style={{ height: 220 }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/50 rounded-full p-2">
                <ZoomIn size={20} className="text-white" />
              </div>
            </div>
            {main.caption && (
              <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white text-xs line-clamp-1">
                  {main.caption}
                </p>
              </div>
            )}
            <span className="absolute top-2 left-2 bg-black/60 text-white text-xs font-medium px-2 py-0.5 rounded-md tabular-nums">
              1 / {images.length}
            </span>
          </button>

          {thumbs.length > 0 && (
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: `repeat(${Math.min(thumbs.length + (remaining > 0 ? 1 : 0), 4)}, 1fr)`,
              }}
            >
              {thumbs.map((img, i) => (
                <button
                  key={img.id}
                  title={img.caption}
                  className="relative rounded-lg overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  style={{ aspectRatio: "1 / 1" }}
                  onClick={() => setLightboxIndex(i + 1)}
                  aria-label={`Xem ảnh ${i + 2}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.06]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-200" />
                </button>
              ))}

              {remaining > 0 && (
                <button
                  className="relative rounded-lg overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  style={{ aspectRatio: "1 / 1" }}
                  onClick={() => setLightboxIndex(5)}
                  aria-label={`Xem thêm ${remaining} ảnh`}
                >
                  <img
                    src={images[5].src}
                    alt="Xem thêm"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/55 group-hover:bg-black/65 transition-colors duration-200 flex flex-col items-center justify-center gap-0.5">
                    <span className="text-white text-xl font-semibold leading-none">
                      +{remaining}
                    </span>
                    <span className="text-white/80 text-xs">ảnh khác</span>
                  </div>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <Lightbox
        images={images}
        initialIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
      />
    </>
  );
}

function InfoRow({
  icon,
  label,
  value,
  valueClass = "",
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  valueClass?: string;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
      <span className="text-zinc-400 flex-shrink-0 mt-0.5">{icon}</span>
      <span className="text-sm text-zinc-500 w-28 flex-shrink-0">{label}</span>
      <span
        className={`text-sm text-zinc-800 dark:text-zinc-100 font-medium flex-1 ${valueClass}`}
      >
        {value}
      </span>
    </div>
  );
}

const STEP_ICONS: Record<number, React.ReactNode> = {
  1: <ClipboardList size={14} />,
  2: <FolderOpen size={14} />,
  3: <Search size={14} />,
  4: <Wrench size={14} />,
  5: <BadgeCheck size={14} />,
};

function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="relative flex flex-col">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        const isDone = step.status === "done";
        const isActive = step.status === "active";
        return (
          <div key={step.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 transition-colors ${
                  isDone
                    ? "bg-blue-600 border-blue-600 text-white"
                    : isActive
                      ? "bg-white border-blue-600 text-blue-600"
                      : "bg-white border-zinc-300 text-zinc-400"
                }`}
              >
                {isDone ? <CircleCheck size={14} /> : STEP_ICONS[step.id]}
              </div>
              {!isLast && (
                <div
                  className={`w-0.5 flex-1 my-1 ${isDone ? "bg-blue-200" : "bg-zinc-200 dark:bg-zinc-700"}`}
                  style={{ minHeight: "24px" }}
                />
              )}
            </div>
            <div className={`pb-5 flex-1 min-w-0 ${isLast ? "pb-0" : ""}`}>
              <div className="flex items-start justify-between gap-2 flex-wrap mb-0.5">
                <span
                  className={`text-sm font-semibold ${
                    isDone
                      ? "text-zinc-800 dark:text-zinc-100"
                      : isActive
                        ? "text-blue-600"
                        : "text-zinc-400"
                  }`}
                >
                  {step.label}
                </span>
                {step.date && (
                  <span className="text-xs text-zinc-400 flex-shrink-0 flex items-center gap-1">
                    <Clock size={11} />
                    {step.date}
                  </span>
                )}
              </div>
              <p
                className={`text-xs leading-relaxed ${isDone || isActive ? "text-zinc-500" : "text-zinc-300 dark:text-zinc-600"}`}
              >
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CommentSection() {
  const [comments, setComments] = useState<Comment[]>(COMMENTS);
  const [text, setText] = useState("");
  const [liked, setLiked] = useState<Set<number>>(new Set());

  function handleSubmit() {
    const trimmed = text.trim();
    if (!trimmed) return;
    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        author: "Bạn",
        avatar: "BN",
        date: new Date().toLocaleDateString("vi-VN"),
        content: trimmed,
        likes: 0,
      },
    ]);
    setText("");
  }

  function handleLike(id: number) {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, likes: liked.has(id) ? c.likes - 1 : c.likes + 1 }
          : c,
      ),
    );
  }

  return (
    <div className="mt-4 border border-zinc-200 dark:border-zinc-700 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
        <MessageSquare size={15} className="text-blue-600" />
        <span className="text-sm font-semibold uppercase tracking-wide text-zinc-700 dark:text-zinc-200">
          Bình luận
        </span>
        <span className="ml-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full px-2 py-0.5 font-medium">
          {comments.length}
        </span>
      </div>
      <div className="bg-white dark:bg-zinc-900 px-4 py-4">
        <div className="flex gap-3 mb-5">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
            <User size={14} className="text-blue-600 dark:text-blue-300" />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Viết bình luận của bạn..."
              rows={3}
              className="w-full text-sm text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2.5 outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all"
            />
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={!text.trim()}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <Send size={12} />
                Gửi bình luận
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center flex-shrink-0 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                {c.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                  <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                    {c.author}
                  </span>
                  <span className="text-xs text-zinc-400">{c.date}</span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {c.content}
                </p>
                <button
                  onClick={() => handleLike(c.id)}
                  className={`mt-2 inline-flex items-center gap-1 text-xs transition-colors ${
                    liked.has(c.id)
                      ? "text-blue-600 font-medium"
                      : "text-zinc-400 hover:text-blue-600"
                  }`}
                >
                  <ThumbsUp size={12} />
                  {c.likes > 0 && <span>{c.likes}</span>}
                  Hữu ích
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ChiTietPhanAnhHienTruong() {
  return (
    <section className="flex flex-col py-6 mx-auto">
      <nav
        className="flex items-center gap-1.5 text-xs text-zinc-400 mb-6 flex-wrap"
        aria-label="Điều hướng"
      >
        <NextLink href="/" className="hover:text-zinc-600 transition-colors">
          Trang chủ
        </NextLink>
        <ChevronRight size={12} className="opacity-50 flex-shrink-0" />
        <NextLink
          href="/phan-anh-hien-truong"
          className="hover:text-zinc-600 transition-colors"
        >
          Phản ánh hiện trường
        </NextLink>
        <ChevronRight size={12} className="opacity-50 flex-shrink-0" />
        <span className="text-zinc-600 dark:text-zinc-300 font-medium">
          Chi tiết phản ánh
        </span>
      </nav>

      <h1 className="text-base font-bold text-zinc-800 dark:text-zinc-100 uppercase tracking-tight mb-5 leading-snug">
        {COMPLAINT.title}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
        <div className="flex flex-col gap-3">
          <AccordionItem
            icon={<Info size={16} />}
            accordionTitle="Thông tin phản ánh"
            defaultOpen
          >
            <div className="border border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden mb-4">
              <InfoRow
                icon={<Clock size={15} />}
                label="Thời gian gửi"
                value={COMPLAINT.date}
              />
              <InfoRow
                icon={<FolderOpen size={15} />}
                label="Lĩnh vực"
                value={COMPLAINT.field}
              />
              <InfoRow
                icon={<CircleCheck size={15} />}
                label="Trạng thái"
                value={
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                    <CircleCheck size={12} />
                    Đã giải quyết
                  </span>
                }
              />
              <InfoRow
                icon={<MapPin size={15} />}
                label="Địa điểm"
                value={COMPLAINT.location}
              />
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 border border-zinc-100 dark:border-zinc-700">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 mb-2">
                Nội dung phản ánh
              </p>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                {COMPLAINT.content}
              </p>
            </div>
          </AccordionItem>

          <ImageGallery images={GALLERY_IMAGES} />

          <AccordionItem
            icon={<FileCheck2 size={16} />}
            accordionTitle="Kết quả xử lý"
            defaultOpen
          >
            <div className="bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <CircleCheck size={15} className="text-green-600" />
                <span className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide">
                  Đã xử lý — {COMPLAINT.resultDate}
                </span>
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {COMPLAINT.result}
              </p>
            </div>
          </AccordionItem>

          <AccordionItem
            icon={<ListChecks size={16} />}
            accordionTitle="Quy trình xử lý"
            defaultOpen
          >
            <div className="pt-1">
              <ProcessTimeline steps={PROCESS_STEPS} />
            </div>
          </AccordionItem>

          <CommentSection />
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
