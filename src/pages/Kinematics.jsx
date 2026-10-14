import { useState, useEffect } from 'react';
import { InlineMath, BlockMath } from 'react-katex';

export default function Kinematics() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("theory-suvat");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" } 
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 flex items-start scroll-smooth bg-slate-900 min-h-screen">
      
      {/* =========================================
          THE SIDEBAR (Vertical Center Chevron)
          ========================================= */}
      <aside 
        className={`
          sticky top-24 shrink-0 transition-all duration-300 ease-in-out 
          bg-slate-800/50 rounded-xl border border-slate-700 flex flex-row
          h-[calc(100vh-8rem)] shadow-lg z-10
          ${isSidebarOpen ? 'w-64 mr-8' : 'w-12 mr-6'}
        `}
      >
        {/* 
            LEFT PANEL: Navigation Content 
        */}
        <div className={`
          overflow-hidden transition-all duration-300 ease-in-out h-full
          ${isSidebarOpen ? 'w-52 opacity-100' : 'w-0 opacity-0'}
        `}>
          <nav className="w-52 p-6 h-full overflow-y-auto">
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm border-b border-slate-700 pb-2">
              Module Contents
            </h3>
            
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <a 
                  href="#theory-suvat" 
                  className={`transition-colors block ${
                    activeSection === 'theory-suvat' 
                      ? 'text-emerald-400 font-bold' 
                      : 'text-slate-400 hover:text-emerald-400'
                  }`}
                >
                  1. SUVAT Theory
                </a>
              </li>
              <li>
                <a 
                  href="#theory-graphs" 
                  className={`transition-colors block ${
                    activeSection === 'theory-graphs' 
                      ? 'text-emerald-400 font-bold' 
                      : 'text-slate-400 hover:text-emerald-400'
                  }`}
                >
                  2. Motion Graphs
                </a>
              </li>
              <li className="pt-4 mt-4 border-t border-slate-700">
                <span className="text-purple-400 uppercase tracking-wider text-xs block mb-3">Problem Types</span>
              </li>
              <li>
                <a 
                  href="#problem-braking" 
                  className={`transition-colors block ${
                    activeSection === 'problem-braking' 
                      ? 'text-purple-400 font-bold' 
                      : 'text-slate-400 hover:text-purple-300'
                  }`}
                >
                  Type 1: Braking Distance
                </a>
              </li>
              <li>
                <a 
                  href="#problem-freefall" 
                  className={`transition-colors block ${
                    activeSection === 'problem-freefall' 
                      ? 'text-purple-400 font-bold' 
                      : 'text-slate-400 hover:text-purple-300'
                  }`}
                >
                  Type 2: Vertical Freefall
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* 
            RIGHT PANEL: The Toggle Strip 
        */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`
            w-12 shrink-0 flex items-center justify-center h-full
            hover:bg-slate-700/50 text-slate-400 hover:text-emerald-400 transition-colors
            ${isSidebarOpen ? 'border-l border-slate-700/50' : ''}
          `}
          title={isSidebarOpen ? "Collapse Menu" : "Expand Menu"}
        >
          {isSidebarOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </aside>

      {/* =========================================
          THE MAIN CONTENT AREA
          ========================================= */}
      <main className="flex-1 min-w-0 transition-all duration-300">
        
        {/* PART 1: THEORY */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-white mb-8 border-b border-slate-700 pb-4">
            Topic A: Kinematics
          </h1>
          
          <section id="theory-suvat" className="bg-slate-800 rounded-xl p-8 border border-slate-700 shadow-lg mb-8 pt-24 -mt-16">
            <h2 className="text-2xl text-slate-200 mb-4">Constant Acceleration (SUVAT)</h2>
            <div className="text-xl text-emerald-400 mb-6 bg-slate-900 p-4 rounded border border-slate-700 shadow-inner space-y-4">
              <BlockMath math="v = u + at" />
              <BlockMath math="s = ut + \frac{1}{2}at^2" />
              <BlockMath math="v^2 = u^2 + 2as" />
              <BlockMath math="s = \left(\frac{v + u}{2}\right)t" />
            </div>
            
            <div className="aspect-video w-full rounded-lg overflow-hidden bg-black mb-6 border border-slate-700">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Theory Video"
                allowFullScreen
              ></iframe>
            </div>
          </section>

          <section id="theory-graphs" className="bg-slate-800 rounded-xl p-8 border border-slate-700 shadow-lg mb-8 pt-24 -mt-16 min-h-[400px]">
             <h2 className="text-2xl text-slate-200 mb-4">Motion Graphs</h2>
             <p className="text-slate-400 mb-4">
               The gradient of a displacement-time graph is velocity (<InlineMath math="v = \frac{\Delta s}{\Delta t}" />).
             </p>
          </section>
        </div>

        {/* PART 2: PROBLEMS */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8 border-b border-slate-700 pb-4">
            How To Use This
          </h2>

          <section id="problem-braking" className="bg-slate-900 rounded-xl p-8 border border-purple-900/50 mb-8 pt-24 -mt-16">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl text-purple-400 font-semibold">Type 1: Braking Distance</h3>
              <a href="#theory-suvat" className="text-slate-500 hover:text-emerald-400 transition-colors text-sm font-semibold">
                ↑ Review Theory
              </a>
            </div>
            
            <p className="text-slate-300 mb-4 leading-relaxed">
              A car traveling at <InlineMath math="15 \text{ ms}^{-1}" /> hits the brakes and accelerates at <InlineMath math="-2 \text{ ms}^{-2}" /> until it stops. 
              How long does it take to stop?
            </p>
            <div className="text-purple-300 space-y-4 bg-slate-950 p-6 rounded-lg border border-slate-800">
              <BlockMath math="u = 15, \quad v = 0, \quad a = -2" />
              <BlockMath math="0 = 15 + (-2)t" />
              <BlockMath math="t = 7.5 \text{ s}" />
            </div>
          </section>
          
          <section id="problem-freefall" className="bg-slate-900 rounded-xl p-8 border border-purple-900/50 mb-8 pt-24 -mt-16 min-h-[400px]">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl text-purple-400 font-semibold">Type 2: Vertical Freefall</h3>
              <a href="#theory-suvat" className="text-slate-500 hover:text-emerald-400 transition-colors text-sm font-semibold">
                ↑ Review Theory
              </a>
            </div>
            <p className="text-slate-300 mb-4">A ball is dropped from a <InlineMath math="50 \text{ m}" /> cliff...</p>
          </section>
          
        </div>
      </main>
    </div>
  );
}