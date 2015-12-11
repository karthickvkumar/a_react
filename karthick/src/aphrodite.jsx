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
    elProps.className = getbtnAction(elProps);
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
    this.props.tbody_data.map(function(obj) {
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

var Modal = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "modal fade"
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

var ModalDialog = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "modal-dialog modal-content"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){var elProps = _.omit(_.clone(this.props), this.props.removeProps);
    var ElementClass = elProps.elementClass;
    elProps.className = getModelSize(elProps);
    return (
      <ElementClass {...elProps}>
      {this.props.children}
      </ElementClass>
    )
  }
});

var ModalHeader = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "modal-header"
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
var ModalTitle = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "h4",
      className: "modal-title"
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
var ModalBody = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "modal-body"
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
var ModalFooter = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "modal-footer"
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
var Progress = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "progress"
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
var ProgressBar = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "progress-bar"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
    var elProps = _.omit(_.clone(this.props), this.props.removeProps);
    var ElementClass = elProps.elementClass;
    elProps.className = getprogressClass(elProps);
    elProps.className = getprogressBar(elProps);
    elProps.className = getprogressActive(elProps);
    return (
      <ElementClass {...elProps}>
      {this.props.children}
      </ElementClass>
    )
  }
});
var Span = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "span",
      className: ""
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
    var elProps = _.omit(_.clone(this.props), this.props.removeProps);
    var ElementClass = elProps.elementClass;
    elProps.className = getSrOnly(elProps);
    return (
      <ElementClass {...elProps}>
      {this.props.children}
      </ElementClass>
    )
  }
});

var Navs = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    }
  },
  getDefaultProps: function() {
    return {
      elementClass: "ul",
      className: "nav"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
    var nav_data = this.state.data.map(function(nav_data, i){
      return (<li className={nav_data.value} key={i}><a href={nav_data.path}><img src={nav_data.img} className="user-image"></img>{nav_data.name}</a></li>
      )
    })
    return(
      <Element {...this.props}>
      {this.props.children}
      {nav_data}
      </Element>
    )
  }
});

var Navbar = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "nav",
      className: "navbar navbar-default"
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
var NavbarHeader = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "navbar-header"
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
var NavbarBrand = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "a",
      className: "navbar-brand"
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
var NavLink = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "a",
      className: "navbar-link"
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
var BadgeNavs = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    }
  },
  getDefaultProps: function() {
    return {
      elementClass: "ul",
      className: "nav"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
    var nav_data = this.state.data.map(function(nav_data, i){
      return (<li className={nav_data.value} key={i}><a href={nav_data.path}>{nav_data.name}<Span className={nav_data.badge}>{nav_data.b_value}</Span></a></li>
      )
    })
    return(
      <Element {...this.props}>
      {this.props.children}
      {nav_data}
      </Element>
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
var PanelFooter = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "panel-footer"
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
var ListGroup = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "ul",
      className: "list-group"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
 render: function(){
    var list_data = this.props.list_data.map(function(list, i){
      return <li className="list-group-item" key={list+i}>{list}</li>;
    });
    return (
      <div>
        {list_data}
      </div>
    )
  }
});
var Embed = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "embed-responsive"
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
var IFrame = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "iframe",
      className: "embed-responsive-item"
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

var PopOver = React.createClass({
  componentDidMount: function() {
    $('[data-toggle="popover"]').popover();
  },
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
    return(
      <ElementClass {...elProps}>
        {elProps.children}
      </ElementClass>
    )
  }
});
var Scrollspy = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "container"
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

var Img = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "img",
      className: ""
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
  var elProps = _.omit(_.clone(this.props), this.props.removeProps);
    var ElementClass = elProps.elementClass;
    elProps.className = getimageStyle(elProps);
    return(
      <ElementClass {...elProps}>
        {elProps.children}
      </ElementClass>
    )
  }
});





var Carousel = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "carousel slide"
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

var CarouselList = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    }
  },
  getDefaultProps: function() {
    return {
      elementClass: "ol",
      className: "carousel-indicators"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
     var c_data = this.state.data.map(function(c_data, i){
      return (<li data-target="#myCarousel" key={i}  data-slide-to={c_data.count}></li>
      )
    })
    return (
      <Element {...this.props}>
      {this.props.children}
      {c_data}
      </Element>
    )
  }
});

var CarouselSlide = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "carousel-inner"
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


var CarouselItem = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "item"
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

var CarouselImage = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    }
  },
  getDefaultProps: function() {
    return {
      elementClass: "img",
      className: ""
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
     var c_data = this.state.data.map(function(c_data, i){
      return (<img key={i} src={c_data.src} />
      )
    })
    return (
      <Element {...this.props}>
      {this.props.children}
      {c_data}
      </Element>
    )
  }
});

var CarouselControl_Left = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
    return (
      <Element {...this.props}>
      {this.props.children}
      <a className="carousel-control left" href="#myCarousel"  data-slide="prev">
      <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      </a>
      </Element>
    )
  }
});
var CarouselControl_Right = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
    return (
      <Element {...this.props}>
      {this.props.children}
      <a className="carousel-control right" href="#myCarousel" data-slide="next">
      <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      </a>
      </Element>
    )
  }
});

var HasMany = React.createClass({
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
      <p><button className = "btn btn-primary btn-xs" onClick={this.addCostItem}>Add Item</button></p>
      </tbody>
        );
      }
    });

