import React from "react";

const HILL_CITIES = [
  {
    name: "Shimla",
    routes: "To– Kufri, Solan, Chandigarh",
    img: "https://imgs.search.brave.com/JHK6Uc7JwdTbaP6rW0sVPRBdQhUmmlYqiNcwQouj3Bg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YTEudGhyaWxsb3Bo/aWxpYS5jb20vZmls/ZXN0b3JlL2w1c3R3/Z3NlM3F0ODg5b2h2/cG9qcGExM2Z0cDBf/TWFsbF9Sb2FkX1No/aW1sYV8xLmpwZz93/PTE0NDAmZHByPTI", // Shimla Mall Road
  },
  {
    name: "Manali",
    routes: "To– Kullu, Kasol, Rohtang",
    img: "https://imgs.search.brave.com/tQnlsKc2ah4CdNOAUxM2yTmcDliN-S7RvcgVayGgWCI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9oYmxp/bWcubW10Y2RuLmNv/bS9jb250ZW50L2h1/YmJsZS9pbWcvbWFu/YWxpL21tdC9hY3Rp/dml0aWVzL21fYWN0/aXZpdGllcy1tYW5h/bGktc29sYW5nLXZh/bGxleV9sXzQwMF82/NDAuanBn", // Manali valley
  },
  {
    name: "Dharamshala",
    routes: "To– Kangra, Palampur, McLeod Ganj",
    img: "https://imgs.search.brave.com/JlyRrytbtMqOjxLPKHkUz2fgSVSZBLxw_4fPbckFLGw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTE0/NDU1MTYwL3Bob3Rv/L2d5dXRvLW1vbmFz/dGVyeS1kaGFyYW1z/aGFsYS1pbmRpYS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/SXlOMl9rWVdfUlZ0/RnRad2MzQjcxRWND/R285U0sxa2FHdzBV/ZGFibzZCWT0",
  },
  {
    name: "Kullu",
    routes: "To– Bhuntar, Manikaran, Naggar",
    img: "https://imgs.search.brave.com/octi8s2mrAsHelRYI0sKpt7n3HdrXqClBfWblnWG8NQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuaW5kaWEuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDI1/LzA1L2t1bGx1LXRl/bXBsZXMuanBnP2lt/cG9saWN5PU1lZGl1/bV9XaWR0aG9ubHkm/dz0zMTAmaD0xODA",
  },
  {
    name: "Nainital",
    routes: "To– Almora, Haldwani, Bhimtal",
    img: "https://imgs.search.brave.com/sHRWwAWjxHNZTbHqf-ukIiEOJf5MFI-QEpKsmnE6N60/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/bmFpbml0YWxjb3Ji/ZXR0dG91cmlzbS5j/b20vaW1hZ2VzL25h/aW5pdGFsLWltYWdl/cy9uYWluaXRhbDAt/OC5qcGc",
  },
  {
    name: "Rishikesh",
    routes: "To– Haridwar, Dehradun, Mussoorie",
    img: "https://imgs.search.brave.com/1q2-M3ATCYGJRliF59BkgWAH8QWPyfPYMtDWJt3jPm8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzQ0LzI0LzUy/LzM2MF9GXzM0NDI0/NTI0M184OGpOakNT/WG9NemJuRUUza09I/Q0pEMG5DTTBkbDJB/ai5qcGc",
  },
];

export function CityOutstationHero({
  background =
    "https://images.unsplash.com/photo-1624864004706-3a154fd7a3ae?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhcnMlMjBpbiUyMG1vdW50YWluc3xlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900", // Himachal road background
}) {
  return (
    <section className="px-4 md:px-6 lg:px-8 mt-8">
      <div
        className="relative overflow-hidden rounded-3xl shadow-xl"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 md:bg-black/50" />
        <div className="relative z-[1] p-6 sm:p-10 lg:p-12 text-white">
          <div className="max-w-3xl">
            <p className="uppercase tracking-wide text-sm md:text-base opacity-90">
              <span className="inline-block align-middle h-[1px] w-10 bg-white/70 mr-3" />
            </p>
            <h1 className="text-3xl md:text-5xl font-extrabold mt-2 mb-3">
              City To City – Outstation Cabs
            </h1>
            <p className="text-white/90 text-sm md:text-lg mb-6">
              Enjoy best price guarantee, professional services, and timely
              pick-up & drop-off in Himachal & Uttarakhand hill regions.
            </p>
          </div>

          {/* Cities Grid */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HILL_CITIES.map((city) => (
              <div
                key={city.name}
                className="flex items-center gap-4 bg-white/15 backdrop-blur-lg rounded-2xl p-4 hover:bg-white/25 transition-all duration-300"
              >
                <img
                  src={city.img}
                  alt={city.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg text-white">
                    {city.name}
                  </h3>
                  <p className="text-white/80 text-sm">{city.routes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
