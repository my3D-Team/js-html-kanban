"use strict";

/**
 * This class builds the new Kanban.
 *
 * @author $Author$
 */
var React = require('react');

var StickyManager = require('./mixins/KanbanStickyManager');

// Stores
var KanbanStore = require('../stores/KanbanStore');
var ColAndRowStore = require('../../colAndRow/stores/ColAndRowStore');
var StickyStore = require('../../sticky/stores/StickyStore');

// Actions
var StickyActions = require('../../sticky/actions/StickyActions');
var KanbanActions = require('../actions/KanbanActions');

// Components
var Sticky = require('./../../sticky/components/Sticky.react');
var AddStickyButton = require('./../../sticky/components/AddStickyButton.react');
var Ghost = require('./../../sticky/components/Ghost.react');
var UserRow = require('./../../colAndRow/components/UserRow.react');
var Column = require('./../../colAndRow/components/Column.react');

//util
var EventHelper = require('../../util/EventHelper');


var _ = require('lodash');

var Kanban = React.createClass({

    mixins: [StickyManager],

    getInitialState: function () {
        var retval = {};
        retval.scale = KanbanStore.getScale();
        retval.selectedNode = KanbanStore.getSelectedNode();
        retval.backlog = KanbanStore.isBacklog();
        retval.rows = ColAndRowStore.getRows();
        retval.columns = ColAndRowStore.getColumns();
        retval.stickies = StickyStore.getStickies();

        return retval
    },

    componentWillMount: function () {
        KanbanActions.changeModel(this.props.model);
    },

    componentDidMount: function () {
        KanbanStore.addChangeListener(this.onChange);
        StickyStore.addChangePositionListener(this.changeSticky);
        this.onChange();

    },

    componentWillUnmount: function () {
        KanbanStore.removeChangeListener();
        StickyStore.removeChangePositionListener();
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

    changeSticky: function () {
        this.setState({stickies : StickyStore.getStickies()});
    },

    render: function () {
        var color = "white",
            x = 25,
            y = 0,
            backlog,
            kanbanCss = {
                transform: "scale(" + this.state.scale + ", " + this.state.scale + ")"
            };

        if (this.state.backlog) {
            x = 400;
            var height = (this.state.rows.length + 1) * Constants.ROW.HEIGHT;
            backlog = (<Column height={height} color={color} title={Labels.BACKLOG} store={ColAndRowStore}>  </Column>);
        }

        return (
            <div>
                <div className="kanban" style={kanbanCss} onTouchMove={this.onMove} onMouseMove={this.onMove}
                onTouchEnd={this.deselectNode}
                onMouseUp={this.deselectNode}>

            {backlog}

                {this.state.rows.map(function (row, i) {
                        y += 150;
                        return (<UserRow x={x} y={y} item={row} key={i} store={ColAndRowStore}> </UserRow>);
                    }
                )}

                {this.state.columns.map(function (column, i) {
                        color = color === "white" ? "#f9f9f9" : "white";
                        return (<Column height={y + 150} color={color} title={column.type} key={i} item={column} store={ColAndRowStore}> </Column>);
                    }
                )}

                {this.state.stickies.map(function (sticky, i) {
                    var ref = "sticky" + sticky.nodeId;
                    return (<Sticky x={sticky.position.x} y={sticky.position.y} sticky={sticky} ref={ref} key={i}/>);
                })}


                    <Ghost ref="ghost" />
                    <AddStickyButton ref="addSticky" />


                </div>


                <div className="zoom-in tools" onClick={this.zoomIn}>
                    <i className="fa fa-plus"></i>
                </div>
                <div className="zoom-out tools" onClick={this.zoomOut}>
                    <i className="fa fa-minus"></i>
                </div>
                <div className="html2canvas tools" onClick={this.generateCanvas}>
                    <i className="fa fa-picture-o"></i>
                </div>

            </div>
            );
    },

    deselectNode: function (e) {
        StickyActions.deselect(e, this.state.selectedNode.node);

        // Hide ghost
        this.refs.ghost.hide();
    },

    onMove: function (e) {
        this._onMoveSticky(e);

        var mouseX = EventHelper.getAttr(e, "pageX");
        var mouseY = EventHelper.getAttr(e, "pageY");

        var x = mouseX / KanbanStore.getScale();
        var y = (mouseY / KanbanStore.getScale()) - Constants.TOPBAR.HEIGHT;


        // display ghost
        if (!_.isNull(this.state.selectedNode.node) && !_.isNull(this.state.selectedNode.node.state.position)) {
            this.refs.ghost.manageGhost(x, y);
            this.refs.addSticky.hide();
        }else{
            this.refs.addSticky.setPosition(x, y);
        }
    },

    zoomIn: function (e) {
        KanbanActions.scale(this.state.scale + 0.1);
    },

    zoomOut: function (e) {
        KanbanActions.scale(this.state.scale - 0.1);
    },

    generateCanvas: function () {
        html2canvas(document.body, {
            onrendered: function (canvas) {
                var w = window.open();
                w.document.body.appendChild(canvas);
            }
        });
    }
});

module.exports = Kanban;
