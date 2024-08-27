import React, { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useMap, MapContainer, TileLayer } from "react-leaflet";
import { Heading, VStack } from "@chakra-ui/react";
import * as L from "leaflet";

// Define the type for the GeoSearch result event
interface GeoSearchResultEvent extends L.LeafletEvent {
  location: {
    x: number;
    y: number;
    label: string;
    bounds: [number[], number[]];
    raw: any;
  };
}

// Define the type for LocationProps
interface LocationProps {
  onLocationChange: (newLocation: {
    x: number;
    y: number;
    label: string;
    bounds: any;
    raw: any;
  }) => void;
}

const SearchLocation = ({
  provider,
  onLocationChange,
}: {
  provider: any;
  onLocationChange: any;
}) => {
  const map = useMap();

  useEffect(() => {
    const searchControl = new (GeoSearchControl as any)({
      provider: provider,
      autoComplete: true,
    });

    map.addControl(searchControl);

<<<<<<< HEAD
    // event listener to log the location and show the popup
    map.on("geosearch/showlocation", (event: any) => {
      const location = (event as GeoSearchResultEvent).location;
      onLocationChange({
        x: location.x,
        y: location.y,
        label: location.label,
        bounds: location.bounds,
        raw: location.raw,
      });
=======
    // Event listener to handle the location change
    const handleShowLocation = (event: L.LeafletEvent) => {
      const geoSearchEvent = event as GeoSearchResultEvent;
      const location = geoSearchEvent.location;
      onLocationChange(location);

>>>>>>> fb4278a4274ec689ddb0cf4136b9195043cf456c
      // Leaflet marker and popup to show the location
      const marker = L.marker([location.y, location.x]).addTo(map);
      marker.bindPopup(`<b>Adresse trouvée: ${location.label}</b>`).openPopup();
    };

    map.on('geosearch/showlocation', handleShowLocation);

    return () => {
      map.off('geosearch/showlocation', handleShowLocation);
      map.removeControl(searchControl);
    };
  }, [map, provider, onLocationChange]);

  return null;
};

const Location: React.FC<LocationProps> = ({ onLocationChange }) => {
  const initialCenter = { lat: 46.603354, lng: 1.888334 }; // Centre de la France
  const initialZoom = 6;

  return (
    <div>
      <VStack p={"10"}>
        <Heading>Où est situé votre logement ?</Heading>
        <Heading
          as={"h6"}
          fontSize="md"
          textAlign={"center"}
          color={"gray"}
          p={"10px"}
        >
          Votre adresse est uniquement communiquée aux voyageurs une fois leur
          réservation effectuée.
        </Heading>
      </VStack>
      <MapContainer
        center={initialCenter}
        zoom={initialZoom}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SearchLocation
          provider={new OpenStreetMapProvider()}
          onLocationChange={onLocationChange}
        />
      </MapContainer>
    </div>
  );
};

export default Location;
