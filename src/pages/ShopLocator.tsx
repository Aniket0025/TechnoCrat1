import React, { useState } from "react";
import { Link } from "react-router-dom";
import GoogleMapShopLocator from "@/components/GoogleMapShopLocator";
import LeafletShopLocator from "@/components/LeafletShopLocator";

export default function ShopLocator() {
  const [selectedMap, setSelectedMap] = useState<'google' | 'leaflet'>('google');
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-extrabold text-green-700">Eco Shop Locator</h2>
        <Link to="/" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition">Home</Link>
      </div>
      <p className="mb-4 text-gray-700 text-base">Discover eco-friendly shops near you and support sustainable businesses. Shopping green helps reduce your carbon footprint and supports a cleaner planet!</p>
      <div className="mb-4 flex gap-2">
        <button
          className={`px-4 py-2 rounded-l ${selectedMap === 'google' ? 'bg-green-700 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedMap('google')}
        >
          Google Map
        </button>
        <button
          className={`px-4 py-2 rounded-r ${selectedMap === 'leaflet' ? 'bg-green-700 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedMap('leaflet')}
        >
          Leaflet/OSM
        </button>
      </div>
      <div className="rounded-lg overflow-hidden shadow-lg border border-green-200 mb-6" style={{ minHeight: 400 }}>
        {selectedMap === 'google' ? (
          <>
            <GoogleMapShopLocator />
            <div className="mt-2 text-xs text-gray-500">Google Maps: best for directions, satellite, and street view.</div>
          </>
        ) : (
          <>
            <LeafletShopLocator />
            <div className="mt-2 text-xs text-gray-500">Leaflet/OSM: advanced search, user location, clustering, and open data.</div>
          </>
        )}
      </div>
    </div>
  );
}
