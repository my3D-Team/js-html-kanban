"use strict";

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ColAndRowConst = require('../constants/ColAndRowConst');

var ColAndRowActions = {

    changeTitle: function (nodeId, title) {
        AppDispatcher.dispatch({
            actionType: ColAndRowConst.CHANGE_TITLE,
            nodeId: nodeId,
            title: title
        });
    }

};

module.exports = ColAndRowActions;
