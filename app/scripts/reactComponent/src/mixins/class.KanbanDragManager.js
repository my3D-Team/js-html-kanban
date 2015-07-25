"use strict";

var KanbanDragManager = {
    onSelectItem: function (e) {
        //Store the selectedNode
        this.state.selectedNode = e.currentTarget;
        var parent = this.state.selectedNode.parentNode;
        //get the initial position of the node
        var offsetLeft = this.state.selectedNode.offsetLeft;
        var offsetTop = this.state.selectedNode.offsetTop;

        //Change the mouse cursor
        this.state.selectedNode.className += " grabbing";

        //store the mouse offset on the node
        this.state.offsetX = e.clientX - offsetLeft;
        this.state.offsetY = e.clientY - offsetTop;
    },

    onMove: function (e) {
        if (this.state.selectedNode) {
            //Move Node
            //Todo : manage right and bot (idea : let see if we can not manage this with css and scrollbar
            if (e.clientY - this.state.offsetY < 50 ) {
                this.state.selectedNode.style.top = e.clientY  - this.state.offsetY + "px";
            }
            if (e.clientX - this.state.offsetX < 0 ) {
                this.state.selectedNode.style.left = e.clientX - this.state.offsetX + "px";
            }
        }
    },
    onDeselectItem: function (e) {
        if (this.state.selectedNode) {
            //Manage special element (ei.SVG)
            if (this.state.selectedNode.className.replace) {
                this.state.selectedNode.className = this.state.selectedNode.className.replace(" grabbing", "");
            }
        }
        this.state.selectedNode = null;
        this.state.offsetX = 0;
        this.state.offsetY = 0;

    }
}
