import type { ComponentProps } from "react";

import {
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
} from "./comment";


export const Comment = Object.assign(CommentRoot, {
  Root: CommentRoot,
  Avatar: CommentAvatar,
  Header: CommentHeader,
  Author: CommentAuthor,
  Timestamp: CommentTimestamp,
  Body: CommentBody,
  Main: CommentMain,
  Content: CommentContent,
  Code: CommentCode,
  Actions: CommentActions,
  Like: CommentLikeButton,
  Reply: CommentReplyButton,
  Replies: CommentReplies,
  Pin: CommentPin,
});

export type Comment = {
  Props: ComponentProps<typeof CommentRoot>;
  RootProps: ComponentProps<typeof CommentRoot>;
  AvatarProps: ComponentProps<typeof CommentAvatar>;
  HeaderProps: ComponentProps<typeof CommentHeader>;
  AuthorProps: ComponentProps<typeof CommentAuthor>;
  TimestampProps: ComponentProps<typeof CommentTimestamp>;
  BodyProps: ComponentProps<typeof CommentBody>;
  MainProps: ComponentProps<typeof CommentMain>;
  ContentProps: ComponentProps<typeof CommentContent>;
  CodeProps: ComponentProps<typeof CommentCode>;
  ActionsProps: ComponentProps<typeof CommentActions>;
  LikeProps: ComponentProps<typeof CommentLikeButton>;
  ReplyProps: ComponentProps<typeof CommentReplyButton>;
  RepliesProps: ComponentProps<typeof CommentReplies>;
  PinProps: ComponentProps<typeof CommentPin>;
};

// ─── Named Exports ────────────────────────────────────────────────────────────

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
  CommentRootProps as CommentProps,
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
} from "./comment";