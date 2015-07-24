"use strict";

/**
 * This class manage a Column component
 *
 * @author $Author$
 */
var Column = React.createClass({
    getInitialState : function () {
        return {displayOrder: 0};
    },
    render: function() {
        var css = {
            top: this.props.y,
            left: this.props.x,
            backgroundColor: this.props.color
        }
        return (
            <div>
            <div className="column" style={css}> </div>
            </div>
            );
    }
});