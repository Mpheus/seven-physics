import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="bg-slate-900 text-white p-6 shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            SEVEN <span className="text-blue-400 font-light">| IB Physics</span>
          </h1>
        </div>
        <div className="text-sm font-semibold tracking-widest text-slate-400 uppercase">
          Kinematics Module
        </div>
      </nav>

      <main className="max-w-5xl mx-auto p-8 mt-6">
        <header className="mb-10 border-b border-slate-200 pb-6">
          <h2 className="text-4xl font-bold text-slate-800 mb-2">1.1 Vector Resolution</h2>
          <p className="text-lg text-slate-600">
            Interactive visualization of velocity and acceleration components.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold mb-4 text-blue-600">The Mathematics</h3>
            <p className="mb-4 leading-relaxed">
              When resolving a velocity vector <InlineMath math="\vec{v}" /> into its Cartesian components, we apply standard trigonometric definitions:
            </p>
            <div className="bg-slate-50 p-4 rounded-lg mb-4 flex flex-col items-center">
              <BlockMath math="v_x = |\vec{v}| \cos(\theta)" />
              <BlockMath math="v_y = |\vec{v}| \sin(\theta)" />
            </div>
            <div>
              <BlockMath math="S = \frac{1}{2}at^2+ut" />
              <BlockMath math="v = at+u" />              
            </div>
            <p className="text-sm text-slate-500 italic">
              * Note: In the IB mark scheme, <InlineMath math="\theta" /> is always measured from the positive x-axis.
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center min-h-[400px] border-4 border-slate-800 relative">
            <div className="text-slate-500 font-mono text-sm absolute top-4 left-4">
              &lt;CanvasSimulation /&gt;
            </div>
            <p className="text-slate-400 text-center px-8">
              Your interactive HTML5 Canvas vector drawer will mount here.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}