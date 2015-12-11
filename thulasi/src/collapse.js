import React from 'react';
import Button from './button';

export default React.createClass({
  propTypes: merge_options(Button.propTypes, {
  }),
  getDefaultProps: function(){
    return {
      elementClass: "button",
      className: "btn",
    };
  },
  render: function(){
    var elProps = _.omit(_.clone(this.props), this.props.removeProps);
    var ElementClass = elProps.elementClass;
    elProps.className = getbtnClasses(elProps);
    elProps.className = getbtnsizing(elProps);
    return(
      <ElementClass {...elProps} data-toggle="collapse">
        {elProps.children}
      </ElementClass>
    )
  }
});