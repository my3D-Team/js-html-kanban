"use strict";

/**
 * This class builds the react Application.
 *
 * @author $Author$
 */
var Kanban = React.createClass({

    getInitialState : function () {
        return {};
    },

    onSelect : function (e){
        this.state.selectedNode = e.currentTarget;
        var mouseX = this.state.selectedNode.offsetLeft;
        var mouseY = this.state.selectedNode.offsetTop;

        var parent = this.state.selectedNode.parentNode;
        parent.removeChild(this.state.selectedNode);
        parent.appendChild(this.state.selectedNode);
        this.state.offsetX = e.clientX - mouseX;
        this.state.offsetY = e.clientY - mouseY;

    },
    onMove: function (e) {
        if(this.state.selectedNode) {
            this.state.selectedNode.style.top = e.clientY - this.state.offsetY + "px";
            this.state.selectedNode.style.left = e.clientX - this.state.offsetX + "px";
        }
    },
    onDeselect: function () {
        this.state.selectedNode = null;
        this.state.offsetX = 0;
        this.state.offsetY = 0;
    },

    render: function() {
        return (
            <div >
                <div className="kanban" onMouseMove={this.onMove} >
                    <Sticky ></Sticky>
                    <Sticky ></Sticky>
                    <Sticky onSelect={this.onSelect} onDeselect={this.onDeselect}></Sticky>
                </div>
            </div>
            );
    }
});
