"use strict";

/**
 * This class manage a StickyNote component
 *
 * @author $Author$
 */
var Sticky = React.createClass({
    getInitialState : function () {
        return {offsetX:0, offsetY:0};
    },
    onMouseDown : function (e) {
        //Change the mouse cursor
        e.currentTarget.style.cursor = '-webkit-grabbing';
        e.currentTarget.className += " animate";
        this.props.onSelect(e);
    },
    onMouseUp: function(e) {
        //Change the mouse cursor
        e.currentTarget.style.cursor = '-webkit-grab';
        e.currentTarget.className = e.currentTarget.className.replace("animate", "");

        this.props.onDeselect();
    },
    render: function() {
        return (
            <div className={this.props.className + " sticky"}  onDrop={this.onDrop} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} > </div>
            );
    }
});
