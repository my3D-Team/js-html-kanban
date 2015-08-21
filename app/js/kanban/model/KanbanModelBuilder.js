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
        model.backlog = child.content.backlog;
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
        model.stickies.push(sticky);
    },

    initStickyModel: function (model) {
        // build array
        model.stickies = [];
    }


};

module.exports = KanbanModelBuilder;