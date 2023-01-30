export type CommentProps = {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
  };
};
