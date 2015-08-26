"use strict";

/**
 * This class manage a Column component
 *
 * @author $Author$
 */
var React = require('react');
// Components
var EditableText = require('../../common/components/EditableText.react');

// Actions
var ColAndRowActions = require('./../../colAndRow/actions/ColAndRowActions');

var Column = React.createClass({

    getInitialState: function () {
        return {displayOrder: 0};
    },

    render: function () {
        var css = {
            height: this.props.height,
            backgroundColor: this.props.color
        };

        var nodeId = this.props.item ? this.props.item.nodeId : -1;

        return (
            <div className="column" style={css}>
                <EditableText value={this.props.title} type={Labels.NODE_TYPE.COLUMN} nodeId={nodeId} callback={ColAndRowActions.changeTitle}/>
            </div>
        );
    }
});

module.exports = Column;
