"use strict";

var assign = require('object-assign');
var AppDispatcher = require('../../dispatcher/AppDispatcher');
var StickyConst = require('../constants/StickyConst');

var EventEmitter = require('events').EventEmitter;

var StickyStore = assign({}, EventEmitter.prototype, {

    /**
     * @param {function} callback
     */
    addSelectListener: function (callback) {
        this.on(StickyConst.SELECT, callback);
    },

    emitSelect: function(e) {
        this.emit(StickyConst.SELECT, e);
    },
    /**
     * @param {function} callback
     */
    removeSelectListener: function (callback) {
        this.removeListener(StickyConst.SELECT, callback);
    },

    /**
     * @param {function} callback
     */
    addDeselectListener: function (callback) {
        this.on(StickyConst.DESELECT, callback);
    },
    emitDeselect: function(e) {
        this.emit(StickyConst.DESELECT, e);
    },
    /**
     * @param {function} callback
     */
    removeDeselectListener: function (callback) {
        this.removeListener(StickyConst.DESELECT, callback);
    }

});


// Register callback to handle all updates
AppDispatcher.register(function (action) {

    switch (action.actionType) {
        case StickyConst.SELECT:
            StickyStore.emitSelect(action.event);
            break;

        case StickyConst.DESELECT:
            StickyStore.emitDeselect(action.event);
            break;

        case StickyConst.EDIT_TOGGLE:
            break;

        default:
        // no op
    }
});

module.exports = StickyStore;