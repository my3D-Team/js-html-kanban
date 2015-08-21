"use strict";

var assign = require('object-assign');
var AppDispatcher = require('../../dispatcher/AppDispatcher');
var AppStore = require('../../app/stores/AppStore');
var KanbanStore = require('../../kanban/stores/KanbanStore');

var EventEmitter = require('events').EventEmitter;

var rows = [];
var columns = [];

var ColAndRowStore = assign({}, EventEmitter.prototype, {

    _setRows: function(newRows){
        rows = newRows;
    },

    _setColumns: function(newColumns){
        columns = newColumns;
    },

    getRows: function(){
        return rows;
    },

    getColumns: function(){
        return columns;
    },

    /**
     * Return the cell corresponding to the x and y given
     * @param x
     * @param y
     * @returns {{x: number, y: number}}
     */
    getColumnAndRow: function(x, y){
        var margeTop = Constants.COLUMN.MARGE_TOP + Constants.STICKY.MARGE_TOP;
        var column = -1,
            row = Math.floor((y - margeTop) / (Constants.ROW.HEIGHT));

        if(KanbanStore.isBacklog()) {
            // We are in the backlog
            if (x < Constants.COLUMN.WIDTH) {
                return {x: column, y: -1};
            }else{
                column = Math.floor((x - (2 * Constants.COLUMN.WIDTH)) / Constants.COLUMN.WIDTH);
                return {x: column, y: row};
            }
        }else{
            column = Math.floor((x - Constants.COLUMN.WIDTH) / Constants.COLUMN.WIDTH);
            return {x: column, y: row};
        }
    },

    /**
     * Return the x and y corresponding to the cell given
     * @param column
     * @param row
     * @returns {{}}
     */
    getPositionXY: function(column, row){
        var position = {};

        if(column === -1 || row === -1){
            position = null;
        }else {
            position.x = ((column+1) * Constants.COLUMN.WIDTH) + Constants.STICKY.PADDING;
            position.y = ((row+1) * Constants.ROW.HEIGHT) + Constants.STICKY.PADDING_TOP;

            if (KanbanStore.isBacklog()) {
                position.x += Constants.BACKLOG.MARGE_LEFT;
            }
        }

        return position;
    },

    init: function(model){
        this._setColumns(model.columns);
        this._setRows(model.rows);
    }

});

AppStore.addStore(ColAndRowStore);


// Register callback to handle all updates
AppDispatcher.register(function (action) {

    switch (action.actionType) {
        default:
        // no op
    }
});

module.exports = ColAndRowStore;