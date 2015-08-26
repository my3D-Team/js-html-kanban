"use strict";

/**
 * Import needed by the class
 */
var assign = require('object-assign');
var _ = require('lodash');
var AppDispatcher = require('../../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var EventHelper = require('../../util/EventHelper')

var StickyConst = require('../actions/StickyConst');
var KanbanConst = require('../../kanban/actions/KanbanConst');

// Stores
var ColAndRowStore = require('../../colAndRow/stores/ColAndRowStore');
var KanbanStore = require('../../kanban/stores/KanbanStore');



/**
 * Store State :
 * The model used by the store
 */
var stickies = [];



/**
 * All method used by the store
 * /!\ they method can not be call outside this class /!\
 */

var _onSelectItem = function (e, node) {

    var domNode = node.getDOMNode();
    var parent = domNode.parentNode;
    parent.removeChild(domNode);
    parent.appendChild(domNode);

    var selectedNode = node.props.sticky;
    if(selectedNode.cell_column === -1 && selectedNode.cell_row === -1){
        if(KanbanStore.isBacklog()) {
            var stickiesInBacklog = StickyStore.getAllStickiesInBacklog(selectedNode);
            _positionStickyBacklog(stickiesInBacklog)
        }
    }else {
        var stickiesInCurrentCell = StickyStore.getAllStickiesForACell(selectedNode.cell_column, selectedNode.cell_row, selectedNode);
        _positionStickiesInCell(stickiesInCurrentCell);
    }

    //Change the mouse cursor
    domNode.className += " grabbing";


};

var _onDeselectItem = function (e, node) {
    if (node) {
        var domNode = node.getDOMNode();

        var mouseX = e.touches ? e.touches[0].pageX : e.pageX;
        var mouseY = e.touches ? e.touches[0].pageY : e.pageY;
        var scale = KanbanStore.getScale();

        var x = (mouseX) / scale;
        var y = (mouseY) / scale;

        // set marge top
        y -= (Constants.TOPBAR.HEIGHT);

        var cell = ColAndRowStore.getColumnAndRow(x, y);
        var nodeToModify = StickyStore.findStickyById(node.props.sticky.content.id);
        nodeToModify.cell_column = cell.x;
        nodeToModify.cell_row = cell.y;
        StickyStore.positionSticky(nodeToModify);
        node.state.position.y = null;
        node.state.position.x = null;

        if (domNode.className.replace) {
            domNode.className = domNode.className.replace("grabbing", "");
        }
    }
};

var _initPositionStickies = function () {
    _.each(stickies, function (sticky) {
        sticky.position = ColAndRowStore.getPositionXY(sticky.cell_column, sticky.cell_row);
        StickyStore.positionSticky(sticky);
    });
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
    var position = ColAndRowStore.getPositionXY(arrayStickies[0].cell_column, arrayStickies[0].cell_row);
    _.each(arrayStickies, function (sticky, i) {
        sticky.position = {};
        sticky.position.x = position.x;
        sticky.position.y = position.y;
        sticky.zIndex = i;
        position.y += 5;
    });
};

var _arrangeStickies = function (arrayStickies) {
    if (arrayStickies.length > 0) {
        var position = ColAndRowStore.getPositionXY(arrayStickies[0].cell_column, arrayStickies[0].cell_row);
        _.each(arrayStickies, function (sticky, i) {
            sticky.position = {};
            sticky.position.x = position.x;
            sticky.position.y = position.y + (i) * (Constants.STICKY.HEIGHT + Constants.STICKY.SPACE_BETWEEN);
            sticky.zIndex = 0;
        });
    }
};

var _positionStickyBacklog = function (arrayStickies) {
    var y = 100 + Constants.STICKY.PADDING_TOP;

    _.each(arrayStickies, function(sticky){
        sticky.position = {
            x: Constants.STICKY.PADDING,
            y: y
        };
        y += Constants.STICKY.HEIGHT + Constants.STICKY.SPACE_BETWEEN;
    });

    StickyStore.emitChangePosition();

};


/**
 * The store !
 * You can find here all the listener PROVIDED by the store
 * and all getter
 * /!\ NO SETTER /!\
 */
var StickyStore = assign({}, EventEmitter.prototype, {

    getStickies: function () {
        return stickies;
    },

    init: function (model) {
        stickies = model.stickies;
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

    createSticky: function(type, cell){
        var id = Math.random();
        var sticky = {
            content: {
                stickyCode: type,
                id: id,
                values: [
                    {"value": "", "type": "description"},
                    {"value": "28/04/2015", "type": "date"},
                    {"value": "98", "type": "stickyColor"},
                    {"value": null, "type": "featureDisk"},
                    {"value": "", "type": "id_task"},
                    {"value": "", "type": "source"},
                    {"value": "", "type": "zone_regroupement"},
                    {"value": "adargoeu", "type": "person"},
                    {"value": "1", "type": "consumed"},
                    {"value": "4", "type": "estimated"},
                    {"value": "[3] Application profile and packaging", "type": "title"},
                    {"value": "0", "type": "todo"}
                ]
            },
            nodeId: Math.random(),
            type: "StickyNoteNode",
            parentId: 1827579,
            projectId: 2770,
            cell_column: cell.x,
            cell_row: cell.y
        };
        stickies.push(sticky);
        this.positionSticky(sticky);
        KanbanStore.emitChange();
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

    getAllStickiesInBacklog: function(excludeSticky){
        var arrayStickies = [];

        _.each(stickies, function(sticky){
           if(sticky.cell_column === -1 || sticky.cell_row === -1){
               if(excludeSticky){
                   if(excludeSticky.content.id !== sticky.content.id) {
                       arrayStickies.push(sticky);
                   }
               }else{
                   arrayStickies.push(sticky);
               }
           }
        });

        return arrayStickies;
    },

    positionSticky: function (sticky) {
        sticky.position = ColAndRowStore.getPositionXY(sticky.cell_column, sticky.cell_row);

        if (_.isNull(sticky.position)) {
            if(KanbanStore.isBacklog()) {
                var arrayStickies = StickyStore.getAllStickiesInBacklog();
                _positionStickyBacklog(arrayStickies);
            }
        } else {
            _positionStickyInCell(sticky);
        }

    }

});


// Register callback to handle all updates
AppDispatcher.register(function (action) {

    switch (action.actionType) {

        case StickyConst.SELECT :
            _onSelectItem(action.event, action.node);
            break;

        case StickyConst.DESELECT:
            _onDeselectItem(action.event, action.node);
            StickyStore.emitChange(action.event);
            break;
        case KanbanConst.CHANGE_MODEL:
            StickyStore.init(action.model);
            StickyStore.emitChange(action.event);

            break;
        case StickyConst.CREATE:
            StickyStore.createSticky(action.type, action.cell);

    }
});


module.exports = StickyStore;