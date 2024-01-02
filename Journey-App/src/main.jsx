import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Register from './pages/register.jsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JournalistPage from './pages/journalist.jsx'
import ArticleForm from './pages/submission.jsx'
import ArticlePage from './pages/article.jsx'
import EditorPage from './pages/editor.jsx'
import ReaderPage from './pages/reader.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={<App />}
        />
        <Route
          exact
          path="/reader"
          element={<ReaderPage />}
        />
        <Route
          exact
          path="/journalist"
          element={<JournalistPage />}
        />
        <Route
          exact
          path="/editor"
          element={<EditorPage />}
        />
        <Route
          exact
          path="/submit"
          element={<ArticleForm />}
        />
        <Route
          exact
          path="/register"
          element={<Register />}
        />
        <Route path="/article/:id" element={<ArticlePage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
