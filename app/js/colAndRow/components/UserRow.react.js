"use strict";

/**
 * This class manage a User component
 *
 * @author $Author$
 */
var React = require('react');

// Components
var EditableText = require('../../common/components/EditableText.react');

// Actions
var ColAndRowActions = require('./../../colAndRow/actions/ColAndRowActions');

var UserRow = React.createClass({

    getInitialState: function () {
        return {displayOrder: 0};
    },

    render: function () {
        var css = {
            top: this.props.y + "px",
            left: this.props.x + "px"
        };

        return (
            <div className="row" style={css}>
                <EditableText value={this.props.item.firstName} type={Labels.NODE_TYPE.ROW} nodeId={this.props.item.id}  callback={ColAndRowActions.changeTitle} />
            </div>
        );
    }
});

module.exports = UserRow;