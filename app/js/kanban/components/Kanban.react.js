"use strict";


//util
var EventHelper = require('../../util/EventHelper');
var _ = require('lodash');
var React = require('react');
//Mixins
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
var CollapseStickiesButton = require('./../../sticky/components/CollapseStickiesButton.react');


/**
 * This class builds the new Kanban.
 * @author $Author$
 */
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

    /**
     *     init before first render
     */
    componentWillMount: function () {
        KanbanActions.changeModel(this.props.model);
        this.onChange();
    },

    /**
     *  init after render when the component physicaly exist
     */
    componentDidMount: function () {
        KanbanStore.addChangeListener(this.onChange);
        StickyStore.addChangePositionListener(this.changeSticky);
    },

    /**
     * Before destroy the component
     */
    componentWillUnmount: function () {
        KanbanStore.removeChangeListener();
        StickyStore.removeChangePositionListener();
    },

    /**
     * CallBack Kanban listener
     * @param e
     */
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

    /**
     * CallBack Sticky listener
     * @param e
     */
    changeSticky: function () {
        this.setState({stickies: StickyStore.getStickies()});
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
            backlog = (<Column height={height} color={color} title={Labels.BACKLOG}> </Column>);
        }

        return (
            <div>
                <div className="kanban" style={kanbanCss} onTouchMove={this._onMove} onMouseMove={this._onMove}
                onTouchEnd={this._deselectNode}
                onMouseUp={this._deselectNode}>

                    <CollapseStickiesButton />
                    {backlog}

                    {this.state.rows.map(function (row, i) {
                            y += 150;
                            return (<UserRow x={x} y={y} item={row} key={i}> </UserRow>);
                        }
                    )}

                    {this.state.columns.map(function (column, i) {
                            color = color === "white" ? "#f9f9f9" : "white";
                            return (<Column height={y + 150} color={color} title={column.type} key={i}
                                            item={column}> </Column>);
                        }
                    )}

                    {this.state.stickies.map(function (sticky, i) {
                        var ref = "sticky" + sticky.nodeId;
                        return (<Sticky x={sticky.position.x} y={sticky.position.y} height={sticky.dimension.height}
                                        zIndex={sticky.zIndex} sticky={sticky} ref={ref} key={i}/>);
                    })}


                    <Ghost ref="ghost"/>
                    <AddStickyButton ref="addSticky"/>


                </div>


                <div className="zoom-in tools" onClick={this._zoomIn}>
                    <i className="fa fa-plus"></i>
                </div>
                <div className="zoom-out tools" onClick={this._zoomOut}>
                    <i className="fa fa-minus"></i>
                </div>
                <div className="html2canvas tools" onClick={this._generateCanvas}>
                    <i className="fa fa-picture-o"></i>
                </div>

            </div>
        );
    },

    _deselectNode: function (e) {
        StickyActions.deselect(e, this.state.selectedNode.node);

        // Hide ghost
        this.refs.ghost.hide();
    },

    _onMove: function (e) {
        var selectedNode = this.state.selectedNode;

        var mouseX = EventHelper.getAttr(e, "pageX");
        var mouseY = EventHelper.getAttr(e, "pageY");
        var x = mouseX / KanbanStore.getScale();
        var y = (mouseY / KanbanStore.getScale()) - Constants.TOPBAR.HEIGHT;

        //Selected Node action
        if (selectedNode.domNode) {
            //move selectedNode
            this._onMoveSticky(e);

            // display ghost
            this.refs.ghost.manageGhost(x, y);
            this.refs.addSticky.hide();

            //Hover action
        } else {
            this.refs.addSticky.setPosition(x, y);
        }
    },

    _zoomIn: function (e) {
        KanbanActions.scale(this.state.scale + 0.1);
    },

    _zoomOut: function (e) {
        KanbanActions.scale(this.state.scale - 0.1);
    },

    _generateCanvas: function () {
        html2canvas(document.body, {
            onrendered: function (canvas) {
                var w = window.open();
                w.document.body.appendChild(canvas);
            }
        });
    }
});

module.exports = Kanban;
