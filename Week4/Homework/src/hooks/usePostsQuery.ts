import { useInfiniteQuery } from '@tanstack/react-query'
import { getPosts } from '../api/posts'

export function usePostsQuery(keyword: string) {
  return useInfiniteQuery({
    queryKey: ['posts', keyword],
    queryFn: ({ pageParam }) => getPosts({ keyword, cursor: pageParam }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor ?? undefined : undefined,
  })
}
