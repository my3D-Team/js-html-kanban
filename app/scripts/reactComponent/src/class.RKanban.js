"use strict";

/**
 * This class builds the new Kanban.
 *
 * @author $Author$
 */
var Kanban = React.createClass({

    mixins : [Draggable],
    getInitialState: function () {
        return {}
    },
    render: function() {
        return (
            <div >
                <div className="kanban" onMouseUp={this.onMouseUp} onMouseMove={this.onMove} >
                    <Sticky className="warn" onSelect={this.onSelectItem} onDeselect={this.onDeselectItem}></Sticky>
                    <Sticky className="info" onSelect={this.onSelectItem} onDeselect={this.onDeselectItem}></Sticky>
                    <Sticky className="default" onSelect={this.onSelectItem} onDeselect={this.onDeselectItem}></Sticky>
                    <Sticky className="danger" onSelect={this.onSelectItem} onDeselect={this.onDeselectItem}></Sticky>
                    <Sticky className="success" onSelect={this.onSelectItem} onDeselect={this.onDeselectItem}></Sticky>
                </div>
            </div>
            );
    }
});
