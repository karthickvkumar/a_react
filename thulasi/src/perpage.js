import React from 'react';

export default React.createClass({
  render: function() {
    return (
      <div>
        <label id="pageSize">Page Size:</label>
        <select id="pageSize" value={this.props.pageSize} onChange={this.props.handlePageSizeChange}>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="7">7</option>
          <option value="10">10</option>
        </select>
      </div>
    )
  }
});