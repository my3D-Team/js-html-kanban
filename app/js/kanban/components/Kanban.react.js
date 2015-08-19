"use strict";

/**
 * This class builds the new Kanban.
 *
 * @author $Author$
 */
var React = require('react');

var DragManager = require('./../mixins/DragMixin');
var DataManager = require('./../mixins/KanbanDataMixin');

var StickyStore = require('./../../sticky/stores/StickyStore');
var Sticky = require('./../../sticky/components/Sticky.react');

var UserRow = require('./UserRow.react');
var Column = require('./Column.react');
var KanbanModel = require('./../model/KanbanModel.js');
var StickyPositionHelperManager = require('../../sticky/manager/StickyPositionHelperManager.js');
var PositionManager = require('../../utils/PositionManager.js');

var Kanban = React.createClass({

    mixins: [DragManager],

    getInitialState: function () {
        var retval = {};

        retval.model = KanbanModel.getModel();
        retval.scale = 1;
        return retval
    },

    componentDidMount: function () {
        StickyStore.addSelectListener(this.onSelectItem);
        StickyStore.addDeselectListener(this.onDeselectItem);
    },
    componentWillUnmount: function () {
        StickyStore.removeSelectListener(this.onSelectItem);
        StickyStore.removeDeselectListener(this.onDeselectItem);
    },

    onSelectItem: function(e){
        this._onSelectItem(e);
        var mouseX = e.touches ? e.touches[0].clientX : e.clientX;
        var mouseY = e.touches ? e.touches[0].clientY : e.clientY;
        //this.state.selectedNode.startCells = StickyPositionHelperManager.getCells((mouseX / this.state.scale) - this.state.offsetX, (mouseY / this.state.scale) - this.state.offsetY, this.state);
    },

    onDeselectItem: function(e){
        //StickyPositionHelperManager.setStickyPosition(this.state);
        this._onDeselectItem(e);
    },

    onMove: function(e){
        this._onMove(e);
        //TODO à changer
        var mouseX = e.touches ? e.touches[0].clientX : e.clientX;
        var mouseY = e.touches ? e.touches[0].clientY : e.clientY;
        var x = (mouseX / this.state.scale ) - this.state.offsetX;
        var y = (mouseY / this.state.scale ) - this.state.offsetY;
        //this.state.selectedNode.currentCell = StickyPositionHelperManager.getCells(x, y, this.state);
        //StickyPositionHelperManager.buildRegion(this.state.selectedNode.currentCell);
    },

    render: function () {
        var color = "white",
            x = 25,
            y = 0,
            backlog = {},
            stickiesBacklog = {},
            model = this.state.model;

        if (model.backlog) {
            x = 400;
            var height = model.rows.length * Constants.ROW,
                posX = Constants.COLUMN.MARGE + Constants.STICKY.PADDING,
                posY = 50;

            backlog = (<Column height={height} color={color} title={model.backlog.title}> </Column>);

            stickiesBacklog =
                model.backlog.stickies.map(function (sticky, i) {
                    posY += Constants.STICKY.HEIGHT + Constants.STICKY.BACKLOG.PADDING;
                    sticky.position = {x: posX, y: posY};
                    return (
                        <Sticky sticky={sticky}/>);
                })
        }

        return (
            <div className="kanban" onTouchEnd={this.onDeselectItem} onMouseUp={this.onDeselectItem}
                 onTouchMove={this.onMove} onMouseMove={this.onMove}>

                {backlog}
                {stickiesBacklog}
                {model.rows.map(function (item, i) {
                        y += 150;
                        return (<UserRow x={x} y={y} item={item} key={i}> </UserRow>);
                    }
                )}

                {model.columns.map(function (item, i) {
                        color = color === "white" ? "#f9f9f9" : "white";
                        return (<Column height={y + 150} color={color} title={item.type} key={i}> </Column>);
                    }
                )}

                {model.stickies.map(function (item, i) {
                    var stickies = item.map(function (sticky, j) {
                        if (model.stickies[i][j] !== 0) {
                            sticky.position = PositionManager.getPositionFromCell(i, j, model);
                            return (<Sticky sticky={sticky}/>);
                        }
                    });
                    return stickies;
                })}

            </div>
        );
    }


});

module.exports = Kanban;
