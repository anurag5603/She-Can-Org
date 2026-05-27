import React, { useState, useEffect, useRef } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LoginPage } from './components/LoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Sparkles,
  Users,
  Shield,
  BookOpen,
  Briefcase,
  Award,
  Send,
  CheckCircle,
  Globe,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import API_BASE from './config';

// ── CUSTOM INTERACTIVE SHADER CANVAS ──
const ShaderBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth / 4); // downscaled heavily for high WebGL-like performance
    let height = (canvas.height = window.innerHeight / 4);
    
    let mouse = { x: width / 2, y: height / 2, tx: width / 2, ty: height / 2 };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth / 4;
      height = canvas.height = window.innerHeight / 4;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.tx = e.clientX / 4;
      mouse.ty = e.clientY / 4;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    let tick = 0;
    const render = () => {
      tick += 0.008;
      
      // lerp mouse movement smoothly
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;

      const imgData = ctx.createImageData(width, height);
      const data = imgData.data;

      // Render a dynamic glowing plasma shader
      for (let y = 0; y < height; y += 2) {
        for (let x = 0; x < width; x += 2) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // multi-wave interference plasma formula
          const cx = x + 30 * Math.sin(tick + y / 20);
          const cy = y + 30 * Math.cos(tick + x / 20);
          const dist2 = Math.sqrt((cx - mouse.x) * (cx - mouse.x) + (cy - mouse.y) * (cy - mouse.y));

          const v1 = Math.sin(x / 40 + tick);
          const v2 = Math.cos(y / 40 - tick * 1.2);
          const v3 = Math.sin(dist / 25 - tick * 2.0);
          const v4 = Math.sin(dist2 / 50 + tick);
          
          const total = (v1 + v2 + v3 + v4) / 4;

          // Map colors to our exact violet/pink/rose palette
          const r = Math.floor((total * 0.5 + 0.5) * 80 + 175); // 175 - 255 (rose/pink)
          const g = Math.floor((total * 0.5 + 0.5) * 40 + 50);   // 50 - 90
          const b = Math.floor((total * 0.5 + 0.5) * 90 + 165); // 165 - 255 (violet)
          
          const alpha = Math.max(0, Math.min(255, Math.floor(110 - dist / 3))); // Fading radial glow

          // Block drawing for high performance (2x2 pixel blocks)
          for (let by = 0; by < 2 && y + by < height; by++) {
            for (let bx = 0; bx < 2 && x + bx < width; bx++) {
              const idx = ((y + by) * width + (x + bx)) * 4;
              data[idx] = r;
              data[idx + 1] = g;
              data[idx + 2] = b;
              data[idx + 3] = alpha * 0.45; // Fading layer opacity
            }
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-40 blur-3xl z-0" />;
};

type AppState = 'landing' | 'login' | 'admin';

function AppContent() {
  const { user, isLoading: authLoading } = useAuth();
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    subject: string;
  } | null>(null);

  // Scroll target refs
  const formSectionRef = useRef<HTMLDivElement>(null);
  const pillarsSectionRef = useRef<HTMLDivElement>(null);
  const successSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (authLoading) return;

    if (currentState === 'login' && user) {
      setCurrentState('landing');
      return;
    }
    if (currentState === 'admin' && !user?.isAdmin) {
      setCurrentState('landing');
      return;
    }
  }, [currentState, user, authLoading]);

  const handleNavigation = (page: AppState) => {
    setCurrentState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartInvolvement = () => {
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePillarsScroll = () => {
    if (pillarsSectionRef.current) {
      pillarsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSuccessScroll = () => {
    if (successSectionRef.current) {
      successSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit the form.');
      }

      setSubmittedData({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
      });

      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Smooth scroll to success modal
      setTimeout(() => {
        if (formSectionRef.current) {
          formSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-violet-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-semibold tracking-wide">Loading She Can Portal...</p>
        </div>
      </div>
    );
  }

  const navProps = {
    onHomeClick: () => handleNavigation('landing'),
    onFeaturesClick: handlePillarsScroll,
    onHowItWorksClick: handleSuccessScroll,
    onAdminClick: user?.isAdmin ? () => handleNavigation('admin') : undefined,
    onLoginClick: () => handleNavigation('login'),
  };

  const footerProps = {
    onHomeClick: () => handleNavigation('landing'),
    onFeaturesClick: handlePillarsScroll,
    onHowItWorksClick: handleSuccessScroll,
    onContactClick: handleStartInvolvement,
  };

  // ── LOGIN PAGE STATE ──
  if (currentState === 'login') {
    if (user) return null;
    return <LoginPage onBack={() => handleNavigation('landing')} />;
  }

  // ── ADMIN PAGE STATE ──
  if (currentState === 'admin') {
    if (!user?.isAdmin) return null;
    return (
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar {...navProps} showHomeButton={true} />
        <div className="flex-1">
          <AdminDashboard onBack={() => handleNavigation('landing')} />
        </div>
      </div>
    );
  }

  // ── LANDING PAGE STATE ──
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-rose-50 to-violet-100 antialiased font-sans overflow-x-hidden selection:bg-pink-200 selection:text-pink-900">
      <Navbar {...navProps} />

      {/* SVG gooey liquid droplet filter */}
      <svg className="hidden">
        <defs>
          <filter id="liquid-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Hero Section with Vibrant Orange Background, Interactive Shader & Liquid Droplets */}
      <div className="relative overflow-hidden flex-1 flex items-center py-20 lg:py-32 bg-gradient-to-br from-[#fe521e] via-[#ff6a3b] to-[#fd4610]">
        {/* Dynamic mouse-reactive WebGL-like Canvas shader */}
        <ShaderBackground />

        {/* Morphing Water Droplets background with CSS gooey fluid effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-25 select-none" style={{ filter: 'url(#liquid-goo)' }}>
          <div className="absolute w-28 h-28 bg-gradient-to-br from-[#fe521e] to-[#ff7d54] rounded-full animate-fluid top-1/4 left-[8%] blur-[2px]" style={{ animationDuration: '9s' }} />
          <div className="absolute w-36 h-36 bg-gradient-to-br from-[#070f26] to-[#122456] rounded-full animate-fluid top-1/2 right-[12%] blur-[2px]" style={{ animationDuration: '14s' }} />
          <div className="absolute w-24 h-24 bg-gradient-to-br from-[#fe521e] to-[#070f26] rounded-full animate-fluid bottom-1/4 left-1/3 blur-[2px]" style={{ animationDuration: '11s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text with Framer Motion entry animations */}
            <motion.div 
              className="lg:col-span-7 text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center space-x-2 bg-[#070f26]/20 border border-white/20 px-4 py-1.5 rounded-full mb-6 shadow-sm shadow-[#fe521e]/10">
                {/* Blinking Live Indicator */}
                <span className="flex h-3.5 w-3.5 relative mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white shadow-md"></span>
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-widest leading-none">
                  Empowering Women, Transforming Communities
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6 font-sans">
                She <span className="font-satisfy text-white font-normal italic block sm:inline-block sm:ml-2">Can!</span>
                <span className="block text-2xl tracking-[0.25em] uppercase font-black mt-3 text-[#070f26]">
                  Foundation
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-semibold">
                She Can Foundation provides high-impact mentoring, education scholarships, and 
                vocational leadership training to help young women break barriers and build thriving futures.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <motion.button
                  onClick={handleStartInvolvement}
                  className="w-full sm:w-auto px-8 py-4 bg-[#070f26] text-white text-lg font-extrabold rounded-2xl transition-all shadow-lg hover:shadow-[#070f26]/30 flex items-center justify-center border border-white/10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Involved Now
                  <ChevronRight className="w-5 h-5 ml-1" />
                </motion.button>

                <div className="flex items-center text-white font-bold text-sm sm:text-base drop-shadow-sm">
                  <Globe className="w-5 h-5 mr-2 text-[#070f26]" />
                  <span>Global Sisterhood Network</span>
                </div>
              </div>
            </motion.div>

            {/* Hero Card Visual with custom Framer Motion hover states */}
            <motion.div 
              className="lg:col-span-5 flex justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, delay: 0.2, ease: 'easeOut' }}
            >
              <div className="relative w-full max-w-sm sm:max-w-md">
                {/* Floating Awards Card */}
                <motion.div 
                  className="absolute -top-10 -left-6 z-20 bg-white/90 border border-orange-100 shadow-xl shadow-orange-950/10 p-4 rounded-2xl flex items-center space-x-3 animate-bounce" 
                  style={{ animationDuration: '4s' }}
                  whileHover={{ scale: 1.08 }}
                >
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center shadow-inner">
                    <Award className="w-5 h-5 text-[#fe521e]" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-sm">5,000+ Girls</h3>
                    <p className="text-xs text-gray-500 font-bold">Empowered Globally</p>
                  </div>
                </motion.div>

                {/* Floating Mentors Card */}
                <motion.div 
                  className="absolute -bottom-10 -right-6 z-20 bg-white/90 border border-orange-100 shadow-xl shadow-orange-950/10 p-4 rounded-2xl flex items-center space-x-3 animate-bounce" 
                  style={{ animationDuration: '6s' }}
                  whileHover={{ scale: 1.08 }}
                >
                  <div className="w-10 h-10 bg-orange-150 rounded-xl flex items-center justify-center shadow-inner">
                    <Users className="w-5 h-5 text-[#fe521e]" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-sm">500+ Mentors</h3>
                    <p className="text-xs text-gray-500 font-bold">Industry Leaders</p>
                  </div>
                </motion.div>

                {/* Primary Card - Loaded with the actual Logo image */}
                <motion.div 
                  className="w-full bg-[#070f26] rounded-3xl p-1.5 shadow-2xl border-4 border-white overflow-hidden relative aspect-square"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <img src="/logo.png" alt="She Can! Foundation Silhouette Logo" className="w-full h-full object-cover rounded-2xl" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Pillars Section */}
      <div className="py-24 bg-white relative z-10 border-t border-pink-100/50" ref={pillarsSectionRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Our Core Pillars of Support
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto font-semibold">
              We focus on key programmatic areas designed to address structural barriers and foster personal, academic, and economic leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Pillar Cards with spring Framer Motion hover scaling */}
            {[
              {
                icon: BookOpen,
                color: 'bg-pink-500 shadow-pink-200',
                bg: 'from-pink-50',
                border: 'border-pink-100 hover:border-pink-200',
                title: 'Education Support',
                desc: 'Sponsoring tuition, textbooks, and essential laptops for high-potential girls in rural or low-income areas to continue their education.'
              },
              {
                icon: Users,
                color: 'bg-violet-500 shadow-violet-200',
                bg: 'from-violet-50',
                border: 'border-violet-100 hover:border-violet-200',
                title: 'Mentoring Circles',
                desc: 'Pairing students with female leaders, executives, and academics in local and global businesses for career mapping and confidence building.'
              },
              {
                icon: Briefcase,
                color: 'bg-indigo-500 shadow-indigo-200',
                bg: 'from-indigo-50',
                border: 'border-indigo-100 hover:border-indigo-200',
                title: 'Professional Skills',
                desc: 'Delivering coding, digital marketing, public financial literacy, and entrepreneurship bootcamps to foster career readiness.'
              },
              {
                icon: Award,
                color: 'bg-rose-500 shadow-rose-200',
                bg: 'from-rose-50',
                border: 'border-rose-100 hover:border-rose-200',
                title: 'Leadership Forums',
                desc: 'Creating public speaking workshops, community volunteering modules, and leadership projects to help them command executive presence.'
              }
            ].map((p, idx) => (
              <motion.div
                key={idx}
                className={`bg-gradient-to-br ${p.bg} to-white p-8 rounded-3xl border ${p.border} shadow-sm group cursor-pointer relative overflow-hidden`}
                whileHover={{ scale: 1.05, y: -6 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <div className={`w-14 h-14 ${p.color} rounded-2xl flex items-center justify-center mb-6 shadow-md transition-transform group-hover:rotate-6 duration-300`}>
                  <p.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-3">{p.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm font-semibold">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Statistics themed in brand orange */}
      <div className="py-20 bg-gradient-to-br from-[#fe521e] via-[#ff6a3b] to-[#fd4610] text-white shadow-inner relative overflow-hidden z-10">
        {/* Dynamic mouse-reactive WebGL-like Canvas shader */}
        <ShaderBackground />

        {/* Morphing Water Droplets background with CSS gooey fluid effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-25 select-none" style={{ filter: 'url(#liquid-goo)' }}>
          <div className="absolute w-28 h-28 bg-gradient-to-br from-[#fe521e] to-[#ff7d54] rounded-full animate-fluid top-1/4 left-[8%] blur-[2px]" style={{ animationDuration: '9s' }} />
          <div className="absolute w-36 h-36 bg-gradient-to-br from-[#070f26] to-[#122456] rounded-full animate-fluid top-1/2 right-[12%] blur-[2px]" style={{ animationDuration: '14s' }} />
          <div className="absolute w-24 h-24 bg-gradient-to-br from-[#fe521e] to-[#070f26] rounded-full animate-fluid bottom-1/4 left-1/3 blur-[2px]" style={{ animationDuration: '11s' }} />
        </div>

        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { num: '5,000+', title: 'Girls Supported' },
              { num: '500+', title: 'Industry Mentors' },
              { num: '150+', title: 'Workshops Completed' },
              { num: '98%', title: 'Success Rate' }
            ].map((s, idx) => (
              <motion.div 
                key={idx} 
                className="p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <p className="text-4xl sm:text-5xl md:text-6xl font-black mb-2 tracking-tight">{s.num}</p>
                <p className="text-xs sm:text-sm font-extrabold text-orange-100 uppercase tracking-widest">{s.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="py-24 bg-white relative z-10 border-b border-pink-100/50" ref={successSectionRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Empowerment In Action
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto font-semibold">
              Read how She Can Foundation has transformed the lives of young women and enabled their dreams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: '"The She Can Foundation gave me the coding skills and mentorship that completely changed my career trajectory. I am now giving back as a mentor!"',
                name: 'Amina B.',
                role: 'Software Engineer at TechCorp',
                badge: 'AB',
                color: 'bg-pink-500'
              },
              {
                text: '"Receiving an educational grant from She Can allowed me to pursue my dream of entering medicine. They didn\'t just fund my tuition—they believed in me."',
                name: 'Sophia K.',
                role: 'Medical Student',
                badge: 'SK',
                color: 'bg-rose-500'
              },
              {
                text: '"The entrepreneurship workshop gave me the courage and know-how to start my own social enterprise. The community is my biggest strength."',
                name: 'Elena R.',
                role: 'Founder of EcoGrow',
                badge: 'ER',
                color: 'bg-violet-500'
              }
            ].map((story, idx) => (
              <motion.div
                key={idx}
                className="bg-gradient-to-br from-pink-50/20 via-white to-violet-50/10 p-8 rounded-3xl border border-gray-200/80 shadow-md relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <div className="text-pink-500/20 text-6xl font-black absolute top-4 left-6 pointer-events-none">“</div>
                <p className="text-gray-700 leading-relaxed font-semibold italic mb-8 pt-4 relative z-10">
                  {story.text}
                </p>
                <div className="flex items-center space-x-3 border-t border-gray-100 pt-6">
                  <div className={`w-10 h-10 rounded-full ${story.color} text-white font-extrabold flex items-center justify-center shadow-inner`}>
                    {story.badge}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-sm">{story.name}</h4>
                    <p className="text-xs text-pink-600 font-bold">{story.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Involvement Form Section */}
      <div className="py-24 bg-gradient-to-br from-pink-50/50 via-rose-50/30 to-violet-100/50 border-t border-pink-100/50 relative z-10" ref={formSectionRef}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#fe521e] via-[#ff6a3b] to-[#fd4610] rounded-2xl mb-6 shadow-md shadow-orange-200/50">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Begin Your Journey With Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-semibold">
              Submit the form below to apply for a scholarship, volunteer as a mentor, or ask questions about our programs. We respond within 48 hours.
            </p>
          </div>

          <motion.div 
            className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                // ── SUCCESS STATE CARD WITH ENHANCED ANIMATIONS ──
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="p-8 sm:p-12 text-center bg-gradient-to-b from-white to-orange-50/10"
                >
                  <motion.div 
                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#fe521e] via-[#ff6a3b] to-[#fd4610] rounded-3xl mb-8 shadow-lg shadow-orange-200/50"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <h3 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
                    Form Submitted Successfully
                  </h3>
                  
                  <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto font-semibold">
                    Thank you, <strong className="text-[#fe521e] font-bold">{submittedData?.name}</strong>! We have received your request and a confirmation has been logged.
                  </p>

                  {/* Summary card */}
                  {submittedData && (
                    <motion.div 
                      className="bg-white rounded-2xl border border-gray-200 max-w-md mx-auto p-6 text-left mb-8 shadow-md"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h4 className="font-extrabold text-gray-900 text-xs uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Summary of Submitted Details</h4>
                      <div className="space-y-2.5 text-sm">
                        <p className="text-gray-600 font-semibold"><span className="text-gray-400 font-bold mr-1">Name:</span> {submittedData.name}</p>
                        <p className="text-gray-600 font-semibold"><span className="text-gray-400 font-bold mr-1">Email:</span> {submittedData.email}</p>
                        <p className="text-gray-600 font-semibold flex items-center">
                          <span className="text-gray-400 font-bold mr-1">Preferred Role:</span> 
                          <span className="inline-block px-2.5 py-0.5 font-bold text-xs bg-orange-100 text-[#fe521e] rounded-full border border-orange-200">
                            {submittedData.subject}
                          </span>
                        </p>
                      </div>
                    </motion.div>
                  )}

                  <motion.button
                    onClick={() => setIsSubmitted(false)}
                    className="px-8 py-3.5 bg-gradient-to-br from-[#fe521e] via-[#ff6a3b] to-[#fd4610] text-white font-extrabold rounded-xl transition-all shadow-md hover:from-[#fd4610] hover:to-[#fe521e]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Submit Another Form
                  </motion.button>
                </motion.div>
              ) : (
                // ── GET INVOLVED FORM ──
                <motion.div 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 sm:p-12"
                >
                  {errorMsg && (
                    <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center shadow-sm">
                      <span className="text-red-800 font-extrabold text-sm">⚠️ {errorMsg}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="form-name" className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                        <input
                          id="form-name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#fe521e] focus:border-[#fe521e] transition-all outline-none font-semibold text-sm text-gray-900"
                          placeholder="Your Name"
                        />
                      </div>
                      <div>
                        <label htmlFor="form-email" className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                        <input
                          id="form-email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#fe521e] focus:border-[#fe521e] transition-all outline-none font-semibold text-sm text-gray-900"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="form-subject" className="block text-sm font-bold text-gray-700 mb-2">How would you like to contribute?</label>
                      <select
                        id="form-subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#fe521e] focus:border-[#fe521e] transition-all outline-none font-semibold text-sm text-gray-700"
                      >
                        <option value="">Select a role / purpose</option>
                        <option value="Mentorship">Become a Mentor</option>
                        <option value="Volunteering">Volunteer for Events</option>
                        <option value="Scholarship / Grant">Apply for Scholarship / Grant</option>
                        <option value="General Inquiry">General Inquiries / Support</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="form-message" className="block text-sm font-bold text-gray-700 mb-2">Your Message</label>
                      <textarea
                        id="form-message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#fe521e] focus:border-[#fe521e] transition-all outline-none resize-none font-semibold text-sm text-gray-900"
                        placeholder="Tell us about yourself, why you want to get involved, or how we can assist you..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-4 bg-gradient-to-br from-[#fe521e] via-[#ff6a3b] to-[#fd4610] text-white text-lg font-extrabold rounded-xl transition-all shadow-lg hover:shadow-orange-500/20 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 hover:from-[#fd4610] hover:to-[#fe521e]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send className="w-5 h-5 mr-2" />
                      {isSubmitting ? 'Sending Request...' : 'Send Message'}
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <Footer {...footerProps} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;