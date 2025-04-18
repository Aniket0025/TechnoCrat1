import React from "react";
// If you want to use @react-google-maps/api, make sure it's installed and properly versioned for React 18
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = "AIzaSyD0ysOLiDjQLhFB1aD6Sh1EMGvZGmy8PLE";

const containerStyle = {
  width: '100%',
  height: '400px',
};

const shops = [
  { id: 1, name: "Eco Mart Central", lat: 28.6139, lng: 77.2090 },
  { id: 2, name: "Green Store South", lat: 28.5355, lng: 77.3910 },
  { id: 3, name: "Nature's Basket", lat: 28.4089, lng: 77.3178 },
];

const center = { lat: 28.6139, lng: 77.2090 };

const GoogleMapShopLocator: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading Google Map...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Shop Locator (Google Maps)</h2>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={11}>
        {shops.map((shop) => (
          <Marker key={shop.id} position={{ lat: shop.lat, lng: shop.lng }} label={shop.name} />
        ))}
      </GoogleMap>
    </div>
  );
};

export default GoogleMapShopLocator;
