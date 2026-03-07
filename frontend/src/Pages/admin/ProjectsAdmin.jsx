import { useState, useEffect } from 'react'
import { Trash2, Edit, Plus, X } from 'lucide-react'
import { getProjects, createProject, updateProject, deleteProject } from '../../api/projects'
import { uploadImage } from '../../api/admin'

const ProjectsAdmin = () => {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [form, setForm] = useState({
        title: '', description: '', shortDescription: '', techStack: '',
        githubUrl: '', liveUrl: '', featured: false, order: 0, featuredImage: '',
    })

    const fetchAll = async () => {
        try {
            const { data } = await getProjects()
            setProjects(data.data)
        } catch { /* empty */ } finally { setLoading(false) }
    }

    useEffect(() => { fetchAll() }, [])

    const resetForm = () => {
        setForm({ title: '', description: '', shortDescription: '', techStack: '', githubUrl: '', liveUrl: '', featured: false, order: 0, featuredImage: '' })
        setEditingId(null)
        setShowForm(false)
    }

    const handleEdit = (project) => {
        setForm({
            title: project.title,
            description: project.description,
            shortDescription: project.shortDescription || '',
            techStack: (project.techStack || []).join(', '),
            githubUrl: project.githubUrl || '',
            liveUrl: project.liveUrl || '',
            featured: project.featured,
            order: project.order || 0,
            featuredImage: project.featuredImage || '',
        })
        setEditingId(project._id)
        setShowForm(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            ...form,
            techStack: form.techStack.split(',').map(t => t.trim()).filter(Boolean),
        }
        try {
            if (editingId) {
                await updateProject(editingId, payload)
            } else {
                await createProject(payload)
            }
            resetForm()
            fetchAll()
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to save')
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Delete this project?')) return
        try {
            await deleteProject(id)
            fetchAll()
        } catch { /* empty */ }
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        try {
            const { data } = await uploadImage(file)
            setForm(prev => ({ ...prev, featuredImage: data.data.url }))
        } catch {
            alert('Image upload failed')
        }
    }

    return (
        <div>
            <div className='flex items-center justify-between mb-8'>
                <h1 className='text-3xl font-bold font-nevera text-white tracking-wide'>Projects</h1>
                <button onClick={() => { resetForm(); setShowForm(true) }}
                    className='bg-[#ff3300] hover:bg-[#e62e00] px-4 py-2 rounded-full text-white text-sm font-manrope flex items-center gap-2 transition-colors'>
                    <Plus className='w-4 h-4' /> New Project
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className='fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4'>
                    <div className='bg-[#111] rounded-2xl border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6'>
                        <div className='flex items-center justify-between mb-6'>
                            <h2 className='text-xl font-bold font-nevera text-white'>{editingId ? 'Edit Project' : 'New Project'}</h2>
                            <button onClick={resetForm} className='text-gray-400 hover:text-white'><X className='w-5 h-5' /></button>
                        </div>
                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <input type='text' placeholder='Title' value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))} required
                                className='w-full bg-black text-white px-4 py-3 rounded-xl border border-white/10 focus:border-[#ff3300]/60 focus:outline-none font-manrope placeholder:text-gray-500' />
                            <input type='text' placeholder='Short Description' value={form.shortDescription} onChange={(e) => setForm(p => ({ ...p, shortDescription: e.target.value }))}
                                className='w-full bg-black text-white px-4 py-3 rounded-xl border border-white/10 focus:border-[#ff3300]/60 focus:outline-none font-manrope placeholder:text-gray-500' />
                            <textarea placeholder='Full Description' value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))} required rows={4}
                                className='w-full bg-black text-white px-4 py-3 rounded-xl border border-white/10 focus:border-[#ff3300]/60 focus:outline-none font-manrope placeholder:text-gray-500 resize-none' />
                            <input type='text' placeholder='Tech Stack (comma-separated)' value={form.techStack} onChange={(e) => setForm(p => ({ ...p, techStack: e.target.value }))}
                                className='w-full bg-black text-white px-4 py-3 rounded-xl border border-white/10 focus:border-[#ff3300]/60 focus:outline-none font-manrope placeholder:text-gray-500' />
                            <div className='grid grid-cols-2 gap-4'>
                                <input type='url' placeholder='GitHub URL' value={form.githubUrl} onChange={(e) => setForm(p => ({ ...p, githubUrl: e.target.value }))}
                                    className='bg-black text-white px-4 py-3 rounded-xl border border-white/10 focus:border-[#ff3300]/60 focus:outline-none font-manrope placeholder:text-gray-500' />
                                <input type='url' placeholder='Live URL' value={form.liveUrl} onChange={(e) => setForm(p => ({ ...p, liveUrl: e.target.value }))}
                                    className='bg-black text-white px-4 py-3 rounded-xl border border-white/10 focus:border-[#ff3300]/60 focus:outline-none font-manrope placeholder:text-gray-500' />
                            </div>
                            <div className='grid grid-cols-2 gap-4'>
                                <input type='number' placeholder='Order' value={form.order} onChange={(e) => setForm(p => ({ ...p, order: parseInt(e.target.value) || 0 }))}
                                    className='bg-black text-white px-4 py-3 rounded-xl border border-white/10 focus:border-[#ff3300]/60 focus:outline-none font-manrope placeholder:text-gray-500' />
                                <label className='flex items-center gap-3 text-gray-400 font-manrope text-sm cursor-pointer'>
                                    <input type='checkbox' checked={form.featured} onChange={(e) => setForm(p => ({ ...p, featured: e.target.checked }))}
                                        className='w-4 h-4 accent-[#ff3300]' />
                                    Featured project
                                </label>
                            </div>
                            {/* Image Upload */}
                            <div>
                                <label className='block text-gray-400 text-sm font-manrope mb-2'>Featured Image</label>
                                <input type='file' accept='image/*' onChange={handleImageUpload} className='text-gray-400 text-sm font-manrope' />
                                {form.featuredImage && <img src={form.featuredImage} alt='preview' className='mt-2 h-32 rounded-xl object-cover border border-white/10' />}
                            </div>
                            <button type='submit' className='w-full bg-[#ff3300] hover:bg-[#e62e00] py-3 rounded-full text-white font-bold font-reross uppercase tracking-wide transition-colors'>
                                {editingId ? 'Update Project' : 'Create Project'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Projects Table */}
            {loading ? (
                <div className='flex justify-center py-20'>
                    <div className='w-8 h-8 border-2 border-[#ff3300] border-t-transparent rounded-full animate-spin'></div>
                </div>
            ) : projects.length === 0 ? (
                <p className='text-gray-500 font-manrope text-center py-20'>No projects yet. Create your first one!</p>
            ) : (
                <div className='space-y-3'>
                    {projects.map((p) => (
                        <div key={p._id} className='bg-[#111] rounded-xl border border-white/10 p-4 flex items-center justify-between gap-4'>
                            <div className='flex items-center gap-4 flex-1 min-w-0'>
                                {p.featuredImage && <img src={p.featuredImage} alt='' className='w-16 h-12 rounded-lg object-cover shrink-0' />}
                                <div className='min-w-0'>
                                    <h3 className='text-white font-manrope font-semibold truncate'>{p.title}</h3>
                                    <p className='text-gray-500 text-xs font-manrope'>{(p.techStack || []).join(' · ')}</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2 shrink-0'>
                                {p.featured && <span className='text-[#ff3300] text-xs bg-[#ff3300]/10 px-2 py-0.5 rounded-full border border-[#ff3300]/20'>Featured</span>}
                                <button onClick={() => handleEdit(p)} className='text-gray-400 hover:text-white p-2 transition-colors'><Edit className='w-4 h-4' /></button>
                                <button onClick={() => handleDelete(p._id)} className='text-gray-400 hover:text-red-400 p-2 transition-colors'><Trash2 className='w-4 h-4' /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ProjectsAdmin
