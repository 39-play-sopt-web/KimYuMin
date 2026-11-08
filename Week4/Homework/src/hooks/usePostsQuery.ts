import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getPostDetail, getPosts } from '../api/posts'

export function usePostsQuery(keyword: string) {
  return useInfiniteQuery({
    queryKey: ['posts', keyword],
    queryFn: ({ pageParam }) => getPosts({ keyword, cursor: pageParam }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor ?? undefined : undefined,
  })
}

export function usePostDetailQuery(postId: number) {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostDetail(postId),
    enabled: Number.isSafeInteger(postId) && postId > 0,
  })
}
