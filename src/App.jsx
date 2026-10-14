import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Kinematics from './pages/Kinematics'

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      
      {/* Global Navigation Bar */}
      <nav className="bg-slate-950 border-b border-slate-800 px-8 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
        <div className="text-xl font-bold tracking-widest text-white">
          SEVEN <span className="text-blue-400 font-light">| IB Physics</span>
        </div>
        <div className="space-x-6 font-semibold text-sm">
          <Link to="/" className="text-slate-400 hover:text-emerald-400 transition-colors">Home</Link>
          <Link to="/kinematics" className="text-slate-400 hover:text-emerald-400 transition-colors">Module 1: Kinematics</Link>
        </div>
      </nav>

      {/* Page Content Swaps Here */}
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kinematics" element={<Kinematics />} />
        </Routes>
      </main>

    </div>
  )
}

export default App