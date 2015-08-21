"use strict";

/**
 * This class manage a StickyNote component
 *
 * @author $Author$
 */
var React = require('react');

var StickyMixin = require('../mixins/StickyMixin');
var StickyActions = require('../actions/StickyActions.js');

// Stores
var StickyStore = require('../stores/StickyStore');
var ColAndRowStore = require('../../colAndRow/stores/ColAndRowStore');

var _ = require('lodash');


var Sticky = React.createClass({
    mixins: [StickyMixin],

    getInitialState: function () {
        return {
            position: {},
            zIndex: 0
        }
    },

    componentDidMount: function () {
        StickyStore.addChangePositionListener(this.changePosition);
        StickyStore.positionSticky(this.props.sticky);
    },

    componentWillUnmount: function () {
        StickyStore.removeChangePositionListener();
    },

    changePosition: function(){
        var sticky = StickyStore.findStickyById(this.props.sticky.content.id);
        this.setState({
            position: sticky.position,
            zIndex: sticky.zIndex
        })
    },

    getTitle: function () {
        var title = "";
        _.each(this.props.sticky.content.values, function (value) {
            if (value.type === "title") {
                title = value.value;
                return;
            }
        });
        return title;
    },

    render: function () {
        var width = Constants.COLUMN.WIDTH - 2 * Constants.STICKY.PADDING,
            title = this.getTitle();

        var css = {
            top: this.state.position.y + "px",
            left: this.state.position.x + "px",
            width: width + "px",
            zIndex: this.state.zIndex
        };
        return (
            <div className={this.props.sticky.content.stickyCode + " sticky"} style={css} onTouchStart={this._onSelect}
                 onTouchEnd={this._onDeselect} onMouseDown={this._onSelect} onMouseUp={this._onDeselect}>
                <div className="sticky-title-wrapper">
                    <div className="sticky-title">{title}</div>
                </div>
            </div>
        );
    },

    _onSelect: function (e) {
        this.state.hasMove = false;
        StickyActions.select(e, this);
    },

    _onDeselect: function (e) {
        if (!this.state.hasMove) {
            this._toggleEditMode(e);
        }
        StickyActions.deselect(e, this);
    },

    _stopPropagation: function (e) {
        e.stopPropagation();
    }

});

module.exports = Sticky;