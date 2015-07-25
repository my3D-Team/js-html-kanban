"use strict";

/**
 * This class manage a StickyNote component
 *
 * @author $Author$
 */
var Sticky = React.createClass({
    mixins: [Draggable],
    getInitialState : function () {
        return {offsetX:0, offsetY:0};
    },
    render: function() {
        var css = {
            top: this.props.y,
            left: this.props.x
        }
        return (
            <div className={this.props.className + " sticky"}  style={css} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} > </div>
            );
    }
});
