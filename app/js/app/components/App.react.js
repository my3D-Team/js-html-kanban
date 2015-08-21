"use strict";

/**
 * This class builds the react Application.
 *
 * @author $Author$
 */

var React = require('react');

var Header = require('../../Header.react.js');
var Kanban = require('../../kanban/components/Kanban.react.js');
var KanbanStore = require('../../kanban/stores/KanbanStore')

var AppActions = require('../actions/AppActions')

var App = React.createClass({

    render: function () {
        return (
            <div>

                <Header></Header>
                <Kanban></Kanban>

                <div className="zoom-in tools" onClick={this.zoomIn}>
                    <i className="fa fa-plus"></i>
                </div>
                <div className="zoom-out tools" onClick={this.zoomOut}>
                    <i className="fa fa-minus"></i>
                </div>
                <div className="html2canvas tools" onClick={this.generateCanvas}>
                    <i className="fa fa-picture-o"></i>
                </div>
            </div>
            );
    },
    zoomIn: function (e) {
        AppActions.scale(KanbanStore.getScale() + 0.1);
    },

    zoomOut: function (e) {
        AppActions.scale(KanbanStore.getScale() - 0.1);
    },

    generateCanvas: function () {
        html2canvas(document.body, {
            onrendered: function (canvas) {
                var w = window.open();
                w.document.body.appendChild(canvas);
            }
        });
    }


});

module.exports = App;
