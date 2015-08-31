"use strict";

var React = require('react');
var PreviewActions = require('../actions/PreviewActions')
var ZoomZoneLabelManager = require('../../util/ZoomZoneLabelManager');

var Preview = React.createClass({
    getInitialState: function () {
        return {};
    },

    getFooter: function () {
        return (  <div className="preview-infos">
            <div className="caption">
                <p>et moi un footer</p>
            </div>
        </div>);
    },

    render: function () {

           var title = ZoomZoneLabelManager.getLabelFromZoomType(this.props.model.zoomType);

        return (
            <div className="preview" onClick={this._onClick} >
                <div className="dummy"></div>
                <div className="preview-title">
                    <div className="caption">
                        <p>{title} &#62; {this.props.model.title}</p>
                    </div>
                </div>
                <div className="preview-core">
                    <img src={this.props.model.url} />
                </div>
                <div className="preview-infos">
                    <img className="graph" src="media/icons/noun_182806_cc.png"/>
                </div>
                <div className="preview-footer">
                    <p>Kanban &#62; lkdsfmlskd</p>
                    <span>
                        <img className="minicon" src="media/icons/noun_32407_cc.png"/> 6
                        <img className="minicon" src="media/icons/noun_120272_cc.png"/> 67 stickies
                        <img className="minicon" src="media/icons/noun_80189.png"/> 14 bugs
                        <img className="minicon" src="media/icons/noun_13429_cc.png"/> 16.25j
                        <img className="minicon" src="media/icons/noun_16498_cc.png"/> 5.75j
                    </span>
                </div>
            </div>
            );
    },

    _onClick: function () {
        PreviewActions.openZZ(this.props.id);
    }
});


module.exports = Preview;