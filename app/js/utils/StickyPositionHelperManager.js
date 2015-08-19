/**
 * Created by gadarras on 17/08/2015.
 */
"use strict";

var _ = require('lodash');
var Main = require('../main.js');

var cells = {};

var StickyPositionHelperManager = {


    setStickyPosition: function(main){

    },

    /**
     * Get the center of the sticky
     * @param x
     * @param y
     * @param sticky
     * @returns {{}}
     */
    getCenter: function(x, y, main){
        var center = {};
        center.x = x + ((main.selectedNode.clientWidth)/2);
        center.y = y + ((main.selectedNode.clientHeight)/2);
        return center;
    },

    getCells: function(x, y, main){

        var center = this.getCenter(x, y, main);

        var margeTop = Constants.COLUMN.MARGE_TOP + Constants.STICKY.MARGE_TOP;
        var column = -1,
            row = Math.floor((center.y - margeTop) / (Constants.ROW.HEIGHT));

        if(Main.model.backlog) {
            // We are in the backlog
            if (center.x < Constants.COLUMN.WIDTH) {
                return {x: column, y: -1};
            }else{
                column = Math.floor((center.x - (2 * Constants.COLUMN.WIDTH)) / Constants.COLUMN.WIDTH);
                return {x: column, y: row};
            }
        }else{
            column = Math.floor((center.x - Constants.COLUMN.WIDTH) / Constants.COLUMN.WIDTH);
            return {x: column, y: row};
        }
    },

    buildRegion: function(cell){

        var region = document.getElementById('sticky-helper'),
            top = Constants.TOPBAR.HEIGHT,
            left = 0,
            height = 0,
            width = Constants.COLUMN.WIDTH;

        // We are in the backlog
        if(cell.x === -1 || cell.y === -1){
            top += Constants.COLUMN.MARGE_TOP;
            height = document.getElementsByClassName("kanban")[0].clientHeight;
        }else{
            if(Main.model.backlog){
                left += (2* Constants.COLUMN.WIDTH) + (cell.x*Constants.COLUMN.WIDTH);
            }else{
                left += Constants.COLUMN.WIDTH + (cell.x*Constants.COLUMN.WIDTH);
            }
            top += Constants.STICKY.MARGE_TOP + (cell.x*Constants.ROW.HEIGHT);
            height = Constants.ROW.HEIGHT;
        }

        region.style.top = top + "px";
        region.style.left = left + "px";
        region.style.height = height + "px";
        region.style.width = width + "px";
        region.style.display = "block";

    }

};

module.exports = StickyPositionHelperManager;