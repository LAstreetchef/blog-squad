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

  useEffect(() => {
    // Check for success redirect from Stripe
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
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="bg-slate-900 rounded-2xl p-8 max-w-md text-center border border-green-500/30">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
            <p className="text-slate-400 mb-6">
              Thank you for your purchase! We'll be in touch within 24 hours to get started on your content.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/90 backdrop-blur-sm z-40 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold gradient-text">Blog Squad</div>
          <div className="hidden md:flex gap-8">
            <a href="#how-it-works" className="hover:text-indigo-400 transition">How It Works</a>
            <a href="#packages" className="hover:text-indigo-400 transition">Packages</a>
            <a href="#contact" className="hover:text-indigo-400 transition">Contact</a>
          </div>
          <a href={PAYMENT_LINKS.trial} className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-lg font-medium transition">
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-indigo-500/20 rounded-full text-indigo-300 text-sm font-medium mb-6">
            AI-Powered Content Services
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Content That <span className="gradient-text">Converts</span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Research-backed, SEO-optimized blog posts with the quality of a senior agency — 
            at a fraction of the cost and turnaround time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PAYMENT_LINKS.trial} className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-xl font-semibold text-lg transition">
              Start Your Trial — $150
            </a>
            <a href="#how-it-works" className="border border-slate-700 hover:border-slate-600 px-8 py-4 rounded-xl font-semibold text-lg transition">
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">The Problem With Traditional Content</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            You know you need content. But your options aren't great.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Content Mills', price: '$25-75/post', problem: 'Generic, no strategy, hurts your brand' },
              { title: 'Freelancers', price: '$150-400/post', problem: 'Inconsistent quality, slow turnaround, management overhead' },
              { title: 'Agencies', price: '$500-1,500/post', problem: 'Expensive, bloated process, one-size-fits-all' },
              { title: 'In-House Writer', price: '$50-80k/year', problem: 'Fixed cost, limited output, single perspective' },
            ].map((item, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <span className="text-red-400 font-mono text-sm">{item.price}</span>
                </div>
                <p className="text-slate-400">{item.problem}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 text-center">
            <p className="text-amber-200">
              💡 <strong>The real cost isn't the post</strong> — it's the time you spend managing writers, 
              reviewing drafts, explaining your brand, and waiting.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">A Better Way</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            An <strong className="text-white">AI-powered content squad</strong> that delivers agency-quality content in startup timelines.
          </p>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: '1', title: 'Submit', desc: 'You share your topic' },
              { step: '2', title: 'Research', desc: 'AI analyzes competitors & gaps' },
              { step: '3', title: 'SEO', desc: 'Keywords & structure optimized' },
              { step: '4', title: 'Write', desc: 'Sharp, on-brand content created' },
              { step: '5', title: 'Review', desc: 'You approve and publish' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-indigo-600 rounded-full flex items-center justify-center text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-6 text-center">
            <p className="text-indigo-200 text-lg">
              ⚡ <strong>Turnaround: 24-48 hours.</strong> Not weeks.
            </p>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What You Get</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { 
                icon: '🔍', 
                title: 'Competitive Research',
                items: ['Competitor content analysis', 'Market positioning insights', 'Customer pain points from reviews & forums']
              },
              { 
                icon: '📈', 
                title: 'SEO Strategy',
                items: ['Primary & secondary keyword targets', 'Search volume & difficulty data', 'Optimized title, meta, headers', 'Internal linking recommendations']
              },
              { 
                icon: '✍️', 
                title: 'Quality Content',
                items: ['1,500-2,000 words (or custom)', 'Engaging hook, clear structure, strong CTA', 'Brand voice matching', 'Revision rounds included']
              },
              { 
                icon: '📦', 
                title: 'Deliverables',
                items: ['Final draft (Docs, Notion, or MD)', 'SEO checklist for publishing', 'Keyword tracking sheet']
              },
            ].map((section, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <div className="text-3xl mb-3">{section.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-slate-300">
                      <span className="text-green-400 mt-1">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="packages" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Packages</h2>
          <p className="text-slate-400 text-center mb-12">Choose what fits your content needs</p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                tier: '🥉',
                name: 'Starter',
                price: '$300',
                unit: '/post',
                features: ['1,500-2,000 word blog post', 'Basic keyword research', 'SEO-optimized structure', '1 revision round', '48-hour turnaround'],
                best: 'Occasional content needs',
                featured: false,
                link: PAYMENT_LINKS.starter
              },
              {
                tier: '🥈',
                name: 'Growth',
                price: '$1,000',
                unit: '/month',
                subtitle: '4 posts ($250/post)',
                features: ['Everything in Starter', 'Content calendar', 'Competitor monitoring', 'Monthly SEO check-in', '2 revision rounds', '24-hour turnaround'],
                best: 'Consistent content marketing',
                featured: false,
                link: PAYMENT_LINKS.growth
              },
              {
                tier: '🥇',
                name: 'Scale',
                price: '$2,000',
                unit: '/month',
                subtitle: '8 posts ($250/post)',
                features: ['Everything in Growth', 'Full SEO strategy doc', 'Keyword gap analysis', 'Content repurposing', 'Unlimited revisions', 'Dedicated channel'],
                best: 'Aggressive organic growth',
                featured: true,
                link: PAYMENT_LINKS.scale
              },
              {
                tier: '🏆',
                name: 'Enterprise',
                price: 'Custom',
                unit: '',
                features: ['12+ posts/month', 'Multi-brand support', 'Landing pages & product copy', 'CMS API integration', 'White-label options'],
                best: 'Agencies & e-commerce',
                featured: false,
                link: '#contact'
              },
            ].map((pkg, i) => (
              <div key={i} className={`rounded-2xl p-6 flex flex-col ${pkg.featured ? 'bg-indigo-600 ring-2 ring-indigo-400' : 'bg-slate-800/50 border border-slate-700'}`}>
                <div className="text-2xl mb-2">{pkg.tier}</div>
                <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
                <div className="mb-1">
                  <span className="text-3xl font-bold">{pkg.price}</span>
                  <span className="text-slate-400">{pkg.unit}</span>
                </div>
                {pkg.subtitle && <p className="text-sm text-slate-400 mb-4">{pkg.subtitle}</p>}
                {!pkg.subtitle && <div className="mb-4"></div>}
                <ul className="space-y-2 mb-6 flex-grow">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <span className={pkg.featured ? 'text-indigo-200' : 'text-green-400'}>✓</span>
                      <span className={pkg.featured ? 'text-indigo-100' : 'text-slate-300'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <p className={`text-sm italic mb-4 ${pkg.featured ? 'text-indigo-200' : 'text-slate-500'}`}>Best for: {pkg.best}</p>
                <a 
                  href={pkg.link}
                  className={`block text-center py-3 rounded-lg font-semibold transition ${
                    pkg.featured 
                      ? 'bg-white text-indigo-600 hover:bg-indigo-50' 
                      : pkg.name === 'Enterprise'
                        ? 'bg-slate-700 hover:bg-slate-600 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {pkg.name === 'Enterprise' ? 'Contact Us' : 'Get Started'}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Works */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why This Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { num: '01', title: 'Specialized AI Agents', desc: 'Not one generalist — a team of specialists: Research Agent, SEO Agent, and Content Agent working in sequence.' },
              { num: '02', title: 'Built on Your Brand', desc: 'We learn your voice, audience, and competitors. Every post sounds like you, not a robot.' },
              { num: '03', title: 'Data-Driven', desc: 'Every post is built on real keyword data, competitor analysis, and search intent. We research, not guess.' },
              { num: '04', title: 'Speed Without Sacrifice', desc: 'AI handles the heavy lifting. You get agency-quality content in startup timelines.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="text-4xl font-bold text-indigo-600">{item.num}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trial CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10">
            <div className="text-5xl mb-4">🎯</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Try Before You Commit</h2>
            <p className="text-xl text-indigo-100 mb-6">
              <strong>One Post, $150.</strong> Fully-researched, SEO-optimized. No commitment. No risk.
            </p>
            <p className="text-indigo-200 mb-8">
              Love it? We'll credit the $150 toward your first monthly package.
            </p>
            <a href={PAYMENT_LINKS.trial} className="inline-block bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-4 rounded-xl font-bold text-lg transition">
              Start Your Trial — $150
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Get Started</h2>
          <p className="text-slate-400 text-center mb-10">Questions? Enterprise inquiry? Drop us a line.</p>
          
          {submitted ? (
            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-8 text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2">Message Received!</h3>
              <p className="text-slate-400">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tell us about your content needs</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 py-4 rounded-lg font-semibold text-lg transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-slate-800">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-2xl font-bold gradient-text mb-4">Blog Squad</div>
          <p className="text-slate-500 italic mb-6">Content that ranks. Copy that converts. Speed that scales.</p>
          <p className="text-slate-600 text-sm">© 2026 Street Chef Digital. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
