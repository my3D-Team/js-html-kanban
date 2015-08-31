"use strict";

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var PreviewConst = require('./PreviewConst');

var PreviewActions = {

    openZZ: function (nodeId) {
        AppDispatcher.dispatch({
            actionType: PreviewConst.OPEN,
            nodeId: nodeId
        });
    }


};

module.exports = PreviewActions;
