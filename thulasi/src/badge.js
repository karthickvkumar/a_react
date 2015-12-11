import React from 'react';
import Element from './element';

export default React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "span",
      className: "badge",
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