/**
 * This class builds the react Application.
 *
 * @author $Author$
 */

var App = React.createClass({displayName: "App",

    getInitialState : function () {
        return {};
    },

    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement(Header, null), 
                React.createElement(Kanban, null)
            )
            );
    }
});
