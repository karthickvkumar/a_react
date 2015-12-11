import React from 'react';

export default React.createClass({
  getInitialState: function() {
    return {
      data: {
      "total_number": 500,
      "per_page": 50,
      "current_page": 5
      }
    };
  },
  getDefaultProps: function(){
    return {
      elementClass: "ul",
      className: "pagination",
    };
  },
  render: function() {
    if(this.state.data.total_number != null) {
        var total_pages = this.state.data.total_number / this.state.data.per_page;
    }
    var items = [];
      if(this.state.data.current_page == 1){
        items.push(<li key="prev" className="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>)

      }else{
        items.push(<li key="previous" ><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>)
      }
      for(var count = 1; count <= total_pages; count++) {
        if(this.state.data.current_page == count) {
            items.push(<li key={count} className="active"><a href="#">{count}</a></li>);
        }else{
        items.push(<li key={count}><a href="#">{count}</a></li>);
      }
    }
      if(this.state.data.current_page == total_pages){
        items.push(<li key="next" className="disabled"><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>)

      }else{
        items.push(<li key="nextItem"><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>)
      }
      var elProps = _.omit(_.clone(this.props), this.props.removeProps);
      var ElementClass = elProps.elementClass;
      elProps.className = getpaginationsizing(elProps);
    return(
      <ElementClass {...elProps}>
        {items}
      </ElementClass>
    );
  }
});
