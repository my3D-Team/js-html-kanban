"use strict";

/**
 * This class manage a StickyNote component
 *
 * @author $Author$
 */
var Sticky = React.createClass({displayName: "Sticky",
    getInitialState : function () {
        return {offsetX:0, offsetY:0};
    },
    onMouseDown : function (e) {
        this.props.onSelect(e);
    },
    onMouseUp: function(e) {
        this.props.onDeselect();
    },
    render: function() {
        return (
            React.createElement("div", {className: this.props.className + " sticky", onDrop: this.onDrop, onMouseDown: this.onMouseDown, onMouseUp: this.onMouseUp}, " ")
            );
    }
});
