import React from "react";

export default React.createClass({
componentDidMount: function() {
    $('input[name="daterange"]').daterangepicker();
  },
  render: function() {
    return (
      <div className="form-group">
        <input className="form-control" name="daterange"/>
      </div>
    );
  }
});
