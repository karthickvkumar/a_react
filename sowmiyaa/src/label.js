import React from 'react';
import Element from './element';

export default React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "label",
    };
  },
  propTypes: {
    for: React.PropTypes.string,
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