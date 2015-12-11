import React from 'react';
import Element from './element';

export default React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string,
    styles: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    readOnly: React.PropTypes.bool,
  },
  getDefaultProps: function() {
    return {
      elementClass: "input",
      type: "text",
      styles: "form-control",
      disabled: false,
      readOnly: false,
    };
  },
  render: function(){
    var elProps = _.clone(this.props);
    elProps.className = elProps.styles;
    return (
      <Element {...elProps} >
        {elProps.children}
      </Element>
    )
  }
});
