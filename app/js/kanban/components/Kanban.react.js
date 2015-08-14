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
var KanbanModel = require('./../model/KanbanModel.js')

var Kanban = React.createClass({

    mixins: [DragManager],

    getInitialState: function () {
        var retval = {};

        retval.model = KanbanModel.getModel();
        retval.scale = 1;
        return retval
    },

    componentDidMount: function () {
        StickyStore.addSelectListener(this._onSelectItem);
        StickyStore.addDeselectListener(this._onDeselectItem);
    },
    componentWillUnmount: function () {
        StickyStore.removeSelectListener(this._onSelectItem);
        StickyStore.removeDeselectListener(this._onDeselectItem);
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
                    return (
                        <Sticky x={posX} y={posY} className={sticky.content.stickyCode} sticky={sticky} model={model}
                                isInBacklog={true}/>);
                })
        }

        return (
            <div className="kanban" onTouchEnd={this._onDeselectItem} onMouseUp={this._onDeselectItem}
                 onTouchMove={this._onMove} onMouseMove={this._onMove}>

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
                            return (<Sticky x={i} y={j} className={sticky.content.stickyCode} sticky={sticky}
                                            model={model}/>);
                        }
                    });
                    return stickies;
                })}

            </div>
        );
    }
});

module.exports = Kanban;
