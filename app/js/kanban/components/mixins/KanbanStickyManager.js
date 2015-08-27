/**
 * Created by gadarras on 13/08/2015.
 */
"use strict";

var _ = require('lodash');
var StickyStore = require('../../../sticky/stores/StickyStore');
var EventHelper = require('../../../util/EventHelper');


var KanbanStickyManager = {
    _onMoveSticky: function (e) {
        var selectedNode = this.state.selectedNode;

        if (selectedNode.domNode) {
            var domNode = selectedNode.domNode;
            var mouseX = EventHelper.getAttr(e, "pageX");
            var mouseY = EventHelper.getAttr(e, "pageY");
            if (domNode.style.top === (mouseY / this.state.scale ) - selectedNode.offsetY + "px"
                || domNode.style.left !== (mouseX / this.state.scale ) - selectedNode.offsetX + "px") {

                var x = (mouseX / this.state.scale) - this.state.selectedNode.offsetX;
                var y = (mouseY / this.state.scale) - this.state.selectedNode.offsetY;
                //Move Node (no need to change the model for that event
                var position = {};
                position.x = x ;
                position.y = y ;
                // TODO PAS DE SETSTATE !
                selectedNode.node.setState({hasMove: true, position: position});
            }
            e.stopPropagation();
        }
    }


};

module.exports = KanbanStickyManager;