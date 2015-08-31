"use strict";

var React = require('react');
var Preview = require('./Preview.react.js');


/**
 * This class builds the scene overview
 *
 * @author $Author$
 */
var OverView = React.createClass({
    getInitialState: function () {
        return {};
    },

    render: function () {
        return (
            <div className="overview" >
            {this.props.model.map(function (zz, i) {
                return (<Preview id={zz.nodeId} model={zz} key={i}> </Preview>);
            })}
            </div>
            );
    }
});


module.exports = OverView;