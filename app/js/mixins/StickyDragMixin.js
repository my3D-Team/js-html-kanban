"use strict";

var StickyDragManager = {
    _onSelectItem: function (e) {
        var mouseX = e.touches ? e.touches[0].clientX : e.clientX;
        var mouseY = e.touches ? e.touches[0].clientY : e.clientY;
        //Store the selectedNode
        this.state.selectedNode = e.currentTarget;
        //get the initial position of the node
        var offsetLeft = this.state.selectedNode.offsetLeft;
        var offsetTop = this.state.selectedNode.offsetTop;
        this.state.selectedNode.style.zIndex = 2;
        //Change the mouse cursor
        this.state.selectedNode.className += " grabbing";

        //store the mouse offset on the node
        this.state.offsetX = (mouseX / this.state.scale ) - offsetLeft;
        this.state.offsetY = (mouseY / this.state.scale ) - offsetTop;
    },
    _onDeselectItem: function (e) {
        //Manage special element (ei.SVG)
        if (this.state.selectedNode && this.state.selectedNode.className.replace) {
            this.state.selectedNode.className = this.state.selectedNode.className.replace("grabbing", "");
        }
        this.state.selectedNode.style.zIndex = 1;


        this.state.selectedNode = null;
        this.state.offsetX = 0;
        this.state.offsetY = 0;
    },

    _onMove: function (e) {
        if (this.state.selectedNode) {
            var mouseX = e.touches ? e.touches[0].clientX : e.clientX;
            var mouseY = e.touches ? e.touches[0].clientY : e.clientY;
            if (this.state.selectedNode.style.top = (mouseY / this.state.scale ) - this.state.offsetY + "px"
                || this.state.selectedNode.style.left !== (mouseX / this.state.scale ) - this.state.offsetX + "px") {
                //Move Node
                this.state.selectedNode.style.top = (mouseY / this.state.scale ) - this.state.offsetY + "px";
                this.state.selectedNode.style.left = (mouseX / this.state.scale ) - this.state.offsetX + "px";
            }
            e.preventDefault()
        }
    }

}

module.exports = StickyDragManager;
