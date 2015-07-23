"use strict";

/**
 * This class builds the new Kanban.
 *
 * @author $Author$
 */
var Kanban = React.createClass({
    getInitialState: function () {
        return {}
    },
    onSelectItem : function (e){
        //Store the selectedNode
        this.state.selectedNode = e.currentTarget;
        //get the initial position of the node
        var offsetLeft = this.state.selectedNode.offsetLeft;
        var offsetTop = this.state.selectedNode.offsetTop;

        //Put the node in the foreground
        var parent = this.state.selectedNode.parentNode;
        parent.removeChild(this.state.selectedNode);
        parent.appendChild(this.state.selectedNode);

        //store the mouse offset on the node
        this.state.offsetX = e.clientX - offsetLeft;
        this.state.offsetY = e.clientY - offsetTop;
    },

    onMove: function (e) {
        if(this.state.selectedNode) {
            //Move Node
            this.state.selectedNode.style.top = e.clientY - this.state.offsetY + "px";
            this.state.selectedNode.style.left = e.clientX - this.state.offsetX + "px";
        }
    },

    onDeselectItem: function () {
        this.state.selectedNode = null;
        this.state.offsetX = 0;
        this.state.offsetY = 0;
    },

    render: function() {
        return (
            <div >
                <div className="kanban" onMouseMove={this.onMove} >
                    <Sticky className="warn" onSelect={this.onSelectItem} onDeselect={this.onDeselectItem}></Sticky>
                    <Sticky className="info" onSelect={this.onSelectItem} onDeselect={this.onDeselectItem}></Sticky>
                    <Sticky className="default" onSelect={this.onSelectItem} onDeselect={this.onDeselectItem}></Sticky>
                    <Sticky className="danger" onSelect={this.onSelectItem} onDeselect={this.onDeselectItem}></Sticky>
                    <Sticky className="success" onSelect={this.onSelectItem} onDeselect={this.onDeselectItem}></Sticky>
                </div>
            </div>
            );
    }
});
