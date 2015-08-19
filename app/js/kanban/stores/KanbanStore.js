"use strict";

var assign = require('object-assign');
var AppDispatcher = require('../../dispatcher/AppDispatcher');
var KanbanConst = require('../constants/KanbanConst');
var AppStore = require('../../app/store/AppStore');
var StickyConst = require('../../sticky/constants/StickyConst');

var EventEmitter = require('events').EventEmitter;
var React = require('react');

var selectedNode = {
    node: null,
    offsetX: 0,
    offsetY: 0
}

var kanban = {
    scale: AppStore.getScale()
}

var _selectNode = function (e, node) {
    var mouseX = e.touches ? e.touches[0].clientX : e.clientX;
    var mouseY = e.touches ? e.touches[0].clientY : e.clientY;

    //get the initial position of the node
    var domNode = React.findDOMNode(node);

    var offsetLeft = domNode.offsetLeft;
    var offsetTop = domNode.offsetTop;

    //store the data
    selectedNode.node = node;
    selectedNode.domNode = domNode;
    selectedNode.offsetX = (mouseX / kanban.scale ) - offsetLeft;
    selectedNode.offsetY = (mouseY / kanban.scale ) - offsetTop;
}


var KanbanStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function (callback) {
        this.on(KanbanConst.CHANGE, callback);
    },
    /**
     * @param {function} callback
     */
    removeChangeListener: function () {
        this.removeListener(KanbanConst.CHANGE);
    },

    emitChange: function (e) {
        this.emit(KanbanConst.CHANGE, e);
    },

    getSelectedNode: function () {
        return selectedNode;
    },

    getScale: function () {
        return kanban.scale;
    }
});


// Register callback to handle all updates
AppDispatcher.register(function (action) {

    switch (action.actionType) {
        case StickyConst.SELECT:
            _selectNode(action.event, action.node);
            KanbanStore.emitChange(action.event);
            break;

        case StickyConst.DESELECT:
            selectedNode.node = null;
            selectedNode.domNode = null;
            KanbanStore.emitChange(action.event);
            break;
    }
});

module.exports = KanbanStore;