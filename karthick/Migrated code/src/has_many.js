import React from "react";
import CostItem from './cost_item';
var data = {
  costitems:[
    {
      "project_id"      : "#",
      "cost_item"       : "#",
      "total_value"     : "#",
      "already_paid"    : "#",
      "gross_balance"   : "#",
      "gross_allocation": "#",
      "deductions"      : "#",
      "net_amount"      : "#",
      "notes"           : "#"
    }
  ],
  structure:[
    {
      "type"    :"select",
      "option"  : list_items
    },{
      "type"    :"text",
      "option"  :"product_name"
    },{
      "type"    :"radio",
      "option"  :"radio_button"
    },{
      "type"    :"checkbox",
      "option"  :"first_name"
    },{
      "type"    :"span",
      "option"  :"$100"
    },{
      "type"    :"text",
      "option"  :"total_value"
    },{
      "type"    :"text",
      "option"  :"total_amount"
    },{
      "type"    :"text",
      "option"  :"checkbox_button"
    },{
      "type"    :"text",
      "option"  :"total_value"
    }
  ]
};
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
    addCostItem: function(e) {
      e.preventDefault();
      var newData = this.state.data;
      if (!newData.costitems){
        newData.costitems = [];

      }
      newData.costitems.push({});
      console.log(newData);
      this.setState({data: newData});
    },
    deletecostitem: function(i){
      var newData = this.state.data;
      newData.costitems.splice(i,1);
      this.setState({data: newData});
   },
   costItemRender: function(item, i){
      return <CostItem data={data.structure} key={i} delFunction={this.deletecostitem} k={i} />;
    },
    render: function(){
      var list = [];
       if (this.state.data.costitems) {
        list = this.state.data.costitems.map(this.costItemRender);
        }
      return(
	      <tbody>
	      	{list}
			      <tr>
			      	<td>
			      		<button className = "btn btn-primary btn-xs" onClick={this.addCostItem}>Add Item</button>
			      	</td>
			      </tr>
	      </tbody>
     );
   }
});
