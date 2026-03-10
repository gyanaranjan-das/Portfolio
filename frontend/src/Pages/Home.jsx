import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getSiteConfig } from '../api/admin'
import LatestUpdates from './LatestUpdates'
import About from './About'
import Projects from './Projects'
import heroImage from '../assets/ChatGPT Image Feb 27, 2026, 06_37_00 AM.png'

const Home = () => {
  const [config, setConfig] = useState(null)

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data } = await getSiteConfig()
        setConfig(data.data)
      } catch (err) {
        console.error('Failed to load site config in Home', err)
      }
    }
    fetchConfig()
  }, [])

  // GSAP Animations
  useGSAP(() => {
    const tl = gsap.timeline()

    // Entrance animation for hero text
    tl.from('.hero-char', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.05,
      ease: 'power4.out',
      delay: 0.2 // slight delay after navbar
    })
      .from('.hero-cta', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, "-=0.4")

    // Parallax effect for the background image
    gsap.to('.hero-bg', {
      y: '30%', // moves down specifically to create a parallax delay
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })
  }, [])

  // If the backend has the title as 'GYANARANJAN DAS', but the user wants just 'GYANARANJAN' as requested previously, we might split it or just display what's in the DB.

  // Ensure we only render the first name, stripping off any last names from the DB string
  const heroName = (config?.heroTitle || "GYANARANJAN").split(" ")[0]

  return (
    <div>
      <section className='relative h-screen flex flex-col justify-center items-center text-white overflow-hidden -mt-22 pt-22 hero-section'>
        {/* Background Image Wrapper to prevent GSAP transform conflicts */}
        <div className='absolute inset-0 flex justify-center items-center pointer-events-none' style={{ top: '5%' }}>
          <img
            src={config?.heroImage || heroImage}
            alt="Hero"
            className='hero-bg'
            style={{
              maxHeight: '85%',
              maxWidth: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
              maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
              zIndex: 0
            }}
          />
        </div>

        {/* Red tint overlay matching the reference image using multiply blend mode */}
        <div className='absolute inset-0 bg-[#FF0000] mix-blend-multiply opacity-90 pointer-events-none'></div>

        {/* Additional gradient overlay so the white text pops and bottom transitions into the next section */}
        <div className='absolute inset-0 bg-linear-to-t from-black via-black/20 to-black/40 pointer-events-none'></div>

        {/* Text Container - Push down to chest area */}
        <div className='relative z-10 flex flex-col items-center mt-24 sm:mt-32 md:mt-72 px-4'>
          <h1 className='text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-center font-bold tracking-widest font-nevera leading-tight uppercase cursor-default overflow-hidden py-2'>
            {heroName.split("").map((char, index) => (
              <span
                key={index}
                className={`inline-block hero-char ${char === " "
                  ? "w-4 md:w-8"
                  : "transition-colors duration-300 hover:text-white/30"
                  }`}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
          <div className='mt-4 sm:mt-6 md:mt-8 hero-cta'>
            <Link to='/Bio'
              className='text-white relative text-sm sm:text-base md:text-lg tracking-wide group pb-1 font-reross '>Learn More
              <span className='absolute left-0 bottom-0 w-full h-0.5 bg-white transition-all duration-500 group-hover:w-0'></span></Link>
          </div>
        </div>
      </section>
      <LatestUpdates />
      <About />
      <Projects />
    </div>
  )
}

export default Home
