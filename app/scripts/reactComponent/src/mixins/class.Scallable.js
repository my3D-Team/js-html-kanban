"use strict";

var Scallable = {

    manageZoom: function (e) {
        var scale = e.currentTarget.value / 100;
        React.findDOMNode(this.refs.scallable).style.transform = "scale(" + scale + ", " + scale + ")";
    }
}
