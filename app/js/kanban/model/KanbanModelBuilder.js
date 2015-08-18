/**
 * Created by gadarras on 13/08/2015.
 */
"use strict";

var KanbanManager = require('./../manager/KanbanManager.js');
var _ = require('lodash');
var Main = require('../../main.js');

var KanbanModelBuilder = {

    initModel: function () {

        var model = {};

        // columns
        this.buildColumns(model);

        // rows
        this.buildRows(model);

        // build children
        this.buildChildren(model);

        Main.model = model;

        return model;

    },

    buildChildren: function (model) {
        _.each(KanbanData.children, function (child) {
            switch (child.type) {
                case Labels.TYPE.STATUS_KANBAN:
                    this.buildBacklog(model, child);
                    break;
                case Labels.TYPE.STICKY:
                    this.buildSticky(model, child);
                    break;
            }
        }, this);
    },

    buildBacklog: function (model, child) {
        if (child.content.backlog) {
            model.backlog = {};
            model.backlog.title = Labels.BACKLOG;
            model.backlog.stickies = [];
        }
    },

    buildColumns: function (model) {
        // sort columns by display order
        model.columns = _.sortBy(KanbanData.columns, function (col) {
            return col.displayOrder;
        });
    },

    buildRows: function (model) {
        // sort rows by display order
        model.rows = _.sortBy(KanbanData.rows, function (row) {
            return row.displayOrder;
        });
    },

    buildSticky: function (model, sticky) {
        // init stickies model if needed
        if (!model.stickies) {
            this.initStickyModel(model);
        }
        if (sticky.cell_row !== -1 && sticky.cell_column !== -1) {
            model.stickies[sticky.cell_column][sticky.cell_row] = sticky;
        } else {
            if (model.backlog) {
                model.backlog.stickies.push(sticky);
            }
        }

    },

    initStickyModel: function (model) {
        // build array
        var stickiesCell = new Array();

        for (var i = 0; i < model.columns.length; i++) {
            stickiesCell[i] = new Array();
            for (var j = 0; j < model.rows.length; j++) {
                stickiesCell[i][j] = 0;
            }
        }
        model.stickies = stickiesCell;
    }


};

module.exports = KanbanModelBuilder;