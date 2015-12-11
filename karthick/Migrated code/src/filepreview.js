import React from "react";

export default React.createClass({
  getInitialState: function() {
    return {
      data_uri: null,
    };
  },
  handleSubmit: function(e) {
    e.preventDefault();
  },
  handleFile: function(e) {
    console.log(this.setState);
    var self = this;
    var reader = new FileReader();
    var file = e.target.files[0];
    reader.onload = function(upload) {
      $('#img').attr('src', upload.target.result);
      self.setState({
        data_uri: upload.target.result,
      });
    }

    reader.readAsDataURL(file);

  },
  render: function() {

    return (
      <form onSubmit={this.handleSubmit} encType="multipart/form-data">
        <input type="file" multiple onChange={this.handleFile} />
      </form>
    );
  },
});