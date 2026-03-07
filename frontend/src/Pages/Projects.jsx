import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Github, ExternalLink, Code2 } from 'lucide-react'
import SEO from '../components/SEO'
import { getProjects as fetchProjects } from '../api/projects'

// Fallback data for when backend is not running
const fallbackProjects = [
  {
    _id: '1',
    title: 'E-Commerce App',
    slug: 'ecommerce-app',
    shortDescription: 'Full-stack e-commerce with cart, checkout, and auth',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    featuredImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
    githubUrl: 'https://github.com/gyanaranjan-das',
    liveUrl: '',
  },
  {
    _id: '2',
    title: 'SaaS Dashboard',
    slug: 'saas-dashboard',
    shortDescription: 'Analytics dashboard with real-time charts and dark mode',
    techStack: ['React', 'Tailwind CSS', 'Chart.js', 'Node.js'],
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    githubUrl: '',
    liveUrl: 'https://example.com',
  },
  {
    _id: '3',
    title: 'Portfolio V1',
    slug: 'portfolio-v1',
    shortDescription: 'Personal portfolio with dark theme and custom typography',
    techStack: ['React', 'Vite', 'Tailwind CSS'],
    featuredImage: 'https://images.unsplash.com/photo-1627398225058-f4f9f743ab6a?q=80&w=1964&auto=format&fit=crop',
    githubUrl: '',
    liveUrl: 'https://example.com',
  },
]

const iconMap = {
  github: <Github className='w-5 h-5 text-white/90' />,
  live: <ExternalLink className='w-5 h-5 text-white/90' />,
  code: <Code2 className='w-5 h-5 text-white/90' />,
}

const getIcon = (project) => {
  if (project.githubUrl) return iconMap.github
  if (project.liveUrl) return iconMap.live
  return iconMap.code
}

const getLabel = (project) => {
  if (project.githubUrl) return 'View Code On'
  if (project.liveUrl) return 'Live Demo On'
  return 'Deployed On'
}

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const { data } = await fetchProjects()
        setProjects(data.data.length > 0 ? data.data : fallbackProjects)
      } catch {
        setProjects(fallbackProjects)
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  const displayProjects = loading ? fallbackProjects : projects

  return (
    <section className='min-h-screen bg-black text-white flex flex-col justify-center py-24 px-6 md:px-12'>
      <SEO title="Projects" description="Featured projects built with modern web technologies." />
      <div className='max-w-7xl w-full mx-auto'>

        <h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-nevera text-[#ff3300] tracking-tighter leading-none mb-12 -ml-1'>
          PROJECTS
        </h1>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>
          {displayProjects.map((project) => (
            <a
              key={project._id}
              href={project.githubUrl || project.liveUrl || '#'}
              target='_blank'
              rel='noopener noreferrer'
              className='group relative w-full aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 cursor-pointer block'
            >
              <img
                src={project.featuredImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop'}
                className='absolute inset-0 w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 transition-transform duration-700'
                alt={project.title}
              />
              <div className='absolute inset-0 bg-[#b30000] mix-blend-multiply opacity-90 pointer-events-none'></div>
              <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none'></div>

              <div className='absolute top-6 right-6 w-10 h-10 rounded bg-[#ff3300]/20 flex items-center justify-center border border-[#ff3300]/40'>
                {getIcon(project)}
              </div>

              <div className='absolute bottom-8 left-0 w-full flex flex-col items-center justify-end text-center z-10 px-4'>
                <span className='text-sm text-gray-300 font-manrope font-medium mb-1 tracking-wide'>
                  {getLabel(project)}
                </span>
                <h3 className='text-2xl sm:text-3xl font-bold font-nevera text-white tracking-widest uppercase'>
                  {project.title}
                </h3>
                {project.techStack && project.techStack.length > 0 && (
                  <div className='flex flex-wrap justify-center gap-2 mt-3'>
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span key={tech} className='text-xs text-[#ff3300]/80 bg-black/40 px-2 py-0.5 rounded-full border border-[#ff3300]/20'>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>

        <div className='w-full flex justify-end mt-12'>
          <Link to='/Projects'
            className='text-[#ff3300] relative text-lg font-bold tracking-wide group pb-1 font-reross uppercase inline-block'>
            View All Projects
            <span className='absolute left-0 bottom-0 w-full h-[2px] bg-[#ff3300] opacity-30'></span>
            <span className='absolute left-0 bottom-0 w-0 h-[2px] bg-[#ff3300] transition-all duration-300 group-hover:w-full'></span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Projects
