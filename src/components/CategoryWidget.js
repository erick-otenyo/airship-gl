import React, { Component } from "react";

class CategoryWidget extends Component {
	componentDidMount() {
		this._setupConfig();
		this._setupEvents();
	}

	componentDidUpdate() {
		this._setupConfig();
	}

	_setupConfig() {
		const {
			categories,
			showHeader,
			showClearButton,
			useTotalPercentage,
			visibleCategories
		} = this.props;

		this.widget.showHeader = showHeader;
		this.widget.showClearButton = showClearButton;
		this.widget.useTotalPercentage = useTotalPercentage;
		this.widget.visibleCategories = visibleCategories;
		this.widget.categories = categories;
	}

	_setupEvents() {
		this.widget.addEventListener("categoriesSelected", (event) =>
			this._onSelectedChanged(event)
		);
	}

	_onSelectedChanged(event) {
		const { onSelectedChanged } = this.props;
		onSelectedChanged && onSelectedChanged(event);
	}

	render() {
		const { heading, description } = this.props;

		return (
			<as-category-widget
				ref={(node) => {
					this.widget = node;
				}}
				heading={heading}
				description={description}
			/>
		);
	}
}

CategoryWidget.defaultProps = {
	categories: [],
	showHeader: true,
	showClearButton: true,
	useTotalPercentage: false,
	visibleCategories: Infinity
};

export default CategoryWidget;
