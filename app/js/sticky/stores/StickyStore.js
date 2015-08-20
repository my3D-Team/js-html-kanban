"use strict";

var assign = require('object-assign');
var AppDispatcher = require('../../dispatcher/AppDispatcher');
var StickyConst = require('../constants/StickyConst');

// Stores
var AppStore = require('../../app/store/AppStore');
var ColAndRowStore = require('../../colAndRow/stores/ColAndRowStore');

var EventEmitter = require('events').EventEmitter;

var _ = require('lodash');

//TODO store stickyes []
var stickies = [];

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

    getStickies: function(){
        return stickies;
    },

    _setStickies: function(stickiesArray){
        stickies = stickiesArray;
    },

    init: function(model){
        this._setStickies(model.stickies);
    },

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
    },

    stackMe: function(position){
        var newPosition = {};

        if(_.isNull(position)){
            newPosition = this._stackMeInBacklog();
        }else{
            newPosition = this._stackMeInCell(position);
        }

        return newPosition;
    },

    _stackMeInCell: function(position){
        var cellHeight = Constants.ROW.HEIGHT;

        _.each(stickies, function(sticky){
            var stickyPosition = ColAndRowStore.getPositionXY(sticky.cell_column, sticky.cell_row);
            if(stickyPosition.x === position.x && stickyPosition.y === position.y){
                position.x += Constants.STICKY.HEIGHT + Constants.STICKY.PADDING_TOP;
                this._stackMeInCell(position);
            }
        }, this);

        return position;
    },

    _stackMeInBacklog: function(){

    }

});

AppStore.addStore(StickyStore);

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