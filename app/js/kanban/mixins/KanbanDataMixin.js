"use strict";

var _ = require('lodash');

var DataManager = {
    getKanbanData: function () {
        var retval = {};
        retval.columns = [];
        retval.rows = [];

        _.each(Dashboard.children, function (item) {
            if (item.content.columns) {
                if(item.content.backlog) {
                    retval.columns.push({content: {text:"backlog"}});
                }
                _.each(item.children, function (status, i) {
                    if (i < item.content.columns) {
                        retval.columns.push(status);
                    } else if (i > item.content.columns && i < item.content.rows + item.content.columns) {
                        retval.rows.push(status);
                    }
                })
            }
        });
        return retval;
    }

};

module.exports = DataManager;
