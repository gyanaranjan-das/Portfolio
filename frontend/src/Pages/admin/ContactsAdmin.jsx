import { useState, useEffect } from 'react'
import { Trash2, Mail, MailOpen } from 'lucide-react'
import { getContacts, markAsRead, deleteContact } from '../../api/contact'

const ContactsAdmin = () => {
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState(null)

    const fetchAll = async () => {
        try {
            const { data } = await getContacts()
            setContacts(data.data)
        } catch { /* empty */ } finally { setLoading(false) }
    }

    useEffect(() => { fetchAll() }, [])

    const handleMarkRead = async (id) => {
        try {
            await markAsRead(id)
            fetchAll()
        } catch { /* empty */ }
    }

    const handleDelete = async (id) => {
        if (!confirm('Delete this message?')) return
        try {
            await deleteContact(id)
            setSelected(null)
            fetchAll()
        } catch { /* empty */ }
    }

    const unreadCount = contacts.filter(c => !c.read).length

    return (
        <div>
            <div className='flex items-center gap-4 mb-8'>
                <h1 className='text-3xl font-bold font-nevera text-white tracking-wide'>Messages</h1>
                {unreadCount > 0 && (
                    <span className='text-xs bg-[#FF0000]/10 text-[#FF0000] border border-[#FF0000]/20 px-3 py-1 rounded-full font-manrope'>
                        {unreadCount} unread
                    </span>
                )}
            </div>

            <div className='flex gap-6'>
                {/* Message List */}
                <div className='w-1/2 space-y-2 max-h-[70vh] overflow-y-auto pr-2'>
                    {loading ? (
                        <div className='flex justify-center py-20'>
                            <div className='w-8 h-8 border-2 border-[#FF0000] border-t-transparent rounded-full animate-spin'></div>
                        </div>
                    ) : contacts.length === 0 ? (
                        <p className='text-gray-500 font-manrope text-center py-20'>No messages yet.</p>
                    ) : contacts.map((c) => (
                        <button key={c._id} onClick={() => { setSelected(c); if (!c.read) handleMarkRead(c._id) }}
                            className={`w-full text-left bg-[#111] rounded-xl border p-4 transition-colors ${selected?._id === c._id ? 'border-[#FF0000]/40' : 'border-white/10 hover:border-white/20'
                                }`}>
                            <div className='flex items-center gap-2 mb-1'>
                                {c.read ? <MailOpen className='w-3 h-3 text-gray-500' /> : <Mail className='w-3 h-3 text-[#FF0000]' />}
                                <span className={`text-sm font-manrope font-semibold ${c.read ? 'text-gray-400' : 'text-white'}`}>{c.name}</span>
                                <span className='text-xs text-gray-500 font-manrope ml-auto'>{new Date(c.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className='text-xs text-gray-500 font-manrope truncate'>{c.subject} — {c.message}</p>
                        </button>
                    ))}
                </div>

                {/* Message Detail */}
                <div className='w-1/2'>
                    {selected ? (
                        <div className='bg-[#111] rounded-2xl border border-white/10 p-6'>
                            <div className='flex items-start justify-between mb-6'>
                                <div>
                                    <h2 className='text-xl text-white font-manrope font-semibold'>{selected.name}</h2>
                                    <p className='text-sm text-[#FF0000] font-manrope'>{selected.email}</p>
                                    <p className='text-xs text-gray-500 font-manrope mt-1'>
                                        {new Date(selected.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <button onClick={() => handleDelete(selected._id)} className='text-gray-400 hover:text-red-400 p-2'>
                                    <Trash2 className='w-4 h-4' />
                                </button>
                            </div>
                            <div className='border-t border-white/10 pt-4'>
                                <p className='text-sm text-gray-400 font-manrope font-semibold mb-2'>{selected.subject}</p>
                                <p className='text-gray-300 font-manrope leading-relaxed whitespace-pre-wrap'>{selected.message}</p>
                            </div>
                        </div>
                    ) : (
                        <div className='bg-[#111] rounded-2xl border border-white/10 p-8 flex items-center justify-center h-64'>
                            <p className='text-gray-500 font-manrope'>Select a message to read</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ContactsAdmin
