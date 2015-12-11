import React from 'react';
import Element from './element';

export default React.createClass({
  propTypes: {
    className: React.PropTypes.string,
  },
  getDefaultProps: function(){
    return {
      elementClass: "div",
      className: "clearfix"
    }
  },
  render: function(){
    return (
      <Element {...this.props} />
    )
  }
});