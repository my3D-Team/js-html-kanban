"use strict";

var assign = require('object-assign');
var AppDispatcher = require('../../dispatcher/AppDispatcher');
var KanbanConst = require('../constants/KanbanConst');

var EventEmitter = require('events').EventEmitter;

var KanbanStore = assign({}, EventEmitter.prototype, {


});


// Register callback to handle all updates
AppDispatcher.register(function (action) {

    switch (action.actionType) {
        default:
        // no op
    }
});

module.exports = KanbanStore;