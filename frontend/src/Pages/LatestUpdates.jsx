import React from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code, MonitorSmartphone, Layers, Rocket } from 'lucide-react'
import updateImage from '../assets/ChatGPT Image Feb 27, 2026, 06_15_59 AM.png'

const LatestUpdates = () => {
  // GSAP Animations
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.updates-section',
        start: 'top 80%', // triggers when the top of the section hits 80% down the viewport
        end: 'bottom 20%',
        toggleActions: 'play none none reverse' // play on scroll down, reverse on scroll up past
      }
    })

    // Image reveal
    tl.from('.updates-image-container', {
      x: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    })

    // Text and cards staggered reveal
    tl.from('.updates-content > p, .updates-content > div', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    }, "-=0.6") // overlap with image animation

    // Updates Header Reveal Animation
    gsap.from('.updates-header-char', {
      scrollTrigger: {
        trigger: '.updates-section',
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
  }, [])

  return (
    <section className='min-h-screen text-white flex items-center justify-center py-24 updates-section overflow-hidden'>
      <div className='max-w-6xl w-full flex flex-col lg:flex-row gap-12 lg:gap-16 px-6 md:px-10 items-center lg:items-start'>

        {/* Left Side - Image with Red Vibe tint (on top on mobile) */}
        <div className='w-full sm:w-[320px] lg:w-[320px] shrink-0 mx-auto lg:mx-0 updates-image-container'>
          <div className='relative overflow-hidden rounded-2xl border border-white/10 h-[380px] sm:h-[450px] lg:h-[520px] group'>

            {/* Base Red Image */}
            <img src={updateImage}
              alt="Latest update preview"
              className='absolute inset-0 w-full h-full object-cover grayscale brightness-75 mx-auto block z-10'
            />
            <div className='absolute inset-0 bg-[#FF0000] mix-blend-multiply opacity-90 pointer-events-none z-20'></div>

            {/* Full Color Image Reveal - Clipped to bottom right by default, expands to full on hover */}
            <div className='absolute inset-0 z-30 transition-all duration-700 ease-in-out [clip-path:polygon(100%_100%,100%_100%,100%_100%,100%_100%)] group-hover:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]'>
              <img src={updateImage}
                alt="Latest update preview original"
                className='w-full h-full object-cover mx-auto block'
              />
            </div>

          </div>
        </div>

        {/* Right Side - Content (below image on mobile) */}
        <div className='flex-[1.2] w-full flex flex-col justify-center gap-8 lg:gap-10 updates-content'>
          <h2 className='text-4xl md:text-5xl font-bold font-nevera regular text-[#ff0000] tracking-wider uppercase text-center lg:text-left overflow-hidden py-1'>
            {"LATEST UPDATES".split("").map((char, index) => (
              <span
                key={index}
                className={`inline-block updates-header-char ${char === " " ? "w-2 md:w-4" : ""}`}
                style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 0)' }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>

          <div className='flex flex-col gap-5'>

            {/* Card 1 */}
            <div className='flex items-center gap-5 p-3 rounded-full bg-[#111] border border-white/5 hover:border-[#FF0000]/50 transition-colors cursor-pointer'>
              <div className='w-12 h-12 rounded-full bg-[#FF0000]/20 flex items-center justify-center shrink-0 border border-[#FF0000]/30'>
                <Rocket className='w-5 h-5 text-[#FF0000]' />
              </div>
              <p className='font-manrope regular text-sm md:text-base text-gray-300'>
                Just launched my latest <span className='text-white font-semibold'>full-stack project</span>.
              </p>
            </div>

            {/* Card 2 */}
            <div className='flex items-center gap-5 p-3 rounded-full bg-[#111] border border-white/5 hover:border-[#FF0000]/50 transition-colors cursor-pointer'>
              <div className='w-12 h-12 rounded-full bg-[#FF0000]/20 flex items-center justify-center shrink-0 border border-[#FF0000]/30'>
                <MonitorSmartphone className='w-5 h-5 text-[#FF0000]' />
              </div>
              <p className='font-manrope text-sm md:text-base text-gray-300'>
                Known for building responsive, high-performance web applications.
              </p>
            </div>

            {/* Card 3 */}
            <div className='flex items-center gap-5 p-3 rounded-full bg-[#111] border border-white/5 hover:border-[#FF0000]/50 transition-colors cursor-pointer'>
              <div className='w-12 h-12 rounded-full bg-[#FF0000]/20 flex items-center justify-center shrink-0 border border-[#FF0000]/30'>
                <Layers className='w-5 h-5 text-[#FF0000]' />
              </div>
              <p className='font-manrope text-sm md:text-base text-gray-300'>
                Specializes in React, Tailwind CSS, and frontend architecture.
              </p>
            </div>

            {/* Card 4 */}
            <div className='flex items-center gap-5 p-3 rounded-full bg-[#111] border border-white/5 hover:border-[#FF0000]/50 transition-colors cursor-pointer'>
              <div className='w-12 h-12 rounded-full bg-[#FF0000]/20 flex items-center justify-center shrink-0 border border-[#FF0000]/30'>
                <Code className='w-5 h-5 text-[#FF0000]' />
              </div>
              <p className='font-manrope text-sm md:text-base text-gray-300'>
                Always exploring new tech—currently diving into Next.js & AI.
              </p>
            </div>

          </div>

          <div className='pt-2'>
            <Link to='/Projects'
              className='text-white relative text-lg tracking-wide group pb-1 font-reross font-normal inline-block'>
              View All
              <span className='absolute left-0 bottom-0 w-full h-[2px] bg-[#FF0000] transition-all duration-500 group-hover:w-0'></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LatestUpdates
