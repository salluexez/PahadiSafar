import React from "react";

const PLACES = [
  {
    name: "Shimla",
    img: "https://imgs.search.brave.com/BqcoDhzIqE4xutC0-7rhcyuhBacbGK_FxJ1vauOqaLg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNjMx/ODI2Mjg2L3Bob3Rv/L3NoaW1sYS1pbmRp/YS1hLXZpZXctb2Yt/c25vdy1jb3ZlcmVk/LWNpdHktYW5kLXJp/ZGdlLWFmdGVyLXNo/aW1sYS1yZWNlaXZl/ZC10aGUtc2Vjb25k/LXNwZWxsLW9mLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz16/aUlVTzZoTnB1eHVN/cXVETUEzLUFTQTZm/cmJDZ3dPRHlhYjNJ/Q2J4M0JvPQ",
  },
  {
    name: "Manali",
    img: "https://imgs.search.brave.com/x-gFvWIppZ9ny3V8rCDntL_YbyFxUdxjZGS7Um3B4w8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM2/NTg2MjY1Ni9waG90/by9tYW5hbGktdG91/cmlzdC1wYXJhZGlz/ZS1oaW1hY2hhbC1w/cmFkZXNoLWluZGlh/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1KcEs2eUI4bXFk/eW5abjVTVFNqY3VR/akxYb1FrM2x6bmNK/Nll4YnlVUGRzPQ",
  },
  {
    name: "Rishikesh",
    img: "https://imgs.search.brave.com/sPpr5s9o4Q6NbS5u8u9thd1883bHzKlmf-F8eqKeM5c/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9yZXNv/dXJjZXMudGhvbWFz/Y29vay5pbi9pbWFn/ZXMvY21zL01hbmFs/aS10b3VyLXBhY2th/Z2VzLmpwZw",
  },
  {
    name: "Mussoorie",
    img: "https://imgs.search.brave.com/kUWPZaMO232hqZm112hrcRu-aSNqGr58RDSvA7hy-G0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTIz/MDMzNTI5My9waG90/by9zbm93ZmFsbC1p/bi1oaW1hY2hhbC1w/cmFkZXNoLWluZGlh/LTI4LWRlY2VtYmVy/LTIwMjAtc2V2ZXJh/bC1yb2Fkcy1pbi1t/YW5hbGktYW5kLXNo/aW1sYS13ZXJlLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz12/TzF4Q3kwUVNudlFk/cGR0QkNiaUlINE1Y/bGp5eF9lTTJUMm4y/NTI0b2kwPQ",
  },
  {
    name: "Nainital",
    img: "https://imgs.search.brave.com/jZVXrdprTV1bdzAQHgNmyqc6PTrY-cfgJioOpKw81k4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMyLnRyaXBvdG8u/Y29tL21lZGlhL2Zp/bHRlci9ubC9pbWcv/MjE2MDkvVHJpcERv/Y3VtZW50LzE1MDIx/MDc1MTZfbWFuYWxp/X2luZGlhLmpwZy53/ZWJw",
  },
];

export default function FavouritePlacesToStay() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12">
          🏨 Favourite Places To Stay
        </h2>

        {/* Card Row */}
        <div className="flex flex-wrap justify-center gap-6">
          {PLACES.map((place) => (
            <div
              key={place.name}
              className="w-56 md:w-60 bg-white border border-blue-200 rounded-2xl shadow-sm 
                         hover:shadow-lg transition-all duration-300 p-5 flex flex-col justify-between"
            >
              {/* Top section with name + circular image */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {place.name}
                </h3>
                <div className="w-12 h-12 rounded-full overflow-hidden border border-blue-200 shadow-sm">
                  <img
                    src={place.img}
                    alt={place.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              {/* Explore link */}
              <a
                href="#"
                className="text-blue-500 hover:text-blue-600 font-medium text-sm mt-auto text-left"
              >
                Explore →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
