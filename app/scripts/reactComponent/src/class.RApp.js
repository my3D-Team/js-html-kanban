"use strict"

/**
 * This class builds the react Application.
 *
 * @author $Author$
 */

var App = React.createClass({
    mixins:[Scallable, KanbanDragManager],

    getInitialState : function () {
        return {};
    },

    render: function() {
        return (
            <div onMouseMove={this.onMove} >
                <Header></Header>
                <Kanban ref="scallable" dragBoard={this}></Kanban>

                <input className="zoom" type="range" min="100" max="200" defaultValue="100" onChange={this.manageZoom} step="10" />

            </div>
            );
    }
});
