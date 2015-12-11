import React from 'react';
import Element from './element';

export default React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "p",
      className: "list-group-item-text",
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