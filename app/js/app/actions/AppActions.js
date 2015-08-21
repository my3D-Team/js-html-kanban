"use strict";

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var AppConst = require('../constants/AppConst');

var AppActions = {

    scale: function (scale) {
        AppDispatcher.dispatch({
            actionType: AppConst.SCALE,
            scale: scale
        });
    }

};

module.exports = AppActions;
