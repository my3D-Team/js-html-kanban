/**
 * Created by gadarras on 13/08/2015.
 */
"use strict";

var _ = require('lodash');

var model = {};

var KanbanModelBuilder = {
    initModel: function (data) {

        model = data.content;
        model.nodeId = data.nodeId;
        model.type = data.type;
        model.zindex = data.zindex;



        // columns
        this.buildColumns(data);

        // rows
        this.buildRows(data);

        // build children
        this.buildChildren(data);

        return model;

    },

    buildChildren: function (data) {
        _.each(data.children, function (child) {
            switch (child.type) {
                case Labels.TYPE.STATUS_KANBAN:
                    this.buildBacklog(child);
                    break;
                case Labels.TYPE.STICKY:
                    this.buildSticky(child);
                    break;
            }
        }, this);
    },

    buildBacklog: function (data) {
        model.backlog = data.content.backlog;
    },

    buildColumns: function (data) {
        // sort columns by display order
        model.columns = _.sortBy(data.columns, function (col) {
            return col.displayOrder;
        });
    },

    buildRows: function (data) {
        // sort rows by display order
        model.rows = _.sortBy(data.rows, function (row) {
            return row.displayOrder;
        });
    },

    buildSticky: function (sticky) {
        // init stickies model if needed
        model.stickies  = model.stickies ? model.stickies : [];
        model.stickies.push(sticky);
    }

};

module.exports = KanbanModelBuilder;