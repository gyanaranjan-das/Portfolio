import { useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { submitContact } from '../api/contact'

const Contact = () => {
  // Contact form state
  const [contactData, setContactData] = useState({ name: '', email: '', subject: '', message: '' })
  const [contactStatus, setContactStatus] = useState(null)
  const [contactLoading, setContactLoading] = useState(false)

  const handleContactChange = (e) => {
    setContactData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setContactLoading(true)
    setContactStatus(null)
    try {
      await submitContact(contactData)
      setContactStatus({ type: 'success', message: 'Message sent! I\'ll get back to you soon.' })
      setContactData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setContactStatus({ type: 'error', message: error.response?.data?.message || 'Failed to send. Please try again.' })
    } finally {
      setContactLoading(false)
    }
  }

  // GSAP Animations
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    // Contact Header Reveal Animation
    tl.from('.contact-header-char', {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.03,
      ease: 'power4.out',
      clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)'
    })

    // Subtitle fade in
    tl.from('.contact-subtitle', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, "-=0.4")

    // Form elements staggered fade up
    tl.from('.contact-form-element', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out'
    }, "-=0.2")

  }, [])

  return (
    <>
      {/* Contact Form Section */}
      <section className="text-white py-20 px-6 md:px-12 contact-section">
        <div className="max-w-7xl mx-auto">
          <h2 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-nevera text-[#FF0000] tracking-tighter leading-none mb-4 overflow-hidden py-2'>
            {"GET IN TOUCH".split("").map((char, index) => (
              <span
                key={index}
                className={`inline-block contact-header-char ${char === " " ? "w-2 md:w-5" : ""}`}
                style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 0)' }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
          <p className="font-manrope text-gray-400 text-lg mb-10 max-w-2xl contact-subtitle">
            Have a project in mind, want to collaborate, or just want to say hi? Drop me a message.
          </p>

          <form onSubmit={handleContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
            <input
              type="text"
              name="name"
              value={contactData.name}
              onChange={handleContactChange}
              placeholder="Your Name"
              required
              className="bg-[#111] text-white px-6 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-[#FF0000]/60 font-manrope placeholder:text-gray-500 transition-colors contact-form-element"
            />
            <input
              type="email"
              name="email"
              value={contactData.email}
              onChange={handleContactChange}
              placeholder="Your Email"
              required
              className="bg-[#111] text-white px-6 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-[#FF0000]/60 font-manrope placeholder:text-gray-500 transition-colors contact-form-element"
            />
            <input
              type="text"
              name="subject"
              value={contactData.subject}
              onChange={handleContactChange}
              placeholder="Subject"
              className="bg-[#111] text-white px-6 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-[#FF0000]/60 font-manrope placeholder:text-gray-500 transition-colors md:col-span-2 contact-form-element"
            />
            <textarea
              name="message"
              value={contactData.message}
              onChange={handleContactChange}
              placeholder="Your Message"
              required
              rows={5}
              className="bg-[#111] text-white px-6 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-[#FF0000]/60 font-manrope placeholder:text-gray-500 transition-colors md:col-span-2 resize-none contact-form-element"
            />
            <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 contact-form-element">
              <button
                type="submit"
                disabled={contactLoading}
                className="bg-[#FF0000] hover:bg-[#B30000] disabled:opacity-50 transition-colors px-10 py-4 rounded-full text-white font-bold tracking-wide font-reross uppercase whitespace-nowrap"
              >
                {contactLoading ? 'Sending...' : 'Send Message'}
              </button>
              {contactStatus && (
                <p className={`font-manrope text-sm ${contactStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {contactStatus.message}
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Contact
