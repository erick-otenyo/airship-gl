import React from "react";
import ReactMapboxGl from "react-mapbox-gl";

import { mapboxgl } from "config";

const Map = ReactMapboxGl({
	accessToken: mapboxgl.accessToken
});

const Mapp = (props) => {
	return (
		<Map
			style={mapboxgl.style}
			containerStyle={{
				height: "100vh",
				width: "100vw"
			}}
		>
			{props.children}
		</Map>
	);
};

export default Mapp;
