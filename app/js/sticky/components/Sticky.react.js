"use strict";

/**
 * This class manage a StickyNote component
 *
 * @author $Author$
 */
var React = require('react');
var _ = require('lodash');

var StickyMixin = require('./mixins/StickyMixin');
var StickyActions = require('../actions/StickyActions.js');

var Sticky = React.createClass({
    mixins: [StickyMixin],

    getInitialState: function () {
        return {
            position: {},
            zIndex: 0
        }
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

        var top = this.state.position.y ? this.state.position.y : this.props.y;
        var left = this.state.position.x ? this.state.position.x : this.props.x;
        var zIndex = this.state.zIndex ? this.state.zIndex : this.props.zIndex;
        var css = {
            top: top + "px",
            left: left + "px",
            width: width + "px",
            zIndex: zIndex
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
    }
});

module.exports = Sticky;