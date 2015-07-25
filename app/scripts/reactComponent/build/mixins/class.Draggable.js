"use strict";

var Draggable = {
    onMouseDown : function (e) {
        this.props.dragBoard.onSelectItem(e);
    },
    onMouseUp: function(e) {
        this.props.dragBoard.onDeselectItem(e);
    }
}
