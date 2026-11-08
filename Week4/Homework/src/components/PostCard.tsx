import { Link } from 'react-router'
import type { Post } from '../types/post'

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link to={`/posts/${post.id}`} className="block border p-4">
      <h2 className="text-lg font-bold">{post.title}</h2>
      <p className="mt-2 line-clamp-2 whitespace-pre-wrap break-words">{post.content}</p>
      <p className="mt-2">{post.author}</p>
    </Link>
  )
}
