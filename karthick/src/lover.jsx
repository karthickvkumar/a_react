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
      <select name={this.props.name} className="form-control">
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
        <img id="img" src="" className="img_120"/>
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






var Header = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "header",
      className: "main-header"
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
var Logo = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "a",
      className: "logo"
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

var Navbar = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "nav",
      className: "navbar navbar-static-top"
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

var SidebarToggle = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "a",
      className: "sidebar-toggle"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
    return (
      <Element {...this.props}>
      {this.props.children}
      <span className="sr-only">Toggle navigation</span>
      </Element>
    )
  }
});

var Aside = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    }
  },
  getDefaultProps: function() {
    return {
      elementClass: "aside",
      className: "main-sidebar"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
    return (
      <Element {...this.props}>
      {this.props.children}
      <section className="sidebar">
        <SidebarMenu data={sidebar_data}>
        </SidebarMenu>
      </section>
      </Element>
    )
  }
});

var SidebarMenu = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    }
  },
  getDefaultProps: function() {
    return {
      elementClass: "ul",
      className: "sidebar-menu"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
    var sidebar_data = this.state.data.map(function(sidebar_data, i){
      var sidebarSubName = _.result(_.findWhere(sidebar_data.sidebarList),'name');
      var sidebarSubHref = _.result(_.findWhere(sidebar_data.sidebarList),'anchorlink');
       if(i == 2){
      return (
      <li className="treeview" key={i}>
        <a href={sidebar_data.anchorlink}><i className="fa fa-link"></i>
          <span>{sidebar_data.name}</span>
          <i className="fa fa-angle-left pull-right"></i>
        </a>
        <TreeMenu data={sidebar_data.sidebarList}></TreeMenu>
      </li>
      );
     }
      return (
        <li key={i}>
          <a href={sidebar_data.anchorlink}>
            <i className="fa fa-link"></i>
            <span>{sidebar_data.name}</span>
          </a>
        </li>
      )
    })
    return (
      <Element {...this.props}>
      {this.props.children}
          {sidebar_data}
      </Element>
    )
  }
});

var TreeMenu = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    }
  },
  getDefaultProps: function() {
    return {
      elementClass: "ul",
      className: "treeview-menu"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
    var sidelist_data = this.props.data.map(function(sidelist_data, i){
      return (
        <li key={i}><a href={sidelist_data.anchorlink}>{sidelist_data.name}</a></li>
        )
    })
    return(
      <Element {...this.props}>
      {this.props.children}
      {sidelist_data}
      </Element>
    )
  }
});

var AdminAside = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    }
  },
  getDefaultProps: function() {
    return {
      elementClass: "aside",
      className: "main-sidebar"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
    return (
      <Element {...this.props}>
      {this.props.children}
      <section className="sidebar">
        <AdminSidebarMenu data={sidebarAdmin_data}>
        </AdminSidebarMenu>
      </section>
      </Element>
    )
  }
});
var AdminSidebarMenu = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    }
  },
  getDefaultProps: function() {
    return {
      elementClass: "ul",
      className: "sidebar-menu"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
    var classnames = ["fa fa-fw fa-users","fa fa-flag-o","fa fa-fw fa-street-view","fa fa-fw fa-bullhorn","fa fa-fw fa-filter","fa fa-fw fa-search","fa fa-fw fa-line-chart","fa fa-fw fa-facebook-official"]
    var Adminsidebar_data = this.state.data.map(function(Adminsidebar_data, i){
      return (
        <li key={i}>
          <a href={Adminsidebar_data.anchorlink}>
            <i className={classnames[i]}></i>
            <span> {Adminsidebar_data.name}</span>
          </a>
        </li>
      )
    })
    return (
      <Element {...this.props}>
      {this.props.children}
          {Adminsidebar_data}
      </Element>
    )
  }
});

