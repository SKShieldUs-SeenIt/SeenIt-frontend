import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import DetailPage from './pages/DetailPage.jsx'
import ReviewPage from './pages/ReviewPage.jsx'
import PostPage from './pages/PostPage.jsx'
import WritePostPage from './pages/WritePostPage.jsx'
import PostDetailPage from './pages/PostDetailPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DetailPage />} />
        <Route path="/reviews" element={<ReviewPage />} />
        <Route path="/posts" element={<PostPage />} />  
        <Route path="/writePosts" element={<WritePostPage />} />     
        <Route path="/postDetails" element={<PostDetailPage />} /> 
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
