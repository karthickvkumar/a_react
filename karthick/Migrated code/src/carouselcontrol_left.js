import React from "react";
import Element from './element';

export default React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
    return (
      <Element {...this.props}>
      {this.props.children}
      <a className="carousel-control left" href="#myCarousel"  data-slide="prev">
      <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      </a>
      </Element>
    )
  }
});