import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Github, ExternalLink, Code2 } from 'lucide-react'
import SEO from '../components/SEO'
import { getProjects as fetchProjects } from '../api/projects'



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
        setProjects(data.data)
      } catch {
        setProjects([])
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  return (
    <section className='min-h-screen bg-black text-white flex flex-col justify-center py-24 px-6 md:px-12'>
      <SEO title="Projects" description="Featured projects built with modern web technologies." />
      <div className='max-w-7xl w-full mx-auto'>

        <h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-nevera text-[#ff3300] tracking-tighter leading-none mb-12 -ml-1'>
          PROJECTS
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 rounded-full border-4 border-[#ff3300]/20 border-t-[#ff3300] animate-spin"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className='w-full py-24 flex flex-col items-center justify-center text-center opacity-80'>
            <Code2 className='w-20 h-20 text-[#ff3300] mb-8 opacity-80' />
            <h3 className='text-4xl md:text-5xl font-nevera font-bold tracking-widest text-white mb-4'>
              COMING SOON
            </h3>
            <p className='font-manrope text-gray-400 max-w-lg mx-auto text-lg'>
              I am currently curating my best work. Check back soon for exciting new projects and in-depth case studies!
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>
            {projects.map((project) => (
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
        )}

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
