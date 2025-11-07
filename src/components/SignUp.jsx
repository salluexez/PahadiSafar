import React, { useState } from "react";

export function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("driver");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Sign up failed");
      setSuccess(data?.message || "Account created!");
      setUsername("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-fuchsia-400 to-violet-500 text-white shadow">
          <span className="text-xl">🚌</span>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-extrabold text-slate-900 text-center">
            Welcome to PahadiSafar
          </h1>
          <p className="mt-2 text-sm text-slate-600 text-center">
            Create your account and discover real-time transport info.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Username / Email */}
            <div>
              <label className="sr-only" htmlFor="username">Username or Email</label>
              <input
                id="username"
                type="text"
                placeholder="Enter email address or username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-12 rounded-xl border border-slate-300 px-4 text-slate-900 placeholder-slate-400
                           focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="sr-only" htmlFor="password">Password</label>
              <input
                id="password"
                type={showPwd ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 rounded-xl border border-slate-300 px-4 pr-12 text-slate-900 placeholder-slate-400
                           focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition"
              />
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                aria-label={showPwd ? "Hide password" : "Show password"}
              >
                {showPwd ? (
                  // eye-off
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 3l18 18M10.58 10.58a3 3 0 104.24 4.24M9.88 5.09A9.53 9.53 0 0112 5c4.5 0 8.32 2.86 10 7- .53 1.29-1.33 2.46-2.33 3.45M6.61 6.61C4.64 7.77 3.1 9.55 2 12c1.68 4.14 5.5 7 10 7 1.08 0 2.12-.17 3.09-.49" />
                  </svg>
                ) : (
                  // eye
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                    <circle cx="12" cy="12" r="3" strokeWidth="1.8" />
                  </svg>
                )}
              </button>
            </div>

            {/* Role toggle */}
            <div>
              <p className="text-sm mb-2 text-slate-600">Sign up as</p>
              <div className="grid grid-cols-2 gap-2">
                {["driver", "passenger"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`h-10 rounded-xl border text-sm font-medium transition
                    ${role === r
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"}`}
                  >
                    {r === "driver" ? "Driver" : "Passenger"}
                  </button>
                ))}
              </div>
            </div>

            {/* Alerts */}
            {error && <div className="text-sm text-red-600">{error}</div>}
            {success && <div className="text-sm text-emerald-600">{success}</div>}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-full bg-slate-900 text-white font-semibold
                         hover:bg-slate-800 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {loading ? "Creating account…" : "Continue"}
            </button>

            {/* Terms */}
            <p className="text-xs text-slate-500 text-center mt-2">
              By continuing, you agree to our{" "}
              <a className="underline hover:text-slate-700" href="#">Terms</a> and{" "}
              <a className="underline hover:text-slate-700" href="#">Privacy Policy</a>.
            </p>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-4 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <a href="/signin" className="underline font-medium hover:text-slate-900">Sign in</a>
        </p>
      </div>
    </div>
  );
}
