/**
 * Created by gadarras on 27/08/2015.
 */
"use strict";

var React = require('react');

// Action
var StickyActions = require('./../actions/StickyActions');

var CollapseStickiesButton = React.createClass({

    getInitialState: function(){
        return({checked : true});
    },

    clickOnCheckbox: function(){
        StickyActions.collapse(!this.refs.collapseCheckbox.props.checked);
        this.setState({checked: !this.refs.collapseCheckbox.props.checked});
    },

    render: function(){
        return(
            <div className="checkbox-collapse" onClick={this.clickOnCheckbox}>
                <input ref="collapseCheckbox" checked={this.state.checked} type="checkbox" />Collapse stickies
            </div>
        );
    }

});

module.exports = CollapseStickiesButton;