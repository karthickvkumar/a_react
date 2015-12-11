import React from 'react';

export default React.createClass({
  getInitialState: function() {
    return {
      currentPage: 1
    }
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      currentPage: 1
    })
  },
  render: function() {
    var page = this.getPage()
    var thead_data = this.props.thead_data.map(function(item, i){
      return <th key={item+i}>{item}</th>;
    });
    var tbody = [];
    page.tbody_data.map(function(obj, i) {
    var cols = [];
    for(key in obj){
      if(typeof obj[key] == "number"){
        cols.push(<td className="text-right">{obj[key].toFixed(2)}</td>);
      }else {
        cols.push(<td>{obj[key]}</td>);
      }
    }
      tbody.push(<tr>{cols}</tr>);
    });
    return (
      <div>
        {pager(page)}
        <input type="search" label="Search" />
        <table className="table table-bordered">
          <thead><tr> {thead_data}</tr></thead>
          <tbody>{tbody}</tbody>
        </table>
      </div>
    );
   },
  getPage: function() {
    var start = this.props.pageSize * (this.state.currentPage - 1)
    var end = start + this.props.pageSize
    return {
      currentPage: this.state.currentPage,
      tbody_data: this.props.tbody_data.slice(start, end),
      numPages: this.getNumPages(),
      handleClick: function(pageNum) {
      return function() { this.handlePageChange(pageNum) }.bind(this)
      }.bind(this)
    }
  },
  getNumPages: function() {
    var numPages = Math.floor(this.props.tbody_data.length / this.props.pageSize)
    if (this.props.tbody_data.length % this.props.pageSize > 0) {
      numPages++
    }
    return numPages
  },
   handlePageChange: function(pageNum) {
    this.setState({currentPage: pageNum})
  }
});

function pager(page) {
  var pageLinks = []
  if (page.currentPage > 1) {
    if (page.currentPage > 2) {
      pageLinks.push(<li className="pageLink" onClick={page.handleClick(1)}><a href="#">«</a></li>)
      pageLinks.push(' ')
    }
    pageLinks.push(<li className="pageLink" onClick={page.handleClick(page.currentPage - 1)}><a href="#">‹</a></li>)
    pageLinks.push(' ')
  }
  pageLinks.push(<li className="pageLink">Page {page.currentPage} of {page.numPages}</li>)
  if (page.currentPage < page.numPages) {
    pageLinks.push(' ')
    pageLinks.push(<li className="pageLink" onClick={page.handleClick(page.currentPage + 1)}><a href="#">›</a></li>)
    if (page.currentPage < page.numPages - 1) {
      pageLinks.push(' ')
      pageLinks.push(<li className="pageLink" onClick={page.handleClick(page.numPages)}><a href="#">»</a></li>)
    }
  }
  return <ul className="pagination pull-right">{pageLinks}</ul>
}