var AdminNavs = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    }
  },
  getDefaultProps: function() {
    return {
      elementClass: "ul",
      className: "nav navbar-nav"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
    var classname = ["dropdown tasks-menu","dropdown user user-menu"]
    var nav_data = this.props.data.map(function(nav_data, i){
      var profileImg = _.result(_.findWhere(nav_data.profile),'img');
      var profileName = _.result(_.findWhere(nav_data.profile),'name');
     if(i == 1){
      return (
        <li className="dropdown user user-menu" key={i}>
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              <img src={nav_data.img} className="user-image" alt="User Image"></img>
              <span className="hidden-xs">{nav_data.name}</span>
            </a>
          <ul className="dropdown-menu">
            <li className="user-header">
              <img src={profileImg} className="img-circle" alt="User Image"/>
            </li>
            <li className="user-body">
              <div className="row">
                <div className="col-xs-4 text-center">

                  </div>
                  <div className="col-xs-4 text-center">
                  {profileName}
                </div>
                <div className="col-xs-4 text-center">

                </div>
              </div>
            </li>
            <li className="user-footer">
                <div className="pull-right">
                  <a href="#" className="btn btn-default btn-flat">Sign out</a>
                </div>
            </li>
          </ul>
        </li>
);
     }
      return (
        <li className={classname[i]} key={i}>
          <a href={nav_data.anchorlink} className="dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-flag-o"></i>
              <span className="label label-success">{nav_data.count}</span>
          </a>
          <ul className="dropdown-menu">
              <li>
                <ul className="menu">
                  <li><a href="#"><h3>task1</h3></a></li>
                  <li><a href="#"><h3>task2</h3></a></li>
                  <li><a href="#"><h3>task3</h3></a></li>
                  <li><a href="#"><h3>task4</h3></a></li>
                </ul>
              </li>
              <li className="footer">
                <a href="#">View all tasks</a>
              </li>
          </ul>
        </li>
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

var ContentWrapper = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "content-wrapper"
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
var ContentHeader = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "section",
      className: "content-header"
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
var Content = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "section",
      className: "content admin"
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
var ContentArea = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "section",
      className: "content_panels_area amin_area"
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
var ContentPanel = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "col-xs-12 admin_panel"
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
var BodyBox = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "box-body"
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
var FooterBox = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "box-footer"
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

var ImageView = React.createClass({
  render: function() {
    return (
        <img id="img"/>
    );
  },
});

var SearchRow = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "section",
      className: "search row"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
    return (
      <Element {...this.props}>
      {this.props.children}
      <form className="sidebar-form" method="get" action="#">
            <div className="input-group">
              <input type="text" placeholder="Search..." className="form-control" name="q"/>
              <span className="input-group-btn">
                <button className="btn btn-flat" id="search-btn" name="search" type="submit"><i className="fa fa-search"></i></button>
              </span>
            </div>
          </form>
      </Element>
    )
  }
});

var ContentWrappers = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    }
  },
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "content-wrapper"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
    var content_data = this.props.data.map(function(content_data, i){
      return (
      <div className="col-lg-3 col-md-6">
        <div className="panel panel-red">
          <div className="panel-heading">
            <div className="row">
              <img alt="User Image" className="user-image" src={content_data.img}/>
            </div>
          </div>
          <a href={content_data.anchorlink}>
            <div className="panel-footer">
              <span className="pull-left">View Details</span>
              <span className="pull-right">
              <i className="fa fa-arrow-circle-right"></i>
              </span>
                <div className="clearfix">
                </div>
            </div>
          </a>
        </div>
      </div>
      )
    })
    return(
      <Element {...this.props}>
      {this.props.children}
      <section className="content">
      <section className="content_panels_area">
      {content_data}
      </section>
      </section>
      </Element>
    )
  }
});
var UserBlock = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "div",
      className: "post clearfix"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
    var userblock_data = this.props.data.map(function(userblock_data, i){
      return (
        <div className="user-block fm_hori">
          <img className="img-circle img-bordered-sm" src={userblock_data.img} alt="User Image"/>
          <span className="casual"> Matching {userblock_data.intrestCount} interest for you</span>
          <span className="description">
            <a href={userblock_data.moreIntrestlink}>+ Add more interests</a></span>
          <span className="label label-warning">
            <a href={userblock_data.refineMatchlink}>Refine Matches</a>
          </span>
        </div>
      )
    })
    return (
      <Element {...this.props}>
      {this.props.children}
      {userblock_data}
      </Element>
    )
  }
});
var FindMatches = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    }
  },
  getDefaultProps: function() {
    return {
      elementClass: "section",
      className: "content_panels_area"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
    var findMatch_data = this.props.data.map(function(findMatch_data, i){
      return (
      <div className="col-lg-3 col-md-6">
        <div className="panel panel-red">
          <div className="panel-heading">
            <div className="row">
              <img alt="User Image" className="user-image" src={findMatch_data.img}/>
            </div>
          </div>
          <a href={findMatch_data.anchorlink}>
            <div className="panel-footer">
              <span className="pull-left">View Details</span>
              <span className="pull-right">
              <i className="fa fa-arrow-circle-right"></i>
              </span>
                <div className="clearfix">
                </div>
            </div>
          </a>
        </div>
      </div>
      )
    })
    return(
      <Element {...this.props}>
      {this.props.children}
      {findMatch_data}
      </Element>
    )
  }
});

