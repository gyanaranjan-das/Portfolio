import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Tag, ArrowRight } from 'lucide-react'
import SEO from '../components/SEO'
import { getPosts } from '../api/blog'

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await getPosts()
        setPosts(data.data)
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <section className='min-h-screen bg-black text-white py-24 px-6 md:px-12'>
      <SEO title="Blog" description="Thoughts on web development, design, and technology." />
      <div className='max-w-7xl w-full mx-auto'>

        {/* Section Header */}
        <h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-nevera text-[#ff3300] tracking-tighter leading-none mb-6 -ml-1'>
          BLOG
        </h1>
        <p className='font-manrope text-gray-400 text-lg mb-12 max-w-2xl'>
          Thoughts on web development, design patterns, and the tech I&apos;m exploring.
        </p>

        {/* Loading State */}
        {loading && (
          <div className='flex justify-center py-20'>
            <div className='w-8 h-8 border-2 border-[#ff3300] border-t-transparent rounded-full animate-spin'></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <div className='text-center py-20'>
            <p className='text-gray-500 font-manrope text-lg'>No blog posts yet. Check back soon!</p>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && posts.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
            {posts.map((post) => (
              <Link
                key={post._id}
                to={`/blog/${post.slug}`}
                className='group relative rounded-2xl overflow-hidden border border-white/10 bg-[#111] hover:border-[#ff3300]/50 transition-all duration-300 flex flex-col'
              >
                {/* Featured Image */}
                {post.featuredImage && (
                  <div className='relative h-52 overflow-hidden'>
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className='w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 transition-transform duration-700'
                    />
                    <div className='absolute inset-0 bg-[#b30000] mix-blend-multiply opacity-70 pointer-events-none'></div>
                    <div className='absolute inset-0 bg-gradient-to-t from-[#111] to-transparent pointer-events-none'></div>
                  </div>
                )}

                {/* Content */}
                <div className='p-6 flex flex-col flex-1'>
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className='flex flex-wrap gap-2 mb-3'>
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className='text-xs font-manrope text-[#ff3300] bg-[#ff3300]/10 px-2 py-0.5 rounded-full border border-[#ff3300]/20'>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <h3 className='text-xl font-bold font-nevera text-white tracking-wide mb-2 group-hover:text-[#ff3300] transition-colors'>
                    {post.title}
                  </h3>

                  <p className='font-manrope text-gray-400 text-sm leading-relaxed mb-4 flex-1'>
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className='flex items-center justify-between text-xs text-gray-500 font-manrope mt-auto pt-4 border-t border-white/5'>
                    <span className='flex items-center gap-1'>
                      <Calendar className='w-3 h-3' />
                      {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className='flex items-center gap-1 text-[#ff3300] group-hover:gap-2 transition-all'>
                      Read <ArrowRight className='w-3 h-3' />
                    </span>
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
