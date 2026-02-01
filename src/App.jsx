import { useState, useEffect } from 'react'

// Stripe Payment Links
const PAYMENT_LINKS = {
  trial: 'https://buy.stripe.com/fZufZg89id8v1H051ZbfO0A',
  starter: 'https://buy.stripe.com/14A9AS2OYd8vadwcurbfO0B',
  growth: 'https://buy.stripe.com/bJe9AS75e2tR4TcamjbfO0C',
  scale: 'https://buy.stripe.com/bJeeVc61afgD85obqnbfO0D',
}

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('success') === 'true') {
      setShowSuccess(true)
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-2xl">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
            <p className="text-slate-600 mb-6">
              Thank you for your purchase! We'll be in touch within 24 hours to get started on your content.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-[#3858e9] hover:bg-[#2945c4] text-white px-6 py-3 rounded-full font-semibold transition"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="sticky top-0 w-full bg-white/95 backdrop-blur-sm z-40 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#3858e9] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-xl font-bold text-slate-900">Blog Squad</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-slate-600 hover:text-[#3858e9] transition font-medium">How It Works</a>
            <a href="#features" className="text-slate-600 hover:text-[#3858e9] transition font-medium">Features</a>
            <a href="#packages" className="text-slate-600 hover:text-[#3858e9] transition font-medium">Pricing</a>
            <a href="#contact" className="text-slate-600 hover:text-[#3858e9] transition font-medium">Contact</a>
          </div>
          <a href={PAYMENT_LINKS.trial} className="hidden md:inline-block bg-[#3858e9] hover:bg-[#2945c4] text-white px-6 py-2.5 rounded-full font-semibold transition">
            Get Started
          </a>
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-6 py-4 space-y-4">
            <a href="#how-it-works" className="block text-slate-600 hover:text-[#3858e9] font-medium">How It Works</a>
            <a href="#features" className="block text-slate-600 hover:text-[#3858e9] font-medium">Features</a>
            <a href="#packages" className="block text-slate-600 hover:text-[#3858e9] font-medium">Pricing</a>
            <a href="#contact" className="block text-slate-600 hover:text-[#3858e9] font-medium">Contact</a>
            <a href={PAYMENT_LINKS.trial} className="block bg-[#3858e9] text-white px-6 py-2.5 rounded-full font-semibold text-center">Get Started</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-24 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-slate-900">
            Meet Blog Squad
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            The AI-powered content service of choice for businesses worldwide—from startups and small businesses to growing brands.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PAYMENT_LINKS.trial} className="bg-[#3858e9] hover:bg-[#2945c4] text-white px-8 py-4 rounded-full font-semibold text-lg transition shadow-lg shadow-blue-500/25">
              Get Started — $150 Trial
            </a>
            <a href="#how-it-works" className="bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-300 px-8 py-4 rounded-full font-semibold text-lg transition">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 px-6 border-y border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { stat: '24-48h', label: 'Turnaround' },
            { stat: '$250', label: 'Per Post' },
            { stat: '100%', label: 'SEO Optimized' },
            { stat: '2+', label: 'Revisions Included' },
          ].map((item, i) => (
            <div key={i}>
              <div className="text-3xl md:text-4xl font-bold text-[#3858e9]">{item.stat}</div>
              <div className="text-slate-600 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              See how your content gets created in real time, from research to publish-ready draft.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: '🔍',
                title: 'Research',
                desc: 'Our AI agents analyze competitors, identify gaps, and find the angles that will make your content stand out.'
              },
              { 
                icon: '📊',
                title: 'Optimize',
                desc: 'Keywords, search intent, content structure—every post is built on real SEO data, not guesswork.'
              },
              { 
                icon: '✍️',
                title: 'Write',
                desc: 'Sharp, on-brand content delivered in 24-48 hours. Review, request revisions, and publish.'
              },
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-8 text-center hover:shadow-lg transition">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features / What You Get */}
      <section id="features" className="py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What You Get</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to publish content that ranks—without the agency overhead.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { 
                icon: '🔍', 
                title: 'Competitive Research',
                items: ['Competitor content analysis', 'Market positioning insights', 'Customer pain points from reviews & forums']
              },
              { 
                icon: '📈', 
                title: 'SEO Strategy',
                items: ['Primary & secondary keyword targets', 'Search volume & difficulty data', 'Optimized title, meta, headers']
              },
              { 
                icon: '✍️', 
                title: 'Quality Content',
                items: ['1,500-2,000 words (or custom)', 'Engaging hook, clear structure, strong CTA', 'Brand voice matching']
              },
              { 
                icon: '📦', 
                title: 'Deliverables',
                items: ['Final draft in your preferred format', 'SEO checklist for publishing', 'Keyword tracking sheet']
              },
            ].map((section, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-[#3858e9] hover:shadow-lg transition">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{section.icon}</span>
                  <h3 className="text-xl font-bold">{section.title}</h3>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-slate-600">
                      <svg className="w-5 h-5 text-[#3858e9] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Problem With Traditional Content</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              You know you need content. But your options haven't been great—until now.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Content Mills', price: '$25-75/post', problem: 'Generic, no strategy, hurts your brand', color: 'red' },
              { title: 'Freelancers', price: '$150-400/post', problem: 'Inconsistent quality, slow turnaround', color: 'orange' },
              { title: 'Agencies', price: '$500-1,500/post', problem: 'Expensive, bloated process', color: 'yellow' },
              { title: 'In-House Writer', price: '$50-80k/year', problem: 'Fixed cost, limited output', color: 'slate' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-slate-200 flex items-start gap-4">
                <div className="w-2 h-full bg-slate-200 rounded-full"></div>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <span className="text-sm font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">{item.price}</span>
                  </div>
                  <p className="text-slate-600">{item.problem}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-[#3858e9]/5 border border-[#3858e9]/20 rounded-2xl p-8 text-center">
            <p className="text-lg text-slate-700">
              <strong className="text-[#3858e9]">Blog Squad is the middle ground.</strong> Agency-quality research and writing, freelancer-friendly prices, and 24-48 hour turnaround.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="packages" className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-slate-600">Choose what fits your content needs. No hidden fees.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                name: 'Starter',
                price: '$300',
                unit: '/post',
                features: ['1,500-2,000 word blog post', 'Keyword research', 'SEO-optimized structure', '1 revision round', '48-hour turnaround'],
                best: 'Occasional content needs',
                featured: false,
                link: PAYMENT_LINKS.starter
              },
              {
                name: 'Growth',
                price: '$1,000',
                unit: '/month',
                subtitle: '4 posts • $250/post',
                features: ['Everything in Starter', 'Content calendar', 'Competitor monitoring', 'Monthly SEO check-in', '2 revision rounds'],
                best: 'Consistent content marketing',
                featured: false,
                link: PAYMENT_LINKS.growth
              },
              {
                name: 'Scale',
                price: '$2,000',
                unit: '/month',
                subtitle: '8 posts • $250/post',
                features: ['Everything in Growth', 'Full SEO strategy', 'Keyword gap analysis', 'Content repurposing', 'Unlimited revisions'],
                best: 'Aggressive organic growth',
                featured: true,
                link: PAYMENT_LINKS.scale
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                unit: '',
                features: ['12+ posts/month', 'Multi-brand support', 'Landing pages & copy', 'CMS API integration', 'White-label options'],
                best: 'Agencies & e-commerce',
                featured: false,
                link: '#contact'
              },
            ].map((pkg, i) => (
              <div key={i} className={`rounded-2xl p-6 flex flex-col ${pkg.featured ? 'bg-[#3858e9] text-white ring-4 ring-[#3858e9]/30 scale-105' : 'bg-white border border-slate-200'}`}>
                {pkg.featured && <div className="text-sm font-semibold text-blue-200 mb-2">MOST POPULAR</div>}
                <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
                <div className="mb-1">
                  <span className="text-4xl font-bold">{pkg.price}</span>
                  <span className={pkg.featured ? 'text-blue-200' : 'text-slate-500'}>{pkg.unit}</span>
                </div>
                {pkg.subtitle && <p className={`text-sm mb-4 ${pkg.featured ? 'text-blue-200' : 'text-slate-500'}`}>{pkg.subtitle}</p>}
                {!pkg.subtitle && <div className="mb-4"></div>}
                <ul className="space-y-3 mb-6 flex-grow">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${pkg.featured ? 'text-blue-200' : 'text-[#3858e9]'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className={pkg.featured ? 'text-blue-100' : 'text-slate-600'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <p className={`text-sm mb-4 ${pkg.featured ? 'text-blue-200' : 'text-slate-500'}`}>Best for: {pkg.best}</p>
                <a 
                  href={pkg.link}
                  className={`block text-center py-3 rounded-full font-semibold transition ${
                    pkg.featured 
                      ? 'bg-white text-[#3858e9] hover:bg-blue-50' 
                      : pkg.name === 'Enterprise'
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        : 'bg-[#3858e9] hover:bg-[#2945c4] text-white'
                  }`}
                >
                  {pkg.name === 'Enterprise' ? 'Contact Us' : 'Get Started'}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trial CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-slate-900 rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Try Before You Commit</h2>
            <p className="text-xl text-slate-300 mb-6">
              One post, $150. Fully-researched, SEO-optimized, delivered in 48 hours.
            </p>
            <p className="text-slate-400 mb-8">
              Love it? We'll credit the $150 toward your first monthly package.
            </p>
            <a href={PAYMENT_LINKS.trial} className="inline-block bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-full font-bold text-lg transition">
              Start Your Trial — $150
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-24 px-6 bg-slate-50">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-slate-600">Questions? Enterprise inquiry? We'd love to hear from you.</p>
          </div>
          
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2 text-green-800">Message Received!</h3>
              <p className="text-green-700">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-slate-200 space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#3858e9] focus:border-transparent transition"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#3858e9] focus:border-transparent transition"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#3858e9] focus:border-transparent transition"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#3858e9] hover:bg-[#2945c4] text-white py-4 rounded-full font-semibold text-lg transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#3858e9] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">B</span>
              </div>
              <span className="font-bold text-slate-900">Blog Squad</span>
            </div>
            <p className="text-slate-500 text-center">Content that ranks. Copy that converts. Speed that scales.</p>
            <p className="text-slate-400 text-sm">© 2026 Street Chef Digital</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
