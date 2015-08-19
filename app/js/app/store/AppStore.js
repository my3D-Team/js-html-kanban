/**
 * Created by gadarras on 19/08/2015.
 */
"use strict";

var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');


var app = {
    scale : 1
}

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

    initStores: function(){
        _.each(this.storesList, function(store){
            store.init();
        });
    },

    getScale: function () {
        return app.scale;
    }

});

module.exports = AppStore;
