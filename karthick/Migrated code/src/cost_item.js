import React from "react";
import HasMany from './has_many';
import SelectOption from './select_option';
var list_items = {
    "apera"		:"1",
    "tamame"	:"2",
    "varchas"	:"3"
}
export default React.createClass({
    getInitialState: function(){
      return {
        data: this.props.data
        }
    },
    handleDelete: function(e){
      e.preventDefault();
      this.props.delFunction(this.props.k);
    },
    render: function(){
    var colType = this.props.data.map(function(colType, i){
	    if(colType.type == "text"){
	      return(<td key={i}><input type={colType.type} name={colType.option} /></td>);
	    }
	    if(colType.type == "radio"){
	      return(<td key={i}><input type={colType.type} name={colType.option} /></td>);
	    }
	    if(colType.type == "select"){
	      return(<td key={i}><SelectOption data = {list_items} /></td>);
	    }
	    if(colType.type == "button"){
	      return(<td key={i}><input type={colType.type} value={colType.option} /></td>);
	    }
	    if(colType.type == "checkbox"){
	      return(<td key={i}><input type={colType.type} name={colType.option} /></td>);
	    }
	    if(colType.type == "span"){
	      return(<td key={i}><span>{colType.option}</span></td>);
	    }
    })
      return (
	    <tr>
	    	{colType}
	     		<td>
	     			<button type="button"  onClick={this.handleDelete}>Delete</button>
	     		</td>
	    </tr>
    );
  }
});