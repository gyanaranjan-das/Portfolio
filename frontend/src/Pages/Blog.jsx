import { Code2 } from 'lucide-react'
import SEO from '../components/SEO'

const Blog = () => {
  return (
    <section className='min-h-screen text-white py-24 px-6 md:px-12'>
      <SEO title="Blog" description="Thoughts on web development, design, and technology." />
      <div className='max-w-7xl w-full mx-auto'>

        {/* Section Header */}
        <h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-nevera text-[#FF0000] tracking-tighter leading-none mb-6 -ml-1'>
          BLOG
        </h1>
        <p className='font-manrope text-gray-400 text-lg mb-12 max-w-2xl'>
          Thoughts on web development, design patterns, and the tech I&apos;m exploring.
        </p>

        <div className='w-full py-24 flex flex-col items-center justify-center text-center opacity-80'>
          <Code2 className='w-20 h-20 text-[#FF0000] mb-8 opacity-80' />
          <h3 className='text-4xl md:text-5xl font-nevera font-bold tracking-widest text-white mb-4'>
            COMING SOON
          </h3>
          <p className='font-manrope text-gray-400 max-w-lg mx-auto text-lg'>
            I am currently thinking of some exciting topics. Check back soon for new blog posts!
          </p>
        </div>

      </div>
    </section>
  )
}

export default Blog
