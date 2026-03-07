import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LayoutDashboard, FolderKanban, FileText, Mail, Settings, LogOut, Home } from 'lucide-react'

const navItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
    { to: '/admin/blog', label: 'Blog Posts', icon: FileText },
    { to: '/admin/contacts', label: 'Messages', icon: Mail },
    { to: '/admin/config', label: 'Site Config', icon: Settings },
]

const AdminLayout = () => {
    const { admin, logoutAdmin } = useAuth()
    const location = useLocation()

    const isActive = (path, exact = false) => {
        if (exact) return location.pathname === path
        return location.pathname.startsWith(path)
    }

    return (
        <div className='min-h-screen bg-[#0a0a0a] text-white flex'>
            {/* Sidebar */}
            <aside className='w-64 bg-black border-r border-white/10 flex flex-col fixed inset-y-0 left-0 z-40'>
                {/* Brand */}
                <div className='p-6 border-b border-white/10'>
                    <h1 className='font-nevera text-[#ff3300] text-lg tracking-widest'>CMS PANEL</h1>
                    <p className='text-gray-500 text-xs font-manrope mt-1'>{admin?.email}</p>
                </div>

                {/* Nav */}
                <nav className='flex-1 p-4 space-y-1 overflow-y-auto'>
                    {navItems.map(({ to, label, icon: Icon, exact }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-manrope transition-colors ${isActive(to, exact)
                                    ? 'bg-[#ff3300]/10 text-[#ff3300] border border-[#ff3300]/20'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Icon className='w-4 h-4' />
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* Bottom */}
                <div className='p-4 border-t border-white/10 space-y-1'>
                    <Link to='/' className='flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-manrope text-gray-400 hover:text-white hover:bg-white/5 transition-colors'>
                        <Home className='w-4 h-4' /> View Site
                    </Link>
                    <button
                        onClick={logoutAdmin}
                        className='flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-manrope text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors w-full text-left'
                    >
                        <LogOut className='w-4 h-4' /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className='flex-1 ml-64 p-8'>
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout
