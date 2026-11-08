import { api } from './client'
import type { CreatePostRequest, PostDetailResponse, PostListParams, PostListResponse } from '../types/post'

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

export async function createPost(payload: CreatePostRequest) {
  const response = await api.post('posts', { json: payload }).json<PostDetailResponse>()

  if (!response.isSuccess || !response.data) {
    throw new Error(response.message || '게시글 작성에 실패했어요.')
  }

  return response.data
}
