import React from 'react';

export default React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "a",
      className: "list-group-item",
    };
  },
  render: function(){
    var elProps = _.omit(_.clone(this.props), this.props.removeProps);
    var ElementClass = elProps.elementClass;
    elProps.className = getstatus(elProps);
    elProps.className = getlistGroupClasses(elProps);
    return(
      <ElementClass {...elProps}>
        {elProps.children}
      </ElementClass>
    )
  }
});