import React from 'react';

export default React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "div",
      className: "alert",
      hasDismiss: false
    };
  },
  propTypes: {
    hasDismiss: React.PropTypes.bool,
  },
  render: function(){
    var elProps = _.omit(_.clone(this.props), this.props.removeProps);
    var ElementClass = elProps.elementClass;
    elProps.className = getalertClasses(elProps);
    var dismiss = "";
      if(this.props.hasDismiss){
          alert += " alert-dismissible";
          dismiss = (
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
           );
        }
    return(
        <ElementClass {...elProps}>
          {dismiss}{elProps.children}
        </ElementClass>
    );
  }
});