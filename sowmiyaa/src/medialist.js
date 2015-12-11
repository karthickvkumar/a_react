import React from 'react';

export default React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "ul",
      className: "media-list",
    };
  },
  render: function(){
    var elProps = _.omit(_.clone(this.props), this.props.removeProps);
    var ElementClass = elProps.elementClass;
    elProps.className = getmediaAlign(elProps);
    return(
      <ElementClass {...elProps}>
        {elProps.children}
      </ElementClass>
    )
  }
});


