/**
 * Created by gadarras on 19/08/2015.
 */
"use strict";

var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var AppDispatcher = require('../../dispatcher/AppDispatcher');

var PreviewConst = require('../../overview/actions/PreviewConst');
var AppConst = require('../actions/AppConst');
var KanbanModelBuilder = require('./../../kanban/model/KanbanModelBuilder');


var selectedZZ = {};
var zzList = [];

var _getZZbyNodeId = function (id) {
    return _.find(zzList, function (zz) {
        return zz.nodeId === id;
    });
}

var initStore = function () {
    zzList = [];
    _.each(Dashboard.data[0].children, function (zz, i) {
        zzList[i] = KanbanModelBuilder.initModel(zz);
    })

    zzList = _.sortBy(zzList, function (zz) {
        return zz.zindex;
    });
}

initStore();

var AppStore = assign({}, EventEmitter.prototype, {

    /**
     * Add a listener when something has changed in the kanban
     * @param callback
     */
    addChangeListener: function (callback) {
        this.on(AppConst.CHANGE, callback);
    },

    /**
     * Remove the change listener
     */
    removeChangeListener: function () {
        this.removeListener(AppConst.CHANGE);
    },

    /**
     * Emit the change for all listeners
     * @param e
     */
    emitChange: function (e) {
        this.emit(AppConst.CHANGE, e);
    },

    getSelectedZZ: function () {
        return selectedZZ;
    },

    getZZList: function () {
        return zzList;
    }
});


// Register callback to handle all updates
AppStore.dispatchToken = AppDispatcher.register(function (action) {

    switch (action.actionType) {
        case PreviewConst.OPEN:
            selectedZZ = _getZZbyNodeId(action.nodeId);
            AppStore.emitChange();
            break;
    }
});
module.exports = AppStore;
