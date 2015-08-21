/**
 * Created by gadarras on 19/08/2015.
 */
"use strict";

var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');



var AppStore = assign({}, EventEmitter.prototype, {

    storesList: [],

    getStoresList: function(){
        return this.storesList;
    },

    addStore: function(store){
        if(!_.isNull(store)) {
            this.storesList.push(store);
        }
    },

    initStores: function(model){
        _.each(this.storesList, function(store){
            store.init(model);
        });
    },

});

module.exports = AppStore;
