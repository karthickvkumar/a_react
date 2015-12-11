import React from "react";
export default React.createClass({
 render: function(){
    var tbody = [];
    this.props.tbody_data.map(function(obj, i) {
    var cols = [];
    for (var key in obj){
      cols.push(<td>{obj[key]}</td>);
    }
      tbody.push(<tr key={obj+i}>{cols}</tr>);
    });
    return (
      <tbody key={"tbody"}>{tbody}</tbody>
    );
  }
});