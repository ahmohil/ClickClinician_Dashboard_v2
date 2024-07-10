import { useCallback } from "react";
import { GoogleMap } from "@react-google-maps/api";

const mapStyle = {
	width: "100%",
	height: "450px",
	border: 0,
};

const DEFAULT_ZOOM_LEVEL = 12;

const LocationMap = ({ coordinates, address }) => {
	const markerDetailScreen = `<div style="font-size: 14px; font-weight: 600;">Location</div>
							<div>
								<a href='https://www.google.com/maps/place/${+coordinates.lat},${+coordinates.lng}' target='_blank'>${address} </a>
							</div>`;

	const onLoad = useCallback(function callback(map) {
		const bounds = new window.google.maps.LatLngBounds({ lat: +coordinates.lat, lng: +coordinates.lng });
		// map.panToBounds(bounds);
		// map.fitBounds(bounds);
		// map.setZoom(DEFAULT_ZOOM_LEVEL);
		// map.setCenter({ lat: +coordinates.lat, lng: +coordinates.lng });
		map.panTo({ lat: +coordinates.lat, lng: +coordinates.lng });

		const infoWindow = new google.maps.InfoWindow({ content: markerDetailScreen });

		const marker = new google.maps.Marker({
			position: { lat: +coordinates.lat, lng: +coordinates.lng },
			map,
		});

		marker.addListener("click", () => infoWindow.open({ anchor: marker, map }));
	}, []);

	return <GoogleMap mapContainerStyle={mapStyle} zoom={DEFAULT_ZOOM_LEVEL} onLoad={onLoad}></GoogleMap>;
};

export default LocationMap;
