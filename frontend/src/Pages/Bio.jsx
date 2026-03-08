import { useState, useEffect } from 'react'
import { getSiteConfig } from '../api/admin'
import bioImage from '../assets/ChatGPT Image Mar 2, 2026, 10_00_15 PM.png'
import bioProfileImage from '../assets/ChatGPT Image Mar 2, 2026, 09_49_15 PM.png'

const Bio = () => {
  const [config, setConfig] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data } = await getSiteConfig()
        setConfig(data.data)
      } catch (err) {
        console.error('Failed to load site config in Bio', err)
      } finally {
        setLoading(false)
      }
    }
    fetchConfig()
  }, [])

  return (
    <div className="w-full">
      {/* First screen: Centered Biography heading with background image */}
      <section className="relative flex items-center justify-center min-h-screen w-full px-4 overflow-hidden">
        <img
          src={bioImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-top opacity-50 pointer-events-none grayscale brightness-90"
        />
        <div className="absolute inset-0 bg-[#b30000] mix-blend-multiply opacity-70 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black pointer-events-none"></div>
        <h1 className="relative z-10 font-nevera text-4xl sm:text-5xl md:text-6xl font-bold tracking-widest text-white text-center">BIOGRAPHY</h1>
      </section>

      {/* Second screen: Bio content with image and scrollable text */}
      <section className="w-full min-h-screen flex flex-col lg:flex-row max-w-7xl mx-auto py-12 lg:py-24">
        {/* Left: Image Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 order-1">
          <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl shadow-2xl border border-white/10 overflow-hidden group">

            {/* Base Red Image */}
            <img
              src={bioProfileImage}
              alt="Profile"
              className="w-full h-full object-cover grayscale brightness-75 z-10 relative"
            />
            <div className="absolute inset-0 bg-[#b30000] mix-blend-multiply opacity-90 pointer-events-none z-20"></div>

            {/* Full Color Image Reveal - Clipped to bottom right by default, expands to full on hover */}
            <div className='absolute inset-0 z-30 transition-all duration-700 ease-in-out [clip-path:polygon(100%_100%,100%_100%,100%_100%,100%_100%)] group-hover:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]'>
              <img
                src={bioProfileImage}
                alt="Profile Original"
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>
        {/* Right: Bio Text Section (scrolls if needed) */}
        <div className="w-full lg:w-1/2 px-6 sm:px-12 py-10 flex flex-col justify-center order-2 lg:overflow-y-auto lg:max-h-[80vh]">
          {loading ? (
            <div className="flex justify-center items-center w-full">
              <div className="w-8 h-8 rounded-full border-2 border-[#ff3300]/20 border-t-[#ff3300] animate-spin"></div>
            </div>
          ) : (
            <div className="text-white text-base md:text-lg leading-relaxed space-y-6">
              {config?.bioText ? (
                config.bioText.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                <>
                  <p>
                    Hi, I’m Gyani—a web developer and designer who’s always been fascinated by how things work on the internet. My journey started with curiosity and a lot of late nights tinkering with code, and it’s turned into a genuine passion for building things that people actually enjoy using.
                  </p>
                  <p>
                    I love the challenge of turning ideas into real, interactive experiences. Whether I’m working on a new design, learning a fresh framework, or just experimenting with something weird and fun, I’m happiest when I’m creating. My projects are a mix of creativity, problem-solving, and a bit of stubbornness to get things just right.
                  </p>
                  <p>
                    I believe in clean code, thoughtful design, and always pushing myself to learn more. Outside of coding, you’ll probably find me listening to music, exploring new places, or just hanging out with friends.
                  </p>
                  <p>
                    This site is a collection of what I’ve built, what I’m learning, and what I’m excited about next. Thanks for stopping by!
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Bio;
