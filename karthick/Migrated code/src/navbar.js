import React from 'react';
import Element from './element';

export default React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "nav",
      className: "navbar navbar-default"
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