import React from "react";
import SelectOption from './select_option';

export default React.createClass({
	render: function() {
		return (
		  <option value={this.props.value} ref={this.props.ref} >{this.props.text}</option>
		);
	}
});

