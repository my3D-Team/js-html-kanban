"use strict";

/**
 * This class manage a StickyNote component
 *
 * @author $Author$
 */
var React = require('react');

var StickyMixin = require('../mixins/StickyMixin');
var StickyActions = require('../actions/StickyActions.js');
var StickyStore = require('../stores/StickyStore');
var _ = require('lodash');


var Sticky = React.createClass({
    mixins: [StickyMixin],

    getInitialState: function () {
        return {
            position: {}
        }
    },

    componentWillMount: function () {
        this.state.position = {
            x: this.props.sticky.position.x,
            y: this.props.sticky.position.y
        };
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
            width: width + "px"
        };
        return (
            <div className={this.props.sticky.content.stickyCode + " sticky"} style={css} onTouchStart={this._onSelect}
                 onTouchEnd={this._onDeselect} onMouseDown={this._onSelect} onMouseUp={this._onDeselect}>
                <i onClick={this._toggleEditMode} onMouseDown={this._stopPropagation}
                   onToucheStart={this._stopPropagation} className="fa fa-pencil edit"></i>

                <div className="sticky-title-wrapper">
                    <div className="sticky-title">{title}</div>
                </div>
            </div>
        );
    },

    _onSelect: function (e) {
        StickyActions.select(e, this);
    },

    _onDeselect: function (e) {
        StickyActions.deselect(e, this);
    },

    _stopPropagation: function (e) {
        e.stopPropagation();
    },

    setPositions: function (newX, newY) {
        var newPositions = {x: newX, y: newY};
        this.setState({position: newPositions});
    }

});

module.exports = Sticky;