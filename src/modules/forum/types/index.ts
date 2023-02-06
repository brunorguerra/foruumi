import { z } from 'zod';

import { createCommentFormSchema, createPostFormSchema, updateProfileFormSchema } from '../schemas';

export type ListPostsProps = {
  posts: PostProps[];
  info: {
    currentPage: number;
    pages: number;
    posts: number;
  };
};

export type PostProps = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
  };
  Comment: CommentProps[];
};

export type CommentProps = {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
  };
};

export type CreatePostFormData = z.infer<typeof createPostFormSchema>;

export type CreateCommentFormData = z.infer<typeof createCommentFormSchema>;

export type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>;
