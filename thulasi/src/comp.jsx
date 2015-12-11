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
    var elProps = _.omit(_.clone(this.props), this.props.removeProps);
    var ElementClass = elProps.elementClass;
    elProps.className = getbtnClasses(elProps);
    elProps.className = getbtnsizing(elProps);
    return(
      <ElementClass {...elProps}>
        {elProps.children}
      </ElementClass>
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


var Dropdown = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "dropdown",
    };
  },
  propTypes: {
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

var ButtonToggle = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "button",
      className: "btn dropdown-toggle",
    };
  },
  render: function(){
    return (
      <Button {...this.props} data-toggle="dropdown">
        {this.props.children}
        <span className="caret"></span>
      </Button>
    )
  }
});

var DropdownMenu = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "ul",
      className: "dropdown-menu",
    };
  },
  getInitialState: function(){
    return {
      data: this.props.data
    }
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
    var lists = [];
    var data = this.state.data;
    for(key in data) {
      if(typeof key === "string") {
       lists.push(<li key={key} className="dropdown-header">{key}</li>);
      }
      if(typeof data[key] === "object") {
        for(key2 in data[key]) {
          lists.push(<li key={data[key][key2]}><a href="#">{key2}</a></li>);
        }
      }
    }
    return (
      <Element {...this.props}>
        {this.props.children}
        {lists}
      </Element>
    )
  }
});

var Divider = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "li",
      className: "divider",
      role: "separator",
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

var Disabled = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "li",
      className: "disabled",
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

var Dropdownnew = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "button",
      className: "btn dropdown-toggle",
    };
  },
  getInitialState: function(){
    return {
      data: this.props.data
    }
  },
  render: function(){
    var lists = [];
    var data = this.state.data;
    for(key in data) {
      if(typeof key === "string") {
       lists.push(<li key={key} className="dropdown-header">{key}</li>);
      }
      if(typeof data[key] === "object") {
        for(key2 in data[key]) {
          lists.push(<li key={data[key][key2]}><a href="#">{key2}</a></li>);
        }
      }
    }
    return (
      <div className="dropdown">
        <Button {...this.props} data-toggle="dropdown">
          {this.props.children}
          <span className="caret"></span>
        </Button>
        <ul className="dropdown-menu">
          {lists}
        </ul>
      </div>
    )
  }
});

var DropdownArray = React.createClass({
  propTypes: merge_options(Button.propTypes, {
  }),
  getDefaultProps: function() {
    return {
      elementClass: "button",
      className: "btn dropdown-toggle",
    };
  },
  getInitialState: function(){
    return {
      data: this.props.data
    }
  },
  render: function(){
    var lists = this.state.data.map(function(item, i) {
      return <li key={i}><a href="#">{item}</a></li>;
    });
    return (
      <div className="dropdown">
        <Button {...this.props} data-toggle="dropdown">
          {this.props.children}
          <span className="caret"></span>
        </Button>
        <ul className="dropdown-menu">
          {lists}
        </ul>
      </div>
    )
  }
});

var ButtonGroup = React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "div",
      className: "btn-group",
    };
  },
  render: function(){
    var elProps = _.omit(_.clone(this.props), this.props.removeProps);
    var ElementClass = elProps.elementClass;
    elProps.className = getbtngroupsizing(elProps);
    return(
      <ElementClass {...elProps}>
        {elProps.children}
      </ElementClass>
    )
  }
});

var SingleButtonDropDown = React.createClass({
  propTypes: merge_options(Button.propTypes, {
  }),
  getDefaultProps: function() {
    return {
      elementClass: "button",
      className: " btn dropdown-toggle",
    };
  },
  getInitialState: function(){
    return {
      data: this.props.data
    }
  },
  render: function(){
    var lists = this.state.data.map(function(item, i) {
      return <li key={i}><a href="#">{item}</a></li>;
    });
    return(
      <ButtonGroup >
        <Button {...this.props} data-toggle="dropdown">
          {this.props.children}
          <span className="caret"></span>
        </Button>
        <ul className="dropdown-menu">
          {lists}
        </ul>
      </ButtonGroup>
    )
  }
});

var SplitButtonDropdown = React.createClass({
  propTypes: merge_options(Button.propTypes, {
  }),
  getDefaultProps: function() {
    return {
      elementClass: "button",
      className: "btn dropdown-toggle",
    };
  },
  getInitialState: function(){
    return {
      data: this.props.data
    }
  },
  render: function(){
    var lists = this.state.data.map(function(item, i) {
      return <li key={i}><a href="#">{item}</a></li>;
    });
    return(
      <ButtonGroup>
        <Button {...this.props}>
          {this.props.children}
        </Button>
        <Button {...this.props} data-toggle="dropdown">
          <span className="caret"></span>
        </Button>
        <ul className="dropdown-menu">
          {lists}
        </ul>
      </ButtonGroup>
    )
  }
});

var ButtonToolbar = React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "div",
      className: "btn-toolbar",
      role: "toolbar",
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

var ListGroup = React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "div",
      className: "list-group",
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

var ListGroupItem = React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "li",
      className: "list-group-item",
    };
  },
  render: function(){
    var elProps = _.omit(_.clone(this.props), this.props.removeProps);
    var ElementClass = elProps.elementClass;
    elProps.className = getstatus(elProps);
    elProps.className = getlistGroupClasses(elProps);
    return(
      <ElementClass {...elProps}>
        {elProps.children}
      </ElementClass>
    )
  }
});

