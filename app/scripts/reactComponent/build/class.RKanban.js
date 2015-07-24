"use strict";

/**
 * This class builds the new Kanban.
 *
 * @author $Author$
 */
var Kanban = React.createClass({displayName: "Kanban",

    mixins : [Draggable],
    getInitialState: function () {
        return {}
    },
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("div", {className: "kanban", onMouseUp: this.onMouseUp, onMouseMove: this.onMove}, 
                    React.createElement(Sticky, {className: "warn", onSelect: this.onSelectItem, onDeselect: this.onDeselectItem}), 
                    React.createElement(Sticky, {className: "info", onSelect: this.onSelectItem, onDeselect: this.onDeselectItem}), 
                    React.createElement(Sticky, {className: "default", onSelect: this.onSelectItem, onDeselect: this.onDeselectItem}), 
                    React.createElement(Sticky, {className: "danger", onSelect: this.onSelectItem, onDeselect: this.onDeselectItem}), 
                    React.createElement(Sticky, {className: "success", onSelect: this.onSelectItem, onDeselect: this.onDeselectItem}), 
                    React.createElement(Cicle, {radius: "200", onSelect: this.onSelectItem, onDeselect: this.onDeselectItem})
                )
            )
            );
    }
});
