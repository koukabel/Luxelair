import { useEffect } from "react";
import "leaflet/dist/leaflet.css"
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useMap, MapContainer, TileLayer } from "react-leaflet";
import { Heading, VStack } from "@chakra-ui/react";

interface LocationProps {
  onLocationChange: (newLocation: string) => void;
}

const SearchLocation = ({ provider }) => {
  const searchControl = new GeoSearchControl({
    provider: provider,
  });

  const map = useMap();
 
  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, [map, searchControl]);

  return null;
};


const Location: React.FC<LocationProps> = ({ onLocationChange }) => {
  const initialCenter = { lat: 46.603354, lng: 1.888334 }; // Center of France
  const initialZoom = 6;

  return (
    <div>
      <VStack p={"10"}>
        <Heading>Où est situé votre logement ?</Heading>
        <Heading as={"h6"} fontSize='md' textAlign={'center'} color={'gray'} p={'10px'}>
          Votre adresse est uniquement communiquée aux voyageurs une fois leur
          réservation effectuée.{" "}
        </Heading>
      </VStack>
      <MapContainer center={initialCenter} zoom={initialZoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SearchLocation provider={new OpenStreetMapProvider()} />
      </MapContainer>
    </div>
  );
};

export default Location;
