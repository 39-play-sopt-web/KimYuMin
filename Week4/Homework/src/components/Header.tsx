import { Link, useLocation, useNavigate } from 'react-router'
import { clearAuth, getPart } from '../lib/authStorage'

export default function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  if (pathname === '/' || pathname === '/auth') return null

  const part = getPart()

  function handleLogout() {
    clearAuth()
    navigate('/auth')
  }

  return (
    <header className="flex items-center justify-between border-b p-4">
      <span>{part}</span>
      <nav aria-label="메인 메뉴" className="flex gap-4">
        <Link to="/posts">게시글 목록</Link>
        <Link to="/posts/new">글쓰기</Link>
        <button type="button" onClick={handleLogout}>로그아웃</button>
      </nav>
    </header>
  )
}
