import React, { Component } from "react";
import ReactMapboxGl, {
	GeoJSONLayer,
	ZoomControl,
	ScaleControl,
	Layer
} from "react-mapbox-gl";

import config from "config";
import { styles } from "util/mapDefaults";
import Popup from "components/infoWindow";

import "mapbox-gl/dist/mapbox-gl.css";

const createHandler = (type, event, handler) => {
	return { [`${type}${event}`]: handler };
};

const Map = ReactMapboxGl({
	accessToken: config.accessToken
});

class Mapp extends Component {
	constructor(props) {
		super(props);
		this.state = { mapLoaded: false };
	}
	onStyleLoad = (map) => {
		this.map = map;
		this.setState({ mapLoaded: true });
	};
	onClick = (e, layer) => {
		const { map } = this;
		const layerId = `${layer.id}-${layer.type}`;
		const point = [e.point.x, e.point.y];
		const lngLat = e.lngLat;
		const features = map.queryRenderedFeatures(point, {
			layers: [layerId]
		});
		const clusterId = features[0].properties.cluster_id;
		// if clicked feature ins not a cluster
		if (!clusterId) {
			return this.setState({
				selectedFeature: {
					feature: features[0],
					type: layer.type,
					coords: [lngLat.lng, lngLat.lat]
				}
			});
		}
		// if clicked feature is a cluster, zoom in
		map
			.getSource(layer.id)
			.getClusterExpansionZoom(clusterId, function(err, zoom) {
				if (err) {
					return;
				}
				map.easeTo({
					center: features[0].geometry.coordinates,
					zoom: zoom
				});
			});
	};
	onMouseEnter = () => {
		this.map.getCanvas().style.cursor = "pointer";
	};
	onMouseLeave = () => {
		this.map.getCanvas().style.cursor = "";
	};

	getMapControl = ({ control, position }) => {
		switch (control) {
			case "zoom":
				return <ZoomControl key={control} position={position} />;
			case "scale":
				return <ScaleControl key={control} position={position} />;
			default:
				return null;
		}
	};
	onMapClick = (e) => {
		this.setState({ selectedFeature: null });
	};
	render() {
		const {
			initOptions,
			controls,
			layers,
			highlightStyle,
			clusterCirclePaint
		} = this.props;
		const { mapLoaded, selectedFeature } = this.state;

		// create geojson layers
		const mapLayers =
			this.map &&
			layers.map((layer) => {
				// layer onClick handler
				const onClick = createHandler(layer.type, "OnClick", (e) =>
					this.onClick(e, layer)
				);
				// layer onMouseEnter handler
				const onMouseEnter = createHandler(
					layer.type,
					"OnMouseEnter",
					this.onMouseEnter
				);
				// layer onMouseLeave handler
				const onMouseLeave = createHandler(
					layer.type,
					"OnMouseLeave",
					this.onMouseLeave
				);
				const utilLayers = [];
				let clusterPaint = null;
				if (layer.sourceOptions && layer.sourceOptions.cluster) {
					clusterPaint = layer.clusterCirclePaint
						? { circlePaint: { ...layer.clusterCirclePaint } }
						: { circlePaint: { ...clusterCirclePaint } };
					// cluster count symbol
					const clusterCountLayer = (
						<Layer
							key={`${layer.id}-cluster-count`}
							type="symbol"
							id={`${layer.id}-cluster-count`}
							sourceId={layer.id}
							filter={["has", "point_count"]}
							layout={{
								"text-field": "{point_count_abbreviated}",
								"text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
								"text-size": 12
							}}
						/>
					);
					const unclusteredPointLayer = (
						<Layer
							key={`${layer.id}-unclustered-point`}
							type="circle"
							id={`${layer.id}-unclustered-point`}
							sourceId={layer.id}
							filter={["!", ["has", "point_count"]]}
							paint={{ ...layer.circlePaint }}
						/>
					);
					utilLayers.push(...[clusterCountLayer, unclusteredPointLayer]);
				}

				let highLightLayer = null;
				if (selectedFeature) {
					const type = selectedFeature.type === "circle" ? "circle" : "line";
					const style = highlightStyle[type];
					const layerPaint = { [`${type}Paint`]: { ...style } };
					highLightLayer = (
						<GeoJSONLayer data={selectedFeature.feature} {...layerPaint} />
					);
				}

				return (
					<React.Fragment key={layer.id}>
						<GeoJSONLayer
							{...layer}
							{...clusterPaint}
							{...onClick}
							{...onMouseEnter}
							{...onMouseLeave}
						/>
						{highLightLayer}
						{utilLayers}
					</React.Fragment>
				);
			});

		const mapControls = controls
			? controls.map((control) => {
					const mapControl = this.getMapControl(control);
					return mapControl;
			  })
			: null;

		return (
			<Map
				{...initOptions}
				containerStyle={{
					height: "100vh",
					width: "100vw"
				}}
				onStyleLoad={this.onStyleLoad}
				onClick={this.onMapClick}
			>
				{mapLoaded && mapLayers}
				{mapLoaded && mapControls}
				{/* {mapLoaded &&
					selectedFeature && <Popup coordinates={selectedFeature.coords} />} */}
			</Map>
		);
	}
}

Mapp.defaultProps = {
	layers: config.layers,
	initOptions: config.initOptions,
	controls: config.controls,
	highlightStyle: config.highlightStyle,
	clusterCirclePaint: styles.clusterCirclePaint
};

Mapp.propTypes = {};

export default Mapp;
