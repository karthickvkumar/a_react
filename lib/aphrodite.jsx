var Element = React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "div",
      removeProps: []
    }
  },
  render: function(){
    var elProps = _.omit(_.clone(this.props), this.props.removeProps);
    var ElementClass = elProps.elementClass;
    elProps.className = getColSizes(elProps);
    return(
      <ElementClass {...elProps}>
        {elProps.children}
      </ElementClass>
    )
  }
});

var Container = React.createClass({
  propTypes: {
    fluid: React.PropTypes.bool,
  },
  getDefaultProps: function(){
    return {
      elementClass: "div",
      className: "container",
      fluid: false,
    }
  },
  getChildren: function(){
    return React.Children.map(this.props.children, function(child){
      if(child.type !== Row) {
        console.warn("Only Row types are allowed inside Container, found ...", child.type);
      }
      return child;
    }.bind(this));
  },
  render: function(){
    var elProps = _.clone(this.props);
    if (elProps.fluid){
      elProps.className = "container-fluid";
    }
    return (
      <Element {...elProps}>
        {this.getChildren()}
      </Element>
    )
  }
});

var Row = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    // children: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Column)).isRequired,
  },
  getDefaultProps: function () {
    return {
      elementClass: "div",
      className: "row",
    }
  },
  getChildren: function(){
    return React.Children.map(this.props.children, function(child){
      if(child.type !== Column){
        console.warn("Only Column types are allowed inside Row, found ...", child.type);
      }
      return child;
    }.bind(this));
  },
  render: function(){
    return (
      <Element {...this.props}>
        {this.getChildren()}
      </Element>
    )
  }
});

var Column = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
  },
  getDefaultProps: function(){
    return {
      elementClass: "div",
    }
  },
  render: function(){
    return (
      <Element {...this.props}>
        {this.props.children}
      </Element>
    )
  }
});

var ClearFix = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
  },
  getDefaultProps: function(){
    return {
      elementClass: "div",
      className: "clearfix"
    }
  },
  render: function(){
    return (
      <Element {...this.props} />
    )
  }
});

var Menu = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    }
  },
  render: function(){
    var items = this.state.data.map(function(item, i){
      var subItems = [];
      if ("items" in item) {
        subItems = (
          <ul>
          {
            item.items.map(function(subItem, j){
              return <li key={j}><a href={subItem.path}>{subItem.name}</a></li>
            })
          }
          </ul>
        )
      }
      return (<li key={i}><a href={item.path}>{item.name}</a>{subItems}</li>
      )
    })
    return(
      <ul>
        {items}
      </ul>
    )
  }
});

var Input = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string,
    styles: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    readOnly: React.PropTypes.bool,
  },
  getDefaultProps: function() {
    return {
      elementClass: "input",
      type: "text",
      styles: "form-control",
      disabled: false,
      readOnly: false,
    };
  },
  render: function(){
    var elProps = _.clone(this.props);
    elProps.className = elProps.styles;
    return (
      <Element {...elProps} >
        {elProps.children}
      </Element>
    )
  }
});

var TextInput = React.createClass({
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
        content = [
            <Input {...this.props} />
        ];
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

var EmailInput = React.createClass({
  propTypes: merge_options(TextInput.propTypes, {}),
  getDefaultProps: function() {
    return merge_options(TextInput.getDefaultProps(), {
      name: "email",
      placeholder: "Email",
      type: "email"
    });
  },
  render: function(){
    return (
      <TextInput {...this.props} />
    )
  }
});

var PasswordInput = React.createClass({
  propTypes: merge_options(TextInput.propTypes, {}),
  getDefaultProps: function() {
    return merge_options(TextInput.getDefaultProps(), {
      placeholder: 'Password',
      name: "password",
      type: "password"
    });
  },
  render: function(){
    return (
      <TextInput {...this.props} />
    )
  }
});

var FileInput = React.createClass({
  propTypes: merge_options(TextInput.propTypes, {}),
  getDefaultProps: function() {
    return merge_options(TextInput.getDefaultProps(), {
      placeholder: 'File',
      name: "file",
      type: "file",
      styles: ""
    });
  },
  render: function(){
    return (
      <TextInput {...this.props} />
    )
  }
});

var Form = React.createClass({
  propTypes: {
    type: React.PropTypes.string
  },
  getInitialState: function(){
    if (this.props.type && this.props.type == "horizontal") {
      this.props.children.forEach(function(obj){
        if (obj.props["labelStyles"] == "") {
          // obj.props["labelStyles"] = "col-sm-3 control-label";
        }
        if (obj.props["containerStyles"] == "") {
          // obj.props["containerStyles"] = "col-sm-9";
        }
      });
    }
    return {
    };
  },
  getDefaultProps: function() {
    return {
      elementClass: "form",
    };
  },
  render: function(){
    // console.log(this.props.children[0]);
    return (
      <Element {...this.props} className={this.props.styles}>
        {this.props.children}
      </Element>
    )
  }
});

var FormGroup = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "form-group"
    };
  },
  render: function(){
    return (
      <Element {...this.props}>
      {this.props.children}
      </Element>
    )
  }
});

