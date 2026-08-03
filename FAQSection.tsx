import React, { useState } from 'react';
import { FAQ_DATA } from '../data/mockData';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'General', 'Digitizing', 'Vector', 'Formats & Machines', 'Payment'];

  const filteredFaqs =
    activeCategory === 'All'
      ? FAQ_DATA
      : FAQ_DATA.filter((f) => f.category === activeCategory);

  return (
    <section id="faq-section" className="py-16 md:py-24 bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/50 text-red-400 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Frequently Asked <span className="bg-gradient-to-r from-red-500 to-amber-400 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Everything you need to know about machine formats, stitch counts, turnarounds, and revisions.
          </p>
        </div>

        {/* Categories */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                activeCategory === cat
                  ? 'bg-red-600 text-white font-bold'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left font-bold text-sm sm:text-base text-white flex items-center justify-between gap-4 hover:text-amber-400 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
