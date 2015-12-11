import React from "react";
export default React.createClass({
 render: function(){
    var thead_data = this.props.thead_data.map(function(item, i){
      return <th key={item+i}>{item}</th>;
    });
    return (
    <thead>
      <tr>
        {thead_data}
      </tr>
    </thead>
    )
  }
});