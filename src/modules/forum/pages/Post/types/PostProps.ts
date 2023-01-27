import { CommentProps } from './CommentProps';

export type PostProps = {
  title: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
  };
  Comment: CommentProps[];
};
