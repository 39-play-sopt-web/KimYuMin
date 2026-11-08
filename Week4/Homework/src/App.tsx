import { Route, Routes } from 'react-router'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'
import AuthPage from './pages/AuthPage'
import PostListPage from './pages/PostListPage'
import PostWritePage from './pages/PostWritePage'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/posts" element={<PostListPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/posts/new" element={<PostWritePage />} />
        </Route>
        <Route path="/posts/:postId" element={<h1>게시글 상세</h1>} />
      </Routes>
    </>
  )
}

export default App
