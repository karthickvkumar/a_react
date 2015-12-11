import React from 'react';
import Element from './element';
export default React.createClass({
  propTypes: Button.propTypes,
  getDefaultProps: function() {
    return merge_options({/*Button.getDefaultProps()*/}, {
      type: "submit",
    });
  },
  render: function(){
    return (
      <Button {...this.props}>
        {this.props.children}
      </Button>
    )
  }
});