import { Code2 } from 'lucide-react'
import SEO from '../components/SEO'

const Projects = () => {
  return (
    <section className='min-h-screen text-white flex flex-col justify-center py-24 px-6 md:px-12'>
      <SEO title="Projects" description="Featured projects built with modern web technologies." />
      <div className='max-w-7xl w-full mx-auto'>

        <h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-nevera text-[#FF0000] tracking-tighter leading-none mb-12 -ml-1'>
          PROJECTS
        </h1>

        <div className='w-full py-24 flex flex-col items-center justify-center text-center opacity-80'>
          <Code2 className='w-20 h-20 text-[#FF0000] mb-8 opacity-80' />
          <h3 className='text-4xl md:text-5xl font-nevera font-bold tracking-widest text-white mb-4'>
            COMING SOON
          </h3>
          <p className='font-manrope text-gray-400 max-w-lg mx-auto text-lg'>
            I am currently curating my best work. Check back soon for exciting new projects and in-depth case studies!
          </p>
        </div>

      </div>
    </section>
  )
}

export default Projects
