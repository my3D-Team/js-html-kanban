/**
 * Created by gadarras on 24/08/2015.
 */
"use strict";

var React = require('react');

// Stores
var ColAndRowStore = require('../../colAndRow/stores/ColAndRowStore');
var KanbanStore = require('../../kanban/stores/KanbanStore');

var Ghost = React.createClass({

    render: function () {

        var style = {
            left: this.props.x,
            top: this.props.y,
            height: this.props.height,
            width: this.props.width
        };

        return (
            <div style={style} className="sticky-helper"></div>
        );
    }

});

module.exports = Ghost;