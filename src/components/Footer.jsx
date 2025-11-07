import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#04233b] text-gray-300 py-6 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
        {/* Left Side Text */}
        <div className="text-center md:text-left space-y-1">
          <p>* Marked services are available for booking at counter</p>
          <p>© {new Date().getFullYear()} Himachal & Uttarakhand Transport System. All Rights Reserved.</p>
        </div>

        {/* Right Side Branding */}
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <span className="text-gray-400 font-medium">Powered By</span>
          <div className="bg-white/10 px-3 py-1 rounded-md flex items-center">
            <span className="text-white font-bold text-lg tracking-wide">PahadiSafar</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
