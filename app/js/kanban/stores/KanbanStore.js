"use strict";

var assign = require('object-assign');
var AppDispatcher = require('../../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var React = require('react');
var EventHelper = require('../../util/EventHelper')

var KanbanConst = require('../actions/KanbanConst');
var StickyConst = require('../../sticky/actions/StickyConst');

var selectedNode = {
    node: null,
    domNode: null,
    offsetX: 0,
    offsetY: 0
};

var kanban = {
    scale: 1
};

var backlog = true;

var _selectNode = function (e, node) {
    var mouseX = EventHelper.getAttr(e, "pageX");
    var mouseY = EventHelper.getAttr(e, "pageY");

    //get the initial position of the node
    var domNode = React.findDOMNode(node);

    var offsetLeft = domNode.offsetLeft;
    var offsetTop = domNode.offsetTop;

    //store the data
    selectedNode.node = node;
    selectedNode.domNode = domNode;
    selectedNode.offsetX = (mouseX / kanban.scale) - offsetLeft;
    selectedNode.offsetY = (mouseY / kanban.scale) - offsetTop;
};


var KanbanStore = assign({}, EventEmitter.prototype, {

    /**
     * Add a listener when something has changed in the kanban
     * @param callback
     */
    addChangeListener: function (callback) {
        this.on(KanbanConst.CHANGE, callback);
    },

    /**
     * Remove the change listener
     */
    removeChangeListener: function () {
        this.removeListener(KanbanConst.CHANGE);
    },

    /**
     * Emit the change for all listeners
     * @param e
     */
    emitChange: function (e) {
        this.emit(KanbanConst.CHANGE, e);
    },

    /**
     * Getter for the selected node
     * @returns {{node: null, domNode: null, offsetX: number, offsetY: number}}
     */
    getSelectedNode: function () {
        return selectedNode;
    },

    /**
     * Getter for the scale
     * @returns {number}
     */
    getScale: function () {
        return kanban.scale;
    },

    /**
     * Getter for the backlog
     * @returns {boolean}
     */
    isBacklog: function(){
        return backlog;
    },

    /**
     * Initialization of the store
     * @param model
     */
    init: function(model){
        _setSelectedNode(null, null, 0, 0);
        _setBacklog(model.backlog);
    }
});

/**
 * Private setter for the selected node
 * @param node
 * @param domNode
 * @param offsetX
 * @param offsetY
 * @private
 */
var _setSelectedNode = function(node, domNode, offsetX, offsetY){
    selectedNode.node = node;
    selectedNode.domNode = domNode;
    selectedNode.offsetX = offsetX;
    selectedNode.offsetY = offsetY;
};

/**
 * Private setter for backlog
 * @param isBacklog
 * @private
 */
var _setBacklog = function(isBacklog){
    backlog = isBacklog;
};


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

        case KanbanConst.SCALE:
            kanban.scale = action.scale;
            KanbanStore.emitChange(action.event);
            break;
        case KanbanConst.CHANGE_MODEL:
            KanbanStore.init(action.model);

            break;
    }
});

module.exports = KanbanStore;