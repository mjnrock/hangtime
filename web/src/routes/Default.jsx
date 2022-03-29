import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export function Default() {
	const [position, setPosition] = useState([]);

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(({ coords } = {}) => {
			setPosition([coords.latitude, coords.longitude]);
		});
	}

	if (!position.length) {
		return null;
	}

	return (
		<>
			<div>{ JSON.stringify(position) }</div>
			<MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: 500, width: 500 }}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={position}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer>
		</>
	);
}

export default Default;