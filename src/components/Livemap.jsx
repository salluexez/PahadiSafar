
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// City coordinates (Himachal Pradesh major cities)
const CITY_COORDINATES = {
  "Shimla": [31.1048, 77.1734],
  "Manali": [32.2432, 77.1892],
  "Dharamshala": [32.2190, 76.3234],
  "Kullu": [31.9579, 77.1091],
  "Chamba": [32.5569, 76.1255],
  "McLeodganj": [32.2425, 76.3244],
  "Dalhousie": [32.5387, 75.9711],
  "Kinnaur": [31.6459, 78.4738],
  "Manikaran": [32.0262, 77.3449],
  "Kasauli": [30.9012, 76.9646],
  "Mandi": [31.7088, 76.9911],
  "Rohtang Pass": [32.3714, 77.2509],
  "Delhi": [28.7041, 77.1025],
  "Chandigarh": [30.7333, 76.7794]
};

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export function Livemap({ selectedRoute }) {
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([31.1048, 77.1734]); // Default to Shimla
  const [mapZoom, setMapZoom] = useState(8);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation([latitude, longitude]);
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    if (selectedRoute) {
      const fromCoords = CITY_COORDINATES[selectedRoute.from];
      const toCoords = CITY_COORDINATES[selectedRoute.to];
      
      if (fromCoords && toCoords) {
        // Center the map between origin and destination
        const centerLat = (fromCoords[0] + toCoords[0]) / 2;
        const centerLng = (fromCoords[1] + toCoords[1]) / 2;
        setMapCenter([centerLat, centerLng]);
        setMapZoom(8); // Zoom level to show both points
      }
    }
  }, [selectedRoute]);

  const renderRoute = () => {
    if (!selectedRoute) return null;

    const fromCoords = CITY_COORDINATES[selectedRoute.from];
    const toCoords = CITY_COORDINATES[selectedRoute.to];

    if (!fromCoords || !toCoords) return null;

    // Create route line
    const positions = [fromCoords, toCoords];
    const stops = selectedRoute.stops
      .map(stop => CITY_COORDINATES[stop])
      .filter(coord => coord); // Filter out undefined coordinates

    // Add intermediate stops to the route
    if (stops.length) {
      positions.splice(1, 0, ...stops);
    }

    return (
      <>
        <Polyline 
          positions={positions}
          color="#dc2626"
          weight={4}
          opacity={0.7}
        />
        {/* Origin Marker */}
        <Marker position={fromCoords}>
          <Popup>
            <strong>{selectedRoute.from}</strong>
            <br />
            Departure: {selectedRoute.departureTime}
          </Popup>
        </Marker>
        {/* Destination Marker */}
        <Marker position={toCoords}>
          <Popup>
            <strong>{selectedRoute.to}</strong>
            <br />
            {selectedRoute.vehicleType === 'bus' ? `Bus Type: ${selectedRoute.busType}` : 'Taxi Service'}
            <br />
            Price: ₹{selectedRoute.price}
          </Popup>
        </Marker>
        {/* Stop Markers */}
        {stops.map((stopCoord, index) => (
          <Marker key={index} position={stopCoord}>
            <Popup>
              <strong>Stop: {selectedRoute.stops[index]}</strong>
            </Popup>
          </Marker>
        ))}
      </>
    );
  };

  return (
    <div className="h-[600px] w-full relative rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {renderRoute()}
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>Your Location</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
