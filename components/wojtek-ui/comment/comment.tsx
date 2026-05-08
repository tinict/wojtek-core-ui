"use client";

import React, {
  createContext,
  useState,
  type ReactNode,
} from "react";
import { Avatar } from "@heroui/react";

type CommentRole = "author" | "moderator" | "member";

interface CommentContextValue {
  depth: number;
  commentId: string;
};

const CommentContext = createContext<CommentContextValue>({
  depth: 0,
  commentId: "",
});

interface CommentRootProps {
  children: ReactNode;
  className?: string;
  commentId: string;
  depth?: number;
  pinned?: boolean;
};

const CommentRoot = ({
  children,
  className = "",
  commentId,
  depth = 0,
  pinned = false,
  ...props
}: CommentRootProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof CommentRootProps>) => {
  return (
    <CommentContext value={{ depth, commentId }}>
      <div
        {...props}
        className={`relative ${depth > 0 ? "pl-4 border-l-2 border-default-100" : ""} ${className}`}
        data-slot="comment"
        data-depth={depth}
        data-pinned={pinned || undefined}
      >
        {children}
      </div>
    </CommentContext>
  );
};

const AVATAR_COLORS: Record<string, string> = {
  antirez: "#FF4438",
  yossigo: "#7928CA",
  itamarhaber: "#0070F3",
  mpark_dev: "#00B8D9",
  sofia_builds: "#36B37E",
  noa_redis: "#FF5630",
  you: "#FF4438",
};

interface CommentAvatarProps {
  name: string;
  username: string;
  size?: "sm" | "md";
  className?: string;
  src?: string;
};

const CommentAvatar = ({
  name,
  username,
  size = "sm",
  className = "",
  src,
}: CommentAvatarProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const bg = AVATAR_COLORS[username] ?? "#888";
  const dim = size === "sm" ? 28 : 36;
  const fontSize = size === "sm" ? 10 : 12;

  if (src) {
    return (
      <Avatar style={{ width: dim, height: dim }}>
        <Avatar.Image
          src={src}
          alt={name}
          className={className}
          data-slot="comment-avatar"
        />
      </Avatar>
    );
  }

  return (
    <div
      className={`relative shrink-0 rounded-full flex items-center justify-center ${className}`}
      style={{ width: dim, height: dim, background: bg }}
      data-slot="comment-avatar"
    >
      <span
        className="text-white font-semibold select-none"
        style={{ fontSize }}
      >
        {initials}
      </span>
    </div>
  );
};

interface CommentHeaderProps {
  children: ReactNode;
  className?: string;
};

const CommentHeader = ({
  children,
  className = "",
  ...props
}: CommentHeaderProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof CommentHeaderProps>) => {
  return (
    <div
      {...props}
      className={`flex items-center gap-2 flex-wrap mb-1.5 ${className}`}
      data-slot="comment-header"
    >
      {children}
    </div>
  );
};

interface CommentAuthorProps {
  name: string;
  username: string;
  role?: CommentRole;
  className?: string;
}

const CommentAuthor = ({
  name,
  username,
  role,
  className = "",
}: CommentAuthorProps) => {
  return (
    <>
      <span
        className={`text-sm font-semibold text-foreground leading-none ${className}`}
        data-slot="comment-author"
      >
        {name}
      </span>
      <span
        className="text-[11px] text-default-400 font-mono"
        data-slot="comment-username"
      >
        @{username}
      </span>
      {role && role !== "member" && (
        <span
          className={[
            "inline-flex items-center h-4 text-[10px] px-1.5 font-mono rounded-full border",
            role === "author"
              ? "text-amber-700 bg-amber-100 border-amber-200 dark:text-amber-300 dark:bg-amber-900/30 dark:border-amber-800"
              : "text-purple-600 bg-purple-100 border-purple-200 dark:text-purple-300 dark:bg-purple-900/30 dark:border-purple-800",
          ].join(" ")}
          data-slot="comment-role"
        >
          {role === "author" ? "Author" : "Mod"}
        </span>
      )}
    </>
  );
};

interface CommentTimestampProps {
  children: ReactNode;
  className?: string;
}

const CommentTimestamp = ({
  children,
  className = "",
  ...props
}: CommentTimestampProps & Omit<React.HTMLAttributes<HTMLSpanElement>, keyof CommentTimestampProps>) => {
  return (
    <span
      {...props}
      className={`text-[11px] text-default-300 ml-auto ${className}`}
      data-slot="comment-timestamp"
    >
      {children}
    </span>
  );
};

interface CommentContentProps {
  children: ReactNode;
  className?: string;
  edited?: boolean;
}

const CommentContent = ({
  children,
  className = "",
  edited = false,
  ...props
}: CommentContentProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof CommentContentProps>) => {
  return (
    <div
      {...props}
      className={className}
      data-slot="comment-content"
    >
      <p className="text-sm text-default-700 leading-relaxed">{children}</p>
      {edited && (
        <span className="text-[11px] text-default-300 italic">(edited)</span>
      )}
    </div>
  );
};

interface CommentCodeProps {
  children: ReactNode;
  className?: string;
}

