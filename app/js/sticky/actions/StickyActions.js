"use strict";

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var StickyConst = require('./StickyConst');

var StickyActions = {

    select: function (e, node) {
        AppDispatcher.dispatch({
            actionType: StickyConst.SELECT,
            event: e,
            node: node
        });
    },
    deselect: function (e, node) {
        AppDispatcher.dispatch({
            actionType: StickyConst.DESELECT,
            event: e,
            node: node
        });
    },
    create: function(e, type, cell){
        AppDispatcher.dispatch({
            actionType: StickyConst.CREATE,
            event: e,
            type: type,
            cell: cell
        });
    }

};

module.exports = StickyActions;
