"use strict";

/**
 * This class manage a User component
 *
 * @author $Author$
 */
var React = require('react');

var UserRow = React.createClass({
    getInitialState: function () {
        return {displayOrder: 0};
    },
    render: function () {
        var css = {
            top: this.props.y + "px",
            left: this.props.x + "px"
        }
        return (
            <div className="row" style={css} >
                <h3>{this.props.item.content.text}</h3>
            </div>
            );
    }
});

module.exports = UserRow;