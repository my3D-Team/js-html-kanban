"use strict";

var Scallable = {

    manageZoom: function (e) {
        this.refs.scallable.state.scale = e.currentTarget.value / 100;
        React.findDOMNode(this.refs.scallable).style.transform = "scale(" + this.refs.scallable.state.scale  + ", " + this.refs.scallable.state.scale  + ")";
    }
}
