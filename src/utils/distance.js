

export function calculateDistance(lat1 = 0, lon1 = 0, lat2 = 0, lon2 = 0) {
	const earthRadius = 3958.8;
	const toRadians = (angle) => (angle * Math.PI) / 180;

	const dLat = toRadians(+lat2 - +lat1);
	const dLon = toRadians(+lon2 - +lon1);

	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	const distance = earthRadius * c;
	return distance;
}
