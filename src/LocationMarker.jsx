import React from "react";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/fire-alert";
import { Marker } from "@react-google-maps/api";

const LocationMarker = ({ lat, lng }) => {
  return (
    <Marker
      position={{
        lat: { lat },
        lng: { lng },
      }}
    >
      <Icon icon={locationIcon} className="location-icon" />
    </Marker>
  );
};

export default LocationMarker;
