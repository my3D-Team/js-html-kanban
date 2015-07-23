"use strict";

/**
 * This class builds the new Kanban.
 *
 * @author $Author$
 */
var Kanban = React.createClass({

    mixins : [Draggable],
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
        return retval
    },
    render: function() {
        var x = 150,
            y = 0;
        var color = "#f9f9f9";


        return (
            <div >
                <div className="kanban" onMouseUp={this.onMouseUp} onMouseMove={this.onMove} >
                    <Column x="0" y="0" title="Backlog"></Column>
                    <img src="https://s3.amazonaws.com/uifaces/faces/twitter/sauro/128.jpg" alt="" className="avatar"  />
                    <img src="https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg" alt="" className="avatar"/>
                    <img src="https://s3.amazonaws.com/uifaces/faces/twitter/gerrenlamson/128.jpg" alt="" className="avatar"/>
                {this.state.columns.map(function (item, i) {
                        x += 300;
                        color = color === "white" ? "#f9f9f9" : "white";
                        return (<Column  color={color} x={x} y={y} title={item.title} key={i}> {item.title}</Column>);
                    }
                )}



                    <Sticky x="50px" y="50px" className="warn" onSelect={this.onSelectItem} onDeselect={this.onDeselectItem}></Sticky>
                    <Sticky x="50px" y="100px" className="info" onSelect={this.onSelectItem} onDeselect={this.onDeselectItem}></Sticky>
                    <Sticky x="50px" y="150px" className="default" onSelect={this.onSelectItem} onDeselect={this.onDeselectItem}></Sticky>
                    <Sticky x="50px" y="200px" className="danger" onSelect={this.onSelectItem} onDeselect={this.onDeselectItem}></Sticky>
                    <Sticky x="50px" y="250px" className="success" onSelect={this.onSelectItem} onDeselect={this.onDeselectItem}></Sticky>
                    <Cicle x="550px" y="250px" radius="200" onSelect={this.onSelectItem} onDeselect={this.onDeselectItem}></Cicle>
                </div>
            </div>
            );
    }
});
