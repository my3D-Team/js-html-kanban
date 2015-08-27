/**
 * Created by gadarras on 26/08/2015.
 */
"use strict";

var React = require('react');

// Actions
var StickyActions = require('./../actions/StickyActions');

// Stores
var ColAndRowStore = require('./../../colAndRow/stores/ColAndRowStore');
var KanbanStore = require('./../../kanban/stores/KanbanStore');
var StickyStore = require('./../../sticky/stores/StickyStore');

// Util
var _ = require('lodash');

var AddStickyButton = React.createClass({

    getInitialState: function () {
        return ({
            displayButton: false,
            position: {
                x: 0,
                y: 0
            },
            cell: {
                x: -1,
                y: -1
            }
        });
    },

    show: function () {
        this.setState({displayButton: true});
    },

    hide: function () {
        this.setState({displayButton: false});
    },

    onClickAddButton: function (e) {
        StickyActions.create(e, "feature", this.state.cell);
    },

    setPosition: function (x, y) {
        var cell = ColAndRowStore.getColumnAndRow(x, y);
        var stickyHeight = StickyStore.getStickyHeight();
        var nbStickies = 0;
        var position = {};
        if(cell.x === -1 || cell.y === -1){
            if(x < Constants.BACKLOG.MARGE_LEFT) {
                nbStickies = StickyStore.getAllStickiesInBacklog().length;
                position.x = Constants.STICKY.PADDING;
                position.y = 100 + Constants.STICKY.PADDING_TOP + (stickyHeight + Constants.STICKY.SPACE_BETWEEN) * nbStickies;
            }else{
                this.hide();
                return;
            }
        }else{
            var stickies = StickyStore.getAllStickiesForACell(cell.x, cell.y);
            nbStickies = stickies.length;
            /*if(nbStickies <= Constants.STICKY.MAX_STICKIES_IN_CELL){
                position.y = (cell.y + 1) * Constants.ROW.HEIGHT + Constants.STICKY.PADDING_TOP + (stickyHeight + Constants.STICKY.SPACE_BETWEEN)*nbStickies;
            }else {
                 position.y = (cell.y + 1) * Constants.ROW.HEIGHT + Constants.STICKY.PADDING_TOP + stickyHeight + Constants.STICKY.SPACE_BETWEEN + 15;
            }*/
            position.y = (cell.y + 1) * Constants.ROW.HEIGHT + Constants.STICKY.PADDING_TOP;
            _.each(stickies, function(sticky){
                if(sticky.position.y + stickyHeight >= position.y){
                    position.y = sticky.position.y + stickyHeight + Constants.STICKY.SPACE_BETWEEN;
                }
            });

            position.x = (cell.x + 1) * Constants.COLUMN.WIDTH + Constants.STICKY.PADDING;

            if(KanbanStore.isBacklog()){
                position.x += Constants.BACKLOG.MARGE_LEFT;
            }
        }

        this.setState({
            displayButton: true,
            position: position,
            cell: cell
        })
    },

    render: function () {

        var display = this.state.displayButton ? "flex" : "none";
        var style = {
            display: display,
            left: this.state.position.x,
            top: this.state.position.y
        };

        return (
            <div style={style} className="add_button" onClick={this.onClickAddButton}>
                <svg xmlns="//www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <path d="M38 26H26v12h-4V26H10v-4h12V10h4v12h12v4z"></path>
                </svg>
            </div>
        );
    }

});

module.exports = AddStickyButton;