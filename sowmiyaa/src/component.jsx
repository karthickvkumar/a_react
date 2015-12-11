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
    );
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
    return(
        <ElementClass {...elProps}>
          {elProps.children}
        </ElementClass>
    )
  }
});

var Alert = React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "div",
      className: "alert",
      hasDismiss: false
    };
  },
  propTypes: {
    hasDismiss: React.PropTypes.bool,
  },
  render: function(){
    var elProps = _.omit(_.clone(this.props), this.props.removeProps);
    var ElementClass = elProps.elementClass;
    elProps.className = getalertClasses(elProps);
    var dismiss = "";
      if(this.props.hasDismiss){
          alert += " alert-dismissible";
          dismiss = (
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
           );
        }
    return(
        <ElementClass {...elProps}>
          {dismiss}{elProps.children}
        </ElementClass>
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

var ButtonToolbar = React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "div",
      className: "btn-toolbar",
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

var Pagination = React.createClass({
  getInitialState: function() {
    return {
      data: {
      "total_number": 500,
      "per_page": 50,
      "current_page": 8
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
        var total_pages = this.state.data.total_number / this.state.data.per_page;
    }
    var items = [];
      if(this.state.data.current_page == 1){
        items.push(<li key="prev" className="disabled"><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>)

      }else{
        items.push(<li key="previous" ><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>)
      }
      for(var count = 1; count <= total_pages; count++) {
        if(this.state.data.current_page == count) {
            items.push(<li key={count} className="active"><a href="#">{count}</a></li>);
        }else{
        items.push(<li key={count}><a href="#">{count}</a></li>);
      }
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

var Pager = React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "ul",
      className: "pager",
    };
  },
  render: function() {
    return (
        <Element {...this.props}>
          {this.props.children}
        </Element>
    );
  }
});

var Breadcrumb = React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "ol",
      className: "breadcrumb",
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


var Thumbnail = React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "div",
      className: "thumbnail",
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

var Caption = React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "div",
      className: "caption",
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

var Tabs = React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "ul",
      className: "nav nav-tabs",
    };
  },
  render: function(){
    return (
      <Element {...this.props} data-toggle="tab">
        {this.props.children}
      </Element>
    )
  }
});

var Media = React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "div",
      className: "media",
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

var MediaList = React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "ul",
      className: "media-list",
    };
  },
  render: function(){
    var elProps = _.omit(_.clone(this.props), this.props.removeProps);
    var ElementClass = elProps.elementClass;
    elProps.className = getmediaAlign(elProps);
    return(
      <ElementClass {...elProps}>
        {elProps.children}
      </ElementClass>
    )
  }
});


