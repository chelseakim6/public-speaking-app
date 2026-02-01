import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Practice } from './pages/Practice';
import { Results } from './pages/Results';
import { Progress } from './pages/Progress';
import { useUserStore } from './store/userStore';

function App() {
  const { level } = useUserStore();

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        {/* Navigation */}
        <nav className="bg-white bg-opacity-10 backdrop-blur-sm border-b border-white border-opacity-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl hover:opacity-80 transition">
                <span className="text-3xl">🎤</span>
                <span>SpeakUp</span>
              </Link>
              <div className="flex items-center gap-6">
                <Link
                  to="/"
                  className="text-white hover:text-gray-200 transition font-medium"
                >
                  Practice
                </Link>
                <Link
                  to="/progress"
                  className="text-white hover:text-gray-200 transition font-medium"
                >
                  Progress
                </Link>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  <span className="text-white font-semibold">Level {level}</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/results" element={<Results />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>

        {/* Footer */}
        <footer className="mt-16 pb-8 text-center text-white opacity-75">
          <p className="text-sm">
            Made with ❤️ by SpeakUp • Your AI Public Speaking Coach
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
