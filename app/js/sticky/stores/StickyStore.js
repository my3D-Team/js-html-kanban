"use strict";

var assign = require('object-assign');
var AppDispatcher = require('../../dispatcher/AppDispatcher');
var StickyConst = require('../constants/StickyConst');

var EventEmitter = require('events').EventEmitter;


//TODO store stickyes []

var _onSelectItem = function (e, node) {

    var domNode = node.getDOMNode();
    ;
    //Change the mouse cursor
    domNode.className += " grabbing";

};

var _onDeselectItem = function (e, node) {
    if (node) {
        var domNode = node.getDOMNode();
        //todo update attr cellCol & cellRow of the given sticky
        if (domNode.className.replace) {
            domNode.className = domNode.className.replace("grabbing", "");
        }
    }
}


var StickyStore = assign({}, EventEmitter.prototype, {

    addChangeListener: function () {
        this.on(StickyConst.CHANGE, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function (callback) {
        this.removeListener(StickyConst.CHANGE, callback);
    },

    emitChange: function (e) {
        this.emit(StickyConst.CHANGE, e);
    }

});


// Register callback to handle all updates
AppDispatcher.register(function (action) {

    switch (action.actionType) {

        case StickyConst.SELECT :
            _onSelectItem(action.event, action.node);
            break;

        case StickyConst.DESELECT:
            _onDeselectItem(action.event, action.node);
            break;

    }
});

module.exports = StickyStore;