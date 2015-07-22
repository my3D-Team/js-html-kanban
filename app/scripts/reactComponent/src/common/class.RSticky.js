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
        this.state.current = e.currentTarget;
        this.props.onSelect(e);
    },
    onMouseUp: function() {
        this.state.current = null;
        this.props.onDeselect();
    },

    render: function() {
        return (
            <div className="sticky" onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} > </div>
            );
    }
});
