import React from 'react';
import Element from './element';
import FormGroup from './form_group';
import Input from './input';
import Label from './label';

export default React.createClass({
  propTypes: merge_options(Input.propTypes, {
    label: React.PropTypes.string,
    help: React.PropTypes.string,
  }),
  getDefaultProps: function() {
    return merge_options(Input.getDefaultProps(), {
      // labelStyles: 'col-sm-2 control-label',
      // containerStyles: 'col-sm-10'
      labelStyles: "",
      containerStyles: ""
    });
  },
  render: function(){
    var helpText = "";
    var content = "";
    if ("help" in this.props) {
      helpText = (
        <p className="help-block">
        {this.props.help}
        </p>
      )
    }
    if (this.props.containerStyles != ""){
      content = (
        <div className={this.props.containerStyles}>
          <Input {...this.props} />
          {helpText}
        </div>
      )
    } else {
        content = (
            <Input {...this.props} />
        );
        if (helpText != "") {
          content.push(helpText);
        }
    }
    return(
      <FormGroup>
        <Label for={this.props.id} styles={this.props.labelStyles}>{this.props.label}</Label>
        {content}
      </FormGroup>
    );
  }
});