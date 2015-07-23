"use strict";

/**
 * This class builds the new Kanban.
 *
 * @author $Author$
 */
var Cicle = React.createClass({displayName: "Cicle",

    getInitialState: function () {
        return {}
    },
    onMouseDown : function (e) {
        this.props.onSelect(e);
    },
    onMouseUp: function(e) {
        this.props.onDeselect();
    },
    render: function() {
        return (
            React.createElement("svg", {onMouseDown: this.onMouseDown, onMouseUp: this.onMouseUp, width: this.props.radius * 2, height: this.props.radius * 2}, 
                React.createElement("circle", {cx: this.props.radius, cy: this.props.radius, r: this.props.radius, stroke: "green", fill: "yellow"})
            )
            );
    }
});
