import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, Instagram } from 'lucide-react'

const Footer = () => {
  return (
    <footer className='bg-black text-white px-6 md:px-12 pb-8 pt-12'>
      <div className='max-w-7xl mx-auto space-y-8'>

        {/* Footer Nav Links */}
        <div className='flex flex-wrap items-center gap-6 font-reross uppercase text-sm tracking-wide'>
          <Link to='/' className='text-[#ff3300] border border-[#ff3300]/40 rounded-full px-4 py-1 hover:bg-[#ff3300]/10 transition-colors'>Home</Link>
          <Link to='/Bio' className='text-white/70 hover:text-white transition-colors'>Bio</Link>
          <Link to='/Projects' className='text-white/70 hover:text-white transition-colors'>Projects</Link>
          <Link to='/Blog' className='text-white/70 hover:text-white transition-colors'>Blog</Link>
        </div>

        {/* Social Icons */}
        <div className='flex gap-4'>
          <a href="https://github.com/gyanaranjan-das" target="_blank" rel="noopener noreferrer"
            className='w-10 h-10 rounded-full border border-[#ff3300]/40 flex items-center justify-center text-[#ff3300] hover:bg-[#ff3300]/10 transition-colors'>
            <Github className='w-4 h-4' />
          </a>
          <a href="https://www.linkedin.com/in/gyanaranjan-das/" target="_blank" rel="noopener noreferrer"
            className='w-10 h-10 rounded-full border border-[#ff3300]/40 flex items-center justify-center text-[#ff3300] hover:bg-[#ff3300]/10 transition-colors'>
            <Linkedin className='w-4 h-4' />
          </a>
          <a href="mailto:dasgyanaranjan835@gmail.com" target="_blank" rel="noopener noreferrer"
            className='w-10 h-10 rounded-full border border-[#ff3300]/40 flex items-center justify-center text-[#ff3300] hover:bg-[#ff3300]/10 transition-colors'>
            <Mail className='w-4 h-4' />
          </a>
          <a href="https://www.instagram.com/gyanaranjan.20/" target="_blank" rel="noopener noreferrer"
            className='w-10 h-10 rounded-full border border-[#ff3300]/40 flex items-center justify-center text-[#ff3300] hover:bg-[#ff3300]/10 transition-colors'>
            <Instagram className='w-4 h-4' />
          </a>
        </div>

        {/* Divider */}
        <div className='border-t border-white/10'></div>

        {/* Copyright Bar */}
        <div className='flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 font-manrope text-center md:text-left'>
          <p>&copy; 2026 GYANARANJAN DAS</p>
          <p>Website by <span className='text-gray-400'>GyanLabs.io</span></p>
        </div>

      </div>
    </footer>
  )
}

export default Footer
