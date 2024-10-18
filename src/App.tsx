import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import RootLayout from './layouts/RootLayout'
import { Login } from './pages/Login'
import { useAuth } from './hooks/useAuth'

const Home = lazy(() => import('./pages/Home'))

export default function App() {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>
  }



  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route
              path="login"
              element={
                user ? <Navigate to="/" replace /> : <Login />
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}