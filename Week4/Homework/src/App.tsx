import { Route, Routes } from 'react-router'
import AuthPage from './pages/AuthPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/posts" element={<h1>게시글 목록</h1>} />
    </Routes>
  )
}

export default App
