import React, { useState } from "react";

function NavPopover({ label, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="inline-flex items-center gap-1 font-semibold text-slate-900 hover:text-slate-700 transition"
        aria-expanded={open}
      >
        {label}
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 mt-3 w-[320px] sm:w-[380px] rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-md shadow-xl p-4 z-50"
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function Navbar({ user, onLogout }) {
  const [openMobile, setOpenMobile] = useState(false);

  return (
    <header className="sticky top-0 z-40">
      <nav className="mx-2 mt-2 rounded-2xl border border-slate-200/70 bg-white/70 backdrop-blur-md shadow-md">
        <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Brand */}
          <a href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-fuchsia-400 to-violet-500 text-white shadow">
              🚌
            </span>
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900">
              PahadiSafar
            </span>
          </a>

          {/* RIGHT SIDE: About / Resources + Auth */}
          <div className="hidden md:flex items-center gap-5">
            {/* About dropdown */}
            <NavPopover label="About">
              <div className="flex gap-3">
                <img
                  src="/images/about-thumb.jpg"
                  onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=60")}
                  alt="About preview"
                  className="w-20 h-20 rounded-xl object-cover shadow-sm"
                />
                <div className="min-w-0">
                  <h4 className="font-semibold text-slate-900">What is PahadiSafar?</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    Real-time bus & shared-taxi timings for hill regions. Plan multi-hop routes,
                    see live ETAs, and discover verified drivers.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <a href="/about" className="text-sm font-medium text-slate-900 underline">Learn more</a>
                    <a href="/contact" className="text-sm text-slate-600 hover:text-slate-800">Contact</a>
                  </div>
                </div>
              </div>
            </NavPopover>

            {/* Resources dropdown */}
            <NavPopover label="Resources">
              <ul className="space-y-3">
                <li className="flex items-center gap-3 hover:bg-slate-50 rounded-lg p-2 cursor-pointer">
                  <svg className="w-5 h-5 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 3v18M5 7h9a4 4 0 010 8H5z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <p className="font-medium text-slate-900">Pricing</p>
                    <p className="text-xs text-slate-600">Simple plans for travelers and operators.</p>
                  </div>
                </li>
                <li className="flex items-center gap-3 hover:bg-slate-50 rounded-lg p-2 cursor-pointer">
                  <svg className="w-5 h-5 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 7h16M4 12h10M4 17h7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <p className="font-medium text-slate-900">Blog</p>
                    <p className="text-xs text-slate-600">Travel tips, road updates, and product news.</p>
                  </div>
                </li>
                <li className="flex items-center gap-3 hover:bg-slate-50 rounded-lg p-2 cursor-pointer">
                  <svg className="w-5 h-5 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                  <div>
                    <p className="font-medium text-slate-900">Service Status</p>
                    <p className="text-xs text-slate-600">Live uptime & incidents.</p>
                  </div>
                </li>
              </ul>
            </NavPopover>

            {/* Auth or User */}
            {!user ? (
              <>
                <button
                  onClick={() => (window.location.href = "/signin")}
                  className="h-10 px-4 rounded-full border border-slate-300 bg-white text-slate-900 font-medium hover:border-slate-400 transition"
                >
                  Sign In
                </button>
                <button
                  onClick={() => (window.location.href = "/signup")}
                  className="h-10 px-5 rounded-full bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full px-4 py-2 shadow-sm hover:shadow transition">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white font-semibold shadow-sm">
                  {user.username?.charAt(0)?.toUpperCase()}
                </div>
                <span className="hidden lg:inline text-slate-700 font-medium">
                  Welcome, <span className="font-semibold">{user.username}</span>
                </span>
                <button
                  onClick={onLogout}
                  className="px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium text-sm shadow hover:shadow-md hover:scale-105 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpenMobile(v => !v)}
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl border border-slate-300 bg-white text-slate-700 hover:border-slate-400 transition"
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
