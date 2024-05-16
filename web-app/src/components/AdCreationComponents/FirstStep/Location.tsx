// import { LatLngBoundsLiteral, LatLngTuple } from "leaflet";
// import React, { useState } from "react";
// import 'leaflet/dist/leaflet.css';
// import {  MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
// import { VStack, Heading, Center, Container } from "@chakra-ui/react";
// import SearchControl from "./SearchControl.js";

// interface LocationProps {
//   onLocationChange: (newLocation: string) => void;
// }

// const Location: React.FC<LocationProps> = ({ onLocationChange }) => {

//   const [searchResults, setSearchResults] = useState([]);
//   const [mapCenter, setMapCenter] = useState<LatLngTuple>([46.603354, 1.888334]); // Center coordinates for France

//   const handleSearch = async (query: string | number | boolean) => {
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
//           query
//         )}&format=json&limit=1`
//       );
//       const data = await response.json();
  
//       if (data.length === 0) {
//         console.log("No results found");
//         return;
//       }
  
//       if (data.length > 0) {
//         const { lat, lon } = data[0];
//         setMapCenter([lat, lon]);
//       }
  
//       setSearchResults(data);
//       console.log(data);
//     } catch (error) {
//       console.error("Error searching location:", error);
//     }
//   };
  


//   return (
//     <div>
//       <SearchControl onSearch={handleSearch} />
//       <MapContainer
//         className="simpleMap"
//         scrollWheelZoom={true}
//         center={mapCenter} // Set the center of the map
//         zoom={6} // Set the initial zoom level
//       >
//         <TileLayer
//           noWrap={true}
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         {searchResults.map((result) => (
//           <Marker key={result.place_id} position={[result.lat, result.lon]}>
//             <Popup>{result.display_name}</Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   );
// };

// export default Location;


import { LatLng } from "leaflet";
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";

interface LocationProps {
  onLocationChange: (newLocation: string) => void;
}

const Location: React.FC<LocationProps> = ({ onLocationChange }) => {
  function LocationMarker() {
    const [addressLabel, setAddressLabel] = useState<string | null>(null);

    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        const { lat, lng } = e.latlng;
        setAddressLabel(""); // Reset addressLabel
        // Fetch address label based on lat/lng using reverse geocoding API
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
          .then(response => response.json())
          .then(data => {
            setAddressLabel(data.display_name); // Set the address label
            onLocationChange(data.display_name); // Call the callback with the address label
            console.log(onLocationChange)
          })
          .catch(error => console.error("Error fetching address:", error));
      },
    });

    return addressLabel ? (
      <Marker position={[0, 0]}>
        <Popup>{addressLabel}</Popup>
      </Marker>
    ) : null;
  }

  return (
    <MapContainer
    className="simpleMap"
      center={{ lat: 51.505, lng: -0.09 }}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default Location;
