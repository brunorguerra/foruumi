import { type CommentProps } from './CommentProps';

export type PostProps = {
  title: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
  };
  Comment: CommentProps[];
};
