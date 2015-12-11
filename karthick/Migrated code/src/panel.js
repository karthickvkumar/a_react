import React from "react";

export default React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "panel"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){var elProps = _.omit(_.clone(this.props), this.props.removeProps);
    var ElementClass = elProps.elementClass;
    elProps.className = getpanelClass(elProps);
    return (
      <ElementClass {...elProps}>
      {this.props.children}
      </ElementClass>
    )
  }
});