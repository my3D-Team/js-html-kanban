"use strict";

var StickyDragManager = {
    onSelectItem: function (e) {
        //Store the selectedNode
        this.state.selectedNode = e.currentTarget;
        var parent = this.state.selectedNode.parentNode;
        //get the initial position of the node
        var offsetLeft = this.state.selectedNode.offsetLeft;
        var offsetTop = this.state.selectedNode.offsetTop;

        //Put the node in the foreground
        parent.removeChild(this.state.selectedNode);
        parent.appendChild(this.state.selectedNode);

        //Change the mouse cursor
        this.state.selectedNode.className += " grabbing rotate";

        //store the mouse offset on the node
        this.state.offsetX = (e.clientX / this.state.scale )- offsetLeft;
        this.state.offsetY = (e.clientY / this.state.scale ) - offsetTop;
    },

    onMove: function (e) {
        if (this.state.selectedNode &&
            ( this.state.selectedNode.style.top = (e.clientY / this.state.scale ) - this.state.offsetY + "px"
                || this.state.selectedNode.style.left !== (e.clientX / this.state.scale )- this.state.offsetX + "px" )) {
            //Move Node
            this.state.selectedNode.style.top = (e.clientY / this.state.scale ) - this.state.offsetY + "px";
            this.state.selectedNode.style.left = (e.clientX / this.state.scale ) - this.state.offsetX + "px";
            e.stopPropagation();
        }
    },

    onDeselectItem: function (e) {
        //Manage special element (ei.SVG)
        if (this.state.selectedNode.className.replace) {
            this.state.selectedNode.className = this.state.selectedNode.className.replace("grabbing rotate", "");
        }

        this.state.selectedNode = null;
        this.state.offsetX = 0;
        this.state.offsetY = 0;
//        e.stopPropagation();
    }

}
