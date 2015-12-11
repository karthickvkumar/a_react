import React from "react";
import OptionItem from './option';

export default React.createClass({
	render: function() {
		var menuNodes = [];
			for (var key in this.props.data) {
			menuNodes.push(<OptionItem key={key} text={key}
			  value={this.props.data[key]}  />);
			}
			return (
				<div>
				<select>{menuNodes}</select>
				</div>
		);
	}
});