import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getSiteConfig } from '../api/admin'
import aboutImage from '../assets/ChatGPT Image Mar 2, 2026, 09_55_22 PM.png'

const About = () => {
  const [config, setConfig] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data } = await getSiteConfig()
        setConfig(data.data)
      } catch (err) {
        console.error('Failed to load site config in About', err)
      } finally {
        setLoading(false)
      }
    }
    fetchConfig()
  }, [])

  // GSAP Animations
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 75%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    // Animate text column (left)
    tl.from('.about-text-col > p, .about-text-col > div', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    })

    // About Header Reveal Animation
    gsap.from('.about-header-char', {
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.05,
      ease: 'power4.out',
      clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)'
    })

    // Animate image column (right)
    tl.from('.about-image-col', {
      x: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, "-=0.6") // Overlap with text animation
  }, [])

  return (
    <section className='min-h-screen text-white flex items-center justify-center py-24 about-section overflow-hidden'>
      <div className='max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-24 gap-y-10 lg:gap-y-16 px-6 md:px-12 items-center'>

        {/* Left Side - Text (appears below image on mobile) */}
        <div className='flex flex-col justify-center space-y-8 z-10 lg:pr-10 order-2 lg:order-1 about-text-col'>

          {/* Subtle line background effect could go here behind the text if needed later */}

          <h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-nevera regular text-[#FF0000] tracking-tighter leading-none mt-4 -ml-1 md:-ml-2 overflow-hidden py-2'>
            {"ABOUT".split("").map((char, index) => (
              <span
                key={index}
                className="inline-block about-header-char"
                style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 0)' }}
              >
                {char}
              </span>
            ))}
          </h1>

          <p className={`font-manrope font-extralight text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
            {loading ? "Loading..." : (config?.aboutText || "Gyanaranjan Das, a full-stack developer based in India, crafts immersive digital experiences that blend clean architecture with striking design. His work transforms complex problems into seamless, high-performance web applications that connect users with technology.")}
          </p>

          <div className='pt-6'>
            <Link to='/Bio'
              className='text-[#FF0000] hover:text-white transition-colors duration-500 relative text-xl  tracking-wide group pb-1 font-reross quadratic regular inline-block'>
              Find Out More
              <span className='absolute left-0 bottom-0 w-full h-[2px] bg-[#FF0000] transition-all duration-500 group-hover:w-0'></span>
            </Link>
          </div>
        </div>

        {/* Right Side - Image with Red Vibe tint & Accent Block (appears on top on mobile) */}
        <div className='relative w-full aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden order-1 lg:order-2 group about-image-col'>
          <div className='absolute top-0 left-6 md:left-12 w-16 h-20 bg-[#f4ebd0] z-40 flex items-center justify-center'>
            <div className='w-8 h-8 rounded-full bg-black'></div>
          </div>

          {/* Base Red Image */}
          <img src={config?.aboutImage || aboutImage}
            alt="Portrait"
            className='absolute inset-0 w-full h-full object-cover grayscale brightness-75 z-10'
          />
          {/* Red Tint Overlay matching reference */}
          <div className='absolute inset-0 bg-[#FF0000] mix-blend-multiply opacity-95 pointer-events-none z-20'></div>

          {/* Full Color Image Reveal - Clipped to bottom right by default, expands to full on hover */}
          <div className='absolute inset-0 z-30 transition-all duration-700 ease-in-out [clip-path:polygon(100%_100%,100%_100%,100%_100%,100%_100%)] group-hover:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]'>
            <img src={config?.aboutImage || aboutImage}
              alt="Portrait original"
              className='absolute inset-0 w-full h-full object-cover'
            />
          </div>

          {/* Subtle gradient to deepen shadows at the edge blending into black */}
          <div className='absolute inset-0 bg-gradient-to-l from-black/60 to-transparent pointer-events-none z-40'></div>

        </div>

      </div>
    </section>
  )
}

export default About
