"use strict";

/**
 * This class builds the new Kanban.
 *
 * @author $Author$
 */
var Kanban = React.createClass({

    mixins : [StickyDragManager],
    getInitialState: function () {
        var retval = {};
        retval.columns = Columns;
        retval.users = ProjectUsers;
        retval.scale=1;
        return retval
    },
    render: function() {
        var color = "#f9f9f9",
            y = 0;

        return (
            <div className="kanban" onMouseUp={this.onDeselectItem} onMouseMove={this.onMove} >

                {this.state.users.map(function (item, i) {
                        color = color === "white" ? "#f9f9f9" : "white";
                        y += 150;

                        return (<User x="425" y={y} item={item} key={i}> </User>);
                    }
                )}

                {this.state.columns.map(function (item, i) {
                        color = color === "white" ? "#f9f9f9" : "white";
                        return (<Column height={y + 150} color={color} title={item.type} key={i}> </Column>);
                    }
                )}

                <Sticky x="75" y="100" className="info" dragBoard={this}></Sticky>
                <Sticky x="50" y="150" className="default" dragBoard={this}></Sticky>
                <Sticky x="50" y="200" className="danger" dragBoard={this}></Sticky>
                <Sticky x="50" y="250" className="success" dragBoard={this}></Sticky>
                <Sticky x="50" y="300" className="warn" dragBoard={this} ></Sticky>
            </div>
            );
    }
});
