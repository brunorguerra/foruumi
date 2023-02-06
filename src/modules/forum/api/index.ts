import { api } from '@/lib/axios';

import { ListPostsProps, PostProps } from '../types';

import {
  CreateCommentOptions,
  CreatePostOptions,
  DeletePostOptions,
  GetListPostsOptions,
  GetPostDataOptions,
  UpdateProfileOptions,
} from './types';

export async function getListPosts({ page }: GetListPostsOptions): Promise<ListPostsProps> {
  const req = await api.get(`/posts`, { params: { page } });
  return await req.data;
}

export async function getPostData({ postId }: GetPostDataOptions): Promise<PostProps> {
  const res = await api.get(`/posts/${postId}`);
  const { post } = await res.data;

  return post;
}

export async function createPost({ userId, data }: CreatePostOptions) {
  const res = await api.post('/posts/create', {
    id: userId,
    title: data.title,
    content: data.content,
  });
  return await res.data;
}

export async function updateProfile({ userId, data }: UpdateProfileOptions) {
  const req = await api.put(`/profile/${userId}`, {
    name: data.name,
    email: data.email,
    currentPassword: data.currentPassword,
    newPassword: data.newPassword,
  });
  const { user } = await req.data;

  return user;
}

export async function deletePost({ postId }: DeletePostOptions) {
  const res = await api.delete(`/posts/${postId}`);
  return await res.data;
}

export async function createComment({ postId, userId, data }: CreateCommentOptions) {
  const res = await api.post('/posts/comment/create', {
    postId,
    userId,
    content: data.content,
  });
  return await res.data;
}
