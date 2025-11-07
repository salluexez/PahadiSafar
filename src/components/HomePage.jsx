import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { ProtectedRoute } from "./ProtectedRoute";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { Livemap } from "./Livemap";
import { HeroSection } from "./HeroSection";
import { Driver } from "./Driver";

export function HomePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    if (token && username) {
      setUser({ username, role });
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setUser(null);
    navigate("/"); // Use navigate instead of window.location.href
  };

  return (
    <div className='pl-9 pr-9'>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/driver" element={<Driver />} />
        <Route
          path="/livemap"
          element={
            <ProtectedRoute>
              <Livemap />
            </ProtectedRoute>
          }
        />
        <Route path="/signin" element={<SignIn setUser={setUser} />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}
