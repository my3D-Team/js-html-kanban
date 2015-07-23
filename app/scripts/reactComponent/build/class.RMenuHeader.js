"use strict"

/**
 * This class builds the header menu
 *
 * @author $Author$
 */
var Header = React.createClass({displayName: "Header",
    getInitialState: function () {
        return {isZoomed: false};
    },
    render: function () {
        return (
            React.createElement("div", {className: "header"}, 
                React.createElement("div", {className: "topBar"}


                )
            )
            );
    }
});
