import React from "react";
import Element from './element';

export default React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "progress-bar"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
    var elProps = _.omit(_.clone(this.props), this.props.removeProps);
    var ElementClass = elProps.elementClass;
    elProps.className = getprogressClass(elProps);
    elProps.className = getprogressBar(elProps);
    elProps.className = getprogressActive(elProps);
    return (
      <ElementClass {...elProps}>
      {this.props.children}
      </ElementClass>
    )
  }
});