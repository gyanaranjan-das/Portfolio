import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import { getSiteConfig, updateSiteConfig } from '../../api/admin'

const SiteConfigAdmin = () => {
    const [config, setConfig] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [status, setStatus] = useState(null)

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const { data } = await getSiteConfig()
                setConfig(data.data)
            } catch { /* empty */ } finally { setLoading(false) }
        }
        fetchConfig()
    }, [])

    const handleSave = async () => {
        setSaving(true)
        setStatus(null)
        try {
            await updateSiteConfig(config)
            setStatus({ type: 'success', message: 'Config saved!' })
        } catch (err) {
            setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to save' })
        } finally {
            setSaving(false)
        }
    }

    const updateField = (field, value) => {
        setConfig(prev => ({ ...prev, [field]: value }))
    }

    const updateSocial = (field, value) => {
        setConfig(prev => ({
            ...prev,
            socialLinks: { ...prev.socialLinks, [field]: value }
        }))
    }

    if (loading) {
        return (
            <div className='flex justify-center py-20'>
                <div className='w-8 h-8 border-2 border-[#FF0000] border-t-transparent rounded-full animate-spin'></div>
            </div>
        )
    }

    if (!config) return <p className='text-gray-500 font-manrope'>Failed to load config.</p>

    const inputClass = 'w-full bg-black text-white px-4 py-3 rounded-xl border border-white/10 focus:border-[#FF0000]/60 focus:outline-none font-manrope placeholder:text-gray-500'

    return (
        <div>
            <div className='flex items-center justify-between mb-8'>
                <h1 className='text-3xl font-bold font-nevera text-white tracking-wide'>Site Configuration</h1>
                <button onClick={handleSave} disabled={saving}
                    className='bg-[#FF0000] hover:bg-[#B30000] disabled:opacity-50 px-6 py-2 rounded-full text-white text-sm font-manrope flex items-center gap-2 transition-colors'>
                    <Save className='w-4 h-4' /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {status && (
                <div className={`mb-6 px-4 py-3 rounded-xl text-sm font-manrope ${status.type === 'success' ? 'bg-green-400/10 text-green-400 border border-green-400/20' : 'bg-red-400/10 text-red-400 border border-red-400/20'
                    }`}>{status.message}</div>
            )}

            <div className='space-y-8'>
                {/* Hero Section */}
                <div className='bg-[#111] rounded-2xl border border-white/10 p-6'>
                    <h2 className='text-lg font-bold font-nevera text-white mb-4'>Hero Section</h2>
                    <div className='space-y-4'>
                        <div>
                            <label className='text-gray-400 text-sm font-manrope mb-1 block'>Hero Title</label>
                            <input type='text' value={config.heroTitle || ''} onChange={(e) => updateField('heroTitle', e.target.value)} className={inputClass} />
                        </div>
                        <div>
                            <label className='text-gray-400 text-sm font-manrope mb-1 block'>Hero Subtitle</label>
                            <input type='text' value={config.heroSubtitle || ''} onChange={(e) => updateField('heroSubtitle', e.target.value)} className={inputClass} />
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className='bg-[#111] rounded-2xl border border-white/10 p-6'>
                    <h2 className='text-lg font-bold font-nevera text-white mb-4'>About Section</h2>
                    <div className='space-y-4'>
                        <div>
                            <label className='text-gray-400 text-sm font-manrope mb-1 block'>About Text</label>
                            <textarea value={config.aboutText || ''} onChange={(e) => updateField('aboutText', e.target.value)} rows={4} className={`${inputClass} resize-none`} />
                        </div>
                        <div>
                            <label className='text-gray-400 text-sm font-manrope mb-1 block'>Bio Text</label>
                            <textarea value={config.bioText || ''} onChange={(e) => updateField('bioText', e.target.value)} rows={16} className={`${inputClass} resize-y`} />
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className='bg-[#111] rounded-2xl border border-white/10 p-6'>
                    <h2 className='text-lg font-bold font-nevera text-white mb-4'>Social Links</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {['github', 'linkedin', 'instagram', 'email'].map((field) => (
                            <div key={field}>
                                <label className='text-gray-400 text-sm font-manrope mb-1 block capitalize'>{field}</label>
                                <input type='text' value={config.socialLinks?.[field] || ''} onChange={(e) => updateSocial(field, e.target.value)} className={inputClass} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Other */}
                <div className='bg-[#111] rounded-2xl border border-white/10 p-6'>
                    <h2 className='text-lg font-bold font-nevera text-white mb-4'>Other & Media</h2>
                    <div className='space-y-4'>
                        <div>
                            <label className='text-gray-400 text-sm font-manrope mb-1 block'>Resume URL</label>
                            <input type='url' value={config.resumeUrl || ''} onChange={(e) => updateField('resumeUrl', e.target.value)} className={inputClass} placeholder='https://drive.google.com/...' />
                        </div>
                        <div>
                            <label className='text-gray-400 text-sm font-manrope mb-1 block'>Hero Image URL</label>
                            <input type='text' value={config.heroImage || ''} onChange={(e) => updateField('heroImage', e.target.value)} className={inputClass} placeholder='/uploads/...' />
                        </div>
                        <div>
                            <label className='text-gray-400 text-sm font-manrope mb-1 block'>About Image URL</label>
                            <input type='text' value={config.aboutImage || ''} onChange={(e) => updateField('aboutImage', e.target.value)} className={inputClass} placeholder='/uploads/...' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SiteConfigAdmin
