import React from 'react';
import Element from './element';

export default React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "ul",
      className: "pager",
    };
  },
  render: function() {
    return (
        <Element {...this.props}>
          {this.props.children}
        </Element>
    );
  }
});