const CommentCode = ({
  children,
  className = "",
  ...props
}: CommentCodeProps & Omit<React.HTMLAttributes<HTMLPreElement>, keyof CommentCodeProps>) => {
  return (
    <pre
      {...props}
      className={`mt-2 px-3 py-2 rounded-md bg-default-100 text-xs font-mono text-default-700 overflow-x-auto ${className}`}
      data-slot="comment-code"
    >
      <code>{children}</code>
    </pre>
  );
};

interface CommentActionsProps {
  children: ReactNode;
  className?: string;
}

const CommentActions = ({
  children,
  className = "",
  ...props
}: CommentActionsProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof CommentActionsProps>) => {
  return (
    <div
      {...props}
      className={`flex items-center gap-1 mt-2.5 ${className}`}
      data-slot="comment-actions"
    >
      {children}
    </div>
  );
};

interface CommentLikeButtonProps {
  liked?: boolean;
  count?: number;
  onToggle?: (liked: boolean) => void;
  className?: string;
  icon?: ReactNode;
};

const CommentLikeButton = ({
  liked: initialLiked = false,
  count: initialCount = 0,
  onToggle,
  className = "",
  icon,
}: CommentLikeButtonProps) => {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  const handleToggle = () => {
    const next = !liked;
    setLiked(next);
    setCount((c) => (next ? c + 1 : c - 1));
    onToggle?.(next);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      data-slot="comment-like"
      data-liked={liked || undefined}
      className={[
        "h-7 px-2 gap-1.5 text-xs font-medium inline-flex items-center rounded-md transition-colors",
        liked
          ? "text-danger"
          : "text-default-400 hover:text-default-600",
        className,
      ].join(" ")}
      aria-label={liked ? "Unlike" : "Like"}
    >
      {icon ?? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={liked ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      )}
      {count > 0 && String(count)}
    </button>
  );
};

interface CommentReplyButtonProps {
  onReply?: () => void;
  className?: string;
  children?: ReactNode;
}

const CommentReplyButton = ({
  onReply,
  className = "",
  children = "Reply",
}: CommentReplyButtonProps) => {
  return (
    <button
      type="button"
      onClick={onReply}
      data-slot="comment-reply-trigger"
      className={`h-7 px-2 gap-1.5 text-xs text-default-400 hover:text-default-600 font-medium inline-flex items-center rounded-md transition-colors ${className}`}
      aria-label="Reply to comment"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="9 14 4 9 9 4" />
        <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
      </svg>
      {children}
    </button>
  );
};

interface CommentBodyProps {
  children: ReactNode;
  className?: string;
}

const CommentBody = ({
  children,
  className = "",
  ...props
}: CommentBodyProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof CommentBodyProps>) => {
  return (
    <div className={`flex gap-3 group ${className}`} data-slot="comment-body" {...props}>
      {children}
    </div>
  );
};

interface CommentMainProps {
  children: ReactNode;
  className?: string;
}

const CommentMain = ({
  children,
  className = "",
  ...props
}: CommentMainProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof CommentMainProps>) => {
  return (
    <div
      {...props}
      className={`flex-1 min-w-0 ${className}`}
      data-slot="comment-main"
    >
      {children}
    </div>
  );
};

interface CommentRepliesProps {
  children: ReactNode;
  className?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  count?: number;
}

const CommentReplies = ({
  children,
  className = "",
  collapsible = false,
  defaultExpanded = true,
  count,
  ...props
}: CommentRepliesProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof CommentRepliesProps>) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const replyCount = count ?? React.Children.count(children);

  return (
    <div data-slot="comment-replies" {...props}>
      {collapsible && replyCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="h-7 px-2 text-xs text-primary font-medium ml-1 rounded-md hover:bg-primary-50 transition-colors"
          data-slot="comment-replies-toggle"
        >
          {expanded
            ? `Hide ${replyCount} ${replyCount === 1 ? "reply" : "replies"}`
            : `Show ${replyCount} ${replyCount === 1 ? "reply" : "replies"}`}
        </button>
      )}
      {expanded && (
        <div className={`mt-3 ml-9 flex flex-col gap-3 ${className}`}>
          {children}
        </div>
      )}
    </div>
  );
};

interface CommentPinProps {
  children?: ReactNode;
  className?: string;
}

const CommentPin = ({
  children = "Pinned",
  className = "",
}: CommentPinProps) => {
  return (
    <span
      className={`inline-flex items-center h-4 text-[10px] px-1.5 font-mono rounded-full border text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-300 dark:bg-blue-900/30 dark:border-blue-800 ${className}`}
      data-slot="comment-pin"
    >
      {children}
    </span>
  );
};

export {
  CommentRoot,
  CommentAvatar,
  CommentHeader,
  CommentAuthor,
  CommentTimestamp,
  CommentContent,
  CommentCode,
  CommentActions,
  CommentLikeButton,
  CommentReplyButton,
  CommentBody,
  CommentMain,
  CommentReplies,
  CommentPin,
};

export type {
  CommentRootProps,
  CommentAvatarProps,
  CommentHeaderProps,
  CommentAuthorProps,
  CommentTimestampProps,
  CommentContentProps,
  CommentCodeProps,
  CommentActionsProps,
  CommentLikeButtonProps,
  CommentReplyButtonProps,
  CommentBodyProps,
  CommentMainProps,
  CommentRepliesProps,
  CommentPinProps,
};