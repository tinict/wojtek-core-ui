"use client";

import React, { useState } from "react";
import { Badge, Card } from "@heroui/react";
import { Send, X } from "lucide-react";
import { Comment } from "./index";

type CommentRole = "author" | "moderator" | "member";

interface CommentData {
  id: string;
  author: {
    name: string;
    username: string;
    role?: CommentRole;
  };
  content: string;
  createdAt: string;
  likes: number;
  liked: boolean;
  pinned?: boolean;
  edited?: boolean;
  codeSnippet?: string;
  replies?: CommentData[];
};

const INITIAL_COMMENTS: CommentData[] = [
  {
    id: "1",
    author: { name: "Salvatore Sanfilippo", username: "antirez", role: "author" },
    content:
      "Redis 8.0 introduces a completely redesigned data pipeline that reduces latency by up to 40% in high-throughput scenarios. The new I/O threading model separates read and write operations across dedicated threads.",
    createdAt: "2 hours ago",
    likes: 142,
    liked: false,
    pinned: true,
    replies: [
      {
        id: "1-1",
        author: { name: "Yossi Gottlieb", username: "yossigo", role: "moderator" },
        content:
          "Worth noting that `io-threads-do-reads` works best with consistent large payloads. For mixed workloads, benchmark before enabling in production.",
        createdAt: "1 hour ago",
        likes: 38,
        liked: false,
        replies: [],
      },
      {
        id: "1-2",
        author: { name: "Madelyn Park", username: "mpark_dev", role: "member" },
        content:
          "We tested this on staging with 50k req/s — incredible results. The p99 latency dropped from 8ms to 3ms.",
        createdAt: "45 min ago",
        likes: 27,
        liked: true,
        replies: [],
      },
    ],
  },
  {
    id: "2",
    author: { name: "Itamar Haber", username: "itamarhaber", role: "moderator" },
    content:
      "Great overview! The new `LMPOP` and `ZMPOP` commands are a game changer for queue-based architectures. You can now atomically pop from multiple keys with a single round-trip.",
    createdAt: "3 hours ago",
    likes: 89,
    liked: false,
    edited: true,
    replies: [
      {
        id: "2-1",
        author: { name: "Sofia Chen", username: "sofia_builds", role: "member" },
        content:
          "Does LMPOP support a blocking variant? The docs aren't super clear on this yet.",
        createdAt: "2 hours ago",
        likes: 12,
        liked: false,
        replies: [],
      },
    ],
  },
  {
    id: "3",
    author: { name: "Noa Averbuch", username: "noa_redis", role: "member" },
    content:
      "The new Sharded Pub/Sub is a must for anyone running Redis Cluster in production. Classic Pub/Sub broadcasts to every shard — now messages are confined to the shard owning the channel, which scales linearly.",
    createdAt: "5 hours ago",
    likes: 64,
    liked: false,
    replies: [],
  },
];

function Hr({ className = "" }: { className?: string }) {
  return <div className={`h-px w-full bg-default-100 ${className}`} />;
};

function CommentItem({
  comment: data,
  depth = 0,
  onReply,
}: {
  comment: CommentData;
  depth?: number;
  onReply: (id: string, username: string) => void;
}) {
  return (
    <Comment commentId={data.id} depth={depth} pinned={data.pinned}>
      <Comment.Body>
        <Comment.Avatar
          name={data.author.name}
          username={data.author.username}
          size={depth === 0 ? "md" : "sm"}
        />

        <Comment.Main>
          <Comment.Header>
            <Comment.Author
              name={data.author.name}
              username={data.author.username}
              role={data.author.role}
            />
            {data.pinned && <Comment.Pin />}
            <Comment.Timestamp>{data.createdAt}</Comment.Timestamp>
          </Comment.Header>

          <Comment.Content edited={data.edited}>
            {data.content}
          </Comment.Content>

          {data.codeSnippet && (
            <Comment.Code>{data.codeSnippet}</Comment.Code>
          )}

          <Comment.Actions>
            <Comment.Like liked={data.liked} count={data.likes} />
            <Comment.Reply
              onReply={() => onReply(data.id, data.author.username)}
            />
          </Comment.Actions>
        </Comment.Main>
      </Comment.Body>

      {data.replies && data.replies.length > 0 && (
        <Comment.Replies collapsible count={data.replies.length}>
          {data.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              onReply={onReply}
            />
          ))}
        </Comment.Replies>
      )}
    </Comment>
  );
}

