"use strict";

/**
 * This class manage a StickyNote component
 *
 * @author $Author$
 */
var React = require('react');

var StickyManager = require('../../mixins/StickyMixin');
var StickyActions = require('../actions/StickyActions.js');

var Sticky = React.createClass({
    mixins: [StickyManager],
    getInitialState: function () {
        return {isZoomed: false, offsetX: 0, offsetY: 0};
    },
    render: function () {
        var css = {
            top: this.props.y + "px",
            left: this.props.x + "px"
        }
        return (
            <div className={this.props.className + " sticky"}  style={css} onTouchStart={this._onSelect} onTouchEnd={this._onDeselect} onMouseDown={this._onSelect} onMouseUp={this._onDeselect} >
                <i  onClick={this._toggleEditMode} onMouseDown={this._stopPropagation} onToucheStart={this._stopPropagation} className="fa fa-pencil edit"></i>
            </div>
            );
    },

    _onSelect: function (e) {
        StickyActions.select(e);

    },
    _onDeselect: function (e) {
        StickyActions.deselect(e);
    },

    _stopPropagation: function (e) {
        e.stopPropagation();
    }

});

module.exports = Sticky;