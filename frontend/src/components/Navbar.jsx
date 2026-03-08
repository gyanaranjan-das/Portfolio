import { Github, Linkedin, Mail, Instagram, Menu, X } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import heroImage from '../assets/ChatGPT Image Feb 27, 2026, 06_37_00 AM.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const container = useRef()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // GSAP Animation for navbar elements
  useGSAP(() => {
    const tl = gsap.timeline()

    // Animate logo first
    tl.from('.brand-logo', {
      y: -20,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out'
    })

    // Animate left links coming from the center (right side)
    tl.from('.nav-item', {
      x: 100, // Starts closer to the center
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    }, "-=0.2")

    // Animate right icons coming from the center (left side)
    // Using '<' starts this at the same time as the left links
    tl.from('.social-item', {
      x: -100, // Starts closer to the center
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    }, "<")
  }, { scope: container })

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/Bio', label: 'Bio' },
    { to: '/Projects', label: 'Projects' },
    { to: '/Blog', label: 'Blog' },
  ]

  return (
    <div ref={container}>
      {/* ===== TOP NAVBAR ===== */}
      <div className='absolute inset-x-0 top-0 w-full z-50 flex justify-between p-4 md:p-6 items-center text-white border-b border-white/10 md:border-[#ff3300]/20 bg-black'>

        {/* Spacer for mobile to keep brand centered */}
        <div className='flex-1 lg:hidden'></div>

        {/* Desktop Links - Hidden on Mobile */}
        <div className='hidden lg:flex flex-1 justify-start gap-8 font-reross quadratic uppercase'>
          {navLinks.map((link) => (
            <div key={link.to} className="nav-item">
              <Link
                to={link.to}
                className={`hover:text-[#ff3300] transition-colors ${location.pathname === link.to ? 'text-[#880808]' : ''}`}
              >
                {link.label}
              </Link>
            </div>
          ))}
        </div>

        {/* Brand - Center on all screens */}
        <div className='absolute left-1/2 -translate-x-1/2 font-bold text-xl brand-logo'>
          <Link to='/'
            className='font-nevera regular text-[#880808] tracking-widest hover:text-white transition-colors'>Gyanaranjan.
          </Link>
        </div>

        {/* Desktop Social Icons - Hidden on Mobile */}
        <div className='hidden lg:flex flex-1 justify-end gap-4'>
          <a
            href="https://github.com/gyanaranjan-das"
            target="_blank"
            rel="noopener noreferrer"
            className='social-item w-9 h-9 rounded-full border border-[#ff3300]/40 flex items-center justify-center text-[#ff3300] hover:bg-[#ff3300]/10 transition-colors'
          >
            <Github className='w-4 h-4' />
          </a>
          <a
            href="https://www.linkedin.com/in/gyanaranjan-das/"
            target="_blank"
            rel="noopener noreferrer"
            className='social-item w-9 h-9 rounded-full border border-[#ff3300]/40 flex items-center justify-center text-[#ff3300] hover:bg-[#ff3300]/10 transition-colors'
          >
            <Linkedin className='w-4 h-4' />
          </a>
          <a
            href="mailto:gyanlabs.io@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className='social-item w-9 h-9 rounded-full border border-[#ff3300]/40 flex items-center justify-center text-[#ff3300] hover:bg-[#ff3300]/10 transition-colors'
          >
            <Mail className='w-4 h-4' />
          </a>
          <a
            href="https://www.instagram.com/gyanlabs.io/"
            target="_blank"
            rel="noopener noreferrer"
            className='social-item w-9 h-9 rounded-full border border-[#ff3300]/40 flex items-center justify-center text-[#ff3300] hover:bg-[#ff3300]/10 transition-colors'
          >
            <Instagram className='w-4 h-4' />
          </a>
        </div>

        {/* Mobile Menu Button - Right Side */}
        <div className='flex flex-1 justify-end lg:hidden'>
          <button onClick={toggleMenu} aria-label="Toggle Menu" className='flex items-center gap-2 text-white z-[60] brand-logo'>
            <span className='w-2.5 h-2.5 rounded-full bg-[#ff3300]'></span>
            <span className='font-manrope text-sm tracking-wide'>Menu</span>
          </button>
        </div>
      </div>

      {/* ===== BACKDROP ===== */}
      <div
        className={`fixed inset-0 bg-black/80 z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleMenu}
      ></div>

      {/* ===== RIGHT SIDED NAV DRAWER ===== */}
      <div
        className={`fixed inset-y-0 right-0 w-[80vw] sm:w-[350px] bg-black z-[100] lg:hidden transform transition-transform duration-500 ease-out border-l border-white/10 shadow-2xl flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Top bar: close button */}
        <div className='flex items-center justify-between p-5 md:p-6'>
          <div className='flex-1'></div>
          <button
            onClick={toggleMenu}
            aria-label="Close Menu"
            className='text-white hover:text-[#ff3300] transition-all duration-300 hover:rotate-90'
          >
            <X className='w-8 h-8' strokeWidth={2.5} />
          </button>
        </div>

        {/* Nav links — Left-aligned within the right drawer */}
        <div className='flex-1 flex flex-col justify-start items-start pl-8 sm:pl-12 gap-8 mt-4'>
          {navLinks.map((link, index) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={toggleMenu}
              className={`font-reross uppercase tracking-[0.2em] text-lg sm:text-xl md:text-2xl transition-all duration-300 hover:text-[#ff3300] hover:tracking-[0.3em] ${location.pathname === link.to
                ? 'text-[#ff3300]'
                : 'text-white/90'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Bottom area — social icons */}
        <div className='flex justify-start gap-4 p-8 sm:pl-12 pb-10'>
          <a href="https://github.com/gyanaranjan-das" target="_blank" rel="noopener noreferrer"
            className='w-10 h-10 rounded-full border border-[#ff3300]/40 flex items-center justify-center text-[#ff3300] hover:bg-[#ff3300]/10 transition-colors'>
            <Github className='w-5 h-5' />
          </a>
          <a href="https://www.linkedin.com/in/gyanaranjan-das/" target="_blank" rel="noopener noreferrer"
            className='w-10 h-10 rounded-full border border-[#ff3300]/40 flex items-center justify-center text-[#ff3300] hover:bg-[#ff3300]/10 transition-colors'>
            <Linkedin className='w-5 h-5' />
          </a>
          <a href="mailto:gyanlabs.io@gmail.com" target="_blank" rel="noopener noreferrer"
            className='w-10 h-10 rounded-full border border-[#ff3300]/40 flex items-center justify-center text-[#ff3300] hover:bg-[#ff3300]/10 transition-colors'>
            <Mail className='w-5 h-5' />
          </a>
          <a href="https://www.instagram.com/gyanlabs.io/" target="_blank" rel="noopener noreferrer"
            className='w-10 h-10 rounded-full border border-[#ff3300]/40 flex items-center justify-center text-[#ff3300] hover:bg-[#ff3300]/10 transition-colors'>
            <Instagram className='w-5 h-5' />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Navbar
