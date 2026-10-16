import { useState, useEffect } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import { supabase } from '../supabaseClient';

const SECTION_STYLES = {
  theory: "bg-slate-800/80 p-8 rounded-xl shadow-lg border border-slate-700/80 border-l-4 border-l-emerald-500 mb-8 scroll-mt-24",
  problem_type: "bg-slate-900/90 p-8 rounded-xl shadow-lg border border-purple-900/40 border-l-4 border-l-purple-500 mb-8 scroll-mt-24",
};

function renderMathContent(content) {
  if (!content) return null;

  const parts = content.split(/(\$\$[\s\S]+?\$\$|\$[^$]+?\$)/g);

  return parts.map((part, index) => {
    if (part.startsWith('$$') && part.endsWith('$$')) {
      const math = part.slice(2, -2).trim();
      return (
        <div
          key={index}
          className="my-4 p-4 bg-slate-950/70 rounded-lg border border-slate-800 text-emerald-300 overflow-x-auto shadow-inner"
        >
          <BlockMath math={math} />
        </div>
      );
    }

    if (part.startsWith('$') && part.endsWith('$')) {
      const math = part.slice(1, -1).trim();
      return (
        <span key={index} className="text-slate-300 font-medium">
          <InlineMath math={math} />
        </span>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

export default function Kinematics() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("");
    const [moduleData, setModuleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // 1. Fetch module and its nested sections on mount
  useEffect(() => {
    async function fetchKinematics() {
      setLoading(true);
      const { data, error } = await supabase
        .from('modules')
        .select('*, sections(*)')
        .eq('title', 'Kinematics')
        .single();

      if (error) {
        console.error('Error fetching module:', error);
        setFetchError(error);
      } else if (data) {
        if (data.sections) {
          data.sections.sort((a, b) => a.order_index - b.order_index);
        }
        setModuleData(data);
        if (data.sections && data.sections.length > 0) {
          setActiveSection(`section-${data.sections[0].id}`);
        }
      }
      setLoading(false);
    }

    fetchKinematics();
  }, []);

        // 2. Attach scroll-spy IntersectionObserver + bottom-of-page detector AFTER DOM renders
  useEffect(() => {
    if (loading || !moduleData) return;

    const sectionElements = Array.from(document.querySelectorAll("section[id]"));
    if (sectionElements.length === 0) return;

    const visibleIds = new Set();

    const updateActiveSection = () => {
      const lastSection = sectionElements[sectionElements.length - 1];
      const lastRect = lastSection.getBoundingClientRect();

      // Check both document bottom AND if the last section's bottom is fully visible in the viewport
      const isAtPageBottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight - 20;
      const isLastSectionFullyInView =
        window.scrollY > 20 && lastRect.bottom <= window.innerHeight + 10;

      if (isAtPageBottom || isLastSectionFullyInView) {
        setActiveSection(lastSection.id);
        return;
      }

      if (window.scrollY < 20) {
        setActiveSection(sectionElements[0].id);
        return;
      }

      // Highlight the topmost section currently inside our reading zone
      const firstVisible = sectionElements.find((el) => visibleIds.has(el.id));
      if (firstVisible) {
        setActiveSection(firstVisible.id);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleIds.add(entry.target.id);
          } else {
            visibleIds.delete(entry.target.id);
          }
        });
        updateActiveSection();
      },
      { rootMargin: "-15% 0px -45% 0px" }
    );

    sectionElements.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", updateActiveSection, { passive: true });

    return () => {
      sectionElements.forEach((section) => observer.unobserve(section));
      observer.disconnect();
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, [loading, moduleData]);

  // 3. Loading state UI
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-8 text-center text-slate-400">
        Loading...
      </div>
    );
  }

    if (!moduleData) {
    return (
      <div className="max-w-7xl mx-auto p-8 text-center text-red-400">
        <p className="text-xl font-bold mb-2">Module not found.</p>
        {fetchError && (
          <pre className="mt-4 p-4 bg-slate-800 text-left text-sm text-amber-300 rounded-lg overflow-x-auto">
            {JSON.stringify(fetchError, null, 2)}
          </pre>
        )}
      </div>
    );
  }

  const sections = moduleData.sections || [];
  const theorySections = sections.filter((s) => s.section_type === 'theory');
  const problemSections = sections.filter((s) => s.section_type === 'problem_type');

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
              {theorySections.map((section, index) => {
                const sectionId = `section-${section.id}`;
                return (
                  <li key={section.id}>
                    <a 
                      href={`#${sectionId}`} 
                      className={`transition-colors block ${
                        activeSection === sectionId 
                          ? 'text-emerald-400 font-bold' 
                          : 'text-slate-400 hover:text-emerald-400'
                      }`}
                    >
                      {index + 1}. {section.title}
                    </a>
                  </li>
                );
              })}

              {problemSections.length > 0 && (
                <li className="pt-4 mt-4 border-t border-slate-700">
                  <span className="text-purple-400 uppercase tracking-wider text-xs block mb-3">
                    Problem Types
                  </span>
                </li>
              )}

              {problemSections.map((section, index) => {
                const sectionId = `section-${section.id}`;
                return (
                  <li key={section.id}>
                    <a 
                      href={`#${sectionId}`} 
                      className={`transition-colors block ${
                        activeSection === sectionId 
                          ? 'text-purple-400 font-bold' 
                          : 'text-slate-400 hover:text-purple-300'
                      }`}
                    >
                      Type {index + 1}: {section.title}
                    </a>
                  </li>
                );
              })}
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
        <h1 className="text-4xl font-bold text-white mb-8 border-b border-slate-700 pb-4">
          {moduleData.title}
        </h1>

                        {sections.length === 0 && (
          <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-8 text-slate-400">
            No sections found for this module yet. Make sure rows exist in the <code className="text-emerald-400">sections</code> table with <code className="text-emerald-400">module_id = {moduleData.id}</code> and that RLS read access is enabled on <code className="text-emerald-400">sections</code>.
          </div>
        )}

        {sections.map((section) => {
          const sectionId = `section-${section.id}`;

          return (
            <section
              key={section.id}
              id={sectionId}
              className={SECTION_STYLES[section.section_type]}
            >
              {section.section_type === 'theory' && (
                <>
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    {section.title}
                  </h2>
                  <div className="text-slate-300 leading-relaxed whitespace-pre-line">
                    {renderMathContent(section.content)}
                  </div>
                </>
              )}

              {section.section_type === 'problem_type' && (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl text-purple-400 font-semibold">
                      {section.title}
                    </h3>
                    {theorySections.length > 0 && (
                      <a
                        href={`#section-${theorySections[0].id}`}
                        className="text-slate-400 hover:text-emerald-400 transition-colors text-sm font-semibold"
                      >
                        ↑ Review Theory
                      </a>
                    )}
                  </div>
                  <div className="text-slate-300 leading-relaxed whitespace-pre-line">
                    {renderMathContent(section.content)}
                  </div>
                </>
              )}
            </section>
          );
        })}
      </main>
    </div>
  );
}