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
        retval.columns = [];

        retval.columns[0] = {
            title: "ToDo",
            displayOrder: 0
        };

        retval.columns[1] = {
            title: "WIP",
            displayOrder: 1
        };

        retval.columns[2] = {
            title: "WIP",
            displayOrder: 2
        };
        retval.scale=1;
        return retval
    },
    deselectAll: function (e) {
        if (this.state.selectedNode) {
            this.onDeselectItem(e)
        } else {
            this.props.dragBoard.onDeselectItem(e);
        }
    },
    render: function() {
        var x = 150,
            y = 0;
        var color = "#f9f9f9";

        return (
                <div className="kanban" onMouseUp={this.deselectAll} onMouseLeave={this.deselectAll} onMouseDown={this.props.dragBoard.onSelectItem} onMouseMove={this.onMove} >
                    <Column x="0" y="0" title="Backlog"></Column>
                {this.state.columns.map(function (item, i) {
                        x += 300;
                        color = color === "white" ? "#f9f9f9" : "white";
                        return (<Column  color={color} x={x} y={y} title={item.title} key={i}> {item.title}</Column>);
                    }
                )}
                    <Sticky x="50px" y="50px" className="warn" dragBoard={this} ></Sticky>
                    <Sticky x="50px" y="100px" className="info" dragBoard={this}></Sticky>
                    <Sticky x="50px" y="150px" className="default" dragBoard={this}></Sticky>
                    <Sticky x="50px" y="200px" className="danger" dragBoard={this}></Sticky>
                    <Sticky x="50px" y="250px" className="success" dragBoard={this}></Sticky>
                </div>
            );
    }
});
