import React from "react";
import Element from './element';
import Span from './span';
export default React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    }
  },
  getDefaultProps: function() {
    return {
      elementClass: "ul",
      className: "nav"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
    var nav_data = this.state.data.map(function(nav_data, i){
      return (<li className={nav_data.value} key={i}><a href={nav_data.path}>{nav_data.name}<Span className={nav_data.badge}>{nav_data.b_value}</Span></a></li>
      )
    })
    return(
      <Element {...this.props}>
      {this.props.children}
      {nav_data}
      </Element>
    )
  }
});