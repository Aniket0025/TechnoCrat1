import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

// Sample shop data (replace with real data or props)
const shops = [
  { id: 1, name: "Eco Mart Central", lat: 28.6139, lng: 77.2090, products: ["T-Shirt"] },
  { id: 2, name: "Green Store South", lat: 28.5355, lng: 77.3910, products: ["Bag"] },
  { id: 3, name: "Nature's Basket", lat: 28.4089, lng: 77.3178, products: ["Bottle"] },
  { id: 4, name: "Eco Plaza", lat: 28.7041, lng: 77.1025, products: ["T-Shirt", "Bag"] },
  { id: 5, name: "GreenLeaf", lat: 28.4595, lng: 77.0266, products: ["Bottle", "Bag"] },
];

function LocateUser() {
  const map = useMap();
  useEffect(() => {
    map.locate({ setView: true, maxZoom: 16 });
    function onLocationFound(e) {
      L.circle(e.latlng, { radius: e.accuracy }).addTo(map);
      L.marker(e.latlng).addTo(map).bindPopup("You are here").openPopup();
    }
    map.on("locationfound", onLocationFound);
    return () => {
      map.off("locationfound", onLocationFound);
    };
  }, [map]);
  return null;
}

const LeafletShopLocator: React.FC = () => {
  const [search, setSearch] = React.useState("");
  const filteredShops = shops.filter(shop =>
    shop.name.toLowerCase().includes(search.toLowerCase()) ||
    shop.products.some(p => p.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search shops or products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <MapContainer center={[28.6139, 77.2090]} zoom={11} style={{ height: "400px", width: "100%" }}>
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        <LocateUser />
        <MarkerClusterGroup>
          {filteredShops.map(shop => (
            <Marker key={shop.id} position={[shop.lat, shop.lng]}>
              <Popup>
                <b>{shop.name}</b><br />
                Products: {shop.products.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default LeafletShopLocator;
