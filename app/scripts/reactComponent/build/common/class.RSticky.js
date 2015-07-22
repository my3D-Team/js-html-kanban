"use strict";

/**
 * This class builds the react Application.
 *
 * @author $Author$
 */
var Sticky = React.createClass({displayName: "Sticky",

    getInitialState : function () {
        return {};
    },

    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("div", {className: "sticky"}, " ")
            )
            );
    }
});
