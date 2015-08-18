/**
 * Created by gadarras on 13/08/2015.
 */
"use strict";

var _ = require('lodash');

var KanbanManager = {

    getOrderFromUser: function(arrayUsers, user){
        var displayOrder = -1;
        var userLogin = "";

        _.each(user.content.values, function(value){
            if(value.type === "person"){
                userLogin = value.value;
                return;
            }
        });


        _.each(arrayUsers, function(u){
            if(u.login === userLogin){
                displayOrder = u.displayOrder;
                return;
            }
        });
        return displayOrder;
    }

};

module.exports = KanbanManager;