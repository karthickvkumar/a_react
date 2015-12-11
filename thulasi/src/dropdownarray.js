import React from 'react';
import Button from './button';

export default React.createClass({
  propTypes: merge_options(Button.propTypes, {
  }),
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
    var lists = this.state.data.map(function(item, i) {
      return <li key={i}><a href="#">{item}</a></li>;
    });
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