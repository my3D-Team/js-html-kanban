"use strict"

/**
 * This class builds the header menu
 *
 * @author $Author$
 */
var React = require('react');

var Header = React.createClass({
    getInitialState: function () {
        return {isZoomed: false};
    },
    render: function () {
        return (
            <div className="header">
                <div className="topBar">


                </div>
            </div>
            );
    }
});
module.exports = Header;
