import React, { useState } from 'react';
import { Mail, Send, Clock, MessageSquare, CheckCircle, Heart, ArrowLeft, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE from '../config';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submittedData, setSubmittedData] = useState<{ name: string; email: string; subject: string } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmittedData({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
      });
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-violet-100 font-sans antialiased">
      {/* Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <a
          href="/"
          className="inline-flex items-center text-gray-500 hover:text-[#fe521e] font-extrabold text-sm transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </a>
      </div>

      {/* Hero Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#fe521e] via-[#ff6a3b] to-[#fd4610] rounded-3xl mb-8 shadow-lg shadow-orange-200/50">
            <Heart className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            Get Involved With{' '}
            <span className="bg-gradient-to-r from-[#fe521e] to-[#fd4610] bg-clip-text text-transparent block mt-1">
              She Can! Foundation
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed font-semibold">
            Become a mentor, volunteer for events, or apply for our scholarship program. 
            Submit your details below and help us build a thriving sisterhood.
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="py-12 bg-white/70 backdrop-blur-md border-t border-pink-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Contact Form Container with Switchable Success Animation */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  // ── SUCCESS STATE CARD WITH CENTERED checkmark & SPRING ENTRY ──
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="p-8 sm:p-10 text-center bg-gradient-to-b from-white to-orange-50/10"
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
                  // ── INVOLVEMENT FORM ──
                  <motion.div 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 sm:p-10"
                  >
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#070f26] mb-2 tracking-tight">Submit Your Request</h2>
                    <p className="text-gray-500 font-semibold text-sm mb-8">Fill out the official involvement form below. Our managers respond within 48 hours.</p>

                    {errorMsg && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center shadow-sm">
                        <span className="text-red-800 font-extrabold text-sm">⚠️ {errorMsg}</span>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="contact-name" className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                          <input
                            id="contact-name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#fe521e] focus:border-[#fe521e] transition-all outline-none font-semibold text-sm text-gray-900"
                            placeholder="Your Name"
                          />
                        </div>
                        <div>
                          <label htmlFor="contact-email" className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                          <input
                            id="contact-email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#fe521e] focus:border-[#fe521e] transition-all outline-none font-semibold text-sm text-gray-900"
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="contact-subject" className="block text-sm font-bold text-gray-700 mb-2">How would you like to contribute?</label>
                        <select
                          id="contact-subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
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
                        <label htmlFor="contact-message" className="block text-sm font-bold text-gray-700 mb-2">Your Message</label>
                        <textarea
                          id="contact-message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
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
            </div>

            {/* Contact Info Sidebar */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#070f26] mb-2 tracking-tight">Contact Information</h2>
                <p className="text-gray-500 font-semibold text-sm">Reach out to us directly through official foundation channels.</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start p-6 bg-gradient-to-r from-orange-50/50 via-rose-50/10 to-transparent rounded-2xl border border-orange-100/50 shadow-sm">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#fe521e] to-[#ff7d54] rounded-xl flex items-center justify-center flex-shrink-0 mr-5 shadow-md shadow-orange-100/30">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-gray-900 mb-1">Email Us</h3>
                    <a href="mailto:contact.manager5603@gmail.com" className="text-[#fe521e] hover:text-[#fd4610] transition-colors font-bold text-sm">
                      contact.manager5603@gmail.com
                    </a>
                    <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-wider">Official inbox monitored daily</p>
                  </div>
                </div>

                <div className="flex items-start p-6 bg-gradient-to-r from-orange-50/50 via-rose-50/10 to-transparent rounded-2xl border border-orange-100/50 shadow-sm">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#070f26] to-[#122456] rounded-xl flex items-center justify-center flex-shrink-0 mr-5 shadow-md shadow-slate-100/30">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-gray-900 mb-1">Support Hours</h3>
                    <p className="text-gray-700 font-bold text-sm">Monday – Friday</p>
                    <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-wider">9:00 AM – 6:00 PM (IST)</p>
                  </div>
                </div>

                <div className="flex items-start p-6 bg-gradient-to-r from-orange-50/50 via-rose-50/10 to-transparent rounded-2xl border border-orange-100/50 shadow-sm">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#fe521e] to-[#070f26] rounded-xl flex items-center justify-center flex-shrink-0 mr-5 shadow-md shadow-orange-100/20">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-gray-900 mb-1">Empowering Communities</h3>
                    <p className="text-gray-500 font-semibold text-sm leading-relaxed">
                      Every submission helps us offer leadership mentorship programs, vocational modules, 
                      and academic sponsorship grants to girls globally. Thank you for joining us!
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Checklist */}
              <div className="p-6 bg-orange-50/30 rounded-2xl border border-orange-100/20">
                <h3 className="text-base font-extrabold text-[#070f26] mb-4 uppercase tracking-wider">Join Us Checklist</h3>
                <ul className="space-y-3 text-gray-600 font-semibold text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#fe521e] mr-3 mt-0.5 flex-shrink-0" />
                    <span>Select the appropriate role dropdown that aligns with your skillset.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#fe521e] mr-3 mt-0.5 flex-shrink-0" />
                    <span>Mentoring applications undergo a brief panel review prior to student matching.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#fe521e] mr-3 mt-0.5 flex-shrink-0" />
                    <span>Verify that your email is spelled correctly so we can reach you.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};