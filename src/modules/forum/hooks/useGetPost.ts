import { useQuery } from '@tanstack/react-query';

import { getPostData } from '../api';

interface UseGetPostOptions {
  postId: string;
}

export const useGetPost = ({ postId }: UseGetPostOptions) => {
  return useQuery(['post'], () => getPostData({ postId }));
};
