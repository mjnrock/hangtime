import React, { useState, useRef, useMemo, useCallback, Children } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import cn from "classnames";

function DraggableMarker({ center } = {}) {
	const [ position, setPosition ] = useState(center);
	const markerRef = useRef(null);
	const eventHandlers = useMemo(
		() => ({
			dragend() {
				const marker = markerRef.current;
				if (marker != null) {
					setPosition(marker.getLatLng());
				}
			},
		}),
		[],
	);

	return (
		<Marker
			draggable={ true }
			eventHandlers={ eventHandlers }
			position={ position }
			ref={ markerRef }
		>
			{/* <Popup minWidth={ 90 }>
				<span onClick={ toggleDraggable }>
					{ draggable
						? "Marker is draggable"
						: "Click here to make marker draggable" }
				</span>
			</Popup> */}
		</Marker>
	);
}

export function Map({ onPosition, markers = [], children, className } = {}) {
	const [ position, setPosition ] = useState([]);

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(({ coords } = {}) => {
			const pos = [ coords.latitude, coords.longitude ];

			setPosition(pos);
			if(typeof onPosition === "function") {
				onPosition(pos, coords);
			}
		});
	}

	if (!position.length) {
		return null;
	}

	return (
		<>
			{/* <div className="border bg-blue-600 w-[500px] h-[500px] top-[200px] left-0"></div> */}
			<MapContainer
				center={ position }
				zoom={ 13 }
				scrollWheelZoom={ true }
				preferCanvas={ true }
				className={ cn(className) }
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<DraggableMarker center={ position } />

				{
					//? There appears to be pretty solid intergration between ReactLeaflet and Leaflet -- explore further
					//TODO Make a list of game icons to replace the Marker icons
					markers.map((pos, i) => <Marker position={ pos } key={ i } icon={ L.icon({
						iconUrl: "marker-icon2.png",
						iconSize: [25, 41],
						iconAnchor: [12, 41],	// This appears to need to be ~half the width of the icon to maintain correct position on zooms
					}) }/>)
				}
			</MapContainer>

			{ children }
		</>
	);
}

export default Map;
