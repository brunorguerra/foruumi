import { useQuery } from '@tanstack/react-query';

import { getListPosts } from '../api';

interface UseGetListPostsOptions {
  page: number;
}

export const useGetListPosts = ({ page }: UseGetListPostsOptions) => {
  return useQuery(['post-list', page], () => getListPosts({ page }), {
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
