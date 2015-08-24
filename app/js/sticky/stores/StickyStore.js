"use strict";

var assign = require('object-assign');
var _ = require('lodash');
var AppDispatcher = require('../../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

var StickyConst = require('../constants/StickyConst');

// Stores
var AppStore = require('../../app/stores/AppStore');
var ColAndRowStore = require('../../colAndRow/stores/ColAndRowStore');
var KanbanStore = require('../../kanban/stores/KanbanStore');


var stickies = [];

var StickyStore = assign({}, EventEmitter.prototype, {

    getStickies: function () {
        return stickies;
    },

    init: function (model) {
        _setStickies(model.stickies);
        _initPositionStickies();
    },

    addChangeListener: function (callback) {
        this.on(StickyConst.CHANGE, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function () {
        this.removeListener(StickyConst.CHANGE);
    },

    emitChange: function (e) {
        this.emit(StickyConst.CHANGE, e);
    },

    addChangePositionListener: function (callback) {
        this.on(StickyConst.CHANGE_POSITION, callback);
    },

    removeChangePositionListener: function () {
        this.removeListener(StickyConst.CHANGE_POSITION);
    },

    emitChangePosition: function (e) {
        this.emit(StickyConst.CHANGE_POSITION, e);
    },

    findStickyById: function (id) {
        return _.find(stickies, function (sticky) {
            return sticky.content.id === id;
        });
    },

    getAllStickiesForACell: function (column, row, excludeSticky) {
        var arrayStickies = [];

        _.each(stickies, function (sticky) {
            if (sticky.cell_column === column && sticky.cell_row === row) {
                if (excludeSticky.content.id !== sticky.content.id) {
                    arrayStickies.push(sticky);
                }
            }
        });

        return arrayStickies;
    },

    positionSticky: function (sticky) {
        sticky.position = ColAndRowStore.getPositionXY(sticky.cell_column, sticky.cell_row);

        if (_.isNull(sticky.position)) {
            _positionStickyBacklog();
        } else {
            _positionStickyInCell(sticky);
        }
    }

});

var _onSelectItem = function (e, node) {

    var domNode = node.getDOMNode();
    var parent = domNode.parentNode;
    parent.removeChild(domNode);
    parent.appendChild(domNode);

    var selectedNode = node.props.sticky;
    var stickiesInCurrentCell = StickyStore.getAllStickiesForACell(selectedNode.cell_column, selectedNode.cell_row, selectedNode);
    _positionStickiesInCell(stickiesInCurrentCell);

    //Change the mouse cursor
    domNode.className += " grabbing";


};

var _onDeselectItem = function (e, node) {
    if (node) {
        var domNode = node.getDOMNode();

        var mouseX = e.touches ? e.touches[0].pageX : e.pageX;
        var mouseY = e.touches ? e.touches[0].pageY : e.pageY;
        var scale = KanbanStore.getScale();
        var selectedNode = KanbanStore.getSelectedNode();

        var x = (mouseX) / scale;
        var y = (mouseY) / scale;

        // set marge top
        y -= (Constants.TOPBAR.HEIGHT + Constants.COLUMN.MARGE_TOP);

        var cell = ColAndRowStore.getColumnAndRow(x, y);
        var nodeToModify = StickyStore.findStickyById(node.props.sticky.content.id);
        nodeToModify.cell_column = cell.x;
        nodeToModify.cell_row = cell.y;
        StickyStore.positionSticky(nodeToModify);

        if (domNode.className.replace) {
            domNode.className = domNode.className.replace("grabbing", "");
        }
    }
};

var _initPositionStickies = function () {
    _.each(stickies, function (sticky) {
        sticky.position = ColAndRowStore.getPositionXY(sticky.cell_column, sticky.cell_row);
    });
};

var _setStickies = function (stickiesArray) {
    stickies = stickiesArray;
};

var _positionStickiesInCell = function (arrayStickies) {
    if (arrayStickies.length > StickyConst.MAX_STICKIES_IN_CELL) {
        _collapseAllStickies(arrayStickies);
    } else {
        _arrangeStickies(arrayStickies);
    }
    StickyStore.emitChangePosition();
};

var _positionStickyInCell = function (sticky) {

    var stickiesInCell = StickyStore.getAllStickiesForACell(sticky.cell_column, sticky.cell_row, sticky);
    stickiesInCell.push(sticky);

    _positionStickiesInCell(stickiesInCell);
};

var _collapseAllStickies = function (arrayStickies) {
    // Init the position (we know there are at least 4 stickies
    var y = ColAndRowStore.getPositionXY(arrayStickies[0].cell_column, arrayStickies[0].cell_row).y;
    _.each(arrayStickies, function (sticky, i) {
        sticky.position.y = y;
        sticky.zIndex = i;
        y += 5;
    });
};

var _arrangeStickies = function (arrayStickies) {
    if (arrayStickies.length > 0) {
        var y = ColAndRowStore.getPositionXY(arrayStickies[0].cell_column, arrayStickies[0].cell_row).y;
        _.each(arrayStickies, function (sticky, i) {
            sticky.position.y = y + (i) * (Constants.STICKY.HEIGHT + Constants.STICKY.SPACE_BETWEEN);
            sticky.zIndex = 0;
        });
    }
};

var _positionStickyBacklog = function () {

};

AppStore.addStore(StickyStore);

// Register callback to handle all updates
AppDispatcher.register(function (action) {

    switch (action.actionType) {

        case StickyConst.SELECT :
            _onSelectItem(action.event, action.node);
            break;

        case StickyConst.DESELECT:
            _onDeselectItem(action.event, action.node);
            break;

    }
});

module.exports = StickyStore;