/**
 * This class builds the react Application.
 *
 * @author $Author$
 */

var App = React.createClass({

    getInitialState : function () {
        return {};
    },

    render: function() {
        return (
            <div>
                <Header></Header>
                <Kanban></Kanban>
            </div>
            );
    }
});
