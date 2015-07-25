"use strict"

/**
 * This class builds the react Application.
 *
 * @author $Author$
 */

var App = React.createClass({
    mixins:[Scallable],

    getInitialState : function () {
        return {};
    },

    render: function() {
        return (
            <div >
                <Header></Header>
                <Kanban ref="scallable" ></Kanban>
                <input className="zoom" type="range" min="60" max="200" defaultValue="100" onChange={this.manageZoom} step="10" />
            </div>
            );
    }
});
