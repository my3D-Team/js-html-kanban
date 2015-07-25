"use strict"

/**
 * This class builds the react Application.
 *
 * @author $Author$
 */

var App = React.createClass({displayName: "App",
    mixins:[Scallable, KanbanDragManager],

    getInitialState : function () {
        return {};
    },

    render: function() {
        return (
            React.createElement("div", {onMouseMove: this.onMove}, 
                React.createElement(Header, null), 
                React.createElement(Kanban, {ref: "scallable", dragBoard: this}), 

                React.createElement("input", {className: "zoom", type: "range", min: "100", max: "200", defaultValue: "100", onChange: this.manageZoom, step: "10"})

            )
            );
    }
});
