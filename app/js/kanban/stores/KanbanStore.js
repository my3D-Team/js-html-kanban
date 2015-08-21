"use strict";

var assign = require('object-assign');
var AppDispatcher = require('../../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var React = require('react');

var AppStore = require('../../app/stores/AppStore');

var KanbanConst = require('../constants/KanbanConst');
var StickyConst = require('../../sticky/constants/StickyConst');
var AppConst = require('../../app/constants/AppConst');



var selectedNode = {
    node: null,
    domNode: null,
    offsetX: 0,
    offsetY: 0
};

var kanban = {
    scale: 1
};

var backlog = false;

var _selectNode = function (e, node) {
    var mouseX = e.touches ? e.touches[0].pageX : e.pageX;
    var mouseY = e.touches ? e.touches[0].pageY : e.pageY;

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

    _setSelectedNode: function(node, domNode, offsetX, offsetY){
        selectedNode.node = node;
        selectedNode.domNode = domNode;
        selectedNode.offsetX = offsetX;
        selectedNode.offsetY = offsetY;
    },

    _setBacklog: function(isBacklog){
        backlog = isBacklog;
    },

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
    },

    isBacklog: function(){
        return backlog;
    },

    init: function(model){
        this._setSelectedNode(null, null, 0, 0);
        this._setBacklog(model.backlog);
    }
});

AppStore.addStore(KanbanStore);


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
        case AppConst.SCALE:
            kanban.scale =  action.scale;
            KanbanStore.emitChange(action.event);
    }
});

module.exports = KanbanStore;