import {
	arrayOf,
	bool,
	func,
	instanceOf,
	number,
	object,
	objectOf,
	oneOf,
	oneOfType,
	shape,
	string
} from "prop-types";

const propTypes = {};

const MAP_CONTROLS = ["zoom", "scale"];
const MAP_CONTROL_POSITIONS = [
	"top-left",
	"top-right",
	"bottom-left",
	"bottom-right"
];

propTypes.mapControl = shape({
	control: oneOf(MAP_CONTROLS).isRequired,
	position: oneOf(MAP_CONTROL_POSITIONS)
});
