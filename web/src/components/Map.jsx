import React, { useState, useRef, useMemo, useCallback, Children } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function DraggableMarker({ center } = {}) {
	const [ draggable, setDraggable ] = useState(false);
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
	const toggleDraggable = useCallback(() => {
		setDraggable(d => !d);
	}, []);

	return (
		<Marker
			draggable={ draggable }
			eventHandlers={ eventHandlers }
			position={ position }
			ref={ markerRef }
		>
			<Popup minWidth={ 90 }>
				<span onClick={ toggleDraggable }>
					{ draggable
						? "Marker is draggable"
						: "Click here to make marker draggable" }
				</span>
			</Popup>
		</Marker>
	);
}

export function Map({ children } = {}) {
	const [ position, setPosition ] = useState([]);

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(({ coords } = {}) => {
			setPosition([ coords.latitude, coords.longitude ]);
		});
	}

	if (!position.length) {
		return null;
	}

	return (
		<div id="MapRoot">
			<MapContainer
				center={ position }
				zoom={ 15 }
				scrollWheelZoom={ true }
				preferCanvas={ true }
				style={ {
					height: 500,//window.innerHeight,
					width: 500,//window.innerWidth,
					left: 0,
					top: 0,
				} }
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<DraggableMarker center={ position } />
				{/* <Marker position={position}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker> */}
			</MapContainer>

			{ children }
		</div>
	);
}

export default Map;
