import { useState, useEffect } from 'react'
import { Trash2, Edit, Plus, X, Eye, EyeOff } from 'lucide-react'
import { getPosts, createPost, updatePost, deletePost } from '../../api/blog'

const BlogAdmin = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [form, setForm] = useState({
        title: '', content: '', excerpt: '', tags: '', published: false, featuredImage: '',
    })

    const fetchAll = async () => {
        try {
            const { data } = await getPosts(true)
            setPosts(data.data)
        } catch { /* empty */ } finally { setLoading(false) }
    }

    useEffect(() => { fetchAll() }, [])

    const resetForm = () => {
        setForm({ title: '', content: '', excerpt: '', tags: '', published: false, featuredImage: '' })
        setEditingId(null)
        setShowForm(false)
    }

    const handleEdit = (post) => {
        setForm({
            title: post.title,
            content: post.content,
            excerpt: post.excerpt || '',
            tags: (post.tags || []).join(', '),
            published: post.published,
            featuredImage: post.featuredImage || '',
        })
        setEditingId(post._id)
        setShowForm(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            ...form,
            tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        }
        try {
            if (editingId) {
                await updatePost(editingId, payload)
            } else {
                await createPost(payload)
            }
            resetForm()
            fetchAll()
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to save')
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Delete this blog post?')) return
        try {
            await deletePost(id)
            fetchAll()
        } catch { /* empty */ }
    }

    const togglePublish = async (post) => {
        try {
            await updatePost(post._id, { published: !post.published })
            fetchAll()
        } catch { /* empty */ }
    }

    return (
        <div>
            <div className='flex items-center justify-between mb-8'>
                <h1 className='text-3xl font-bold font-nevera text-white tracking-wide'>Blog Posts</h1>
                <button onClick={() => { resetForm(); setShowForm(true) }}
                    className='bg-[#FF0000] hover:bg-[#B30000] px-4 py-2 rounded-full text-white text-sm font-manrope flex items-center gap-2 transition-colors'>
                    <Plus className='w-4 h-4' /> New Post
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className='fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4'>
                    <div className='bg-[#111] rounded-2xl border border-white/10 w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6'>
                        <div className='flex items-center justify-between mb-6'>
                            <h2 className='text-xl font-bold font-nevera text-white'>{editingId ? 'Edit Post' : 'New Post'}</h2>
                            <button onClick={resetForm} className='text-gray-400 hover:text-white'><X className='w-5 h-5' /></button>
                        </div>
                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <input type='text' placeholder='Post Title' value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))} required
                                className='w-full bg-black text-white px-4 py-3 rounded-xl border border-white/10 focus:border-[#FF0000]/60 focus:outline-none font-manrope placeholder:text-gray-500 text-lg' />
                            <input type='text' placeholder='Excerpt (short summary)' value={form.excerpt} onChange={(e) => setForm(p => ({ ...p, excerpt: e.target.value }))}
                                className='w-full bg-black text-white px-4 py-3 rounded-xl border border-white/10 focus:border-[#FF0000]/60 focus:outline-none font-manrope placeholder:text-gray-500' />
                            <div>
                                <label className='block text-gray-400 text-sm font-manrope mb-2'>Content (HTML supported)</label>
                                <textarea placeholder='Write your post content here... HTML tags like <h2>, <p>, <code> are supported.' value={form.content}
                                    onChange={(e) => setForm(p => ({ ...p, content: e.target.value }))} required rows={12}
                                    className='w-full bg-black text-white px-4 py-3 rounded-xl border border-white/10 focus:border-[#FF0000]/60 focus:outline-none font-mono text-sm placeholder:text-gray-500 resize-none' />
                            </div>
                            <input type='text' placeholder='Tags (comma-separated)' value={form.tags} onChange={(e) => setForm(p => ({ ...p, tags: e.target.value }))}
                                className='w-full bg-black text-white px-4 py-3 rounded-xl border border-white/10 focus:border-[#FF0000]/60 focus:outline-none font-manrope placeholder:text-gray-500' />
                            <input type='url' placeholder='Featured Image URL' value={form.featuredImage} onChange={(e) => setForm(p => ({ ...p, featuredImage: e.target.value }))}
                                className='w-full bg-black text-white px-4 py-3 rounded-xl border border-white/10 focus:border-[#FF0000]/60 focus:outline-none font-manrope placeholder:text-gray-500' />
                            <label className='flex items-center gap-3 text-gray-400 font-manrope text-sm cursor-pointer'>
                                <input type='checkbox' checked={form.published} onChange={(e) => setForm(p => ({ ...p, published: e.target.checked }))} className='w-4 h-4 accent-[#FF0000]' />
                                Publish immediately
                            </label>
                            <button type='submit' className='w-full bg-[#FF0000] hover:bg-[#B30000] py-3 rounded-full text-white font-bold font-reross uppercase tracking-wide transition-colors'>
                                {editingId ? 'Update Post' : 'Create Post'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Posts List */}
            {loading ? (
                <div className='flex justify-center py-20'>
                    <div className='w-8 h-8 border-2 border-[#FF0000] border-t-transparent rounded-full animate-spin'></div>
                </div>
            ) : posts.length === 0 ? (
                <p className='text-gray-500 font-manrope text-center py-20'>No blog posts yet.</p>
            ) : (
                <div className='space-y-3'>
                    {posts.map((post) => (
                        <div key={post._id} className='bg-[#111] rounded-xl border border-white/10 p-4 flex items-center justify-between gap-4'>
                            <div className='min-w-0 flex-1'>
                                <h3 className='text-white font-manrope font-semibold truncate'>{post.title}</h3>
                                <p className='text-gray-500 text-xs font-manrope'>
                                    {(post.tags || []).join(' · ')} · {new Date(post.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className='flex items-center gap-2 shrink-0'>
                                <button onClick={() => togglePublish(post)}
                                    className={`text-xs px-2 py-0.5 rounded-full border flex items-center gap-1 ${post.published
                                            ? 'text-green-400 bg-green-400/10 border-green-400/20'
                                            : 'text-gray-500 bg-white/5 border-white/10'
                                        }`}>
                                    {post.published ? <><Eye className='w-3 h-3' /> Published</> : <><EyeOff className='w-3 h-3' /> Draft</>}
                                </button>
                                <button onClick={() => handleEdit(post)} className='text-gray-400 hover:text-white p-2'><Edit className='w-4 h-4' /></button>
                                <button onClick={() => handleDelete(post._id)} className='text-gray-400 hover:text-red-400 p-2'><Trash2 className='w-4 h-4' /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default BlogAdmin
