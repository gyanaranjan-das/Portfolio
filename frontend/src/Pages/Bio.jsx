import bioImage from '../assets/ChatGPT Image Mar 2, 2026, 10_00_15 PM.png'
import bioProfileImage from '../assets/ChatGPT Image Mar 2, 2026, 09_49_15 PM.png'

const Bio = () => {
  return (
    <div className="w-full bg-black">
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
      <section className="w-full min-h-screen flex flex-col md:flex-row bg-black">
        {/* Left: Image Section */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-full flex items-center justify-center bg-black p-6 md:p-0">
          <div className="relative w-full sm:w-4/5 md:w-4/5 h-full md:h-4/5 rounded-xl shadow-lg border border-white/10 overflow-hidden">
            <img
              src={bioProfileImage}
              alt="Profile"
              className="w-full h-full object-cover grayscale brightness-75"
            />
            <div className="absolute inset-0 bg-[#b30000] mix-blend-multiply opacity-90 pointer-events-none"></div>
          </div>
        </div>
        {/* Right: Bio Text Section (scrolls if needed) */}
        <div className="w-full md:w-1/2 h-auto md:h-[80vh] md:overflow-y-auto overflow-x-hidden px-6 md:px-12 py-10 flex flex-col">
          <div className="text-white text-base md:text-lg leading-relaxed space-y-6">
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bio;
