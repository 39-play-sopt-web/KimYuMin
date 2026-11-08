import { useEffect, useRef, useState } from "react";
import type { SubmitEvent } from "react";
import PostCard from "../components/PostCard";
import { usePostsQuery } from "../hooks/usePostsQuery";

export default function PostListPage() {
  const [input, setInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const lastPostRef = useRef<HTMLLIElement>(null);
  const {
    data,
    isPending,
    isError,
    isFetching,
    isFetchingNextPage,
    isFetchNextPageError,
    hasNextPage,
    fetchNextPage,
  } = usePostsQuery(keyword);

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];
  const trimmedInput = input.trim();
  const isInvalidKeyword =
    trimmedInput.length > 0 &&
    (trimmedInput.length < 2 || trimmedInput.length > 50);

  function handleSearch(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isInvalidKeyword) return;
    setKeyword(trimmedInput);
  }

  useEffect(() => {
    const lastPost = lastPostRef.current;
    if (!lastPost || !hasNextPage || isFetching || isFetchNextPageError) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        void fetchNextPage();
      }
    });

    observer.observe(lastPost);
    return () => observer.disconnect();
  }, [
    posts.length,
    keyword,
    hasNextPage,
    isFetching,
    isFetchNextPageError,
    fetchNextPage,
  ]);

  return (
    <section className="page-shell">
      <h1 className="mb-4 text-xl font-semibold">게시글 목록</h1>
      <form onSubmit={handleSearch} className="mb-5 flex items-center gap-2">
        <input
          id="keyword"
          placeholder="제목으로 검색"
          value={input}
          onChange={(event) => {
            const value = event.target.value;
            setInput(value);
            if (!value.trim()) setKeyword("");
          }}
          aria-describedby={isInvalidKeyword ? "keyword-error" : undefined}
          className="field min-w-0 flex-1"
        />
        <button
          type="submit"
          disabled={!trimmedInput || isInvalidKeyword}
          className="button-primary shrink-0"
        >
          검색
        </button>
      </form>
      {isInvalidKeyword && (
        <p id="keyword-error" role="alert" className="text-sm text-danger mb-6">
          검색어는 2~50자로 입력해주세요.
        </p>
      )}
      {isPending && <p className="state-panel">게시글을 불러오는 중이에요.</p>}
      {isError && (
        <p role="alert" className="state-panel text-danger">
          게시글 목록 조회에 실패했어요.
        </p>
      )}
      {data && posts.length === 0 && (
        <p className="state-panel">게시글이 없어요.</p>
      )}
      <ul className="flex flex-col gap-3">
        {posts.map((post, index) => (
          <li
            key={post.id}
            ref={index === posts.length - 1 ? lastPostRef : undefined}
          >
            <PostCard post={post} />
          </li>
        ))}
      </ul>
      {isFetchingNextPage && (
        <p className="py-8 text-center text-sm text-muted">
          다음 게시글을 불러오는 중이에요.
        </p>
      )}
    </section>
  );
}
