"use strict";

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var ColAndRowConst = require('./ColAndRowConst');

var ColAndRowActions = {

    changeTitle: function (nodeId, title, type) {
        AppDispatcher.dispatch({
            actionType: ColAndRowConst.CHANGE_TITLE,
            nodeId: nodeId,
            title: title,
            type: type
        });
    }

};

module.exports = ColAndRowActions;
