import React from 'react'
import { Link } from 'react-router-dom'
import aboutImage from '../assets/ChatGPT Image Mar 2, 2026, 09_55_22 PM.png'

const About = () => {
  return (
    <section className='min-h-screen bg-black text-white flex items-center justify-center py-24'>
      <div className='max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-24 gap-y-10 lg:gap-y-16 px-6 md:px-12 items-center'>

        {/* Left Side - Text (appears below image on mobile) */}
        <div className='flex flex-col justify-center space-y-8 z-10 lg:pr-10 order-2 lg:order-1'>

          {/* Subtle line background effect could go here behind the text if needed later */}

          <h1 className='text-6xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-bold font-nevera regular text-[#ff3300] tracking-tighter leading-none mt-4 -ml-1 md:-ml-2'>
            ABOUT
          </h1>

          <p className='font-manrope font-extralight text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl '>
            Gyanaranjan Das, a full-stack developer based in India, crafts immersive digital experiences that blend clean architecture with striking design. His work transforms complex problems into seamless, high-performance web applications that connect users with technology.
          </p>

          <div className='pt-6'>
            <Link to='/Bio'
              className='text-[#ff3300] relative text-xl  tracking-wide group pb-1 font-reross quadratic regular inline-block'>
              Find Out More
              <span className='absolute left-0 bottom-0 w-full h-[2px] bg-[#ff3300] opacity-30'></span>
              <span className='absolute left-0 bottom-0 w-0 h-[2px] bg-[#ff3300] transition-all duration-300 group-hover:w-full'></span>
            </Link>
          </div>
        </div>

        {/* Right Side - Image with Red Vibe tint & Accent Block (appears on top on mobile) */}
        <div className='relative w-full aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden order-1 lg:order-2'>

          {/* Decorative White Box over image - matching reference UI */}
          <div className='absolute top-0 left-6 md:left-12 w-16 h-20 bg-[#f4ebd0] z-20 flex items-center justify-center'>
            <div className='w-8 h-8 rounded-full bg-black'></div>
          </div>

          <img src={aboutImage}
            alt="Portrait"
            className='absolute inset-0 w-full h-full object-contain grayscale brightness-75'
          />

          {/* Red Tint Overlay matching reference */}
          <div className='absolute inset-0 bg-[#b30000] mix-blend-multiply opacity-95 pointer-events-none'></div>
          {/* Subtle gradient to deepen shadows at the edge blending into black */}
          <div className='absolute inset-0 bg-gradient-to-l from-black/60 to-transparent pointer-events-none'></div>

        </div>

      </div>
    </section>
  )
}

export default About
