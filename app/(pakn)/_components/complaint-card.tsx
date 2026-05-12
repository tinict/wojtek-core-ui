import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
} from "@/components/ui/card ";
import { Label } from "@/components/ui/label";
import { CircleCheck, Clock3, Send, MapPin, Clock } from "lucide-react";
import NextLink from "next/link";

type Status = "done" | "pending" | "new";

interface Complaint {
  id: number;
  title: string;
  description: string;
  date: string;
  status: Status;
  image?: string;
}

const STATUS_CONFIG: Record<
  Status,
  { label: string; icon: React.ReactNode; bg: string; text: string }
> = {
  done: {
    label: "Đã giải quyết",
    icon: <CircleCheck size={12} />,
    bg: "bg-green-50",
    text: "text-green-700",
  },
  pending: {
    label: "Đang xử lý",
    icon: <Clock3 size={12} />,
    bg: "bg-amber-50",
    text: "text-amber-700",
  },
  new: {
    label: "Mới gửi",
    icon: <Send size={12} />,
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
};

function ComplaintCard({ item }: { item: Complaint }) {
  const s = STATUS_CONFIG[item.status];

  return (
    <NextLink
      href={`/phan-anh-hien-truong/${item.id}`}
      className="group flex bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-md transition-all duration-200"
    >
      <div className="w-36 min-w-[144px] bg-zinc-100 dark:bg-zinc-800 flex-shrink-0 relative overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <MapPin size={24} className="text-zinc-300" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 p-3.5 min-w-0 flex-1">
        <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
          {item.title}
        </p>
        <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center gap-2.5 mt-auto pt-2 border-t border-zinc-100 dark:border-zinc-800 flex-wrap">
          <Label className="flex items-center gap-1 text-xs text-zinc-400">
            <Clock size={11} />
            {item.date}
          </Label>
          <Badge className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium text-white">
            {s.label}
          </Badge>
        </div>
      </div>
    </NextLink>
  );
}

export default ComplaintCard;