export default function CommentSection() {
  const [comments, setComments] = useState<CommentData[]>(INITIAL_COMMENTS);
  const [value, setValue] = useState("");
  const [replyingTo, setReplyingTo] = useState<{
    id: string;
    username: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalCount = comments.reduce(
    (acc, c) => acc + 1 + (c.replies?.length ?? 0),
    0
  );

  const handleReply = (id: string, username: string) => {
    setReplyingTo({ id, username });
    setValue(`@${username} `);
  };

  const handleSubmit = async () => {
    if (!value.trim()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));

    const newComment: CommentData = {
      id: Date.now().toString(),
      author: { name: "You", username: "you", role: "member" },
      content: value.trim(),
      createdAt: "just now",
      likes: 0,
      liked: false,
      replies: [],
    };

    if (replyingTo) {
      setComments((prev) =>
        prev.map((c) =>
          c.id === replyingTo.id
            ? { ...c, replies: [...(c.replies ?? []), newComment] }
            : c
        )
      );
    } else {
      setComments((prev) => [...prev, newComment]);
    }

    setValue("");
    setReplyingTo(null);
    setIsSubmitting(false);
  };

  return (
    <div className="w-full mx-auto font-sans mt-6">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <h2 className="text-base font-semibold text-foreground">Thảo luận</h2>
        <Badge
          content={String(totalCount)}
          color="default"
          size="sm"
          className="font-mono text-[10px]"
        >
          <span />
        </Badge>
      </div>

      {/* Compose box */}
      <Card className="mb-6 border border-default-100 shadow-none bg-default-50/60">
        <div className="p-3 flex flex-col gap-3">
          {/* Reply-to indicator */}
          {replyingTo && (
            <div className="flex items-center justify-between px-2 py-1.5 rounded-md bg-primary-50 border border-primary-100">
              <span className="text-[12px] text-primary">
                Đang trả lời{" "}
                <span className="font-semibold">@{replyingTo.username}</span>
              </span>
              <button
                type="button"
                aria-label="Hủy trả lời"
                className="h-5 w-5 inline-flex items-center justify-center rounded text-primary hover:bg-primary-100 transition-colors"
                onClick={() => {
                  setReplyingTo(null);
                  setValue("");
                }}
              >
                <X size={12} />
              </button>
            </div>
          )}

          {/* Textarea row */}
          <div className="flex gap-2.5">
            {/* Current-user avatar */}
            <div
              className="shrink-0 rounded-full flex items-center justify-center"
              style={{
                width: 28,
                height: 28,
                background: "linear-gradient(135deg, #FF4438, #FF8C69)",
              }}
            >
              <span className="text-[11px] font-bold text-white">Y</span>
            </div>

            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Thêm bình luận…"
              rows={2}
              className="flex-1 resize-none bg-transparent border-none outline-none text-sm text-foreground placeholder:text-default-300 leading-relaxed"
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
          </div>

          {/* Submit row */}
          <div className="flex items-center justify-between pl-8">
            <span className="text-[11px] text-default-300">
              Ctrl + Enter để gửi
            </span>

            <button
              type="button"
              disabled={!value.trim() || isSubmitting}
              onClick={handleSubmit}
              className="h-8 px-3 text-xs font-semibold rounded-lg inline-flex items-center gap-1.5
                bg-[#FF4438] text-white
                hover:bg-[#e83d32] transition-colors
                disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <svg
                  className="animate-spin h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              ) : (
                <Send size={13} />
              )}
              Bình luận
            </button>
          </div>
        </div>
      </Card>

      <Hr className="mb-5" />

      {/* Comment list */}
      <div className="overflow-y-auto max-h-[640px] flex flex-col gap-5 pr-1">
        {comments.map((comment, i) => (
          <React.Fragment key={comment.id}>
            <CommentItem comment={comment} onReply={handleReply} />
            {i < comments.length - 1 && <Hr />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}