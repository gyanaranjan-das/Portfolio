import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import SEO from '../components/SEO'
import { getPost } from '../api/blog'

const BlogPost = () => {
    const { slug } = useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await getPost(slug)
                setPost(data.data)
            } catch (err) {
                setError(err.response?.status === 404 ? 'Post not found' : 'Failed to load post')
            } finally {
                setLoading(false)
            }
        }
        fetchPost()
    }, [slug])

    if (loading) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className='w-8 h-8 border-2 border-[#FF0000] border-t-transparent rounded-full animate-spin'></div>
            </div>
        )
    }

    if (error || !post) {
        return (
            <div className='min-h-screen text-white flex flex-col items-center justify-center gap-4'>
                <p className='text-gray-400 font-manrope text-lg'>{error || 'Post not found'}</p>
                <Link to='/blog' className='text-[#FF0000] font-reross uppercase tracking-wide hover:underline'>
                    ← Back to Blog
                </Link>
            </div>
        )
    }

    return (
        <article className='min-h-screen text-white pt-24 pb-16 px-6 md:px-12'>
            <SEO title={post.title} description={post.excerpt} image={post.featuredImage} />
            <div className='max-w-3xl mx-auto'>

                {/* Back Link */}
                <Link to='/blog' className='inline-flex items-center gap-2 text-[#FF0000] font-reross uppercase text-sm tracking-wide mb-8 hover:gap-3 transition-all'>
                    <ArrowLeft className='w-4 h-4' /> Back to Blog
                </Link>

                {/* Title */}
                <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold font-nevera text-white tracking-wide leading-tight mb-6'>
                    {post.title}
                </h1>

                {/* Meta */}
                <div className='flex flex-wrap items-center gap-4 text-sm text-gray-500 font-manrope mb-8'>
                    <span className='flex items-center gap-1'>
                        <Calendar className='w-4 h-4' />
                        {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span>by {post.author}</span>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className='flex flex-wrap gap-2 mb-10'>
                        {post.tags.map((tag) => (
                            <span key={tag} className='text-xs font-manrope text-[#FF0000] bg-[#FF0000]/10 px-3 py-1 rounded-full border border-[#FF0000]/20 flex items-center gap-1'>
                                <Tag className='w-3 h-3' /> {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Featured Image */}
                {post.featuredImage && (
                    <div className='relative rounded-2xl overflow-hidden mb-10 border border-white/10'>
                        <img src={post.featuredImage} alt={post.title} className='w-full h-auto object-cover grayscale brightness-75' />
                        <div className='absolute inset-0 bg-[#FF0000] mix-blend-multiply opacity-60 pointer-events-none'></div>
                    </div>
                )}

                {/* Content */}
                <div
                    className='prose prose-invert prose-lg max-w-none font-manrope
            prose-headings:font-nevera prose-headings:text-white prose-headings:tracking-wide
            prose-p:text-gray-300 prose-p:leading-relaxed
            prose-a:text-[#FF0000] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white
            prose-code:text-[#FF0000] prose-code:bg-[#FF0000]/10 prose-code:px-1 prose-code:rounded
            prose-pre:bg-[#111] prose-pre:border prose-pre:border-white/10'
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </div>
        </article>
    )
}

export default BlogPost
