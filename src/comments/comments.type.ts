export type CommentDoc = {
  id: string;
  message: string;
  timestamp: number;
  username: string;
  isQuestion?: boolean;
  isLive?: boolean;
};