var PostInfo = React.createClass({
        getDefaultProps: function() {
          return {
            elementClass: "section",
            className: "content profile_content",
          };
        },
        render:function() {
          return(
            <Element {...this.props}>
                {this.props.children}
            </Element>
          );
        }
      });

      var PostDate = React.createClass({
        render: function() {
          return(
            <span>{this.props.PostDate}</span>
          );
        }
      });

      var PostTime = React.createClass({
        render:function() {
          return(
            <span style={{marginLeft: 20}}><i className="fa fa-clock-o"></i> {this.props.PostTime}</span>
          );
        }
      });

      var PostImg = React.createClass({
        render:function() {
          return(
            <Element {...this.props}>
              <img alt="User Image" className="user-image_1" src={this.props.PostImage} />
            </Element>
          );
        }
      });

      var PostShare = React.createClass({
        render:function() {
          return(
            <div>
              <a className="link-black text-sm" href="#"><i className="fa fa-share margin-r-5"></i> {this.props.PostShare}</a>
            </div>
          );
        }
      });

      var PostLike = React.createClass({
        render:function() {
          return(
            <div>
              <a className="link-black text-sm" href="#"><i className="fa fa-thumbs-o-up margin-r-5"></i> {this.props.PostLike}</a>
            </div>
          );
        }
      });

      var CommentCount = React.createClass({
        render:function() {
          return(
            <div>
              <a className="link-black text-sm" href="#"><i className="fa fa-comments-o margin-r-5"></i> Comments ({this.props.commentnumber})</a>
            </div>
          );
        }
      });

      var PostComments = React.createClass({
        render:function() {
          var comment = this.props.data.map(function(comment){
            return(
              <div className="user-block fm_hori comments">
                <i className="fa fa-comments-o margin-r-5"></i>
              <span className="casual">{comment.UserName}</span>
              <p>{comment.UserComment}</p>
              </div>
            );
          })
          return(
            <div className="post_comment">
              {comment}
            </div>
          );
        }
      });

      var Posts = React.createClass({
       render: function() {
        var postdata = this.props.data.map(function (post) {
          return (
            <div id="profile_posts">
              <div className="post_date">
                <PostDate PostDate={post.PostDate} />
                <PostTime PostTime={post.PostTime} />
              </div>
              <PostImg PostImage={post.PostImage} />
              <ul className="list-inline">
                <li><PostShare PostShare={post.PostShare} /></li>
                <li><PostLike PostLike={post.PostLike} /></li>
                <li className="pull-right">
                  <CommentCount commentnumber={post.commentnumber} />
                </li>
              </ul>
              <PostComments data={post.Comments} />
            </div>
          );
        });
          return (
             <PostInfo>{postdata}</PostInfo>
          );
        }
      });

      var UserInfo = React.createClass({
      getDefaultProps: function() {
        return {
          elementClass: "section",
          className: "content",
        };
      },
      render:function() {
        return(
          <Element {...this.props}>
              {this.props.children}
          </Element>
        );
      }
    });

    var UserImg = React.createClass({
      render:function() {
        return(
          <img alt="User Image" className="img-circle img-bordered-sm" src={this.props.UserImage} />
        );
      }
    });

    var UserName = React.createClass({
        render:function() {
          return(
            <a href="#">{this.props.UserName}</a>
          );
        }
    });

    var UserCount = React.createClass({
      render:function() {
        return (
          <span className="label label-danger">{this.props.Count}</span>
        );
      }
    });

    var PostDuration = React.createClass({
      render:function() {
        return(
          <span className="description">
          {this.props.Time} - {this.props.Days}
          </span>
        );
      }
    });

    var UsersPost = React.createClass({
      render:function() {
        return(
          <p>{this.props.Post}</p>
        );
      }
    });

    var UsersList = React.createClass({
      render: function() {
        var userdata = this.props.data.map(function (user) {
          return (
            <div className="post clearfix">
              <div className="user-block">
                <UserImg UserImage={user.UserImage} />
                <span className="username">
                  <UserName UserName={user.UserName} />
                  <a data-toggle="dropdown" className="dropdown-toggle" href="#"><UserCount Count={user.Count} /></a>
                </span>
                <PostDuration Time={user.Time} Days={user.Days} />
              </div>
              <UsersPost Post={user.Post} />
            </div>
          );
        });
        return (
          <div className="content-wrapper">
            <UserInfo>{userdata}</UserInfo>
          </div>
        );
      }
    });

