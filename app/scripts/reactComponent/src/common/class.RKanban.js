"use strict";

/**
 * This class builds the react Application.
 *
 * @author $Author$
 */
var Kanban = React.createClass({

    getInitialState : function () {
        return {};
    },

    render: function() {
        return (
            <div >
                <div className="kanban">
                    <Sticky></Sticky>
                </div>
            </div>
            );
    }
});
