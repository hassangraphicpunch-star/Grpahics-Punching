import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Embroidery Digitizing',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact-section" className="py-16 md:py-24 bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">24/7 Global Support</span>
              <h2 className="text-3xl sm:text-4xl font-black">
                Get In Touch With Our <span className="text-red-500">Digitizing Team</span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Have questions about stitch count estimates, specialized foam digitizing, or high-volume corporate contracts? Drop us a line anytime!
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                <div className="p-3 bg-red-950 rounded-xl text-red-400 border border-red-800 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Email Support (24/7)</div>
                  <a href="mailto:support@graphicspunching.com" className="text-sm font-bold text-white hover:text-amber-300">
                    support@graphicspunching.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                <div className="p-3 bg-amber-950 rounded-xl text-amber-400 border border-amber-800 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Call & WhatsApp Hotline</div>
                  <a href="tel:+18005557862" className="text-sm font-bold text-white hover:text-amber-300">
                    +1 (800) 555-PUNCH (+1 800-555-7862)
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                <div className="p-3 bg-emerald-950 rounded-xl text-emerald-400 border border-emerald-800 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Turnaround Hours</div>
                  <div className="text-sm font-bold text-white">24 Hours / 7 Days a Week (Non-stop Shifts)</div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Live Chat Simulation CTA */}
            <a
              href="https://wa.me/18005557862"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat Directly On WhatsApp (+1 800 555 PUNCH)</span>
            </a>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
            <h3 className="text-xl font-bold text-white">Send Us A Quick Message</h3>

            {submitted ? (
              <div className="p-8 bg-emerald-950/80 border border-emerald-500 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Message Sent Successfully!</h4>
                <p className="text-xs text-slate-300">
                  Thank you, {formData.name}. Our master digitizing team will review your inquiry and respond to {formData.email} within 15 minutes!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-slate-900 border border-slate-700 text-xs font-bold rounded-lg text-slate-200 hover:text-white"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Johnson"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@embroideryshop.com"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Phone Number / WhatsApp</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Service Required</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500"
                    >
                      <option value="Embroidery Digitizing">Embroidery Digitizing ($10 Flat)</option>
                      <option value="Vector Artwork">Vector Artwork Redraw ($10 Flat)</option>
                      <option value="3D Puff Digitizing">3D Puff Cap Digitizing</option>
                      <option value="Custom Patches">Custom Patches Batch</option>
                      <option value="Jacket Back">Jacket Back Digitizing</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Your Message / Special Instructions *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide design dimensions, fabric type (e.g. pique polo, flexfit cap, leather jacket), or machine format preference (.DST, .PES)..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry Now</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
