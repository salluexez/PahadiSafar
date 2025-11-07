// Driver.jsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
// If you're on react-datepicker v7+, use: import "react-datepicker/style.css";
import "react-datepicker/dist/react-datepicker.css";

export function Driver() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [rideDate, setRideDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function createRide(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!source.trim() || !destination.trim()) {
      setError("Please enter both source and destination.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("Please sign in to create a ride");
      }

      console.log('Attempting to create ride...'); // Debug log

      // First check if server is reachable
      try {
        await fetch("http://localhost:3000/api/routes/search");
      } catch (err) {
        throw new Error("Cannot connect to server. Please make sure the server is running.");
      }

      const res = await fetch("http://localhost:3000/api/rides", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          source: source.trim(),
          destination: destination.trim(),
          date: rideDate.toISOString()
        }),
      });

      if (!res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          throw new Error(data?.message || "Failed to create ride.");
        } else {
          throw new Error("Server error. Please try again.");
        }
      }

      const data = await res.json();
      console.log('Response data:', data); // Debug log

      setSuccess("Ride created successfully!");
      setSource("");
      setDestination("");
      setRideDate(new Date());
    } catch (err) {
      console.error('Create ride error:', err); // Debug log
      setError(err.message || "Failed to create ride. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function swap() {
    setSource((prev) => {
      const s = destination;
      setDestination(prev);
      return s;
    });
  }

  return (
    <section className="mx-4 md:mx-8 my-10">
      {/* Outer premium shell (same modern UI) */}
      <div className="relative rounded-[26px] p-[1px] bg-gradient-to-br from-slate-200 via-white to-slate-200 shadow-lg">
        <div className="absolute inset-0 -z-10 rounded-[26px] blur-xl opacity-60 bg-[radial-gradient(60%_80%_at_20%_0%,rgba(99,102,241,0.18),transparent),radial-gradient(60%_80%_at_100%_60%,rgba(14,165,233,0.18),transparent)]" />

        {/* Inner card */}
        <div className="rounded-[25px] bg-white/95 backdrop-blur-sm border border-slate-200">
          <div className="max-w-3xl mx-auto px-6 md:px-10 py-10">
            <div className="mb-6 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                🚕 Create a New Ride
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Enter route details and pick a date to publish your ride.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={createRide} className="space-y-4">
              {/* Route row */}
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="Source (e.g., Shimla)"
                  className="w-full h-12 rounded-xl border border-slate-300 px-4 text-slate-900 placeholder-slate-400
                             focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition"
                />

                <button
                  type="button"
                  onClick={swap}
                  className="h-12 w-12 rounded-xl border border-slate-300 bg-white text-slate-700 hover:border-slate-400 active:scale-95 transition"
                  aria-label="Swap"
                  title="Swap"
                >
                  <svg
                    className="mx-auto h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M4 7h11l-3-3m3 3l-3 3M20 17H9l3 3m-3-3l3-3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Destination (e.g., Manali)"
                  className="w-full h-12 rounded-xl border border-slate-300 px-4 text-slate-900 placeholder-slate-400
                             focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition"
                />
              </div>

              {/* Date row */}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Ride Date
                  </label>
                  <DatePicker
                    selected={rideDate}
                    onChange={(date) => setRideDate(date)}
                    minDate={new Date()}
                    dateFormat="dd MMM yyyy"
                    className="h-10 w-[210px] border border-slate-300 rounded-lg px-3 text-sm text-slate-700 focus:ring-2 focus:ring-slate-900 focus:outline-none"
                  />
                </div>
                <div className="text-sm text-slate-600">
                  Selected:{" "}
                  <span className="font-semibold">
                    {rideDate.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Alerts */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 p-3">
                  {error}
                </div>
              )}
              {success && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 p-3">
                  {success}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-full bg-slate-900 text-white font-semibold
                           hover:bg-slate-800 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {loading ? "Creating ride…" : "Create Ride"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
