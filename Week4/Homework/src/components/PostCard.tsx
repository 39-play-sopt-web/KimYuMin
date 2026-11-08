import { Link } from 'react-router'
import type { Post } from '../types/post'

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link to={`/posts/${post.id}`} className="block rounded-xl border border-border bg-surface p-4 transition-colors hover:border-primary/50">
      <h2 className="line-clamp-2 text-base font-semibold break-words">{post.title}</h2>
      <p className="mt-1 line-clamp-2 whitespace-pre-wrap text-sm break-words text-muted">{post.content}</p>
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        <span className="font-medium text-primary">{post.author}</span>
        <time dateTime={post.createdAt} className="text-muted">{new Date(post.createdAt).toLocaleString('ko-KR')}</time>
      </div>
    </Link>
  )
}
