import { useEffect, useRef, useState } from 'react'
import type { SubmitEvent } from 'react'
import PostCard from '../components/PostCard'
import { usePostsQuery } from '../hooks/usePostsQuery'

export default function PostListPage() {
  const [input, setInput] = useState('')
  const [keyword, setKeyword] = useState('')
  const lastPostRef = useRef<HTMLLIElement>(null)
  const {
    data, isPending, isError, isFetching, isFetchingNextPage,
    isFetchNextPageError, hasNextPage, fetchNextPage,
  } = usePostsQuery(keyword)

  const posts = data?.pages.flatMap((page) => page.posts) ?? []
  const trimmedInput = input.trim()
  const isInvalidKeyword = trimmedInput.length > 0 &&
    (trimmedInput.length < 2 || trimmedInput.length > 50)

  function handleSearch(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isInvalidKeyword) return
    setKeyword(trimmedInput)
  }

  useEffect(() => {
    const lastPost = lastPostRef.current
    if (!lastPost || !hasNextPage || isFetching || isFetchNextPageError) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        void fetchNextPage()
      }
    })

    observer.observe(lastPost)
    return () => observer.disconnect()
  }, [posts.length, keyword, hasNextPage, isFetching, isFetchNextPageError, fetchNextPage])

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold">게시글 목록</h1>
      <form onSubmit={handleSearch} className="my-4 flex gap-2">
        <label htmlFor="keyword">제목 검색</label>
        <input
          id="keyword"
          value={input}
          onChange={(event) => {
            const value = event.target.value
            setInput(value)
            if (!value.trim()) setKeyword('')
          }}
          aria-describedby={isInvalidKeyword ? 'keyword-error' : undefined}
          className="min-w-0 border p-2"
        />
        <button type="submit" disabled={!trimmedInput || isInvalidKeyword} className="border px-4 py-2">
          검색
        </button>
      </form>
      {isInvalidKeyword && <p id="keyword-error" role="alert">검색어는 2~50자로 입력해주세요.</p>}
      {isPending && <p>게시글을 불러오는 중이에요.</p>}
      {isError && <p role="alert">게시글 목록 조회에 실패했어요.</p>}
      {data && posts.length === 0 && <p>게시글이 없어요.</p>}
      <ul className="flex flex-col gap-4">
        {posts.map((post, index) => (
          <li key={post.id} ref={index === posts.length - 1 ? lastPostRef : undefined}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
      {isFetchingNextPage && <p>다음 게시글을 불러오는 중이에요.</p>}
    </section>
  )
}
