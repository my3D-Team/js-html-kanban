"use strict";

/**
 * This class builds the new Kanban.
 *
 * @author $Author$
 */
var React = require('react');

var StickyDragManager = require('./mixins/StickyDragMixin');
var StickyStore = require('./sticky/stores/StickyStore');

var Sticky = require('./sticky/components/Sticky.react');
var Column = require('./Column.react');
var UserRow = require('./UserRow.react');

var Kanban = React.createClass({

    mixins: [StickyDragManager],
    getInitialState: function () {
        var retval = {};
        retval.columns = Columns;
        retval.users = ProjectUsers;
        retval.scale = 1;
        return retval
    },

    componentDidMount: function () {
        StickyStore.addSelectListener(this._onSelectItem);
        StickyStore.addDeselectListener(this._onDeselectItem);
    },
    componentWillUnmount: function () {
        StickyStore.removeSelectListener(this._onSelectItem);
        StickyStore.removeDeselectListener(this._onDeselectItem);
    },
    render: function () {
        var color = "#f9f9f9",
            y = 0;

        return (
            <div className="kanban"  onTouchEnd={this._onDeselectItem} onMouseUp={this._onDeselectItem} onTouchMove={this._onMove} onMouseMove={this._onMove} >

                {this.state.users.map(function (item, i) {
                        color = color === "white" ? "#f9f9f9" : "white";
                        y += 150;
                        return (<UserRow x="425" y={y} item={item} key={i}> </UserRow>);
                    }
                )}

            {this.state.columns.map(function (item, i) {
                    color = color === "white" ? "#f9f9f9" : "white";
                    return (<Column height={y + 150} color={color} title={item.type} key={i}> </Column>);
                }
            )}

                <Sticky x="75" y="100" className="info"></Sticky>
                <Sticky x="75" y="150" className="default"></Sticky>
                <Sticky x="75" y="200" className="danger"></Sticky>
                <Sticky x="75" y="250" className="success"></Sticky>
                <Sticky x="75" y="300" className="warn"></Sticky>


            </div>
            );
    }
});

module.exports = Kanban;