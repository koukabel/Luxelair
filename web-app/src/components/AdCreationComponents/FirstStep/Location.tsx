



// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// //import MarkerClusterGroup from "./MarkerClusterGroup";
// import dynamic from 'next/dynamic'
// import { VStack, Heading } from "@chakra-ui/react";
// interface LocationProps {
//   onLocationChange: (newLocation: string) => void;
// }

// const Location: React.FC<LocationProps> = ({ onLocationChange }) => {
//   const position = [51.505, -0.09] as [number, number];
//   return (
    

// <VStack p={"10"}>
//      <Heading>Où est situé votre logement ?</Heading>
//        <Heading as="h6" fontSize='md' textAlign={'center'} color={'gray'} p={'10px'}>
//          Votre adresse est uniquement communiquée aux voyageurs une fois leur
//          réservation effectuée.{" "}
//        </Heading>

//     <MapContainer
//       center={position}
//       zoom={5}
//       style={{ width: "100%", height: "600px" }}
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <Marker position={position}>
//         <Popup>
//           A pretty CSS3 popup. <br /> Easily customizable.
//         </Popup>
//       </Marker>
//       {/* <MarkerClusterGroup> // 
//         {latlons.map((v, i) => (
//           <Marker key={i} position={v} />
//         ))}
//       </MarkerClusterGroup>  */}
//     </MapContainer>
//     </VStack>
//   );
// }
// export default Location;




import { LatLngBoundsLiteral } from "leaflet";
import React from "react";
import 'leaflet/dist/leaflet.css';
import {  MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import { VStack, Heading, Center } from "@chakra-ui/react";
//import Search from "react-leaflet-search";
interface LocationProps {
  onLocationChange: (newLocation: string) => void;
}

const Location: React.FC<LocationProps> = ({ onLocationChange }) => {

    const bounds: LatLngBoundsLiteral = [
      [41.076602, 30.052495], // South
      [41.076602, 31.052495], // North
    ];
  

  // const customPopup = (SearchInfo) => (
  //   <Popup>
  //     <div>
  //       <p>I am a custom popUp</p>
  //       <p>
  //         latitude and longitude from search component:{" "}
  //         {SearchInfo.latLng.toString().replace(",", " , ")}
  //       </p>
  //       <p>Info from search component: {SearchInfo.info}</p>
  //       <p>
  //         {SearchInfo.raw &&
  //           SearchInfo.raw.place_id &&
  //           JSON.stringify(SearchInfo.raw.place_id)}
  //       </p>
  //     </div>
  //   </Popup>
  // );

  return (
    // <VStack p={"10"}>
    //       <Heading>Où est situé votre logement ?</Heading>
    //         <Heading as="h6" fontSize='md' textAlign={'center'} color={'gray'} p={'10px'}>
    //           Votre adresse est uniquement communiquée aux voyageurs une fois leur
    //           réservation effectuée.{" "}
    //       </Heading>

    <MapContainer className="simpleMap" scrollWheelZoom={true} bounds={bounds}>
      <TileLayer
        noWrap={true}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[41.076602, 30.052495]}>
        <Popup>Marker 1</Popup>
      </Marker>
      <Marker position={[41.076602, 31.052495]}>
        <Popup>Marker 2</Popup>
      </Marker>
      {/* <Search
        position="topleft"
        inputPlaceholder="Custom placeholder"
        showMarker={false}
        zoom={7}
        closeResultsOnClick={true}
        openSearchOnLoad={false}
      >
        {(info) => <Marker position={info?.latLng}>{customPopup(info)}</Marker>}
      </Search> */}
    </MapContainer>
    // </Center>
    // </VStack>
  );
}


export default Location;