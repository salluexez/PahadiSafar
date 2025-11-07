import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { CityOutstationHero } from "./components/CityOutstationHero";
import TrendingHillDestinations from "./components/TrendingHillDestinations";
import FavouritePlacesToStay from "./components/FavouritePlacesToStay";
import PopularRoutes from "./components/popularroutes";
import Footer from "./components/Footer";
import { ErrorBoundary } from 'react-error-boundary';
function ErrorFallback({ error }) {
  return (
    <div className="text-center p-6 bg-red-50 text-red-800">
      <h2 className="text-lg font-semibold">Oops! Something went wrong</h2>
      <p className="text-sm mt-2">{error.message}</p>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router>
        <HomePage />
        
        <Footer />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
