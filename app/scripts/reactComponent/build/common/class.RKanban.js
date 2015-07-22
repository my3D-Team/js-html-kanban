"use strict";

/**
 * This class builds the react Application.
 *
 * @author $Author$
 */
var Kanban = React.createClass({displayName: "Kanban",

    getInitialState : function () {
        return {};
    },

    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("div", {className: "kanban"}, 
                    React.createElement(Sticky, null)
                )
            )
            );
    }
});
