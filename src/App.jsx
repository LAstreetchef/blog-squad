import { useState, useEffect } from 'react'

// Stripe Payment Links
const PAYMENT_LINKS = {
  trial: 'https://buy.stripe.com/fZufZg89id8v1H051ZbfO0A',
  starter: 'https://buy.stripe.com/14A9AS2OYd8vadwcurbfO0B',
  growth: 'https://buy.stripe.com/bJe9AS75e2tR4TcamjbfO0C',
  scale: 'https://buy.stripe.com/bJeeVc61afgD85obqnbfO0D',
}

// Decorative blob component
const Blob = ({ className, color = "#3858e9" }) => (
  <svg className={className} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <path fill={color} d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,14.6,81.4,29.2,73.1,42.2C64.8,55.2,53.7,66.6,40.3,74.5C26.9,82.4,11.2,86.8,-3.8,85.1C-18.8,83.4,-33,75.6,-45.9,66.3C-58.8,57,-70.5,46.2,-77.8,32.6C-85.2,19,-88.2,2.6,-85.6,-12.7C-83,-28,-74.8,-42.2,-63.4,-51.8C-52,-61.4,-37.4,-66.4,-23.4,-73.5C-9.4,-80.6,4,-89.8,18.3,-89.2C32.6,-88.6,47.8,-78.2,44.7,-76.4Z" transform="translate(100 100)" />
  </svg>
)

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showCompareWidget, setShowCompareWidget] = useState(false)
  const [compareWidgetDismissed, setCompareWidgetDismissed] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('success') === 'true') {
      setShowSuccess(true)
      window.history.replaceState({}, '', window.location.pathname)
    }
    
    const dismissed = localStorage.getItem('compareWidgetDismissed')
    if (!dismissed) {
      const timer = setTimeout(() => {
        setShowCompareWidget(true)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
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

      {/* Compare Widget Popup */}
      {showCompareWidget && !compareWidgetDismissed && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 max-w-sm">
            <button 
              onClick={() => {
                setCompareWidgetDismissed(true)
                localStorage.setItem('compareWidgetDismissed', 'true')
              }}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#3858e9]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">⚖️</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Not sure yet?</h3>
                <p className="text-slate-600 text-sm mb-3">See how Blog Squad compares to Jasper, Copy.ai, agencies & more.</p>
                <a 
                  href="/blog-squad/compare/" 
                  className="inline-flex items-center gap-1 text-[#3858e9] font-semibold text-sm hover:underline"
                >
                  View Comparisons →
                </a>
              </div>
            </div>
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
            <a href="/blog-squad/compare/" className="text-slate-600 hover:text-[#3858e9] transition font-medium">Compare</a>
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
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-6 py-4 space-y-4">
            <a href="#how-it-works" className="block text-slate-600 font-medium">How It Works</a>
            <a href="#features" className="block text-slate-600 font-medium">Features</a>
            <a href="#packages" className="block text-slate-600 font-medium">Pricing</a>
            <a href="/blog-squad/compare/" className="block text-slate-600 font-medium">Compare</a>
            <a href={PAYMENT_LINKS.trial} className="block bg-[#3858e9] text-white px-6 py-2.5 rounded-full font-semibold text-center">Get Started</a>
          </div>
        )}
      </nav>

      {/* Hero Section - WordPress style gradient */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e4fff] via-[#3858e9] to-[#8c5aff]"></div>
        
        {/* Decorative blobs */}
        <Blob className="absolute -top-20 -right-20 w-96 h-96 opacity-20" color="#ffffff" />
        <Blob className="absolute -bottom-40 -left-20 w-[500px] h-[500px] opacity-10" color="#ffffff" />
        
        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
            Meet Blog Squad
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            The AI-powered content service of choice for businesses worldwide—from startups and small businesses to growing brands.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PAYMENT_LINKS.trial} className="bg-white hover:bg-blue-50 text-[#3858e9] px-8 py-4 rounded-full font-semibold text-lg transition shadow-lg">
              Get Started — $150 Trial
            </a>
            <a href="#how-it-works" className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-8 py-4 rounded-full font-semibold text-lg transition backdrop-blur-sm">
              Learn More
            </a>
          </div>
        </div>
        
        {/* Hero image/illustration placeholder */}
        <div className="max-w-4xl mx-auto mt-16 relative z-10">
          <div className="bg-white rounded-2xl shadow-2xl p-8 mx-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 text-center">
                <div className="text-4xl mb-2">🔍</div>
                <div className="font-semibold text-slate-700">Research</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 text-center">
                <div className="text-4xl mb-2">✍️</div>
                <div className="font-semibold text-slate-700">Write</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 text-center">
                <div className="text-4xl mb-2">📈</div>
                <div className="font-semibold text-slate-700">Rank</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 px-6 bg-white">
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

      {/* How It Works - with gradient cards */}
      <section id="how-it-works" className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white">
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
                desc: 'Our AI agents analyze competitors, identify gaps, and find the angles that will make your content stand out.',
                gradient: 'from-blue-500 to-indigo-600'
              },
              { 
                icon: '📊',
                title: 'Optimize',
                desc: 'Keywords, search intent, content structure—every post is built on real SEO data, not guesswork.',
                gradient: 'from-purple-500 to-pink-600'
              },
              { 
                icon: '✍️',
                title: 'Write',
                desc: 'Sharp, on-brand content delivered in 24-48 hours. Review, request revisions, and publish.',
                gradient: 'from-orange-500 to-red-600'
              },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className="relative bg-white rounded-2xl p-8 text-center shadow-lg border border-slate-100 group-hover:border-transparent transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-colors">
                    <span className="text-3xl">{item.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed group-hover:text-white/90 transition-colors">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - colorful grid */}
      <section id="features" className="py-24 px-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent"></div>
        <Blob className="absolute -right-40 top-20 w-[600px] h-[600px] opacity-5" color="#3858e9" />
        
        <div className="max-w-5xl mx-auto relative z-10">
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
                items: ['Competitor content analysis', 'Market positioning insights', 'Customer pain points from reviews & forums'],
                color: 'blue'
              },
              { 
                icon: '📈', 
                title: 'SEO Strategy',
                items: ['Primary & secondary keyword targets', 'Search volume & difficulty data', 'Optimized title, meta, headers'],
                color: 'purple'
              },
              { 
                icon: '✍️', 
                title: 'Quality Content',
                items: ['1,500-2,000 words (or custom)', 'Engaging hook, clear structure, strong CTA', 'Brand voice matching'],
                color: 'pink'
              },
              { 
                icon: '📦', 
                title: 'Deliverables',
                items: ['Final draft in your preferred format', 'SEO checklist for publishing', 'Keyword tracking sheet'],
                color: 'green'
              },
            ].map((section, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    section.color === 'blue' ? 'bg-blue-100' :
                    section.color === 'purple' ? 'bg-purple-100' :
                    section.color === 'pink' ? 'bg-pink-100' : 'bg-green-100'
                  }`}>
                    <span className="text-2xl">{section.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold">{section.title}</h3>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-slate-600">
                      <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        section.color === 'blue' ? 'text-blue-500' :
                        section.color === 'purple' ? 'text-purple-500' :
                        section.color === 'pink' ? 'text-pink-500' : 'text-green-500'
                      }`} fill="currentColor" viewBox="0 0 20 20">
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

      {/* The Problem - dark section */}
      <section className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
        <Blob className="absolute -left-40 -top-40 w-[500px] h-[500px] opacity-10" color="#3858e9" />
        <Blob className="absolute -right-40 -bottom-40 w-[500px] h-[500px] opacity-10" color="#8c5aff" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Problem With Traditional Content</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              You know you need content. But your options haven't been great—until now.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Content Mills', price: '$25-75/post', problem: 'Generic, no strategy, hurts your brand' },
              { title: 'Freelancers', price: '$150-400/post', problem: 'Inconsistent quality, slow turnaround' },
              { title: 'Agencies', price: '$500-1,500/post', problem: 'Expensive, bloated process' },
              { title: 'In-House Writer', price: '$50-80k/year', problem: 'Fixed cost, limited output' },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <span className="text-sm font-mono text-red-400 bg-red-400/10 px-2 py-1 rounded">{item.price}</span>
                </div>
                <p className="text-slate-400">{item.problem}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 bg-gradient-to-r from-[#3858e9] to-[#8c5aff] rounded-2xl p-8 text-center">
            <p className="text-lg text-white">
              <strong>Blog Squad is the middle ground.</strong> Agency-quality research and writing, freelancer-friendly prices, and 24-48 hour turnaround.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing - gradient background */}
      <section id="packages" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
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
              <div key={i} className={`rounded-2xl p-6 flex flex-col ${pkg.featured ? 'bg-gradient-to-br from-[#3858e9] to-[#8c5aff] text-white ring-4 ring-[#3858e9]/30 scale-105 shadow-xl' : 'bg-white border border-slate-200 shadow-lg'}`}>
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

      {/* Trial CTA - vibrant gradient */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1e4fff] via-[#3858e9] to-[#8c5aff]"></div>
            <Blob className="absolute -right-20 -top-20 w-80 h-80 opacity-20" color="#ffffff" />
            <Blob className="absolute -left-20 -bottom-20 w-80 h-80 opacity-20" color="#ffffff" />
            
            <div className="relative z-10 p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Try Before You Commit</h2>
              <p className="text-xl text-blue-100 mb-6">
                One post, $150. Fully-researched, SEO-optimized, delivered in 48 hours.
              </p>
              <p className="text-blue-200 mb-8">
                Love it? We'll credit the $150 toward your first monthly package.
              </p>
              <a href={PAYMENT_LINKS.trial} className="inline-block bg-white hover:bg-blue-50 text-[#3858e9] px-8 py-4 rounded-full font-bold text-lg transition shadow-lg">
                Start Your Trial — $150
              </a>
            </div>
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
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg space-y-6">
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
