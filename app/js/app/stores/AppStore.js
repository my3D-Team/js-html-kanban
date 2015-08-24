/**
 * Created by gadarras on 19/08/2015.
 */
"use strict";

var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var storesList = [];

var AppStore = assign({}, EventEmitter.prototype, {

    getStoresList: function(){
        return storesList;
    },

    addStore: function(store){
        if(!_.isNull(store)) {
            storesList.push(store);
        }
    },

    initStores: function(model){
        _.each(storesList, function(store){
            store.init(model);
        });
    }

});

module.exports = AppStore;
