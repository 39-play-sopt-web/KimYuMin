import { Link, NavLink, useLocation, useNavigate } from 'react-router'
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
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-5 py-4">
      <div className="flex items-center gap-3">
        <Link to="/posts" className="text-base font-bold">PLAY SOPT <span className="text-primary">BOARD</span></Link>
        {part && <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-primary">{part} 파트</span>}
      </div>
      <nav aria-label="메인 메뉴" className="flex items-center gap-5 text-xs sm:text-sm">
        <NavLink to="/posts" end className={({ isActive }) => isActive ? 'font-medium text-primary' : 'text-muted hover:text-primary'}>게시글 목록</NavLink>
        <NavLink to="/posts/new" className={({ isActive }) => isActive ? 'font-medium text-primary' : 'text-muted hover:text-primary'}>글쓰기</NavLink>
        <button type="button" onClick={handleLogout} className="text-muted hover:text-primary">로그아웃</button>
      </nav>
    </header>
  )
}
