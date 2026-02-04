import { useState, useEffect } from 'react'

// Stripe Payment Links
const PAYMENT_LINKS = {
  trial: 'https://buy.stripe.com/fZufZg89id8v1H051ZbfO0A',
  starter: 'https://buy.stripe.com/14A9AS2OYd8vadwcurbfO0B',
  growth: 'https://buy.stripe.com/bJe9AS75e2tR4TcamjbfO0C',
  scale: 'https://buy.stripe.com/bJeeVc61afgD85obqnbfO0D',
}

// Icon Components
const Icons = {
  target: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  lightning: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  brain: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
      <path d="M9 21h6M12 17v4" />
    </svg>
  ),
  chart: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <path d="M3 3v18h18" />
      <path d="M7 16l4-4 4 4 5-6" />
    </svg>
  ),
  pen: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  search: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  ),
  shield: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  cube: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
    </svg>
  ),
  arrow: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  grid: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  layers: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  cpu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
    </svg>
  ),
}

// Animated grid background
const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Main grid */}
    <div 
      className="absolute inset-0 opacity-[0.07]" 
      style={{ 
        backgroundImage: `
          linear-gradient(rgba(34, 211, 238, 0.8) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34, 211, 238, 0.8) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }}
    />
    {/* Secondary grid */}
    <div 
      className="absolute inset-0 opacity-[0.03]" 
      style={{ 
        backgroundImage: `
          linear-gradient(rgba(168, 85, 247, 0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(168, 85, 247, 0.5) 1px, transparent 1px)
        `,
        backgroundSize: '120px 120px'
      }}
    />
    {/* Vertical accent lines */}
    <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />
    <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-cyan-500/20 via-purple-500/20 to-transparent" />
    <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/30 to-transparent" />
    {/* Horizontal accent lines */}
    <div className="absolute left-0 top-1/3 h-px w-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
    <div className="absolute left-0 top-2/3 h-px w-full bg-gradient-to-r from-transparent via-purple-500/15 to-transparent" />
    {/* Corner accents */}
    <div className="absolute top-20 left-20 w-32 h-32 border border-cyan-500/10 rotate-45" />
    <div className="absolute bottom-20 right-20 w-48 h-48 border border-purple-500/10 rotate-12" />
    <div className="absolute top-1/2 right-10 w-24 h-24 border border-cyan-500/5 rounded-full" />
  </div>
)

// Glowing orb decoration
const GlowOrb = ({ color = 'cyan', size = 'lg', position = '', pulse = false }) => {
  const sizeClasses = {
    sm: 'w-48 h-48',
    md: 'w-80 h-80',
    lg: 'w-[500px] h-[500px]',
    xl: 'w-[700px] h-[700px]'
  }
  const colorClasses = {
    cyan: 'bg-cyan-500/25',
    purple: 'bg-purple-500/20',
    pink: 'bg-pink-500/15',
    mixed: 'bg-gradient-to-br from-cyan-500/25 via-purple-500/20 to-pink-500/15'
  }
  return (
    <div className={`absolute ${sizeClasses[size]} ${colorClasses[color]} rounded-full blur-[120px] ${position} ${pulse ? 'animate-pulse-slow' : ''}`} />
  )
}

// Floating shapes decoration
const FloatingShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Rotating rings */}
    <div className="absolute top-1/4 right-1/4 w-64 h-64 border border-cyan-500/20 rounded-full animate-[spin_30s_linear_infinite]" />
    <div className="absolute top-1/4 right-1/4 w-72 h-72 border border-purple-500/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
    
    {/* Geometric accents */}
    <svg className="absolute top-20 left-[10%] w-16 h-16 text-cyan-500/20 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 22 20 2 20" />
    </svg>
    <svg className="absolute bottom-32 right-[15%] w-12 h-12 text-purple-500/15" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="3" width="18" height="18" transform="rotate(45 12 12)" />
    </svg>
    <svg className="absolute top-[60%] left-[5%] w-20 h-20 text-cyan-500/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  </div>
)

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
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Custom styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        body { font-family: 'Inter', sans-serif; }
        
        .clip-corner {
          clip-path: polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px);
        }
        .clip-corner-sm {
          clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
        }
        
        .glow-cyan {
          box-shadow: 0 0 40px rgba(34, 211, 238, 0.15), 0 0 80px rgba(34, 211, 238, 0.05);
        }
        .glow-cyan-strong {
          box-shadow: 0 0 30px rgba(34, 211, 238, 0.3), 0 0 60px rgba(34, 211, 238, 0.1);
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #22d3ee 0%, #a855f7 50%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .border-gradient {
          border: 1px solid transparent;
          background: linear-gradient(#0a0a0f, #0a0a0f) padding-box,
                      linear-gradient(135deg, rgba(34, 211, 238, 0.3), rgba(168, 85, 247, 0.3)) border-box;
        }
        
        .animate-pulse-slow {
          animation: pulse-glow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .shimmer-border {
          background: linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.3), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }
      `}</style>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-[#12121a] border border-cyan-500/30 p-10 max-w-md text-center clip-corner glow-cyan">
            <div className="w-16 h-16 mx-auto mb-6 text-cyan-400">
              <Icons.check />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-white">Payment Confirmed</h2>
            <p className="text-gray-400 mb-8">
              Your squad is being assembled. Expect contact within 24 hours.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-3 font-semibold transition-all clip-corner-sm"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#0a0a0f]/90 backdrop-blur-md z-40 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 clip-corner-sm flex items-center justify-center">
              <span className="text-black font-bold text-lg">B</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Blog Squad</span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <a href="#agents" className="text-gray-400 hover:text-white transition text-sm font-medium tracking-wide">Agents</a>
            <a href="#process" className="text-gray-400 hover:text-white transition text-sm font-medium tracking-wide">Process</a>
            <a href="#pricing" className="text-gray-400 hover:text-white transition text-sm font-medium tracking-wide">Pricing</a>
          </div>
          <a href={PAYMENT_LINKS.trial} className="hidden md:flex items-center gap-2 bg-white hover:bg-gray-100 text-black px-5 py-2.5 font-semibold text-sm transition-all clip-corner-sm">
            Get Started
            <span className="w-4 h-4"><Icons.arrow /></span>
          </a>
          <button 
            className="md:hidden p-2 text-gray-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 bg-[#0a0a0f] px-6 py-6 space-y-4">
            <a href="#agents" className="block text-gray-400 hover:text-white text-sm font-medium">Agents</a>
            <a href="#process" className="block text-gray-400 hover:text-white text-sm font-medium">Process</a>
            <a href="#pricing" className="block text-gray-400 hover:text-white text-sm font-medium">Pricing</a>
            <a href={PAYMENT_LINKS.trial} className="block bg-white text-black px-5 py-2.5 font-semibold text-sm text-center clip-corner-sm">Get Started</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 pt-20 overflow-hidden">
        <GridBackground />
        <FloatingShapes />
        <GlowOrb color="cyan" size="xl" position="top-0 -right-64" pulse />
        <GlowOrb color="purple" size="lg" position="bottom-0 -left-48" />
        <GlowOrb color="mixed" size="md" position="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-6xl mx-auto relative z-10 py-20">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left side - Text content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-12 bg-gradient-to-r from-cyan-500 to-transparent" />
                <span className="text-cyan-400 text-sm font-medium tracking-widest uppercase">AI-Powered Content</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tight">
                <span className="text-white">Content that</span>
                <br />
                <span className="text-gradient">dominates.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl leading-relaxed font-light">
                Four specialized AI agents working in parallel. Research, write, optimize — 
                delivered in 24-48 hours.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <a 
              href={PAYMENT_LINKS.trial} 
              className="inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-black px-8 py-4 font-semibold text-lg transition-all clip-corner group"
            >
              Start with a Trial
              <span className="w-5 h-5 group-hover:translate-x-1 transition-transform"><Icons.arrow /></span>
            </a>
            <a 
              href="#agents" 
              className="inline-flex items-center justify-center gap-3 border border-white/20 hover:border-white/40 text-white px-8 py-4 font-semibold text-lg transition-all clip-corner hover:bg-white/5"
            >
              See How It Works
            </a>
          </div>
            </div>
            
            {/* Right side - Stella mascot */}
            <div className="flex-shrink-0 hidden lg:block">
              <video 
                src="/blog-squad/characters/stella.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-72 xl:w-80 h-auto drop-shadow-2xl"
              />
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '24-48h', label: 'Turnaround' },
              { value: '$60', label: 'Per Article' },
              { value: '100%', label: 'SEO Optimized' },
              { value: '2+', label: 'Revisions' },
            ].map((stat, i) => (
              <div key={i} className="border-gradient p-6 bg-white/[0.02] clip-corner-sm">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents Section */}
      <section id="agents" className="py-32 px-6 relative overflow-hidden">
        <GlowOrb color="purple" size="xl" position="-top-32 left-1/4" pulse />
        <GlowOrb color="cyan" size="md" position="bottom-0 right-0" />
        {/* Decorative lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-cyan-500 to-transparent" />
            <span className="text-cyan-400 text-sm font-medium tracking-widest uppercase">The Squad</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            Four agents. <span className="text-gray-500">One mission.</span>
          </h2>
          
          <p className="text-xl text-gray-400 mb-16 max-w-2xl font-light">
            Each agent specializes in a critical phase of content creation, working in parallel to deliver faster than any human team.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { 
                name: 'Stella',
                role: 'Research',
                desc: 'Analyzes competitors, identifies gaps, and finds the angles that will make your content stand out.',
                icon: Icons.search,
                color: 'cyan',
                image: '/blog-squad/squad/stella.mp4',
                isVideo: true
              },
              { 
                name: 'Luna',
                role: 'Writing',
                desc: 'Transforms research into compelling narratives that engage readers and drive action.',
                icon: Icons.pen,
                color: 'purple',
                image: '/blog-squad/squad/luna.png'
              },
              { 
                name: 'Nova',
                role: 'SEO',
                desc: 'Optimizes every element for search engines. Keywords, structure, meta — all handled.',
                icon: Icons.chart,
                color: 'pink',
                image: '/blog-squad/squad/nova.png'
              },
              { 
                name: 'Max',
                role: 'Strategy',
                desc: 'Coordinates the operation and ensures everything aligns with your business goals.',
                icon: Icons.brain,
                color: 'green',
                image: '/blog-squad/squad/max.png'
              },
            ].map((agent, i) => (
              <div 
                key={i} 
                className="group relative bg-[#12121a] border border-white/5 hover:border-white/10 p-6 transition-all duration-500 clip-corner"
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  agent.color === 'cyan' ? 'bg-gradient-to-br from-cyan-500/5 to-transparent' :
                  agent.color === 'purple' ? 'bg-gradient-to-br from-purple-500/5 to-transparent' :
                  agent.color === 'pink' ? 'bg-gradient-to-br from-pink-500/5 to-transparent' :
                  'bg-gradient-to-br from-green-500/5 to-transparent'
                }`} />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 ${
                      agent.color === 'cyan' ? 'text-cyan-400' :
                      agent.color === 'purple' ? 'text-purple-400' :
                      agent.color === 'pink' ? 'text-pink-400' : 'text-green-400'
                    }`}>
                      <agent.icon />
                    </div>
                  </div>
                  
                  <div className="w-20 h-20 mb-6 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-white/20 transition-all">
                    {agent.isVideo ? (
                      <video 
                        src={agent.image} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img 
                        src={agent.image} 
                        alt={agent.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                    )}
                    <div className={`w-full h-full items-center justify-center hidden ${
                      agent.color === 'cyan' ? 'bg-cyan-500/10' :
                      agent.color === 'purple' ? 'bg-purple-500/10' :
                      agent.color === 'pink' ? 'bg-pink-500/10' : 'bg-green-500/10'
                    }`}>
                      <div className={`w-8 h-8 ${
                        agent.color === 'cyan' ? 'text-cyan-400' :
                        agent.color === 'purple' ? 'text-purple-400' :
                        agent.color === 'pink' ? 'text-pink-400' : 'text-green-400'
                      }`}>
                        <agent.icon />
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-1">{agent.name}</h3>
                  <p className={`text-sm font-medium mb-4 ${
                    agent.color === 'cyan' ? 'text-cyan-400' :
                    agent.color === 'purple' ? 'text-purple-400' :
                    agent.color === 'pink' ? 'text-pink-400' : 'text-green-400'
                  }`}>{agent.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{agent.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0f18] to-[#0a0a0f]" />
        <GlowOrb color="cyan" size="lg" position="top-1/2 -right-64 -translate-y-1/2" />
        <GlowOrb color="purple" size="md" position="top-1/3 -left-32" />
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.04]" 
          style={{ 
            backgroundImage: `radial-gradient(rgba(34, 211, 238, 0.5) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-cyan-500 to-transparent" />
            <span className="text-cyan-400 text-sm font-medium tracking-widest uppercase">Process</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black mb-16 tracking-tight">
            Three steps. <span className="text-gray-500">Zero friction.</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                step: '01',
                title: 'Brief',
                desc: 'Share your topic, goals, and brand voice. We handle the rest.',
                icon: Icons.target
              },
              { 
                step: '02',
                title: 'Create',
                desc: 'Our squad researches, writes, and optimizes in parallel.',
                icon: Icons.cpu
              },
              { 
                step: '03',
                title: 'Deliver',
                desc: 'Receive publish-ready content in 24-48 hours.',
                icon: Icons.lightning
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-[120px] font-black text-white/[0.02] absolute -top-8 -left-4 leading-none select-none">
                  {item.step}
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 text-cyan-400 mb-6">
                    <item.icon />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-32 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-cyan-500 to-transparent" />
            <span className="text-cyan-400 text-sm font-medium tracking-widest uppercase">Deliverables</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black mb-16 tracking-tight">
            Everything included. <span className="text-gray-500">Always.</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { 
                icon: Icons.search, 
                title: 'Research',
                items: ['Competitor analysis', 'Market gap identification', 'Audience pain points'],
              },
              { 
                icon: Icons.chart, 
                title: 'SEO',
                items: ['Keyword targeting', 'Search intent alignment', 'Technical optimization'],
              },
              { 
                icon: Icons.pen, 
                title: 'Content',
                items: ['1,500-2,000 words', 'Conversion-focused structure', 'Brand voice matching'],
              },
              { 
                icon: Icons.cube, 
                title: 'Extras',
                items: ['Publishing checklist', 'Keyword tracking', 'Revision rounds'],
              },
            ].map((section, i) => (
              <div key={i} className="border-gradient p-8 bg-white/[0.01] clip-corner hover:bg-white/[0.02] transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 text-cyan-400">
                    <section.icon />
                  </div>
                  <h3 className="text-xl font-bold text-white">{section.title}</h3>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-400">
                      <div className="w-4 h-4 text-cyan-500">
                        <Icons.check />
                      </div>
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
      <section id="pricing" className="py-32 px-6 relative overflow-hidden">
        <GlowOrb color="cyan" size="xl" position="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" pulse />
        <GlowOrb color="purple" size="lg" position="-bottom-32 -left-32" />
        <GlowOrb color="pink" size="md" position="-top-20 -right-20" />
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-cyan-500/10 rounded-full" />
        <div className="absolute bottom-20 right-10 w-48 h-48 border border-purple-500/5 rotate-45" />
        <div className="absolute top-1/2 right-20 w-px h-64 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500" />
              <span className="text-cyan-400 text-sm font-medium tracking-widest uppercase">Pricing</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Simple pricing. <span className="text-gray-500">Real results.</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4">
            {[
              {
                name: 'Starter',
                price: '$60',
                unit: '/article',
                features: ['1,500-2,000 words', 'Keyword research', 'SEO optimization', '1 revision', '48h delivery'],
                featured: false,
                link: PAYMENT_LINKS.starter
              },
              {
                name: 'Growth',
                price: '$120',
                unit: '/month',
                subtitle: '4 articles',
                features: ['Everything in Starter', 'Content calendar', 'Competitor monitoring', 'Strategy call', '2 revisions each'],
                featured: false,
                link: PAYMENT_LINKS.growth
              },
              {
                name: 'Scale',
                price: '$240',
                unit: '/month',
                subtitle: '8 articles',
                features: ['Everything in Growth', 'Full SEO strategy', 'Gap analysis', 'Content repurposing', 'Unlimited revisions'],
                featured: true,
                link: PAYMENT_LINKS.scale
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                unit: '',
                features: ['12+ articles/month', 'Multi-brand support', 'Landing pages', 'API integration', 'White-label'],
                featured: false,
                link: '#contact'
              },
            ].map((pkg, i) => (
              <div 
                key={i} 
                className={`relative flex flex-col clip-corner ${
                  pkg.featured 
                    ? 'bg-gradient-to-b from-cyan-500/10 to-purple-500/10 border-2 border-cyan-500/30 glow-cyan' 
                    : 'bg-[#12121a] border border-white/5'
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-px left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-500 text-black text-xs font-bold tracking-wider">
                    POPULAR
                  </div>
                )}
                <div className="p-6 flex-grow">
                  <h3 className="text-lg font-bold text-white mb-4">{pkg.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-black text-white">{pkg.price}</span>
                    <span className="text-gray-500 text-sm">{pkg.unit}</span>
                  </div>
                  {pkg.subtitle && <p className="text-cyan-400 text-sm font-medium mb-6">{pkg.subtitle}</p>}
                  {!pkg.subtitle && <div className="mb-6" />}
                  <ul className="space-y-3">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-gray-400">
                        <div className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0">
                          <Icons.check />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 pt-0">
                  <a 
                    href={pkg.link}
                    className={`block text-center py-3 font-semibold transition-all clip-corner-sm ${
                      pkg.featured 
                        ? 'bg-white text-black hover:bg-gray-100' 
                        : 'bg-white/5 text-white hover:bg-white/10'
                    }`}
                  >
                    {pkg.name === 'Enterprise' ? 'Contact Us' : 'Get Started'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Spin - Fly Wheel Integration */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-cyan-500/5" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-cyan-500 to-transparent" />
            <span className="text-cyan-400 text-sm font-medium tracking-widest uppercase">Quick Spin</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">
                Need just <span className="text-cyan-400">one post</span>?
              </h2>
              <p className="text-gray-400 text-lg max-w-xl">
                No subscription needed. Pay-as-you-go micro content — social posts, carousels, emails. 
                Powered by <span className="text-cyan-400">Fly Wheel</span>.
              </p>
            </div>
            <a 
              href="/fly-wheel/"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              See all options
              <span className="w-4 h-4"><Icons.arrow /></span>
            </a>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '📱', title: 'Social Post', price: '$5', desc: 'IG, Twitter, or TikTok' },
              { icon: '🎠', title: 'Carousel', price: '$10', desc: '5-slide Instagram' },
              { icon: '🎬', title: 'Video Script', price: '$15', desc: 'TikTok/Reel ready' },
              { icon: '📧', title: 'Email Blast', price: '$25', desc: 'Subject + body copy' },
            ].map((item, i) => (
              <a
                key={i}
                href="/fly-wheel/#pricing"
                className="group bg-white/[0.02] border border-white/10 hover:border-cyan-500/50 p-6 clip-corner-sm transition-all hover:bg-white/[0.04]"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-bold text-white">{item.title}</span>
                  <span className="text-cyan-400 font-bold">{item.price}</span>
                </div>
                <span className="text-sm text-gray-500">{item.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Trial CTA */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="relative border-gradient p-12 md:p-16 text-center bg-gradient-to-b from-white/[0.02] to-transparent clip-corner">
            <div className="w-16 h-16 mx-auto mb-8 text-cyan-400">
              <Icons.lightning />
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
              Start with a trial.
            </h2>
            <p className="text-xl text-gray-400 mb-4 font-light">
              One article. Full process. $150.
            </p>
            <p className="text-gray-500 mb-10">
              Not satisfied? Full refund. Love it? We credit the $150 toward your first package.
            </p>
            <a 
              href={PAYMENT_LINKS.trial} 
              className="inline-flex items-center gap-3 bg-white hover:bg-gray-100 text-black px-10 py-5 font-semibold text-lg transition-all clip-corner group"
            >
              Start Trial
              <span className="w-5 h-5 group-hover:translate-x-1 transition-transform"><Icons.arrow /></span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] to-[#0f0f18]" />
        
        <div className="max-w-xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500" />
              <span className="text-cyan-400 text-sm font-medium tracking-widest uppercase">Contact</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500" />
            </div>
            <h2 className="text-4xl font-black tracking-tight">
              Get in touch.
            </h2>
          </div>
          
          {submitted ? (
            <div className="border border-green-500/30 bg-green-500/5 p-10 text-center clip-corner">
              <div className="w-12 h-12 mx-auto mb-4 text-green-400">
                <Icons.check />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Message Sent</h3>
              <p className="text-gray-400">We'll respond within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="border-gradient bg-white/[0.01] p-8 space-y-6 clip-corner">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition text-white placeholder-gray-600 outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition text-white placeholder-gray-600 outline-none"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-400">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition text-white placeholder-gray-600 outline-none resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-white hover:bg-gray-100 text-black py-4 font-semibold transition-all clip-corner-sm"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 clip-corner-sm flex items-center justify-center">
                <span className="text-black font-bold text-sm">B</span>
              </div>
              <span className="font-bold text-white">Blog Squad</span>
            </div>
            <p className="text-gray-600 text-sm">Research. Write. Rank. Dominate.</p>
            <p className="text-gray-700 text-sm">© 2026 Street Chef Digital</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
