import React from 'react';
import Button from './button';

export default React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "button",
      className: "btn dropdown-toggle",
    };
  },
  getInitialState: function(){
    return {
      data: this.props.data
    }
  },
  render: function(){
    var lists = [];
    var data = this.state.data;
    for(var key in data) {
      if(typeof key === "string") {
       lists.push(<li key={key} className="dropdown-header">{key}</li>);
      }
      if(typeof data[key] === "object") {
        for(var key2 in data[key]) {
          lists.push(<li key={data[key][key2]}><a href="#">{key2}</a></li>);
        }
      }
    }
    return (
      <div className="dropdown">
        <Button {...this.props} data-toggle="dropdown">
          {this.props.children}
          <span className="caret"></span>
        </Button>
        <ul className="dropdown-menu">
          {lists}
        </ul>
      </div>
    )
  }
});