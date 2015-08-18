"use strict";

var React = require('react');

var Scalable = {

    manageZoom: function (e) {
        this.refs.scalable.state.scale = e.currentTarget.value / 100;
        React.findDOMNode(this.refs.scalable).style.transform = "scale(" + this.refs.scalable.state.scale  + ", " + this.refs.scalable.state.scale  + ")";
    }
};

module.exports = Scalable;