/**
 * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
 * @param obj1
 * @param obj2
 * @returns obj3 a new object based on obj1 and obj2
 */
function merge_options(obj1, obj2) {
    var obj3 = {};
    for (var attrname in obj1) {
        obj3[attrname] = obj1[attrname];
    }
    for (var attrname in obj2) {
        obj3[attrname] = obj2[attrname];
    }
    return obj3;
}

var colSizes = {};

var columnSizes = function() {
    var sizes = ["xs", "sm", "md", "lg"];

    _.each(sizes, function(o) {
        colSizes['show-' + o] = 'visible-' + o + '-block';
        colSizes['hide-' + o] = 'hidden-' + o;
    });
    _.each(sizes, function(o) {
        _.each(['block', 'inline', 'inline-block'], function(o1) {
            colSizes['show-' + o + '-' + o1] = 'visible-' + o + '-' + o1;
        });
    });
    _.each(sizes, function(o) {
        _.range(1, 13).forEach(function(o1) {
            colSizes[o + '-pull-' + o1] = 'col-' + o + '-pull-' + o1;
            colSizes[o + '-push-' + o1] = 'col-' + o + '-push-' + o1;
            colSizes[o + '-' + o1] = 'col-' + o + '-' + o1;
            colSizes[o + 'o-' + o1] = 'col-' + o + '-offset-' + o1;
        });
    });
}
columnSizes();


var getColSizes = function(props) {
    var ary = _.map(_.keys(props), function(a) {
        return colSizes[a];
    });
    var strClass = _.compact(ary).join(" ");
    if (props.className) {
        strClass = props.className + " " + strClass;
    }
    return strClass;
}

var btnClasses = {};
var ButtonStyles = function() {
    var styles = ["success", "danger", "info", "warning", "default", "primary"];
        _.each(styles, function(o) {
        btnClasses[o] = 'btn-' + o;
    });
}
ButtonStyles();
var getbtnClasses = function(props) {
    var ary = _.map(_.keys(props), function(a) {
        return btnClasses[a];
    });
    var strClass = _.compact(ary).join(" ");
    if (props.className) {
        strClass = props.className + " " + strClass;
    }
    return strClass;
}


var alertClasses = {};
var AlertStyles = function() {
    var styles = ["success", "danger", "info", "warning"];
    _.each(styles, function(o) {
        alertClasses[o] = 'alert-' + o;
    });
}
AlertStyles();
var getalertClasses = function(props) {
    var ary = _.map(_.keys(props), function(a) {
        return alertClasses[a];
    });
    var strClass = _.compact(ary).join(" ");
    if (props.className) {
        strClass = props.className + " " + strClass;
    }
    return strClass;
}


var btngroupsizing = {};
var ButtonGroupSizes = function() {
    var sizes = ["lg", "md", "sm", "xs"];
    _.each(sizes, function(o) {
        btngroupsizing[o] = 'btn-group-' + o;
    });
}
ButtonGroupSizes();
var getbtngroupsizing = function(props) {
    var ary = _.map(_.keys(props), function(a) {
        return btngroupsizing[a];
    });
    var strClass = _.compact(ary).join(" ");
    if (props.className) {
        strClass = props.className + " " + strClass;
    }
    return strClass;
}


var btnsizing = {};
var ButtonSizes = function() {
    var sizes = ["lg", "md", "sm", "xs"];
    _.each(sizes, function(o) {
        btnsizing[o] = 'btn-' + o;
    });
}
ButtonSizes();
var getbtnsizing = function(props) {
    var ary = _.map(_.keys(props), function(a) {
        return btnsizing[a];
    });
    var strClass = _.compact(ary).join(" ");
    if (props.className) {
        strClass = props.className + " " + strClass;
    }
    return strClass;
}

var role ={};
var ItemStatus = function() {
    var status = ["active", "disabled"];
    _.each(status, function(o) {
        role[o] =  o;
    });
}
ItemStatus();
var getstatus = function(props) {
    var ary = _.map(_.keys(props), function(a) {
        return role[a];
    });
    var strClass = _.compact(ary).join(" ");
    if (props.className) {
        strClass = props.className + " " + strClass;
    }
    return strClass;
}


var listGroupClasses = {};
var ListGroupStyles = function() {
    var styles = ["success", "danger", "info", "warning"];
    _.each(styles, function(o) {
        listGroupClasses[o] = 'list-group-item-' + o;
    });
}
ListGroupStyles();
var getlistGroupClasses = function(props) {
    var ary = _.map(_.keys(props), function(a) {
        return listGroupClasses[a];
    });
    var strClass = _.compact(ary).join(" ");
    if (props.className) {
        strClass = props.className + " " + strClass;
    }
    return strClass;
}


var wellsizing = {};
var WellSizes = function() {
    var sizes = ["lg", "sm"];
    _.each(sizes, function(o) {
        wellsizing[o] = 'well-' + o;
    });
}
WellSizes();
var getwellsizing = function(props) {
    var ary = _.map(_.keys(props), function(a) {
        return wellsizing[a];
    });
    var strClass = _.compact(ary).join(" ");
    if (props.className) {
        strClass = props.className + " " + strClass;
    }
    return strClass;
}

var mediaAlign = {};
var MediaPosition = function() {
    var position = ["right", "left", "middle"];
    _.each(position, function(o) {
        mediaAlign[o] = 'media-' + o;
    });
}
MediaPosition();
var getmediaAlign = function(props) {
    var ary = _.map(_.keys(props), function(a) {
        return mediaAlign[a];
    });
    var strClass = _.compact(ary).join(" ");
    if (props.className) {
        strClass = props.className + " " + strClass;
    }
    return strClass;
}

var panelClasses = {};
var PanelStyles = function() {
    var styles = ["default","primary", "success", "info", "warning", "danger"];
        _.each(styles, function(o) {
        panelClasses[o] = 'panel-' + o;
    });
}
PanelStyles();
var getpanelClass = function(props) {
    var ary = _.map(_.keys(props), function(a) {
        return panelClasses[a];
    });
    var strClass = _.compact(ary).join(" ");
    if (props.className) {
        strClass = props.className + " " + strClass;
    }
    return strClass;
}

var paginationsizing = {};
var PaginationSizes = function() {
    var sizes = ["lg", "md", "sm", "xs"];
    _.each(sizes, function(o) {
        paginationsizing[o] = 'pagination-' + o;
    });
}
PaginationSizes();
var getpaginationsizing = function(props) {
    var ary = _.map(_.keys(props), function(a) {
        return paginationsizing[a];
    });
    var strClass = _.compact(ary).join(" ");
    if (props.className) {
        strClass = props.className + " " + strClass;
    }
    return strClass;
}

var tableClasses = {};
var TableStyles = function() {
    var styles = ["striped", "bordered", "hover", "responsive", "condensed"];
        _.each(styles, function(o) {
        tableClasses[o] = 'table-' + o;
    });
}
TableStyles();
var gettableClass = function(props) {
    var ary = _.map(_.keys(props), function(a) {
        return tableClasses[a];
    });
    var strClass = _.compact(ary).join(" ");
    if (props.className) {
        strClass = props.className + " " + strClass;
    }
    return strClass;
}

