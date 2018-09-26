import React, { Component } from "react";

import Mapp from "components/Mapp";
import CategoryWidget from "components/CategoryWidget";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="as-app">
				<header class="as-toolbar" />
				<div className="as-content">
					{/* <aside className="as-sidebar as-sidebar--left" /> */}
					<main className="as-main">
						<div className="as-map-area">
							<Mapp />
						</div>
						<div className="as-panels">
							<div className="as-panel as-panel--top as-panel--right">
								<div className="as-panel__element as-p--24">
									<CategoryWidget
										heading="Sample Cateogry"
										description="Description"
										categories={[]}
										onSelectedChanged={this.onSelectedChanged}
										showClearButton={true}
									/>
								</div>
							</div>
						</div>
					</main>
				</div>
			</div>
		);
	}
}

export default App;
