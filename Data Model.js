const state = {
	Client: {
		GPS: navigator.geolocation.getCurrentPosition(null, null, { enableHighAccuracy: true, }),
		Host: {
			constraints: {
				category: [ "Sports" ],
				activity: [ "Basketball" ],
				subject: "Game subject",
				post: "Game details",
				tags: [],
				start: Date.now(),
				end: Date.now() + 7200000,
			},
		},
		Find: {
			games: [],
			spotlight: false,
			filter: {
				category: [ "Sports" ],
				activity: [ "Basketball" ],
				tags: [],
				radius: 10,
				start: Date.now(),
				end: Date.now() + 7200000,
			},
		},
	},
};