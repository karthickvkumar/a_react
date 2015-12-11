import React from 'react';
import Element from './element';

export default React.createClass({
  propTypes: {
    type: React.PropTypes.string
  },
  getInitialState: function(){
    if (this.props.type && this.props.type == "horizontal") {
      this.props.children.forEach(function(obj){
        if (obj.props["labelStyles"] == "") {
          // obj.props["labelStyles"] = "col-sm-3 control-label";
        }
        if (obj.props["containerStyles"] == "") {
          // obj.props["containerStyles"] = "col-sm-9";
        }
      });
    }
    return {
    };
  },
  getDefaultProps: function() {
    return {
      elementClass: "form",
    };
  },
  render: function(){
    // console.log(this.props.children[0]);
    return (
      <Element {...this.props} className={this.props.styles}>
        {this.props.children}
      </Element>
    )
  }
});