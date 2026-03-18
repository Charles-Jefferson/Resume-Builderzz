import { useNavigate } from 'react-router-dom'
import { FileDown, Sparkles, Palette, Zap, CheckCircle, ArrowRight, Layout } from 'lucide-react'

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/cvforge_logo_v2.svg" alt="CVForge" className="w-45 h-70 " />
          </div>
          <button
            onClick={() => navigate('/builder')}
            className="flex items-center gap-2 bg-[#A41034] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#8a0d2b] transition-colors cursor-pointer"
          >
            Build My Resume
            <ArrowRight size={15} />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center px-6 py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#A41034]/10 text-[#A41034] text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wide">
            <Sparkles size={12} />
            AI-Powered Resume Builder
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight text-gray-900 mb-6">
            Build a resume that
            <br />
            <span className="text-[#A41034]">gets you hired.</span>
          </h1>

          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Describe your experience in plain language. Our AI rewrites it into polished, professional bullet points. Export as PDF in under 10 minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/builder')}
              className="flex items-center justify-center gap-2 bg-[#A41034] text-white px-7 py-3.5 rounded-xl text-base font-semibold hover:bg-[#8a0d2b] transition-colors shadow-lg shadow-[#A41034]/20 cursor-pointer"
            >
              Start for Free
              <ArrowRight size={16} />
            </button>
            <a
              href="#how-it-works"
              className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 px-7 py-3.5 rounded-xl text-base font-medium hover:bg-gray-50 transition-colors cursor-pointer"
            >
              See how it works
            </a>
          </div>

          <p className="text-xs text-gray-400 mt-5">No sign-up required · Runs in your browser · Free</p>
        </div>
      </section>

      {/* Theme previews strip */}
      <section className="bg-gray-50 border-y border-gray-100 py-10 px-6 overflow-x-auto">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">4 Professional Themes</p>
          <div className="flex gap-4 min-w-max mx-auto justify-center">
            {[
              { name: 'Classic', bg: 'bg-white', accent: 'border-gray-300', desc: 'Clean & corporate' },
              { name: 'Modern', bg: 'bg-[#1a1a2e]', accent: 'border-[#A41034]', desc: 'Two-column sidebar', dark: true },
              { name: 'Minimal', bg: 'bg-[#fafafa]', accent: 'border-gray-200', desc: 'Monospace & spacious' },
              { name: 'Executive', bg: 'bg-black', accent: 'border-[#A41034]', desc: 'Dark header bar', dark: true },
            ].map((t) => (
              <div key={t.name} className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => navigate('/builder')}>
                <div className={`w-36 h-48 rounded-xl border-2 ${t.bg} ${t.accent} shadow-md group-hover:shadow-xl group-hover:-translate-y-1 transition-all flex flex-col overflow-hidden`}>
                  <div className={`${t.dark ? 'bg-current' : 'bg-gray-200'} h-10 w-full opacity-80`} />
                  <div className="flex-1 p-3 flex flex-col gap-1.5">
                    {[70, 50, 60, 40, 55].map((w, i) => (
                      <div key={i} className="h-1.5 rounded-full bg-gray-200" style={{ width: `${w}%` }} />
                    ))}
                  </div>
                </div>
                <span className="text-xs font-semibold text-gray-700">{t.name}</span>
                <span className="text-xs text-gray-400">{t.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">Everything you need</h2>
          <p className="text-gray-500 text-center mb-14">No fluff, no bloat — just the tools that matter.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Sparkles size={20} />,
                title: 'AI-Polished Bullets',
                desc: 'Write your job description naturally. Gemini rewrites it into strong, action-verb-led bullet points.',
              },
              {
                icon: <Palette size={20} />,
                title: '4 Visual Themes',
                desc: 'Classic, Modern, Minimal, or Executive. Switch with one click — no re-entering data.',
              },
              {
                icon: <FileDown size={20} />,
                title: 'PDF & HTML Export',
                desc: 'Download a fully self-contained PDF or HTML file. Works without any backend.',
              },
              {
                icon: <Zap size={20} />,
                title: 'Live Preview',
                desc: 'See your resume update in real-time as you type, split-screen side by side.',
              },
              {
                icon: <Layout size={20} />,
                title: 'Drag & Drop Order',
                desc: 'Reorder your experience entries by dragging. The preview updates instantly.',
              },
              {
                icon: <CheckCircle size={20} />,
                title: 'Saves Automatically',
                desc: 'Your data is stored in your browser. Refresh the page — everything is still there.',
              },
            ].map((f) => (
              <div key={f.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="w-10 h-10 bg-[#A41034]/10 text-[#A41034] rounded-xl flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1.5">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">How it works</h2>
          <p className="text-gray-500 text-center mb-14">From blank page to polished PDF in minutes.</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Enter your info', desc: 'Name, title, contact details — the basics.' },
              { step: '02', title: 'Add experience', desc: 'Describe your roles in plain language.' },
              { step: '03', title: 'Polish with AI', desc: 'Click one button. AI rewrites your content.' },
              { step: '04', title: 'Export', desc: 'Download as PDF or HTML. Done.' },
            ].map((s, i) => (
              <div key={s.step} className="flex flex-col items-center text-center relative">
                {i < 3 && (
                  <div className="hidden md:block absolute top-5 left-[calc(50%+28px)] right-0 h-px bg-gray-200" />
                )}
                <div className="w-10 h-10 rounded-full bg-[#A41034] text-white flex items-center justify-center text-xs font-bold mb-4 z-10">
                  {s.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to build yours?</h2>
          <p className="text-gray-500 mb-8">Free, no account needed, runs entirely in your browser.</p>
          <button
            onClick={() => navigate('/builder')}
            className="inline-flex items-center gap-2 bg-[#A41034] text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-[#8a0d2b] transition-colors shadow-lg shadow-[#A41034]/20 cursor-pointer"
          >
            Build My Resume — It's Free
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <img src="/cvforge_logo_v2.svg" alt="CVForge" className="h-5 opacity-60" />
          <p className="text-xs text-gray-400">Built with React + Gemini · No data stored server-side</p>
        </div>
      </footer>
    </div>
  )
}
