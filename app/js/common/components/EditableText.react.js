/**
 * Created by gadarras on 25/08/2015.
 */
"use strict";

var React = require('react');

var EditableText = React.createClass({

    getInitialState: function () {
        return ({inputValue: ""});
    },

    componentWillMount: function () {
        this.state.inputValue = this.props.value;
    },

    changeInputValue: function (newValue) {
        var value = newValue.currentTarget.value;
        this.setState({inputValue: value});
    },

    saveData: function(){
        this.props.callback(this.props.nodeId, this.state.inputValue, this.props.type);
    },

    render: function () {

        return (
            <input type="text" className="editable-text-input" value={this.state.inputValue}
                   onChange={this.changeInputValue} onBlur={this.saveData}/>
        );
    }

});

module.exports = EditableText;