var Badge = React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "span",
      className: "badge",
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

var LinkListGroupItem = React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "a",
      className: "list-group-item",
    };
  },
  render: function(){
    var elProps = _.omit(_.clone(this.props), this.props.removeProps);
    var ElementClass = elProps.elementClass;
    elProps.className = getstatus(elProps);
    elProps.className = getlistGroupClasses(elProps);
    return(
      <ElementClass {...elProps}>
        {elProps.children}
      </ElementClass>
    )
  }
});

var ListGroupItemHeader = React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "h4",
      className: "list-group-item-heading",
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

var ListGroupItemText = React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "p",
      className: "list-group-item-text",
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

var Well = React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "div",
      className: "well",
    };
  },
  render: function(){
    var elProps = _.omit(_.clone(this.props), this.props.removeProps);
    var ElementClass = elProps.elementClass;
    elProps.className = getwellsizing(elProps);
    return(
      <ElementClass {...elProps}>
        {elProps.children}
      </ElementClass>
    )
  }
});

var ToolTip = React.createClass({
  propTypes: merge_options(Button.propTypes, {
  }),
  componentDidMount: function(){
    $('[data-toggle="tooltip"]').tooltip()
  },
  getDefaultProps: function(){
    return {
      elementClass: "button",
      className: "btn",
    };
  },
  render: function(){
    var elProps = _.omit(_.clone(this.props), this.props.removeProps);
    var ElementClass = elProps.elementClass;
    elProps.className = getbtnClasses(elProps);
    elProps.className = getbtnsizing(elProps);
    return(
      <ElementClass {...elProps} data-toggle="tooltip">
        {elProps.children}
      </ElementClass>
    )
  }
});

var Collapse = React.createClass({
  propTypes: merge_options(Button.propTypes, {
  }),
  getDefaultProps: function(){
    return {
      elementClass: "button",
      className: "btn",
    };
  },
  render: function(){
    var elProps = _.omit(_.clone(this.props), this.props.removeProps);
    var ElementClass = elProps.elementClass;
    elProps.className = getbtnClasses(elProps);
    elProps.className = getbtnsizing(elProps);
    return(
      <ElementClass {...elProps} data-toggle="collapse">
        {elProps.children}
      </ElementClass>
    )
  }
});

var Panel = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "panel"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){var elProps = _.omit(_.clone(this.props), this.props.removeProps);
    var ElementClass = elProps.elementClass;
    elProps.className = getpanelClass(elProps);
    return (
      <ElementClass {...elProps}>
      {this.props.children}
      </ElementClass>
    )
  }
});

var PanelHeading = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "panel-heading"
    };
  },
  propTypes: {
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

var PanelBody = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "panel-body"
    };
  },
  propTypes: {
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

var PanelGroup = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "panel-group"
    };
  },
  propTypes: {
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

var Table = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "table",
      className: "table"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
    var elProps = _.omit(_.clone(this.props), this.props.removeProps);
    var ElementClass = elProps.elementClass;
    elProps.className = gettableClass(elProps);
    return (
      <ElementClass {...elProps}>
      {this.props.children}
      </ElementClass>
    )
  }
});

var THead = React.createClass({
  render: function(){
    var thead_data = this.props.thead_data.map(function(item, i){
      return <th key={item+i}>{item}</th>;
    });
    return (
    <thead>
      <tr>
        {thead_data}
      </tr>
    </thead>
    )
  }
});

var TBody = React.createClass({
  render: function(){
    var tbody = [];
    this.props.tbody_data.map(function(obj, i) {
    var cols = [];
    for (key in obj){
      cols.push(<td>{obj[key]}</td>);
    }
      tbody.push(<tr>{cols}</tr>);
    });
    return (
      <tbody>{tbody}</tbody>
    );
  }
});

var Pagination = React.createClass({
  getInitialState: function() {
    return {
      data: {
        "total_number": 500,
        "perPage": 50,
        "current_page": 10
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
      var total_pages = this.state.data.total_number / this.state.data.perPage;
    }
    var items = [];
    if(this.state.data.current_page == 1){
      items.push(<li key="prev" className="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>)
    }else{
      items.push(<li key="previous" ><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>)
    }
    for(var count = 1; count <= total_pages; count++) {
      if(this.state.data.current_page == count) {
        items.push(<li key="list" className="active"><a href="#">{count}</a></li>);
      }
      items.push(<li key={count}><a href="#">{count}</a></li>);
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

var PerPage = React.createClass({
  render: function() {
    return <div>
      <label id="pageSize">Page Size:</label>
      <select id="pageSize" value={this.props.pageSize} onChange={this.props.handlePageSizeChange}>
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="7">7</option>
        <option value="10">10</option>
      </select>
    </div>
  }
});


var DataTable = React.createClass({
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
    for(var key in obj){
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
        <table className="table table-bordered">
          <thead><tr>{thead_data}</tr></thead>
          <tbody>{tbody}</tbody>
        </table>
        {pager(page)}
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

var SearchBox = React.createClass({
  doSearch:function(){
    var query=this.refs.searchInput.getDOMNode().value;
    this.props.doSearch(query);
  },
  render:function(){
    return (
      <input type="text" ref="searchInput" placeholder="Search" value={this.props.query} onChange={this.doSearch}/>
    )
  }
});