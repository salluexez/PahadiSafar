import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { fetchTimings } from "../api";
import { Livemap } from "./Livemap";
import { CityOutstationHero } from "./CityOutstationHero";
import TrendingHillDestinations from "./TrendingHillDestinations";
import FavouritePlacesToStay from "./FavouritePlacesToStay";
import PopularRoutes from "./popularroutes";

// --- Card -------------------------------------------------------------------
function TimingsCard({ item, onSelect, isSelected }) {
  const hours = Math.floor(item.estimatedDuration / 60);
  const mins = item.estimatedDuration % 60;

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className={`w-full text-left rounded-2xl border p-4 bg-white/90 backdrop-blur-sm
      transition-all shadow-sm hover:shadow-md hover:-translate-y-[1px]
      ${isSelected ? "border-slate-900 ring-2 ring-slate-900/10" : "border-slate-200"}`}
      aria-pressed={isSelected}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 items-center rounded-full bg-slate-100 px-2 text-xs font-medium text-slate-700">
              {item.vehicleType.toUpperCase()}
            </span>
            {item.busType && (
              <span className="inline-flex h-6 items-center rounded-full bg-slate-50 px-2 text-xs text-slate-600 border border-slate-200">
                {item.busType}
              </span>
            )}
          </div>

          <p className="mt-2 font-semibold text-slate-900 truncate">
            {item.from} <span className="mx-1">→</span> {item.to}
          </p>
          <p className="mt-1 text-xs text-slate-500">Departs: {item.departureTime}</p>

          {item.stops?.length > 0 && (
            <p className="mt-2 text-xs text-slate-500">
              <span className="font-medium">Stops:</span> {item.stops.join(" → ")}
            </p>
          )}
        </div>

        <div className="text-right shrink-0">
          <div className="text-2xl font-extrabold text-slate-900">₹{item.price}</div>
          <div className="text-sm text-slate-600">
            {hours}h {mins}m
          </div>
          <div className="text-xs text-slate-500">{item.availableSeats} seats</div>
        </div>
      </div>
    </button>
  );
}

// --- Skeleton Loader --------------------------------------------------------
function ListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-24 rounded-2xl border border-slate-200 bg-slate-100/60 animate-pulse"
        />
      ))}
    </div>
  );
}

// --- Hero -------------------------------------------------------------------
export function HeroSection() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);

  // init results
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchTimings();
        setResults(data || []);
      } catch {
        setResults([]);
      }
    })();
  }, []);

  async function onSearch() {
    setLoading(true);
    setError(null);
    setSelectedRoute(null);
    try {
      const data = await fetchTimings(from, to);
      setResults(data);
    } catch (err) {
      setError(err.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  }

  function swap() {
    setFrom(prev => {
      const f = to;
      setTo(prev);
      return f;
    });
  }

  return (
    <>
      <section className="bg-gradient-to-br from-white to-slate-50/80 rounded-3xl shadow-lg border border-slate-200/60 mx-2 md:mx-4 mt-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          {/* Title */}
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              Fast, reliable taxi & bus timings across the hills
            </h1>
            <p className="mt-3 text-slate-600">
              Search schedules, book taxis, and combine routes to travel smart on your next Pahadi trip.
            </p>
          </div>

          {/* Search Card */}
          <div className="mt-6 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm p-4">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch">
              <input
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="From (e.g., Shimla, Manali)"
                className="w-full sm:flex-1 h-12 rounded-xl border border-slate-300 px-4 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
              />

              {/* swap button */}
              <button
                type="button"
                onClick={swap}
                className="h-12 w-12 rounded-xl border border-slate-300 bg-white text-slate-700 hover:border-slate-400 active:scale-95 transition"
                aria-label="Swap route"
                title="Swap"
              >
                <svg className="mx-auto h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 7h11l-3-3m3 3l-3 3M20 17H9l3 3m-3-3l3-3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="To (e.g., Delhi, Dharamshala)"
                className="w-full sm:flex-1 h-12 rounded-xl border border-slate-300 px-4 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
              />

              <button
                onClick={onSearch}
                className="w-full sm:w-auto h-12 px-6 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 active:scale-[0.99] transition"
              >
                Search
              </button>
            </div>

            {/* Date row */}
            <div className="mt-4 bg-slate-50 rounded-xl border border-slate-200 p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Select Date
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  minDate={new Date()}
                  dateFormat="dd MMM yyyy"
                  className="h-10 w-[210px] border border-slate-300 rounded-lg px-3 text-sm text-slate-700 focus:ring-2 focus:ring-slate-900 focus:outline-none"
                />
              </div>
              <div className="text-sm text-slate-600">
                Showing results for:{" "}
                <span className="font-semibold">
                  {selectedDate.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Results + Map */}
          {(results.length > 0 || loading || error) && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* List */}
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1 md:pr-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    Available Routes {results.length > 0 && `(${results.length})`}
                  </h2>
                </div>

                {loading && <ListSkeleton />}

                {!loading && error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 p-3">
                    {error}
                  </div>
                )}

                {!loading &&
                  results.map((item, idx) => (
                    <TimingsCard
                      key={idx}
                      item={item}
                      onSelect={setSelectedRoute}
                      isSelected={selectedRoute && selectedRoute.vehicleId === item.vehicleId}
                    />
                  ))}

                {!loading && results.length === 0 && !error && (
                  <div className="text-center p-8 text-slate-500">
                    No routes found. Try different locations.
                  </div>
                )}
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white/80 backdrop-blur">
                <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <p className="font-semibold text-slate-900">Live Map</p>
                  {selectedRoute ? (
                    <span className="text-xs text-slate-600">
                      {selectedRoute.from} → {selectedRoute.to}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500">Select a route to preview</span>
                  )}
                </div>
                <Livemap selectedRoute={selectedRoute} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Below-the-fold sections keep your brand look */}
      <CityOutstationHero />
      <TrendingHillDestinations />
      <FavouritePlacesToStay />
      <PopularRoutes />
    </>
  );
}
