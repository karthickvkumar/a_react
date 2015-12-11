import React from "react";
import Element from './element';

export default React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    }
  },
  getDefaultProps: function() {
    return {
      elementClass: "ol",
      className: "carousel-indicators"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
     var c_data = this.state.data.map(function(c_data, i){
      return (<li data-target="#myCarousel" key={i}  data-slide-to={c_data.count}></li>
      )
    })
    return (
      <Element {...this.props}>
      {this.props.children}
      {c_data}
      </Element>
    )
  }
});