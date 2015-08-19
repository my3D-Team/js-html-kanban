"use strict";

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var StickyConst = require('../constants/StickyConst');

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
    }

};

module.exports = StickyActions;
