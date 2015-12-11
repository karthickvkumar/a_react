import React from 'react';
import Element from './element';
import Column from './column';


export default React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    // children: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Column)).isRequired,
  },
  getDefaultProps: function () {
    return {
      elementClass: "div",
      className: "row",
    }
  },
  getChildren: function(){
    return React.Children.map(this.props.children, function(child){
      if(child.type !== Column){
        console.warn("Only Column types are allowed inside Row, found ...", child.type);
      }
      return child;
    }.bind(this));
  },
  render: function(){
    return (
      <Element {...this.props}>
        {this.getChildren()}
      </Element>
    )
  }
});