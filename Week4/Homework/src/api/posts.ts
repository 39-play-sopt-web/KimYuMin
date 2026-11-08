import { api } from './client'
import type { PostListParams, PostListResponse } from '../types/post'

export async function getPosts({ keyword, cursor }: PostListParams) {
  const searchParams = new URLSearchParams()
  if (keyword) searchParams.set('keyword', keyword)
  if (cursor !== undefined) searchParams.set('cursor', String(cursor))

  const response = await api.get('posts', { searchParams }).json<PostListResponse>()

  if (!response.isSuccess || !response.data) {
    throw new Error(response.message || '게시글 목록 조회에 실패했어요.')
  }

  return response.data
}
