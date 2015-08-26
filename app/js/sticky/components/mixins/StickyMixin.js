"use strict";

var StickyMixin = {

    _toggleEditMode: function (e) {
        this.state.selectedNode = e.currentTarget;

        this.state.isZoomed = this.state.isZoomed ? false : true;
        if (this.state.isZoomed) {
            //save position
            var position = {};
            position.top = this.state.selectedNode.style.top;
            position.left = this.state.selectedNode.style.left;
            position.width = this.state.selectedNode.style.width;
            position.height = this.state.selectedNode.style.height;
            this.state.unZoomedPosition = position;

            this.state.selectedNode.className += " zoomEffect";
            this.state.selectedNode.style.width = "700px";
            this.state.selectedNode.style.height = "500px";
            this.state.selectedNode.style.top = "100px";
            this.state.selectedNode.style.left = "400px";

            //remove the transition
            setTimeout(function () {
                this.state.selectedNode.className = this.state.selectedNode.className.replace("zoomEffect", "");
            }.bind(this), 1000);

        } else {
            this.state.selectedNode.className += " zoomEffect";

            //restore Position
            this.state.selectedNode.style.width = this.state.unZoomedPosition.width;
            this.state.selectedNode.style.height = this.state.unZoomedPosition.height;
            this.state.selectedNode.style.top = this.state.unZoomedPosition.top;
            this.state.selectedNode.style.left = this.state.unZoomedPosition.left;

            //remove the transition
            setTimeout(function () {
                this.state.selectedNode.className = this.state.selectedNode.className.replace("zoomEffect", "");
            }.bind(this), 1000);
        }
        e.stopPropagation();
    }


};

module.exports = StickyMixin;
