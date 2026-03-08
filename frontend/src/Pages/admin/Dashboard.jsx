import { useState, useEffect } from 'react'
import { FolderKanban, FileText, Mail } from 'lucide-react'
import { getProjects } from '../../api/projects'
import { getPosts } from '../../api/blog'
import { getContacts } from '../../api/contact'

const Dashboard = () => {
    const [stats, setStats] = useState({ projects: 0, posts: 0, contacts: 0 })

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [projRes, postRes, contactRes] = await Promise.allSettled([
                    getProjects(),
                    getPosts(true),
                    getContacts(),
                ])
                setStats({
                    projects: projRes.status === 'fulfilled' ? projRes.value.data.count : 0,
                    posts: postRes.status === 'fulfilled' ? postRes.value.data.count : 0,
                    contacts: contactRes.status === 'fulfilled' ? contactRes.value.data.count : 0,
                })
            } catch {
                // stats remain 0
            }
        }
        fetchStats()
    }, [])

    const cards = [
        { label: 'Projects', value: stats.projects, icon: FolderKanban, color: '#ff3300' },
        { label: 'Blog Posts', value: stats.posts, icon: FileText, color: '#ff6600' },
        { label: 'Messages', value: stats.contacts, icon: Mail, color: '#ff0066' }
    ]

    return (
        <div>
            <h1 className='text-3xl font-bold font-nevera text-white tracking-wide mb-8'>Dashboard</h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                {cards.map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className='bg-[#111] rounded-2xl border border-white/10 p-6 flex items-center gap-4'>
                        <div className='w-12 h-12 rounded-xl flex items-center justify-center' style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}>
                            <Icon className='w-5 h-5' style={{ color }} />
                        </div>
                        <div>
                            <p className='text-3xl font-bold text-white font-nevera'>{value}</p>
                            <p className='text-sm text-gray-500 font-manrope'>{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='mt-12 bg-[#111] rounded-2xl border border-white/10 p-8'>
                <h2 className='text-xl font-bold font-nevera text-white tracking-wide mb-4'>Quick Actions</h2>
                <div className='flex flex-wrap gap-3'>
                    <a href='/admin/projects' className='bg-[#ff3300]/10 text-[#ff3300] border border-[#ff3300]/20 px-4 py-2 rounded-full text-sm font-manrope hover:bg-[#ff3300]/20 transition-colors'>
                        + New Project
                    </a>
                    <a href='/admin/blog' className='bg-[#ff6600]/10 text-[#ff6600] border border-[#ff6600]/20 px-4 py-2 rounded-full text-sm font-manrope hover:bg-[#ff6600]/20 transition-colors'>
                        + New Blog Post
                    </a>
                    <a href='/admin/config' className='bg-white/5 text-gray-400 border border-white/10 px-4 py-2 rounded-full text-sm font-manrope hover:bg-white/10 transition-colors'>
                        Edit Site Config
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
