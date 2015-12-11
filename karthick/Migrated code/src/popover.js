import React from "react";
export default React.createClass({
  componentDidMount: function() {
    $('[data-toggle="popover"]').popover();
  },
  getDefaultProps: function() {
    return {
      elementClass: "button",
      className: "btn"
    };
  },
  propTypes: {
    type: React.PropTypes.string,
    styles: React.PropTypes.string,
  },
  render: function(){
  var elProps = _.omit(_.clone(this.props), this.props.removeProps);
    var ElementClass = elProps.elementClass;
    elProps.className = getbtnClasses(elProps);
    return(
      <ElementClass {...elProps}>
        {elProps.children}
      </ElementClass>
    )
  }
});