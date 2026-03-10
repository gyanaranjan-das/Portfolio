import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Code2, Github, ExternalLink } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SEO from '../components/SEO'
import { getProjects } from '../api/projects'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await getProjects()
        setProjects(data.data || [])
      } catch (err) {
        console.error('Failed to load projects', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  // GSAP Animations
  useGSAP(() => {
    // Only animate if projects exist and are loaded
    if (!loading && projects.length > 0) {
      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      })
    }

    // Animate Coming Soon state if empty
    if (!loading && projects.length === 0) {
      gsap.from('.coming-soon-item', {
        scrollTrigger: {
          trigger: '.coming-soon-section',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      })
    }
  }, [loading, projects])

  // Static Elements GSAP Animations
  useGSAP(() => {
    // Projects Header Reveal Animation
    gsap.from('.header-char', {
      scrollTrigger: {
        trigger: '.projects-section',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.03,
      ease: 'power4.out',
      clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' // this adds a cool text clip effect
    })

    // Animate subtitle
    gsap.from('.projects-subtitle', {
      scrollTrigger: {
        trigger: '.projects-section',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      },
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
  }, [])

  return (
    <section className='min-h-screen text-white flex flex-col justify-center py-24 px-6 md:px-12 overflow-hidden projects-section'>
      <SEO title="Projects" description="Featured projects built with modern web technologies." />
      <div className='max-w-7xl w-full mx-auto'>

        <h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-nevera text-[#FF0000] tracking-tighter leading-none mb-4 -ml-1 overflow-hidden py-2'>
          {"PROJECTS".split("").map((char, index) => (
            <span
              key={index}
              className="inline-block header-char custom-clip-start"
              style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 0)' }} // End state for GSAP to animate to 
            >
              {char}
            </span>
          ))}
        </h1>
        <p className='font-manrope text-gray-400 text-lg mb-12 max-w-2xl projects-subtitle'>
          A selection of things I've built, broken, and shipped.
        </p>

        {/* Loading State */}
        {loading && (
          <div className='w-full py-24 flex items-center justify-center'>
            <div className='w-8 h-8 border-2 border-[#FF0000] border-t-transparent rounded-full animate-spin'></div>
          </div>
        )}

        {/* Empty State / Coming Soon */}
        {!loading && projects.length === 0 && (
          <div className='w-full py-24 flex flex-col items-center justify-center text-center coming-soon-section'>
            <Code2 className='w-20 h-20 text-[#FF0000] mb-8 opacity-80 coming-soon-item' />
            <h3 className='text-4xl md:text-5xl font-nevera font-bold tracking-widest text-[#FF0000] mb-4 coming-soon-item'>
              COMING SOON
            </h3>
            <p className='font-manrope text-gray-400 max-w-lg mx-auto text-lg coming-soon-item'>
              I'm currently brewing up some exciting projects in my local environment.
              Check back soon to see what's deploying next.
            </p>
          </div>
        )}

        {/* Project Grid */}
        {!loading && projects.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 projects-grid'>
            {projects.map((project) => (
              <div
                key={project._id}
                className='group relative bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-[#FF0000]/40 transition-colors duration-500 project-card'
              >
                {/* Featured Image */}
                {project.featuredImage && (
                  <div className='relative aspect-video overflow-hidden'>
                    <img
                      src={project.featuredImage}
                      alt={project.title}
                      className='w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700'
                    />
                    <div className='absolute inset-0 bg-[#FF0000] mix-blend-multiply opacity-50 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none'></div>
                  </div>
                )}

                {/* Content */}
                <div className='p-6 space-y-4'>
                  <h3 className='text-xl font-nevera font-bold text-white tracking-wide group-hover:text-[#FF0000] transition-colors duration-300'>
                    {project.title}
                  </h3>

                  <p className='font-manrope text-gray-400 text-sm leading-relaxed line-clamp-3'>
                    {project.shortDescription || project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  {project.techStack && project.techStack.length > 0 && (
                    <div className='flex flex-wrap gap-2 pt-1'>
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className='text-xs font-manrope text-[#FF0000] bg-[#FF0000]/10 px-3 py-1 rounded-full border border-[#FF0000]/20'
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Links */}
                  <div className='flex gap-3 pt-2'>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-[#FF0000] hover:border-[#FF0000]/40 transition-colors'
                      >
                        <Github className='w-4 h-4' />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:text-[#FF0000] hover:border-[#FF0000]/40 transition-colors'
                      >
                        <ExternalLink className='w-4 h-4' />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}

export default Projects
