export type Post = {
  id: number
  title: string
  content: string
  author: string
  createdAt: string
  updatedAt: string
}

export type PostListParams = {
  keyword: string
  cursor?: number
}

export type PostListData = {
  posts: Post[]
  nextCursor: number | null
  hasNext: boolean
}

export type PostListResponse = {
  isSuccess: boolean
  code: string
  message: string
  data: PostListData | null
}

export type CreatePostRequest = {
  title: string
  content: string
  author: string
}

export type PostDetailResponse = {
  isSuccess: boolean
  code: string
  message: string
  data: Post | null
}
