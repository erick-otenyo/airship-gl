import React, { Component } from "react";

class InfoWindow extends Component {
	render() {
		const { title, content } = this.props;
		return (
			<as-infowindow>
				<h1 className="as-title">{title}</h1>
				<p>
					<span className="as-badge">mammal</span>
					<span className="as-badge as-bg--badge-pink">carnivorous</span>
				</p>
				<p className="as-body">{content}</p>
			</as-infowindow>
		);
	}
}

export default InfoWindow;
