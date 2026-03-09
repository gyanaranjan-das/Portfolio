import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Route, Routes, useLocation } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'

// Lazy-loaded pages
const Home = lazy(() => import('./Pages/Home'))
const Bio = lazy(() => import('./Pages/Bio'))
const Projects = lazy(() => import('./Pages/Projects'))
const Blog = lazy(() => import('./Pages/Blog'))
const BlogPost = lazy(() => import('./Pages/BlogPost'))
const Contact = lazy(() => import('./Pages/Contact'))
const NotFound = lazy(() => import('./Pages/NotFound'))

// Admin pages
const Login = lazy(() => import('./Pages/admin/Login'))
const AdminLayout = lazy(() => import('./Pages/admin/AdminLayout'))
const Dashboard = lazy(() => import('./Pages/admin/Dashboard'))
const ProjectsAdmin = lazy(() => import('./Pages/admin/ProjectsAdmin'))
const BlogAdmin = lazy(() => import('./Pages/admin/BlogAdmin'))
const ContactsAdmin = lazy(() => import('./Pages/admin/ContactsAdmin'))
const SiteConfigAdmin = lazy(() => import('./Pages/admin/SiteConfigAdmin'))

// Loading fallback
const PageLoader = () => (
  <div className='min-h-screen flex items-center justify-center'>
    <div className='w-8 h-8 border-2 border-[#FF0000] border-t-transparent rounded-full animate-spin'></div>
  </div>
)

const App = () => {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div>
      {/* Hide public Navbar/Footer on admin pages */}
      {!isAdminRoute && <Navbar />}

      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public routes */}
          <Route path='/' element={<Home />} />
          <Route path='/Bio' element={<Bio />} />
          <Route path='/Projects' element={<Projects />} />
          <Route path='/Blog' element={<Blog />} />
          <Route path='/blog/:slug' element={<BlogPost />} />

          {/* Admin routes */}
          <Route path='/admin/login' element={<Login />} />
          <Route
            path='/admin'
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path='projects' element={<ProjectsAdmin />} />
            <Route path='blog' element={<BlogAdmin />} />
            <Route path='contacts' element={<ContactsAdmin />} />
            <Route path='config' element={<SiteConfigAdmin />} />
          </Route>

          {/* 404 Catch-all */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>

      {!isAdminRoute && (
        <>
          <Contact />
          <Footer />
        </>
      )}
    </div>
  )
}

export default App
