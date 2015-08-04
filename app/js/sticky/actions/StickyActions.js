"use strict";

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var StickyConst = require('../constants/StickyConst');

var StickyActions = {

    editToggle: function () {
        AppDispatcher.dispatch({
            actionType: StickyConst.EDIT_TOGGLE
        });
    },

    select: function (e) {
        AppDispatcher.dispatch({
            actionType: StickyConst.SELECT,
            event: e
        });
    },
    deselect: function (e) {
        AppDispatcher.dispatch({
            actionType: StickyConst.DESELECT,
            event: e
        });
    }

};

module.exports = StickyActions;
