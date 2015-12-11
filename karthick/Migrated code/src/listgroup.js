import React from 'react';
import Element from './element';

export default React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "ul",
      className: "list-group"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
 render: function(){
    var list_data = this.props.list_data.map(function(list, i){
      return <li className="list-group-item" key={list+i}>{list}</li>;
    });
    return (
      <div>
        {list_data}
      </div>
    )
  }
});