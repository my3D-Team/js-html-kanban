"use strict";

/**
 * This class manage a Column component
 *
 * @author $Author$
 */
var React = require('react');

var Column = React.createClass({
    getInitialState: function () {
        return {displayOrder: 0};
    },
    render: function () {
        var css = {
            height: this.props.height,
            backgroundColor: this.props.color
        }
        return (
            <div className="column" style={css}>
                <h3>{this.props.title}</h3>
            </div>
            );
    }
});

module.exports = Column;
