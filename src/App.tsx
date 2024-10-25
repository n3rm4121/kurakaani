import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import RootLayout from './components/layout/RootLayout'
import { useAuth } from './hooks/useAuth'
import Loader from './components/Loader'
import Docs from './pages/Docs'

const Home = lazy(() => import('./pages/Home'))

export default function App() {
  const { loading } = useAuth();
  if (loading) {
    return <Loader size='md' centered />
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path='/docs' element={<Docs />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}