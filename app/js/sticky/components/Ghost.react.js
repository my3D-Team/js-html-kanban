/**
 * Created by gadarras on 24/08/2015.
 */
"use strict";

var React = require('react');

// Stores
var ColAndRowStore = require('../../colAndRow/stores/ColAndRowStore');
var KanbanStore = require('../../kanban/stores/KanbanStore');

var Ghost = React.createClass({

    getInitialState: function () {
        var retval = {};
        retval.position = {x: 0, y: 0};
        retval.dimension = {width: 0, height: 0};
        retval.displayGhost = false;
        return retval;
    },

    manageGhost: function (x, y) {
        var cell = ColAndRowStore.getColumnAndRow(x + (Constants.COLUMN.WIDTH / 2), y),
            top = cell.y * Constants.ROW.HEIGHT + Constants.STICKY.MARGE_TOP,
            left = cell.x * Constants.COLUMN.WIDTH + Constants.COLUMN.WIDTH,
            width = Constants.COLUMN.WIDTH,
            height = Constants.ROW.HEIGHT;

        if (cell.x !== -1 && cell.y !== -1) {
            this.setPositionsAndDimensions(left, top, width, height);
        } else {
            if (KanbanStore.isBacklog()) {
                top = Constants.STICKY.MARGE_TOP;
                left = Constants.STICKY.PADDING;
                height = this.state.rows.length * Constants.ROW.HEIGHT;
                this.setPositionsAndDimensions(left, top, width, height);
            }
        }

        this.manageRender();
    },

    setPositionsAndDimensions: function (x, y, width, height) {
        if (x !== this.state.position.x || y != this.state.position.y) {
            this.setState({
                position: {x: x, y: y},
                dimension: {width: width, height: height},
                displayGhost : true
                });
        }
    },

    manageRender: function(){
        if(!this.state.displayGhost){
            this.setState({displayGhost: true});
        }
    },

    hide: function(){
        this.setState({displayGhost: false});
    },


    render: function () {

        var display = this.state.displayGhost ? "block" : "none";

        var style = {
            display: display,
            left: this.state.position.x,
            top: this.state.position.y,
            height: this.state.dimension.height,
            width: this.state.dimension.width
        };

        return (
            <div style={style} className="sticky-helper"></div>
        );
    }

});

module.exports = Ghost;