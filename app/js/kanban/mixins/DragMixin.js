"use strict";

var DragMixin = {

    _onMove: function (e) {
        var selectedNode = this.state.selectedNode;
        if (selectedNode.domNode) {
            var domNode = selectedNode.domNode;
            var mouseX = e.touches ? e.touches[0].pageX : e.pageX;
            var mouseY = e.touches ? e.touches[0].pageY : e.pageY;
            if (domNode.style.top === (mouseY / this.state.scale ) - selectedNode.offsetY + "px"
                || domNode.style.left !== (mouseX / this.state.scale ) - selectedNode.offsetX + "px") {

                var x = (mouseX / this.state.scale) - this.state.selectedNode.offsetX;
                var y = (mouseY / this.state.scale) - this.state.selectedNode.offsetY;
                //Move Node
                //domNode.style.top = y + "px";
                //domNode.style.left = x + "px"
                this.state.selectedNode.node.setState({position:{x:x,y:y}});

                selectedNode.node.state.hasMove = true;
            }
            e.preventDefault();
        }
    }

};

module.exports = DragMixin;
