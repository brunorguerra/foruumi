import { CreatePostFormData, UpdateProfileFormData, CreateCommentFormData } from '../types';

export type CreatePostOptions = {
  userId: string;
  data: CreatePostFormData;
};

export type UpdateProfileOptions = {
  userId: string;
  data: UpdateProfileFormData;
};

export type GetPostDataOptions = {
  postId: string;
};

export type GetListPostsOptions = {
  page: number;
};

export type DeletePostOptions = {
  postId: string;
};

export type CreateCommentOptions = {
  postId: string;
  userId: string;
  data: CreateCommentFormData;
};
