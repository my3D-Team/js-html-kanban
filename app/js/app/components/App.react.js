"use strict";

/**
 * This class builds the react Application.
 *
 * @author $Author$
 */

var React = require('react');

var Header = require('../../Header.react.js');
var Kanban = require('../../kanban/components/Kanban.react.js');

var AppActions = require('../actions/AppActions')

var App = React.createClass({

    render: function () {
        return (
            <div>

                <Header></Header>
                <Kanban></Kanban>
                <input className="zoom" type="range" min="60" max="200" defaultValue="100" onChange={this._manageZoom} step="10" />
                <div className="html2canvas" onClick={this.generateCanvas}>
                    <i className="fa fa-picture-o "></i>
                </div>
            </div>
            );
    },
    _manageZoom: function (e) {
        AppActions.scale(e.currentTarget.value / 100);
    },

    generateCanvas: function () {
        html2canvas(document.body, {
            onrendered: function (canvas) {
                var w = window.open();

                w.document.body.appendChild(canvas);

//                document.body.appendChild(canvas);
            }
        });
    }


});

module.exports = App;
