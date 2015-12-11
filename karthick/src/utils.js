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
colSizes["badge"] = "badge";
colSizes["right"] = "pull-right";
colSizes["center"] = "text-center";
colSizes["lg"] = "embed-responsive-16by9";
colSizes["sm"] = "embed-responsive-4by3";
colSizes["inverse"] = "navbar-inverse";
colSizes["static"] = "navbar-static-top";
colSizes["bottom"] = "navbar-fixed-bottom";
colSizes["top"] = "navbar-fixed-top";
colSizes["navbar-link"] = "navbar-link";
colSizes["navbar-right"] = "navbar-right";
colSizes["navbar-text"] = "navbar-text";
colSizes["navbar-btn"] = "navbar-btn";
colSizes["form-left"] = "navbar-form navbar-left";
colSizes["navbar"] = "navbar-nav";
colSizes["justified"] = "nav-justified";
colSizes["pills"] = "nav-pills";
colSizes["tabs"] = "nav-tabs";
colSizes["active"] = "active";

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
    var styles = ["success", "danger", "info", "warning", "default","primary"];
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
var btnAction = {};
var ButtonAction = function() {
    var styles = ["close"];
        _.each(styles, function(o) {
        btnAction[o] = '' + o;
    });
}
ButtonAction();
var getbtnAction = function(props) {
    var ary = _.map(_.keys(props), function(a) {
        return btnAction[a];
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

var progressClasses = {};
var ProgressStyles = function() {
    var styles = ["primary", "success", "info", "warning", "danger"];
        _.each(styles, function(o) {
        progressClasses[o] = 'progress-bar-' + o;
    });
}
ProgressStyles();
var getprogressClass = function(props) {
    var ary = _.map(_.keys(props), function(a) {
        return progressClasses[a];
    });
    var strClass = _.compact(ary).join(" ");
    if (props.className) {
        strClass = props.className + " " + strClass;
    }
    return strClass;
}
var progressBar = {};
var ProgressBarStyles = function() {
    var styles = ["striped"];
        _.each(styles, function(o) {
        progressBar[o] = 'progress-bar-' + o;
    });
}
ProgressBarStyles();
var getprogressBar = function(props) {
    var ary = _.map(_.keys(props), function(a) {
        return progressBar[a];
    });
    var strClass = _.compact(ary).join(" ");
    if (props.className) {
        strClass = props.className + " " + strClass;
    }
    return strClass;
}

var progressBarActive = {};
var ProgressActive = function() {
    var styles = ["active"];
        _.each(styles, function(o) {
        progressBarActive[o] = '' + o;
    });
}
ProgressActive();
var getprogressActive = function(props) {
    var ary = _.map(_.keys(props), function(a) {
        return progressBarActive[a];
    });
    var strClass = _.compact(ary).join(" ");
    if (props.className) {
        strClass = props.className + " " + strClass;
    }
    return strClass;
}

var SrOnly = {};
var SrOnlyActive = function() {
    var styles = ["sr-only"];
        _.each(styles, function(o) {
        SrOnly[o] = '' + o;
    });
}
SrOnlyActive();
var getSrOnly = function(props) {
    var ary = _.map(_.keys(props), function(a) {
        return SrOnly[a];
    });
    var strClass = _.compact(ary).join(" ");
    if (props.className) {
        strClass = props.className + " " + strClass;
    }
    return strClass;
}

var ModelSize = {};
var ModelSizeRange = function() {
    var styles = ["sm","lg"];
        _.each(styles, function(o) {
        ModelSize[o] = 'modal-' + o;
    });
}
ModelSizeRange();
var getModelSize = function(props) {
    var ary = _.map(_.keys(props), function(a) {
        return ModelSize[a];
    });
    var strClass = _.compact(ary).join(" ");
    if (props.className) {
        strClass = props.className + " " + strClass;
    }
    return strClass;
}

var embedRatio = {};
var embedStyle = function() {
    var styles = ["16by9","4by3"];
        _.each(styles, function(o) {
        embedRatio[o] = 'embed-responsive-' + o;
    });
}
embedStyle();
var getembedStyle = function(props) {
    var ary = _.map(_.keys(props), function(a) {
        return embedRatio[a];
    });
    var strClass = _.compact(ary).join(" ");
    if (props.className) {
        strClass = props.className + " " + strClass;
    }
    return strClass;
}

var imageRatio = {};
var imageStyle = function() {
    var styles = ["responsive","rounded","circle","thumbnail"];
        _.each(styles, function(o) {
        imageRatio[o] = 'img-' + o;
    });
}
imageStyle();
var getimageStyle = function(props) {
    var ary = _.map(_.keys(props), function(a) {
        return imageRatio[a];
    });
    var strClass = _.compact(ary).join(" ");
    if (props.className) {
        strClass = props.className + " " + strClass;
    }
    return strClass;
}

var structure = [
    { name:"username",id: "1", type:"text" },
    { name:"male",id: "2", type:"radio"},
    { name:"email",id: "3", type:"email"},
    { name:"submit",id: "4", type:"button"}
];
var forText = _.findWhere(structure, {type: 'text'});
    if(forText.type == "text"){

            }
