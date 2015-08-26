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

                <div className="add_button" onClick={this.onClickAddButton}>
                    <svg xmlns="//www.w3.org/2000/svg" viewBox="0 0 48 48">
                        <path d="M38 26H26v12h-4V26H10v-4h12V10h4v12h12v4z"></path>
                    </svg>
                </div>
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
    },

    onClickAddButton: function(){
        StickyStore.createSticky();
    }

});

module.exports = App;
