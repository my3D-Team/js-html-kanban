"use strict";

/**
 * This class builds the new Kanban.
 *
 * @author $Author$
 */
var React = require('react');

var DragMixin = require('./../mixins/DragMixin');
var DataManager = require('./../mixins/KanbanDataMixin');

var KanbanStore = require('../stores/KanbanStore');
var StickyActions = require('../../sticky/actions/StickyActions.js');

var Sticky = require('./../../sticky/components/Sticky.react');
var UserRow = require('./../../colAndRow/components/UserRow.react');
var Column = require('./../../colAndRow/components/Column.react');

var KanbanModel = require('./../model/KanbanModel.js');
var StickyPositionHelperManager = require('../../utils/StickyPositionHelperManager.js');
var PositionManager = require('../../utils/PositionManager.js');

var Kanban = React.createClass({

    mixins: [DragMixin],

    getInitialState: function () {
        var retval = {};

        retval.model = KanbanModel.getModel();
        retval.scale = 1;
        retval.selectedNode = KanbanStore.getSelectedNode();
        return retval
    },

    componentDidMount: function () {
        KanbanStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function () {
        KanbanStore.removeChangeListener();
    },


    onChange: function (e) {
        this.state.selectedNode = KanbanStore.getSelectedNode();
        this.state.scale = KanbanStore.getScale();
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
                        <Sticky x={posX} y={posY} className={sticky.content.stickyCode} sticky={sticky} model={model}
                        isInBacklog={true} key={i}/>);
                })
        }

        return (
            <div className="kanban" onTouchMove={this.onMove} onMouseMove={this.onMove} onTouchEnd={this.deselectNode} onMouseUp={this.deselectNode}>

                {backlog}

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
                 {stickiesBacklog}
                {model.stickies.map(function (item, i) {
                    var stickies = item.map(function (sticky, j) {
                        if (model.stickies[i][j] !== 0) {
                            sticky.position = PositionManager.getPositionFromCell(i, j, model);
                            return (<Sticky sticky={sticky} key={i}/>);
                        }
                    });
                    return stickies;
                })}

            </div>
            );
    },



    deselectNode: function (e) {
       StickyActions.deselect(e, this.state.selectedNode.node);
    },
    onMove: function (e) {
        this._onMove(e);
        //TODO manage the ghost
//        var mouseX = e.touches ? e.touches[0].clientX : e.clientX;
//        var mouseY = e.touches ? e.touches[0].clientY : e.clientY;
//        var x = (mouseX / this.state.scale ) - this.state.offsetX;
//        var y = (mouseY / this.state.scale ) - this.state.offsetY;
        //this.state.selectedNode.currentCell = StickyPositionHelperManager.getCells(x, y, this.state);
        //StickyPositionHelperManager.buildRegion(this.state.selectedNode.currentCell);
    }
});

module.exports = Kanban;
