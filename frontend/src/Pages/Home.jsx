import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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

  // If the backend has the title as 'GYANARANJAN DAS', but the user wants just 'GYANARANJAN' as requested previously, we might split it or just display what's in the DB.
  // Actually, we should just display what's in the DB and let the user modify it from Admin.
  const heroName = config?.heroTitle || "GYANARANJAN"

  return (
    <div>
      <section className='relative h-screen flex flex-col justify-center items-center text-white overflow-hidden -mt-22 pt-22'>
        {/* Background Image - using img element for precise positioning */}
        <img
          src={heroImage}
          alt=""
          className='absolute pointer-events-none'
          style={{
            top: '55%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxHeight: '85%',
            maxWidth: '100%',
            objectFit: 'contain',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            zIndex: 0
          }}
        />

        {/* Red tint overlay matching the reference image using multiply blend mode */}
        <div className='absolute inset-0 bg-[#b30000] mix-blend-multiply opacity-90 pointer-events-none'></div>

        {/* Additional gradient overlay so the white text pops and bottom transitions into the next section */}
        <div className='absolute inset-0 bg-linear-to-t from-black via-black/20 to-black/40 pointer-events-none'></div>

        {/* Text Container - Push down to chest area */}
        <div className='relative z-10 flex flex-col items-center mt-24 sm:mt-32 md:mt-72 px-4'>
          <h1 className='text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-center font-bold tracking-widest font-nevera leading-tight uppercase cursor-default'>
            {heroName.split("").map((char, index) => (
              <span
                key={index}
                className={
                  char === " "
                    ? "inline-block w-4 md:w-8"
                    : "transition-colors duration-300 hover:text-white/30"
                }
              >
                {char}
              </span>
            ))}
          </h1>
          <div className='mt-4 sm:mt-6 md:mt-8'>
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