var CostItem = React.createClass({
    getInitialState: function(){
      return {
          data: this.props.data
        }
    },
    handleDelete: function(e){
      e.preventDefault();
      this.props.delFunction(this.props.k);
    },
    render: function(){
    var colType = this.props.data.map(function(colType, i){
    if(colType.type == "text" && colType.option !="disabled" && colType.option !="readonly"&& colType.option !="hidden"){
      return(<td key={i}><input type={colType.type} /></td>);
    }
    if(colType.type == "text" && colType.option == "disabled"){
      return(<td key={i}><input type={colType.type} disabled /></td>);
    }
    if(colType.type == "text" && colType.option == "readonly"){
      return(<td key={i}><input type={colType.type} value="Read" readonly/></td>);
    }
    if(colType.type == "text" && colType.option == "hidden"){
      return(<td key={i}><input type={colType.type} hidden/></td>);
    }
    if(colType.type == "radio" && colType.option != "checked" && colType.option !="hidden"){
      return(<td key={i}><input type={colType.type} name={colType.option} /></td>);
    }
    if(colType.type == "radio" && colType.option == "checked"){
      return(<td key={i}><input type={colType.type} name={colType.option} checked/></td>);
    }
    if(colType.type == "radio" && colType.option == "hidden"){
      return(<td key={i}><input type={colType.type} hidden/></td>);
    }
    if(colType.type == "select"){
    var sub_array = [];
      for(i=0;i<colType.option.length;i++){
        sub_array.push(colType.option[i]);
          return(<td key={i}><select><option>{sub_array[i]}</option></select></td>);
      }
    }
    if(colType.type == "button" && colType.option != "hidden"){
      return(<td key={i}><input type={colType.type} value={colType.option}/></td>);
    }
    if(colType.type == "button" && colType.option == "hidden"){
      return(<td key={i}><input type={colType.type} value={colType.option} hidden /></td>);
    }
    if(colType.type == "checkbox" && colType.option != "checked" && colType.option != "hidden"){
      return(<td key={i}><input type={colType.type} name={colType.option} /></td>);
    }
    if(colType.type == "checkbox" && colType.option == "checked"){
      return(<td key={i}><input type={colType.type} name={colType.option} checked/></td>);
    }
    if(colType.type == "checkbox" && colType.option == "hidden"){
      return(<td key={i}><input type={colType.type} name={colType.option} hidden/></td>);
    }
    if(colType.type == "span"){
      return(<td key={i}><span>{colType.option}</span></td>);
    }
    if(colType.type == "file"){
      return(<td key={i}><input type={colType.type} name={colType.option} /></td>);
    }
    })
      return (
            <tr>
            {colType}
             <td><button type="button"  onClick={this.handleDelete}>Delete</button></td>
              </tr>
        );
      }
    });
var SelectOption = React.createClass({
 getInitialState: function(){
      return {
          data: this.props.data
        }
    },
  render: function() {
    console.log(data);
      var menuNodes = [];
      for (var key in this.props.data) {
      menuNodes.push(<OptionItem key={key} text={key}
            value={this.props.data[key]}  />);
      }
      return (
        <div>
        {menuNodes}
        </div>
      );
  }
});
var OptionItem = React.createClass({
  render: function() {
      return (
        <option value={this.props.value} ref={this.props.ref} >{this.props.text}</option>
      );
  }
});

var FilePreview = React.createClass({
  getInitialState: function() {
    return {
      data_uri: null,
    };
  },
  handleSubmit: function(e) {
    e.preventDefault();
  },
  handleFile: function(e) {
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

var ImageView = React.createClass({
  render: function() {
    return (
        <img id="img"  />
    );
  },
});

var DateRange = React.createClass({
componentDidMount: function() {
var dom = $(this.getDOMNode()).find('.dateRangePicker')[0];
if(dom) {
  $(dom).dateRangePicker({
        autoClose: true,
        singleDate : false,
        showShortcuts: false
      });
    }
  },
  render: function() {
    return (
      <div className="form-group">
        <input className="form-control dateRangePicker"/>
      </div>
    );
  }
});

var AutoComplete = React.createClass({
componentDidMount: function() {
var data = [
   "ActionScript",
   "Boostrap",
   "C",
   "C++"
];
var dom = $(this.getDOMNode()).find('.autocomplete')[0];
if(dom) {
  $(dom).autocomplete({
    source: data
      });
    }
  },
  render: function() {
    return (
      <div className="form-group">
        <input className="form-control autocomplete"/>
      </div>
    );
  }
});

var MulitpleImage = React.createClass({
componentDidMount: function() {
  $(document).ready(function() {
 if(window.File && window.FileList && window.FileReader) {
 $("#files").on("change",function(e) {
 var files = e.target.files ,
 filesLength = files.length ;
 for (var i = 0; i < filesLength ; i++) {
 var f = files[i]
 var fileReader = new FileReader();
 fileReader.onload = (function(e) {
 var file = e.target;
 $("<img></img>",{
 class : "imageThumb",
 src : e.target.result,
 title : file.name
 }).insertAfter("#img");
 });
 fileReader.readAsDataURL(f);
 }
});
 } else { alert("Your browser doesn't support to File API") }
});
 },
  render: function() {
    return (
      <div>
      <input type="file" id="files" name="files[]" multiple />
      <ImageView></ImageView>
       </div>

    );
  }
});
