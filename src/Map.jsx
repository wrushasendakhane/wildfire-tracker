import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import formatRelative from "date-fns/formatRelative";
import parseISO from "date-fns/parseISO";
import mapStyles from "./mapStyles";

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 38.57933,
  lng: -121.4909,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = ({ eventData }) => {
  const [selected, setSelected] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const markers = eventData.map((event) => {
    if (event.categories[0].id === 8) {
      return (
        <Marker
          key={event.id}
          position={{
            lat: event.geometries[0].coordinates[1],
            lng: event.geometries[0].coordinates[0],
          }}
          icon={{
            url: "/flame.svg",
            scaledSize: new window.google.maps.Size(30, 30),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          }}
          onClick={() => {
            setSelected(event);
          }}
        />
      );
    }
    return null;
  });

  if (loadError) return "Error loading map";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
      >
        {markers}
        {selected ? (
          <InfoWindow
            position={{
              lat: selected.geometries[0].coordinates[1],
              lng: selected.geometries[0].coordinates[0],
            }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h2>{selected.title}</h2>
              <p>
                Fire spotted at{" "}
                {formatRelative(
                  parseISO(selected.geometries[0].date),
                  new Date()
                )}
              </p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};

export default Map;
