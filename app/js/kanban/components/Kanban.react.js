"use strict";

/**
 * This class builds the new Kanban.
 *
 * @author $Author$
 */
var React = require('react');

var DragMixin = require('./../mixins/DragMixin');
var DataManager = require('./../mixins/KanbanDataMixin');

// Stores
var AppStore = require('../../app/stores/AppStore');
var KanbanStore = require('../stores/KanbanStore');
var ColAndRowStore = require('../../colAndRow/stores/ColAndRowStore');
var StickyStore = require('../../sticky/stores/StickyStore');

// Actions
var StickyActions = require('../../sticky/actions/StickyActions.js');

// Components
var Sticky = require('./../../sticky/components/Sticky.react');
var Ghost = require('./../../sticky/components/Ghost.react');
var UserRow = require('./../../colAndRow/components/UserRow.react');
var Column = require('./../../colAndRow/components/Column.react');

var KanbanModel = require('./../model/KanbanModel.js');

var _ = require('lodash');

var Kanban = React.createClass({

    mixins: [DragMixin],

    getInitialState: function () {
        var retval = {};
        retval.scale = 1;
        retval.selectedNode = KanbanStore.getSelectedNode();
        retval.backlog = KanbanStore.isBacklog();
        retval.rows = ColAndRowStore.getRows();
        retval.columns = ColAndRowStore.getColumns();
        retval.stickies = StickyStore.getStickies();
        return retval
    },

    componentDidMount: function () {
        KanbanStore.addChangeListener(this.onChange);
        var model = KanbanModel.getModel();
        AppStore.initStores(model);
        this.onChange();
    },

    componentWillUnmount: function () {
        KanbanStore.removeChangeListener();
    },

    onChange: function (e) {
        this.setState({
            selectedNode: KanbanStore.getSelectedNode(),
            scale: KanbanStore.getScale(),
            rows: ColAndRowStore.getRows(),
            columns: ColAndRowStore.getColumns(),
            stickies: StickyStore.getStickies(),
            backlog: KanbanStore.isBacklog()
        });
    },

    render: function () {
        var color = "white",
            x = 25,
            y = 0,
            backlog = {},
            kanbanCss = {
                transform: "scale(" + this.state.scale + ", " + this.state.scale + ")"
            };

        if (this.state.backlog) {
            x = 400;
            var height = this.state.rows.length * Constants.ROW.HEIGHT;
            backlog = (<Column height={height} color={color} title={Labels.BACKLOG}> </Column>);
        }

        return (
            <div className="kanban" style={kanbanCss} onTouchMove={this.onMove} onMouseMove={this.onMove}
                 onTouchEnd={this.deselectNode}
                 onMouseUp={this.deselectNode}>

                {backlog}

                {this.state.rows.map(function (row, i) {
                        y += 150;
                        return (<UserRow x={x} y={y} item={row} key={i}> </UserRow>);
                    }
                )}

                {this.state.columns.map(function (column, i) {
                        color = color === "white" ? "#f9f9f9" : "white";
                        return (<Column height={y + 150} color={color} title={column.type} key={i}> </Column>);
                    }
                )}

                {this.state.stickies.map(function (sticky, i) {
                    return (<Sticky sticky={sticky} key={i}/>);
                })}

                <Ghost ref="ghost" />

            </div>
        );
    },


    deselectNode: function (e) {
        StickyActions.deselect(e, this.state.selectedNode.node);

        // Hide ghost
        this.refs.ghost.hide();
    },

    onMove: function (e) {
        this._onMove(e);

        // display ghost
        if(!_.isNull(this.state.selectedNode.node) && !_.isNull(this.state.selectedNode.node.state.position)) {
            var mouseX = e.touches ? e.touches[0].pageX : e.pageX;
            var mouseY = e.touches ? e.touches[0].pageY : e.pageY;

            var x = mouseX / KanbanStore.getScale();
            var y = (mouseY / KanbanStore.getScale()) - Constants.TOPBAR.HEIGHT;

            this.refs.ghost.manageGhost(x, y);
        }
    }
});

module.exports = Kanban;
