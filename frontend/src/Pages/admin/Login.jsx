import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { login as loginApi } from '../../api/admin'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { loginAdmin } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            const { data } = await loginApi(email, password)
            loginAdmin(data.token, data.admin)
            navigate('/admin')
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-black flex items-center justify-center px-6'>
            <div className='w-full max-w-md'>
                <h1 className='text-4xl font-bold font-nevera text-[#ff3300] tracking-wider mb-2 text-center'>
                    CMS LOGIN
                </h1>
                <p className='text-gray-500 font-manrope text-center mb-8'>Portfolio Admin Panel</p>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    {error && (
                        <div className='bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm font-manrope'>
                            {error}
                        </div>
                    )}
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        required
                        className='w-full bg-[#111] text-white px-6 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-[#ff3300]/60 font-manrope placeholder:text-gray-500'
                    />
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        required
                        className='w-full bg-[#111] text-white px-6 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-[#ff3300]/60 font-manrope placeholder:text-gray-500'
                    />
                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full bg-[#ff3300] hover:bg-[#e62e00] disabled:opacity-50 transition-colors py-4 rounded-full text-white font-bold tracking-wide font-reross uppercase'
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
