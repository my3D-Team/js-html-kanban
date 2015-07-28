"use strict";

var StickyDragManager = {
    onSelectItem: function (e) {
        var mouseX = e.touches ? e.touches[0].clientX : e.clientX;
        var mouseY = e.touches ? e.touches[0].clientY : e.clientY;
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
        this.state.selectedNode.className += " grabbing";

        //store the mouse offset on the node
        this.state.offsetX = (mouseX / this.state.scale ) - offsetLeft;
        this.state.offsetY = (mouseY / this.state.scale ) - offsetTop;
        console.log("toto");
    },

    onMove: function (e) {
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
    },

    onDeselectItem: function (e) {
        //Manage special element (ei.SVG)
        if (this.state.selectedNode && this.state.selectedNode.className.replace) {
            this.state.selectedNode.className = this.state.selectedNode.className.replace("grabbing", "");
        }

        this.state.selectedNode = null;
        this.state.offsetX = 0;
        this.state.offsetY = 0;
//        e.stopPropagation();
    }

}