var Label = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "label",
    };
  },
  propTypes: {
    for: React.PropTypes.string,
    styles: React.PropTypes.string,
  },
  render: function(){
    return (
      <Element {...this.props}>
        {this.props.children}
      </Element>
    )
  }
});

var Button = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "button",
      className: "btn"
    };
  },
  propTypes: {
    type: React.PropTypes.string,
    styles: React.PropTypes.string,
  },
  render: function(){
    return (
      <Element {...this.props}>
        {this.props.children}
      </Element>
    )
  }

});

var SubmitButton = React.createClass({
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

var CheckBox = React.createClass({
  propTypes: merge_options(Input.propTypes, {
    label: React.PropTypes.string,
  }),
  getDefaultProps: function() {
    return merge_options(Input.getDefaultProps(), {
      type: 'checkbox',
      styles: '',
    });
  },
  render: function(){
    return(
      <div className="checkbox">
        <label>
          <Input {...this.props} />{this.props.label}
        </label>
      </div>
    )
  }
});

var RadioButton = React.createClass({
  propTypes: merge_options(Input.propTypes, {
    label: React.PropTypes.string,
  }),
  getDefaultProps: function() {
    return merge_options(Input.getDefaultProps(), {
      styles: '',
      type: 'radio',
    });
  },
  render: function(){
    return (
      <div className="radio">
        <label>
          <Input {...this.props} />{this.props.label}
        </label>
      </div>
    )
  }
});

var InputGroup = React.createClass({
  render: function(){
    return(
      <Element className="input-group">
        {this.props.children}
      </Element>
    )
  }
});

var FormControlStatic = React.createClass({
  getDefaultProps: function() {
    return merge_options(Input.getDefaultProps(), {
      elementClass: 'p',
      className: 'form-control-static',
    });
  },
  render: function(){
    return(
      <Element {...this.props}>
        {this.props.children}
      </Element>
    )
  }
});

var FieldSet = React.createClass({
  getDefaultProps: function() {
    return merge_options(Input.getDefaultProps(), {
      elementClass: 'fieldset',
    });
  },
  render: function(){
    return(
      <Element {...this.props}>
        {this.props.children}
      </Element>
    )
  }
});

var InputGroupAddOn = React.createClass({
  getDefaultProps: function() {
    return merge_options(Input.getDefaultProps(), {
      elementClass: 'div',
      className: 'input-group-addon',
    });
  },
  render: function(){
    return(
      <Element {...this.props}>
        {this.props.children}
      </Element>
    )
  }
});

var TextArea = React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "textarea",
      removeProps: [
        "type"
      ],
      rows: 3
    }
  },
  render: function(){
    return(
      <Input {...this.props} />
    )
  }
});

var TextAreaInput = React.createClass({
  render: function(){
    return(
      <FormGroup>
        <Label for={this.props.id} styles={this.props.labelStyles}>{this.props.label}</Label>
        <TextArea {...this.props} />
      </FormGroup>
    )
  }
});

var Select = React.createClass({
  selectType: function(){
    // Single dimension array
    // Two dimensional array
    // Object with key value
    // Array with kv objects
  },
  render: function(){
    var options = this.props.options.map(function(item, i){
      return <option key={item+i}>{item}</option>;
    });
    return (
      <select name={this.props.name}>
        {options}
      </select>
    )
  }
});
