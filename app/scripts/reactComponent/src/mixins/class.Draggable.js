var Draggable = {
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
        this.state.selectedNode.style.cursor = '-webkit-grabbing';
        this.state.selectedNode.className += " animate";

        //store the mouse offset on the node
        this.state.offsetX = e.clientX - offsetLeft;
        this.state.offsetY = e.clientY - offsetTop;
    },

    onMove: function (e) {
        if (this.state.selectedNode) {
            //Move Node
            this.state.selectedNode.style.top = e.clientY - this.state.offsetY + "px";
            this.state.selectedNode.style.left = e.clientX - this.state.offsetX + "px";
        }
    },

    onDeselectItem: function () {
        //Change the mouse cursor
        this.state.selectedNode.style.cursor = '-webkit-grab';
        //Manage special element (ei.SVG)
        if (this.state.selectedNode.className.replace) {
            this.state.selectedNode.className = this.state.selectedNode.className.replace("animate", "");
        }

        this.state.selectedNode = null;
        this.state.offsetX = 0;
        this.state.offsetY = 0;
    },

    onMouseUp: function () {
        if (this.state.selectedNode) {
            this.state.selectedNode.className = this.state.selectedNode.className.replace("animate", "");
            this.onDeselectItem();
        }
    }
}
