import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import WelcomePage from './pages/WelcomePage'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import AchievementMapPage from './pages/AchievementMapPage'

function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) return null

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/main" /> : <WelcomePage />} />
      <Route path="/login" element={user ? <Navigate to="/main" /> : <LoginPage />} />
      <Route path="/main" element={user ? <MainPage /> : <Navigate to="/" />} />
      <Route path="/map" element={user ? <AchievementMapPage /> : <Navigate to="/" />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
