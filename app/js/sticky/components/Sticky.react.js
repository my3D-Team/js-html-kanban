"use strict";

/**
 * This class manage a StickyNote component
 *
 * @author $Author$
 */
var React = require('react');
var _ = require('lodash');

// Mixins
var StickyMixin = require('./mixins/StickyMixin');

// Actions
var StickyActions = require('../actions/StickyActions.js');

// Stores
var StickyStore = require('./../stores/StickyStore');

var Sticky = React.createClass({
    mixins: [StickyMixin],

    getInitialState: function () {
        return {
            position: {},
            dimension: {},
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
        var title = this.getTitle();
        var sticky = {};

        if (StickyStore.areStickiesCollapsed()) {
            sticky = this.getCollapseSticky(title);
        } else {
            sticky = this.getUnCollapseSticky(title);
        }

        return sticky;

    },

    getCollapseSticky: function (title) {

        var width = Constants.STICKY.WIDTH;
        var top = this.state.position.y ? this.state.position.y : this.props.y;
        var left = this.state.position.x ? this.state.position.x : this.props.x;
        var height = Constants.STICKY.HEIGHT.COLLAPSED;
        var zIndex = this.state.zIndex ? this.state.zIndex : this.props.zIndex;
        var css = {
            top: top + "px",
            left: left + "px",
            width: width + "px",
            height: height + "px",
            zIndex: zIndex
        };

        return (
            <div className="sticky" style={css} onTouchStart={this._onSelect}
                 onTouchEnd={this._onDeselect} onMouseDown={this._onSelect} onMouseUp={this._onDeselect}>
                <div className={this.props.sticky.content.stickyCode + " sticky-title-wrapper"}>
                    <div className="sticky-title">{title}</div>
                </div>
            </div>
        );
    },

    getUnCollapseSticky: function (title) {

        var width = Constants.STICKY.WIDTH;
        var top = this.state.position.y ? this.state.position.y : this.props.y;
        var left = this.state.position.x ? this.state.position.x : this.props.x;
        var height = Constants.STICKY.HEIGHT.NOT_COLLAPSED;
        var zIndex = this.state.zIndex ? this.state.zIndex : this.props.zIndex;
        var css = {
            top: top + "px",
            left: left + "px",
            width: width + "px",
            height: height + "px",
            zIndex: zIndex
        };

        return (
            <div className="sticky uncollapse" style={css} onTouchStart={this._onSelect}
                 onTouchEnd={this._onDeselect} onMouseDown={this._onSelect} onMouseUp={this._onDeselect}>
                <div className={this.props.sticky.content.stickyCode + " sticky-title-wrapper"}>
                    <div className="sticky-title">{title}</div>
                </div>
                <div className="sticky-uncollapse-content-wrapper">
                    <div className="sticky-uncollapse-content-cell">
                        <div>3</div>
                        <div>Est</div>
                    </div>
                    <div className="sticky-uncollapse-content-cell">
                        <div>1</div>
                        <div>Con</div>
                    </div>
                    <div className="sticky-uncollapse-content-cell">
                        <div>2</div>
                        <div>ETC</div>
                    </div>
                </div>
                <div className="sticky-uncollapse-bottom-wrapper">
                    <div className="sticky-uncollapse-bottom">titre</div>
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
            //this._toggleEditMode(e);
        }
        StickyActions.deselect(e, this);
    }
});

module.exports = Sticky;