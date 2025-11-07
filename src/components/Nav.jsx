import React from 'react'

export default function Nav() {
  return (
    <header className="bg-white/60 backdrop-blur sticky top-0 z-40 border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
  className="w-10 h-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
             rounded-full flex items-center justify-center text-black font-semibold 
             shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 
             backdrop-blur-sm cursor-pointer"
>
  PS
</div>

            <div className="font-semibold">Pahadi Safar</div>
            <div className="text-xs text-slate-500">Taxi & Bus timings</div>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6">
        
          <a href="#" className="text-slate-700 hover:text-primary">Timetables</a>
          <a href="#" className="text-slate-700 hover:text-primary">Drivers</a>
          <a href="#" className="text-slate-700 hover:text-primary">About</a>
          <button className=' border-black rounded-full bg-black'>Sign In</button>
          <button>Sign Up</button>
          
        </nav>
    </header>
  )
}
