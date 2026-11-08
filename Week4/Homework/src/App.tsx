import { Route, Routes } from 'react-router'
import Header from './components/Header'
import AuthPage from './pages/AuthPage'
import PostListPage from './pages/PostListPage'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/posts" element={<PostListPage />} />
        <Route path="/posts/new" element={<h1>게시글 작성</h1>} />
        <Route path="/posts/:postId" element={<h1>게시글 상세</h1>} />
      </Routes>
    </>
  )
}

export default App
