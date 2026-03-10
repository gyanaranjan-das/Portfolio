import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Code2, Calendar, Tag, ArrowRight } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SEO from '../components/SEO'
import { getPosts } from '../api/blog'

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await getPosts()
        setPosts(data.data || [])
      } catch (err) {
        console.error('Failed to load blog posts', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  // GSAP Animations
  useGSAP(() => {
    if (!loading && posts.length > 0) {
      gsap.from('.blog-card', {
        scrollTrigger: {
          trigger: '.blog-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      })
    }

    // Animate Coming Soon state if empty
    if (!loading && posts.length === 0) {
      gsap.from('.blog-coming-soon-item', {
        scrollTrigger: {
          trigger: '.blog-coming-soon-section',
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
  }, [loading, posts])

  // Static Elements GSAP Animations
  useGSAP(() => {
    // Blog Header Reveal Animation
    gsap.from('.blog-header-char', {
      scrollTrigger: {
        trigger: '.blog-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.05,
      ease: 'power4.out',
      clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)'
    })

    // Animate subtitle
    gsap.from('.blog-subtitle', {
      scrollTrigger: {
        trigger: '.blog-section',
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
    <section className='min-h-screen text-white py-24 px-6 md:px-12 overflow-hidden blog-section'>
      <SEO title="Blog" description="Thoughts on web development, design, and technology." />
      <div className='max-w-7xl w-full mx-auto'>

        {/* Section Header */}
        <h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-nevera text-[#FF0000] tracking-tighter leading-none mb-4 -ml-1 overflow-hidden py-2'>
          {"BLOG".split("").map((char, index) => (
            <span
              key={index}
              className="inline-block blog-header-char"
              style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 0)' }}
            >
              {char}
            </span>
          ))}
        </h1>
        <p className='font-manrope text-gray-400 text-lg mb-12 max-w-2xl blog-subtitle'>
          Thoughts on web development, design patterns, and the tech I&apos;m exploring.
        </p>

        {/* Loading State */}
        {loading && (
          <div className='w-full py-24 flex items-center justify-center'>
            <div className='w-8 h-8 border-2 border-[#FF0000] border-t-transparent rounded-full animate-spin'></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <div className='w-full py-24 flex flex-col items-center justify-center text-center opacity-80 blog-coming-soon-section'>
            <Code2 className='w-20 h-20 text-[#FF0000] mb-8 opacity-80 blog-coming-soon-item' />
            <h3 className='text-4xl md:text-5xl font-nevera font-bold tracking-widest text-white mb-4 blog-coming-soon-item'>
              COMING SOON
            </h3>
            <p className='font-manrope text-gray-400 max-w-lg mx-auto text-lg blog-coming-soon-item'>
              I am currently thinking of some exciting topics. Check back soon for new blog posts!
            </p>
          </div>
        )}

        {/* Blog Posts Grid */}
        {!loading && posts.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 blog-grid'>
            {posts.map((post) => (
              <Link
                key={post._id}
                to={`/blog/${post.slug}`}
                className='group bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-[#FF0000]/40 transition-colors duration-500 block blog-card'
              >
                {/* Featured Image */}
                {post.featuredImage && (
                  <div className='relative aspect-video overflow-hidden'>
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className='w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700'
                    />
                    <div className='absolute inset-0 bg-[#FF0000] mix-blend-multiply opacity-50 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none'></div>
                  </div>
                )}

                {/* Content */}
                <div className='p-6 space-y-3'>
                  {/* Date */}
                  <div className='flex items-center gap-2 text-xs text-gray-500 font-manrope'>
                    <Calendar className='w-3.5 h-3.5' />
                    {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>

                  <h3 className='text-lg font-nevera font-bold text-white tracking-wide group-hover:text-[#FF0000] transition-colors duration-300 leading-snug'>
                    {post.title}
                  </h3>

                  <p className='font-manrope text-gray-400 text-sm leading-relaxed line-clamp-3'>
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className='flex flex-wrap gap-2 pt-1'>
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className='text-xs font-manrope text-[#FF0000]/80 bg-[#FF0000]/5 px-2.5 py-0.5 rounded-full border border-[#FF0000]/15 flex items-center gap-1'
                        >
                          <Tag className='w-2.5 h-2.5' /> {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read More */}
                  <div className='flex items-center gap-1 text-[#FF0000] font-reross uppercase text-xs tracking-wide pt-2 group-hover:gap-2 transition-all duration-300'>
                    Read More <ArrowRight className='w-3.5 h-3.5' />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}

export default Blog
