/**
 * Created by gadarras on 13/08/2015.
 */
"use strict";

var KanbanModelBuilder = require('./KanbanModelBuilder.js');

var KanbanModel = {

    getModel: function(){
        return KanbanModelBuilder.initModel();
    }

};

module.exports = KanbanModel;
