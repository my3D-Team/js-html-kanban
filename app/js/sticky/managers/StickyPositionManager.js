/**
 * Created by gadarras on 27/08/2015.
 */
"use strict";

// Stores
var ColAndRowStore = require('./../../colAndRow/stores/ColAndRowStore');
var KanbanStore = require('./../../kanban/stores/KanbanStore');
var StickyStore = require('./../stores/StickyStore');

// Utils
var _ = require('lodash');

var StickyPositionManager = {

    positionSticky: function (sticky) {
        sticky.position = ColAndRowStore.getPositionXY(sticky.cell_column, sticky.cell_row);

        if (_.isNull(sticky.position)) {
            if(KanbanStore.isBacklog()) {
                var arrayStickies = StickyStore.getAllStickiesInBacklog();
                this.positionStickyBacklog(arrayStickies);
            }
        } else {
            this.positionStickyInCell(sticky);
        }

    },

    positionStickyBacklog: function (arrayStickies) {
        var y = 100 + Constants.STICKY.PADDING_TOP;

        _.each(arrayStickies, function(sticky){
            sticky.position = {
                x: Constants.STICKY.PADDING,
                y: y
            };
            y += Constants.STICKY.HEIGHT + Constants.STICKY.SPACE_BETWEEN;
        });

        StickyStore.emitChangePosition();

    },

    positionStickyInCell: function (sticky) {

        var stickiesInCell = StickyStore.getAllStickiesForACell(sticky.cell_column, sticky.cell_row, sticky);
        stickiesInCell.push(sticky);

        this._positionStickiesInCell(stickiesInCell);
    },

    _positionStickiesInCell: function (arrayStickies) {
        if (arrayStickies.length > Constants.STICKY.MAX_STICKIES_IN_CELL) {
            this._collapseAllStickies(arrayStickies);
        } else {
            this._arrangeStickies(arrayStickies);
        }
        StickyStore.emitChangePosition();
    },

    _collapseAllStickies: function (arrayStickies) {
        _.each(arrayStickies, function (sticky, i) {
            sticky.position = {};
            var position = ColAndRowStore.getPositionXY(sticky.cell_column, sticky.cell_row);
            if(i < Constants.STICKY.MAX_STICKIES_IN_CELL) {
                sticky.position.y = position.y + (i*5);
                sticky.zIndex = i;
            }else if(i === arrayStickies.length-1){
                sticky.position.y = position.y + 10;
                sticky.zIndex = 2;
            }else{
                sticky.position.y = position.y;
                sticky.zIndex = 0;
            }
            sticky.position.x = position.x;
        });
    },

    _arrangeStickies: function (arrayStickies) {
        if (arrayStickies.length > 0) {
            var position = ColAndRowStore.getPositionXY(arrayStickies[0].cell_column, arrayStickies[0].cell_row);
            _.each(arrayStickies, function (sticky, i) {
                sticky.position = {};
                sticky.position.x = position.x;
                sticky.position.y = position.y + (i) * (Constants.STICKY.HEIGHT + Constants.STICKY.SPACE_BETWEEN);
                sticky.zIndex = 0;
            });
        }
    }
};

module.exports = StickyPositionManager;