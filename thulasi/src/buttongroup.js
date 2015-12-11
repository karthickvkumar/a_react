import React from 'react';

export default React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "div",
      className: "btn-group",
    };
  },
  render: function(){
    var elProps = _.omit(_.clone(this.props), this.props.removeProps);
    var ElementClass = elProps.elementClass;
    elProps.className = getbtngroupsizing(elProps);
    return(
      <ElementClass {...elProps}>
        {elProps.children}
      </ElementClass>
    )
  }
});