import React from "react";
import Element from "./element";

export default React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "panel-heading"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
    return (
      <Element {...this.props}>
      {this.props.children}
      </Element>
    )
  }
});