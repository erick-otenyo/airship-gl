export const styles = {
	clusterCirclePaint: {
		"circle-color": [
			"step",
			["get", "point_count"],
			"#51bbd6",
			100,
			"#f1f075",
			750,
			"#f28cb1"
		],
		"circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40]
	}
};
