const config = {
	accessToken:
		"pk.eyJ1IjoiZXJpY2tvdGVueW8iLCJhIjoiY2owYXlsb2kxMDAwcjJxcDk3a2Q0MmdpZSJ9.GJQzHfNMElZ7OhW_HbnaXw",
	initOptions: {
		zoom: [10],
		center: [36.8219, -1.2921],
		style: "mapbox://styles/mapbox/streets-v9"
	},
	controls: [
		{ control: "zoom", position: "top-left" },
		{ control: "scale", position: "bottom-left" }
	],
	layers: [
		{
			id: "health",
			title: "Health",
			data:
				"https://erick-otenyo.carto.com/api/v2/sql?q=SELECT * FROM kisii_health&format=geojson",
			type: "circle",
			circlePaint: {
				"circle-color": "red",
				"circle-radius": 8,
				"circle-stroke-width": 1,
				"circle-stroke-color": "#fff"
			},
			// clusterCirclePaint: {
			// 	"circle-color": [
			// 		"step",
			// 		["get", "point_count"],
			// 		"#51bbd6",
			// 		100,
			// 		"#f1f075",
			// 		750,
			// 		"#f28cb1"
			// 	],
			// 	"circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40]
			// },
			sourceOptions: { cluster: true, clusterMaxZoom: 14 }
		},
		{
			id: "jkuat",
			data:
				"https://erick-otenyo.carto.com/api/v2/sql?q=SELECT * FROM jkuat_buildings&format=geojson",
			type: "fill",
			fillPaint: { "fill-color": "green" }
		}
	],
	highlightStyle: {
		line: { "line-color": "red" },
		circle: {
			"circle-color": "transparent",
			"circle-radius": 10,
			"circle-stroke-width": 3
		}
	}
};

export default config;
