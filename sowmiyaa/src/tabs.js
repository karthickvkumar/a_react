import React from 'react';
import Element from './element';

export default React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "ul",
      className: "nav nav-tabs",
    };
  },
  render: function(){
    return (
      <Element {...this.props} data-toggle="tab">
        {this.props.children}
      </Element>
    )
  }
});