var UserSearch = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "form",
      className: "sidebar-form"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
    return (
      <Element {...this.props} method="get" action="#">
      {this.props.children}
      <div className="input-group">
        <TextInput placeholder="Search..." />
        <span className="input-group-btn">
          <button className="btn btn-flat" id="search-btn" name="search" type="submit"><i class="fa fa-search"></i></button>
        </span>
      </div>
      </Element>
    )
  }
});

var UserAside = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    }
  },
  getDefaultProps: function() {
    return {
      elementClass: "aside",
      className: "main-sidebar"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
    return (
      <Element {...this.props}>
      {this.props.children}
      <section className="sidebar">
        <UserSidebarMenu data={sidebarUser_data}>
        </UserSidebarMenu>
      </section>
      </Element>
    )
  }
});
var UserSidebarMenu = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    }
  },
  getDefaultProps: function() {
    return {
      elementClass: "ul",
      className: "sidebar-menu"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
    var classnames = ["fa fa-link","fa fa-link","fa fa-link","fa fa-link","fa fa-link","fa fa-link"]
    var Usersidebar_data = this.state.data.map(function(Usersidebar_data, i){
      return (
        <li key={i}>
          <a href={Usersidebar_data.anchorlink}>
            <i className={classnames[i]}></i>
            <span> {Usersidebar_data.name}</span>
          </a>
        </li>
      )
    })
    return (
      <Element {...this.props}>
      {this.props.children}
          {Usersidebar_data}
      </Element>
    )
  }
});

var Navs = React.createClass({
  getDefaultProps: function() {
    return {
      elementClass: "ul",
      className: "nav navbar-nav"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
    return(
      <Element {...this.props}>
      {this.props.children}
      <li className="dropdown messages-menu user user-menu">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
          <img src="img/avatar5.png" className="user-image" alt="User Image" />
            <span className="hidden-xs">Messages</span>
        </a>
      </li>
      <li className="dropdown notifications-menu user user-menu">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
          <img src="img/avatar5.png" className="user-image" alt="User Image"/>
            <span className="hidden-xs">Find Matches</span>
        </a>
      </li>
      <li className="dropdown tasks-menu user user-menu">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
          <img src="img/avatar5.png" className="user-image" alt="User Image" />
            <span className="hidden-xs">Feeds</span>
        </a>
      </li>
      <NavUserProfile data={profile_data}  />
      </Element>
    )
  }
});


var NavUserProfile = React.createClass({
  getInitialState: function() {
    return {
      data: this.props.data
    }
  },
  getDefaultProps: function() {
    return {
      elementClass: "li",
      className: "dropdown user user-menu"
    };
  },
  propTypes: {
    styles: React.PropTypes.string,
  },
  render: function(){
    var profile_data = this.state.data.map(function(profile_data, i){
      return (
        <li key={i} className="user-header">
          <img src={profile_data.img} className="img-circle" alt="User Image" />
          <p>
            {profile_data.name} - {profile_data.role}
            <small>Member since {profile_data.joinedDate}</small>
          </p>
        </li>
      )
    })
    return(
      <Element {...this.props}>
      {this.props.children}
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
          <img src="img/avatar5.png" className="user-image" alt="User Image"/>
          <span className="hidden-xs">My Profiles</span>
        </a>
        <ul className="dropdown-menu">
          {profile_data}
          <li className="user-body">
            <div className="row">
              <div className="col-xs-4 text-center">
                <a href="#">Followers</a>
              </div>
              <div className="col-xs-4 text-center">
                <a href="#">Sales</a>
              </div>
              <div className="col-xs-4 text-center">
               <a href="#">Friends</a>
              </div>
            </div>
          </li>
          <li className="user-footer">
            <div className="pull-left">
              <a href="#" className="btn btn-default btn-flat">Profile</a>
              </div>
              <div className="pull-right">
              <a href="#" className="btn btn-default btn-flat">Sign out</a>
            </div>
          </li>
        </ul>
      </Element>
    )
  }
});