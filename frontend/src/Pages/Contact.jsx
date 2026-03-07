import { useState } from 'react'
import { submitContact, subscribe } from '../api/contact'

const Contact = () => {
  // Contact form state
  const [contactData, setContactData] = useState({ name: '', email: '', subject: '', message: '' })
  const [contactStatus, setContactStatus] = useState(null)
  const [contactLoading, setContactLoading] = useState(false)

  // Subscribe form state
  const [subEmail, setSubEmail] = useState('')
  const [subStatus, setSubStatus] = useState(null)
  const [subLoading, setSubLoading] = useState(false)

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

  const handleSubscribe = async (e) => {
    e.preventDefault()
    setSubLoading(true)
    setSubStatus(null)
    try {
      const { data } = await subscribe(subEmail)
      setSubStatus({ type: 'success', message: data.message })
      setSubEmail('')
    } catch (error) {
      setSubStatus({ type: 'error', message: error.response?.data?.message || 'Failed to subscribe.' })
    } finally {
      setSubLoading(false)
    }
  }

  return (
    <>
      {/* Contact Form Section */}
      <section className="bg-black text-white py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-nevera text-[#ff3300] tracking-tighter leading-none mb-4'>
            GET IN TOUCH
          </h2>
          <p className="font-manrope text-gray-400 text-lg mb-10 max-w-2xl">
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
              className="bg-[#111] text-white px-6 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-[#ff3300]/60 font-manrope placeholder:text-gray-500 transition-colors"
            />
            <input
              type="email"
              name="email"
              value={contactData.email}
              onChange={handleContactChange}
              placeholder="Your Email"
              required
              className="bg-[#111] text-white px-6 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-[#ff3300]/60 font-manrope placeholder:text-gray-500 transition-colors"
            />
            <input
              type="text"
              name="subject"
              value={contactData.subject}
              onChange={handleContactChange}
              placeholder="Subject"
              className="bg-[#111] text-white px-6 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-[#ff3300]/60 font-manrope placeholder:text-gray-500 transition-colors md:col-span-2"
            />
            <textarea
              name="message"
              value={contactData.message}
              onChange={handleContactChange}
              placeholder="Your Message"
              required
              rows={5}
              className="bg-[#111] text-white px-6 py-4 rounded-xl border border-white/10 focus:outline-none focus:border-[#ff3300]/60 font-manrope placeholder:text-gray-500 transition-colors md:col-span-2 resize-none"
            />
            <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                type="submit"
                disabled={contactLoading}
                className="bg-[#ff3300] hover:bg-[#e62e00] disabled:opacity-50 transition-colors px-10 py-4 rounded-full text-white font-bold tracking-wide font-reross uppercase whitespace-nowrap"
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

      {/* Subscribe Section */}
      <section className="bg-black text-white py-20 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold font-nevera text-[#ff3300] tracking-tighter leading-none mb-4'>
            NEVER MISS A THING
          </h2>
          <p className="font-manrope text-gray-400 text-lg mb-8 max-w-2xl">
            Stay in the loop with the latest projects, blog posts, and updates.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-xl">
            <input
              type="email"
              value={subEmail}
              onChange={(e) => setSubEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 bg-white text-black px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[#ff3300]/60 font-manrope placeholder:text-gray-500 transition-colors"
            />
            <button
              type="submit"
              disabled={subLoading}
              className="bg-[#ff3300] hover:bg-[#e62e00] disabled:opacity-50 transition-colors px-10 py-4 rounded-full text-white font-bold tracking-wide font-reross uppercase whitespace-nowrap"
            >
              {subLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {subStatus && (
            <p className={`font-manrope text-sm mt-3 ${subStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {subStatus.message}
            </p>
          )}
        </div>
      </section>
    </>
  )
}

export default Contact