var MediaBody = React.createClass({
  getDefaultProps: function(){
    return {
      elementClass: "div",
      className: "media-body",
    };
  },
  render: function(){
    var elProps = _.omit(_.clone(this.props), this.props.removeProps);
    var ElementClass = elProps.elementClass;
    elProps.className = getmediaAlign(elProps);
    return(
      <ElementClass {...elProps}>
        {elProps.children}
      </ElementClass>
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

var Autocomplete = React.createClass({
  getDefaultProps: function(){
    return {
      limitToList: true,
      maxItemsShown: 5,
      defaultList: [
        { value: 1, label: 'javascript' },
        { value: 2, label: 'bootstrap' },
        { value: 3, label: 'jquery' },
        { value: 4, label: 'meteor JS' } ,
        { value: 5, label: 'go Lang' } ,
        { value: 6, label: 'css' } ,
        { value:'html' },
        { label:'java' }
      ],
      alsoSearchValues: false,
      loadUrlOnce: true,
      selectAllTextOnClick: true,
      onNoMatch: function(){}
    };
  },
  getInitialState: function(){
    return {
      list: this._loadList(this.props.defaultList),
      highlightedValue: this.props.defaultValue,
      showItems: false
    };
  },
  _loadList: function(listToLoad){
    if (!listToLoad || listToLoad.length === 0){
      this.setState({ list: [] });
    }

    var newList = listToLoad;
    console.log(listToLoad);
    newList.forEach(function(item){
      console.log(item);
      if (!item.hasOwnProperty('label')){
        item.label = item.value;
      }
      if (!item.hasOwnProperty('value')){
        item.value = item.label;
      }
    });
    return newList;
  },
  render: function(){
    return <div>
      <input ref='input' onChange={this._onChange} onFocus={this._onFocus} onBlur={this._onBlur}
      onClick={this._onInputClick} />
      <br/>
      {this.state.showItems?
         <ol style={{position: 'absolute', width:180, border: '1px solid #c8c8c8', backgroundColor:'white', color:'black', listStyle: 'none', padding: 0, margin: 0}}
            onMouseLeave={this._onMouseLeave}>
           {this._renderMatches()}
         </ol>:
         null}
    </div>;
  },
  _renderMatches: function(){
    return this._currentMatches().map(function(item, i){
        return <AutocompleteItem highlighted={item.value === this.state.highlightedValue}
          key={i} label={item.label} value={item.value}
          onItemClick={this._onItemClick}
          onItemMouseOver = {this._onItemMouseOver} />
      }.bind(this));
  },
  _currentMatches: function(){
    return _(this.state.list)
      .filter(function(item){
        return item.label.indexOf(this._input().toLowerCase()) > -1;
      }.bind(this))
      .value();
  },
  _highlightedIndex: function(){
    return _(this._currentMatches())
      .findIndex(function(item){
        return item.value === this.state.highlightedValue;
      }, this);
  },
  _updateHighlightedValue: function(){
    var newValue;
    if (this._highlightedIndex() < 0){
      newValue = this.state.list[0].value;
    } else {
      newValue = this.state.list[this._.highlightedIndex()];
    }
    this.setState({ highlightedValue: newValue });
  },
  componentDidMount: function(){
    this._setInputFromValue();

    document.onkeydown = function(e){
      switch (e.keyCode){
        case 13:
          this._setInputFromValue();
          break;
        case 9:
          this._setFromHighlighted();
          break;
        case 27:
          break;
        case 38:
          var hIndex = this._highlightedIndex();
          if (hIndex > 0){
            this.setState({
              highlightedValue: this._currentMatches()[hIndex - 1].value
            });
          }
          break;
        case 40:
          var hIndex = this._highlightedIndex();
          if (hIndex < this._currentMatches().length - 1){
            this.setState({
              highlightedValue: this._currentMatches()[hIndex + 1].value
            });
          }
          break;
      }
    }.bind(this);
  },
  _setInputFromValue: function(){
    if (!this.isMounted()){
      return;
    }
    this.refs.input.getDOMNode().value = _(this.state.list)
    .findWhere({ value: this.state.currentValue })
      .label;
  },
  _setValueFromInput: function(){
    if (!this.isMounted()){
      return;
    }

    var inputText = this.refs.input.getDOMNode().value;
    var foundItem = _(this.state.list)
      .find(function(item){
        return item.label.indexOf(inputText) > -1;
      });

    if (typeof foundItem !== 'undefined'){
      this.setState({
        currentValue: foundItem.value, highlightedValue: foundItem.value
      });
    } else {
      this.props.onNoMatch(this.state);
      if (this.props.limitToList){
        this.setState({
          currentValue: this.props.defaultValue, highlightedValue: this.props.defaultValue
        });
      }
    }
  },
  _setFromHighlighted: function(){
    this.setState({
      currentValue: this.state.highlightedValue
    }, function(){
      this._setInputFromValue();
    }.bind(this));
  },
  _input: function(){
    if (!this.isMounted()){
      return '';
    }

    return this.refs.input.getDOMNode().value;
  },
  _onChange: function(){
    this._setValueFromInput();
  },
  _onFocus: function(){
    this.setState({ showItems: true });
  },
  _onBlur: function(){
    this._setFromHighlighted();
    this.setState({ showItems: false });
  },
  _onItemClick: function(item){
    this.setState({
      currentValue: item.value
    }, function(){
      this._setInputFromValue();
    }.bind(this));
  },
  _onItemMouseOver: function(item){
    this.setState({ highlightedValue: item.value });
  },
  _onMouseLeave: function(item){
    this.setState({ highlightedValue: this.state.currentValue });
  },
  _onInputClick: function(){
    this.refs.input.getDOMNode().select();
  }
});

var AutocompleteItem = React.createClass({
  getDefaultProps: function(){
    return {
      value: null, label: null,
      onItemClick: function(){}, onItemMouseOver: function(){}, onItemMouseLeave: function(){}
    };
  },
  getInitialState: function(){
    return { hover: false };
  },
  render: function(){
    return <li
      style={{padding:'5px', backgroundColor: this.props.highlighted? 'hsl(0, 0%, 90%)':'', zIndex: 9999}}
      onMouseDown={this._onClick} onMouseOver={this._onMouseOver}>{this.props.label}
    </li>;
  },
  _onClick: function(){
    if (this.props.selectAllTextOnClick){
      this.props.onItemClick(this.props);
    }
  },
  _onMouseOver: function(){
    this.props.onItemMouseOver(this.props);
  }
});

