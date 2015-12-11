import React from 'react';
import Element from './element';

export default React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "div",
      className: "thumbnail",
    };
  },
  render: function(){
    return (
      <Element {...this.props}>
        {this.props.children}
      </Element>
    )
  }
});
