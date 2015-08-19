"use strict";

/**
 * This class builds the react Application.
 *
 * @author $Author$
 */

var React = require('react');

var Header = require('./../Header.react.js');
var Kanban = require('./../kanban/components/Kanban.react.js');
var Scalable = require('./../mixins/ScalableMixin');

var App = React.createClass({
    mixins:[Scalable],

    render: function() {
        return (
             <div>
                <Header></Header>
                <Kanban ref="scalable" ></Kanban>
                <input className="zoom" type="range" min="60" max="200" defaultValue="100" onChange={this.manageZoom} step="10" />
            </div>
            );
    }
});

module.exports = App;
