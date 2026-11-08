import { useState } from "react";
import type { SubmitEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { usePostDetailQuery } from "../hooks/usePostsQuery";
import {
  useDeletePostMutation,
  useUpdatePostMutation,
} from "../hooks/usePostMutations";
import { getAuthorizationCode } from "../lib/authStorage";

export default function PostDetailPage() {
  const { postId } = useParams();
  const id = Number(postId);
  const navigate = useNavigate();
  const { data: post, isPending, isError } = usePostDetailQuery(id);
  const updateMutation = useUpdatePostMutation(id);
  const deleteMutation = useDeletePostMutation(id);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function requireAuthorization() {
    if (getAuthorizationCode()) return true;
    window.alert("회원 코드를 발급받아주세요.");
    navigate("/auth");
    return false;
  }

  function handleEdit() {
    if (!post || !requireAuthorization()) return;
    setTitle(post.title);
    setContent(post.content);
    setEditingId(id);
  }

  function handleUpdate(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!requireAuthorization()) return;
    updateMutation.mutate(
      { title, content },
      {
        onSuccess: () => setEditingId(null),
      },
    );
  }

  function handleDelete() {
    if (!requireAuthorization()) return;
    deleteMutation.mutate();
  }

  if (!Number.isSafeInteger(id) || id <= 0) {
    return (
      <section className="page-shell">
        <p className="state-panel">올바르지 않은 게시글 주소예요.</p>
        <Link
          to="/posts"
          className="text-sm text-muted hover:text-primary mt-6"
        >
          ← 뒤로가기
        </Link>
      </section>
    );
  }

  if (isPending) {
    return (
      <section className="page-shell">
        <p className="state-panel">게시글을 불러오는 중.</p>
        <Link
          to="/posts"
          className="text-sm text-muted hover:text-primary mt-6"
        >
          ← 뒤로가기
        </Link>
      </section>
    );
  }

  if (isError || !post) {
    return (
      <section className="page-shell">
        <p role="alert" className="state-panel text-danger">
          게시글 상세 조회에 실패했어요.
        </p>
        <Link
          to="/posts"
          className="text-sm text-muted hover:text-primary mt-6"
        >
          ← 뒤로가기
        </Link>
      </section>
    );
  }

  return (
    <section className="page-shell">
      <Link
        to="/posts"
        className="text-sm text-muted hover:text-primary mb-5 inline-block"
      >
        뒤로가기
      </Link>
      <article className="rounded-xl border border-border bg-surface p-5 sm:p-6">
        <h1 className="mb-4 text-sm text-muted">게시글 상세</h1>
        {editingId === id ? (
          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <label htmlFor="edit-title" className="text-sm font-medium">
              제목
            </label>
            <input
              id="edit-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="field"
            />
            <label htmlFor="edit-content" className="text-sm font-medium mt-3">
              본문
            </label>
            <textarea
              id="edit-content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="field min-h-72 resize-y"
            />
            <button type="submit" className="button-primary mt-3 self-end">
              수정 완료
            </button>
          </form>
        ) : (
          <h2 className="text-xl font-semibold break-words">{post.title}</h2>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-3 border-b border-border pb-4 text-xs">
          <span className="font-medium text-primary">{post.author}</span>
          <time dateTime={post.createdAt} className="text-muted">
            {new Date(post.createdAt).toLocaleString("ko-KR")}
          </time>
        </div>
        {editingId !== id && (
          <p className="min-h-48 py-6 text-sm leading-7 whitespace-pre-wrap break-words">
            {post.content}
          </p>
        )}
        <div className="flex justify-end gap-2 border-t border-border pt-4">
          {editingId !== id && (
            <button
              type="button"
              onClick={handleEdit}
              className="button-secondary"
            >
              수정
            </button>
          )}
          <button
            type="button"
            onClick={handleDelete}
            className="button-secondary text-danger"
          >
            삭제
          </button>
        </div>
        {deleteMutation.isError && (
          <p role="alert" className="text-sm text-danger mt-4 text-right">
            게시글 삭제에 실패했어요.
          </p>
        )}
      </article>
    </section>
  );
}
