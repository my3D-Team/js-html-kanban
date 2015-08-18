"use strict";

/**
 * This class manage a StickyNote component
 *
 * @author $Author$
 */
var React = require('react');

var StickyManager = require('../mixins/StickyMixin');
var StickyActions = require('../actions/StickyActions.js');
var _ = require('lodash');


var Sticky = React.createClass({
    mixins: [StickyManager],
    getInitialState: function () {
        return {}
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
        var x = this.props.x * (Constants.COLUMN.WIDTH + Constants.COLUMN.MARGE) + Constants.COLUMN.MARGE + Constants.STICKY.PADDING,
            y = this.props.y * Constants.ROW.HEIGHT + Constants.STICKY.MARGE_TOP + Constants.STICKY.PADDING_TOP,
            width = Constants.COLUMN.WIDTH - 2 * Constants.STICKY.PADDING,
            title = this.getTitle();

        if (this.props.model.backlog) {
            if(this.props.isInBacklog){
                x = this.props.x;
                y = this.props.y;
            }else {
                x += Constants.BACKLOG.MARGE_LEFT;
            }
        }

        var css = {
            top: y + "px",
            left: x + "px",
            width: width + "px"
        };
        return (
            <div className={this.props.className + " sticky"} style={css} onTouchStart={this._onSelect}
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
        StickyActions.select(e);

    },
    _onDeselect: function (e) {
        StickyActions.deselect(e);
    },

    _stopPropagation: function (e) {
        e.stopPropagation();
    },

    setPositions: function(){

    }

});

module.exports = Sticky;