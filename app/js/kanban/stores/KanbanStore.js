"use strict";

var assign = require('object-assign');
var AppDispatcher = require('../../dispatcher/AppDispatcher');
var KanbanConst = require('../constants/KanbanConst');
var AppStore = require('../../app/store/AppStore');

var EventEmitter = require('events').EventEmitter;

var KanbanStore = assign({}, EventEmitter.prototype, {

    title: "",
    selectedNode: null,

    getTitle: function(){
        return this.title;
    },

    getSelectedNode: function(){
        return this.selectedNode;
    },

    init: function(){
    }

});

AppStore.addStore(KanbanStore);


// Register callback to handle all updates
AppDispatcher.register(function (action) {

    switch (action.actionType) {
        default:
        // no op
    }
});

module.exports = KanbanStore;