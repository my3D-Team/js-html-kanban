"use strict";

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var KanbanConst = require('./KanbanConst');

var KanbanActions = {
    scale: function (scale) {
        AppDispatcher.dispatch({
            actionType: KanbanConst.SCALE,
            scale: scale
        });
    },
    changeModel: function (model) {
        AppDispatcher.dispatch({
            actionType: KanbanConst.CHANGE_MODEL,
            model: model
        });
    },
    closeZZ: function () {
        AppDispatcher.dispatch({
            actionType: KanbanConst.CLOSE_KANBAN
        });
    }
};

module.exports = KanbanActions;
