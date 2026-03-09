import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const NotFound = () => {
    return (
        <section className='min-h-screen text-white flex flex-col items-center justify-center px-6 relative overflow-hidden select-none'>
            <SEO title="404 — Signal Lost" description="The page you're looking for doesn't exist." />

            {/* CRT Scan Lines Overlay */}
            <div
                className='pointer-events-none fixed inset-0 z-30'
                style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,0,0.03) 2px, rgba(255,0,0,0.03) 4px)',
                }}
            ></div>

            {/* Glitching 404 */}
            <div className='relative z-10'>
                <h1
                    className='text-[10rem] sm:text-[14rem] md:text-[20rem] font-nevera font-bold leading-none tracking-tighter text-white glitch-text'
                    data-text="404"
                >
                    404
                </h1>
            </div>

            {/* Signal Lost tagline */}
            <div className='relative z-10 flex items-center gap-3 -mt-4 md:-mt-8 mb-6'>
                <span className='w-2.5 h-2.5 rounded-full bg-[#FF0000] animate-pulse'></span>
                <h2 className='font-reross uppercase text-lg sm:text-xl md:text-2xl tracking-[0.3em] text-white/90'>
                    Signal Lost
                </h2>
            </div>

            {/* Subtext */}
            <p className='relative z-10 font-manrope text-gray-500 text-center max-w-md mb-10 text-sm md:text-base'>
                The page you're looking for doesn't exist, has been moved, or was never meant to be found.
            </p>

            {/* Terminal-style go home button */}
            <Link
                to='/'
                className='relative z-10 group border border-[#FF0000]/40 rounded-full px-8 py-3 font-mono text-sm tracking-wide text-[#FF0000] hover:bg-[#FF0000] hover:text-black transition-all duration-500'
            >
                <span className='opacity-60 mr-1'>{'>'}</span> cd /home
            </Link>

            {/* Glitch CSS */}
            <style>{`
        .glitch-text {
          position: relative;
          animation: glitch-skew 4s infinite linear alternate-reverse;
        }

        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .glitch-text::before {
          color: #FF0000;
          animation: glitch-before 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
          transform: translate(-4px, -2px);
          opacity: 0.8;
        }

        .glitch-text::after {
          color: #00FFFF;
          animation: glitch-after 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse infinite;
          clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
          transform: translate(4px, 2px);
          opacity: 0.8;
        }

        @keyframes glitch-before {
          0% { clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%); transform: translate(-2px, 0); }
          10% { clip-path: polygon(0 15%, 100% 15%, 100% 20%, 0 20%); transform: translate(3px, 0); }
          20% { clip-path: polygon(0 10%, 100% 10%, 100% 25%, 0 25%); transform: translate(-1px, 0); }
          30% { clip-path: polygon(0 1%, 100% 1%, 100% 3%, 0 3%); transform: translate(0px, 0); }
          40% { clip-path: polygon(0 35%, 100% 35%, 100% 40%, 0 40%); transform: translate(-4px, 0); }
          50% { clip-path: polygon(0 45%, 100% 45%, 100% 50%, 0 50%); transform: translate(2px, 0); }
          60% { clip-path: polygon(0 60%, 100% 60%, 100% 65%, 0 65%); transform: translate(-3px, 0); }
          70% { clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%); transform: translate(1px, 0); }
          80% { clip-path: polygon(0 80%, 100% 80%, 100% 85%, 0 85%); transform: translate(4px, 0); }
          90% { clip-path: polygon(0 55%, 100% 55%, 100% 60%, 0 60%); transform: translate(-2px, 0); }
          100% { clip-path: polygon(0 90%, 100% 90%, 100% 95%, 0 95%); transform: translate(0px, 0); }
        }

        @keyframes glitch-after {
          0% { clip-path: polygon(0 65%, 100% 65%, 100% 70%, 0 70%); transform: translate(3px, 0); }
          10% { clip-path: polygon(0 40%, 100% 40%, 100% 45%, 0 45%); transform: translate(-2px, 0); }
          20% { clip-path: polygon(0 75%, 100% 75%, 100% 80%, 0 80%); transform: translate(1px, 0); }
          30% { clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%); transform: translate(4px, 0); }
          40% { clip-path: polygon(0 20%, 100% 20%, 100% 25%, 0 25%); transform: translate(-3px, 0); }
          50% { clip-path: polygon(0 85%, 100% 85%, 100% 90%, 0 90%); transform: translate(2px, 0); }
          60% { clip-path: polygon(0 30%, 100% 30%, 100% 35%, 0 35%); transform: translate(-1px, 0); }
          70% { clip-path: polygon(0 5%, 100% 5%, 100% 10%, 0 10%); transform: translate(3px, 0); }
          80% { clip-path: polygon(0 95%, 100% 95%, 100% 100%, 0 100%); transform: translate(-4px, 0); }
          90% { clip-path: polygon(0 15%, 100% 15%, 100% 20%, 0 20%); transform: translate(1px, 0); }
          100% { clip-path: polygon(0 70%, 100% 70%, 100% 75%, 0 75%); transform: translate(-2px, 0); }
        }

        @keyframes glitch-skew {
          0% { transform: skew(0deg); }
          20% { transform: skew(0deg); }
          21% { transform: skew(-1deg); }
          22% { transform: skew(0deg); }
          50% { transform: skew(0deg); }
          51% { transform: skew(0.5deg); }
          52% { transform: skew(0deg); }
          80% { transform: skew(0deg); }
          81% { transform: skew(-0.5deg); }
          82% { transform: skew(0deg); }
          100% { transform: skew(0deg); }
        }
      `}</style>
        </section>
    )
}

export default NotFound
