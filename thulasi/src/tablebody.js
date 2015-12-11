import React from "react";

export default React.createClass({
 render: function(){
    var tbody = [];
    this.props.tbody_data.map(function(obj, i) {
    var cols = [];
    for (key in obj){
      cols.push(<td>{obj[key]}</td>);
    }
      tbody.push(<tr>{cols}</tr>);
    });
    return (
      <tbody>{tbody}</tbody>
    );
  }
});