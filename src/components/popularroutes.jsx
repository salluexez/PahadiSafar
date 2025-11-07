import React from "react";

const ROUTES = [
  [
    "Dharamshala - Chintpurni - Jawalaji - Dharamshala (Pratham Darshan Seva)",
    "Sarkaghat - Delhi",
    "Manali - Chandigarh Airport",
  ],
  [
    "Shimla - Delhi",
    "Shimla - Manali",
    "Dharamshala - Delhi",
    "Chamba - Delhi",
    "Dharamshala - Chandigarh Airport",
  ],
  [
    "Shimla - Katra",
    "Shimla - Dharamshala",
    "Dharamshala - Haridwar",
    "Manali - Chandigarh",
    "Shimla Old Bus Stand - Jubberhatti Airport",
  ],
  [
    "Shimla - Haridwar",
    "Manali - Delhi",
    "Dharamshala - Chandigarh",
    "Hamirpur - Delhi",
    "Shimla Tourist Circuit",
  ],
  [
    "Shimla - Chamba",
    "Manali - Haridwar",
    "Joginder Nagar - Delhi",
    "Shimla - Chandigarh Airport",
  ],
];

export default function PopularRoutes() {
  return (
    <section className="relative mx-4 md:mx-8 my-12">
      {/* Outer premium shell */}
      <div className="relative rounded-[26px] p-[1px] bg-gradient-to-br from-slate-200 via-white to-slate-200 shadow-lg">
        {/* soft glowing background */}
        <div className="absolute inset-0 -z-10 rounded-[26px] blur-xl opacity-60 bg-[radial-gradient(60%_80%_at_20%_0%,rgba(99,102,241,0.2),transparent),radial-gradient(60%_80%_at_100%_60%,rgba(14,165,233,0.2),transparent)]" />

        {/* Inner content */}
        <div className="rounded-[25px] bg-white/95 backdrop-blur-sm border border-slate-200">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-10">
            {/* Header */}
            <div className="mb-6 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                Popular Routes
              </h2>
              <p className="mt-1 text-sm text-slate-600">
              </p>
            </div>

            {/* Routes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-2">
              {ROUTES.flat().map((route, i) => (
                <a
                  key={i}
                  href="#"
                  className="block text-slate-800 hover:text-slate-900 hover:underline text-[14px] md:text-[15px] leading-snug transition-colors duration-150"
                >
                  {route}
                </a>
              ))}
            </div>

            {/* Optional footer */}
            <div className="mt-6 flex justify-center md:justify-end">
              <button className="px-5 py-2.5 text-sm font-semibold rounded-full bg-slate-900 text-white hover:bg-slate-800 transition">
                View All Routes →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
