import React from "react";

const HILL_DESTINATIONS = [
  {
    name: "Shimla",
    img: "https://imgs.search.brave.com/uqG5WEKqmkXBfn8_STBpjK2mmEbjLBO0qTFgLGlpJm4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTgx/ODk3NTUwL3Bob3Rv/L2J1aWxkaW5ncy1v/bi1tb3VudGFpbi1p/bi10aGUtaW5kaWFu/LWNpdHktb2Ytc2hp/bWxhLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1jb05KQlNm/NzZHdGdxa1V3b3B4/LXhWdF9lamV5b2NT/b0hWTkdIODVzeTY0/PQ",
  },
  {
    name: "Manali",
    img: "https://imgs.search.brave.com/A905JF5NcB6tMmMNA_1LZRhxiHOl6kwOfuX0IMbLRaQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM1/MTUzMDU1Ni9waG90/by9zb2xhbmctdmFs/bGV5LW1hbmFsaS1o/aW1hY2hhbC1wcmFk/ZXNoLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1MOXpHSFNL/T0dSU3ZPV0R3U1Rn/dDQxOW9jME5UOEZ0/bDdxdXN0dWYxQ1ZJ/PQ",
  },
  {
    name: "Dharamshala",
    img: "https://imgs.search.brave.com/JlyRrytbtMqOjxLPKHkUz2fgSVSZBLxw_4fPbckFLGw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTE0/NDU1MTYwL3Bob3Rv/L2d5dXRvLW1vbmFz/dGVyeS1kaGFyYW1z/aGFsYS1pbmRpYS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/SXlOMl9rWVdfUlZ0/RnRad2MzQjcxRWND/R285U0sxa2FHdzBV/ZGFibzZCWT0",
  },
  {
    name: "Kullu",
    img: "https://static.india.com/wp-content/uploads/2025/05/kullu-temples.jpg",
  },
  {
    name: "Kasol",
    img: "https://static.india.com/wp-content/uploads/2025/05/kullu-temples.jpg",
  },
  {
    name: "Rishikesh",
    img: "https://imgs.search.brave.com/u9h6-YU11KCspgBBemS_9U1J5u5fJ8u6XYtZvYRsses/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTE0/Nzk0MzQyL3Bob3Rv/L3Jpc2hpa2VzaC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/UkI5a050VEt4cGFR/RXk1MG81S3RwY1Vs/azg4eWtVQVI4RVVL/NFA0Y3VIbz0",
  },
  {
    name: "Haridwar",
    img: "https://t4.ftcdn.net/jpg/09/37/42/11/360_F_937421140_HICXUXIdJftrGy3mFwaZjKckBNOkSidM.jpg",
  },
  {
    name: "Nainital",
    img: "https://imgs.search.brave.com/YgjrCPrLq01icKWyX8LjfE-NRIrcuchkOaOjrNyyHmc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvMTkw/MTAwNDYvcGV4ZWxz/LXBob3RvLTE5MDEw/MDQ2L2ZyZWUtcGhv/dG8tb2YtdG93bi13/aXRoLWxha2UtaW4t/bW91bnRhaW5zLmpw/ZWc_YXV0bz1jb21w/cmVzcyZjcz10aW55/c3JnYiZkcHI9MSZ3/PTUwMA",
  },
  {
    name: "Mussoorie",
    img: "https://media-cdn.tripadvisor.com/media/photo-o/0d/13/ac/6e/view-from-that-area.jpg",
  },
  {
    name: "Auli",
    img: "https://www.shutterstock.com/image-photo/10-dec-auli-uttarakhand-aerial-260nw-1894297702.jpg",
  },
];

export default function TrendingHillDestinations() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10">
          🏔️ Trending Hill Destinations
        </h2>

        {/* Destinations Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 justify-items-center">
          {HILL_DESTINATIONS.map((place) => (
            <div
              key={place.name}
              className="flex flex-col items-center hover:scale-105 transition-transform duration-300"
            >
              <div className="w-28 h-28 rounded-full overflow-hidden shadow-md border border-gray-200">
                <img
                  src={place.img}
                  alt={place.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <p className="mt-3 text-lg font-semibold text-gray-800">
                {place.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
