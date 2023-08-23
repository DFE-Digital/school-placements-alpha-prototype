// Source: https://www.geodatasource.com/developers/javascript

exports.getDistance = (lat1, lon1, lat2, lon2, unit = null) => {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0
	} else {
		const radlat1 = Math.PI * lat1/180
		const radlat2 = Math.PI * lat2/180
		const theta = lon1 - lon2
		const radtheta = Math.PI * theta/180

    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)

    if (dist > 1) {
			dist = 1
		}

    // statute miles
    dist = Math.acos(dist);
		dist = dist * 180/Math.PI
		dist = dist * 60 * 1.1515

    // kilometers
    if (unit.toLowerCase() === 'km' || unit.toLowerCase() === 'kilometers') {
      dist = dist * 1.609344
    }

    // nautical miles
    if (unit.toLowerCase() === 'nm' || unit.toLowerCase() === 'nautical miles') {
      dist = dist * 0.8684
    }

    return dist
	}
}
