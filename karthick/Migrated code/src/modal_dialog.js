import React from "react";
import Element from './element';

export default React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "modal-dialog modal-content"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){var elProps = _.omit(_.clone(this.props), this.props.removeProps);
    var ElementClass = elProps.elementClass;
    elProps.className = getModelSize(elProps);
    return (
      <ElementClass {...elProps}>
      {this.props.children}
      </ElementClass>
    )
  }
});