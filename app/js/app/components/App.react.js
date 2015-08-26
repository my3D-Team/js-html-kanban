"use strict";

/**
 * This class builds the react Application.
 *
 * @author $Author$
 */

var React = require('react');

var Header = require('../../Header.react');
var Kanban = require('../../kanban/components/Kanban.react');

var KanbanModel = require('./../../kanban/model/KanbanModelBuilder');
// Stores
var KanbanStore = require('../../kanban/stores/KanbanStore');
var StickyStore = require('../../sticky/stores/StickyStore');

var AppActions = require('../actions/AppActions');

var App = React.createClass({

    getInitialState: function () {
        var model = {};
        model.selectedZZ = {};
        return model;
    },
    componentWillMount: function () {

        this.state.selectedZZ = KanbanModel.initModel(KanbanData);
    },

    render: function () {

        var kanban;

        if (this.state.selectedZZ) {
            kanban = (<Kanban model={this.state.selectedZZ} ></Kanban>);
        }

        return (
            <div>

                <Header></Header>
            {kanban}
                
            </div>
            );
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
