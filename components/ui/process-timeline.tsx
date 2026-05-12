"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type TimelineStatus = "done" | "active" | "pending"

function ProcessTimeline({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("relative flex flex-col", className)} {...props} />
}

function ProcessTimelineItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex gap-4", className)} {...props} />
}

type ProcessTimelineIndicatorProps = React.HTMLAttributes<HTMLDivElement> & {
  status?: TimelineStatus
  isLast?: boolean
}

function ProcessTimelineIndicator({
  className,
  status = "pending",
  isLast = false,
  children,
  ...props
}: ProcessTimelineIndicatorProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 transition-colors",
          status === "done" && "bg-blue-600 border-blue-600 text-white",
          status === "active"  && "bg-white border-blue-600 text-blue-600",
          status === "pending" && "bg-white border-zinc-300 text-zinc-400",
          className
        )}
        {...props}
      >
        {children}
      </div>
      {!isLast && (
        <div
          className={cn(
            "w-0.5 flex-1 my-1",
            status === "done" ? "bg-blue-200" : "bg-zinc-200 dark:bg-zinc-700"
          )}
          style={{ minHeight: 24 }}
        />
      )}
    </div>
  )
}

type ProcessTimelineContentProps = React.HTMLAttributes<HTMLDivElement> & {
  isLast?: boolean
}

function ProcessTimelineContent({
  className,
  isLast = false,
  ...props
}: ProcessTimelineContentProps) {
  return (
    <div
      className={cn("flex-1 min-w-0", isLast ? "pb-0" : "pb-5", className)}
      {...props}
    />
  )
}

function ProcessTimelineLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-start justify-between gap-2 flex-wrap mb-0.5", className)}
      {...props}
    />
  )
}

type ProcessTimelineTitleProps = React.HTMLAttributes<HTMLSpanElement> & {
  status?: TimelineStatus
}

function ProcessTimelineTitle({
  className,
  status = "pending",
  ...props
}: ProcessTimelineTitleProps) {
  return (
    <span
      className={cn(
        "text-sm font-semibold",
        status === "done"    && "text-zinc-800 dark:text-zinc-100",
        status === "active"  && "text-blue-600",
        status === "pending" && "text-zinc-400",
        className
      )}
      {...props}
    />
  )
}

type ProcessTimelineDescriptionProps = React.HTMLAttributes<HTMLParagraphElement> & {
  status?: TimelineStatus
}

function ProcessTimelineDescription({
  className,
  status = "pending",
  ...props
}: ProcessTimelineDescriptionProps) {
  return (
    <p
      className={cn(
        "text-xs leading-relaxed",
        status === "done" || status === "active"
          ? "text-zinc-500"
          : "text-zinc-300 dark:text-zinc-600",
        className
      )}
      {...props}
    />
  )
}

export {
  ProcessTimeline,
  ProcessTimelineItem,
  ProcessTimelineIndicator,
  ProcessTimelineContent,
  ProcessTimelineLabel,
  ProcessTimelineTitle,
  ProcessTimelineDescription,
}