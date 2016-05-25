"use strict";

var React = require('react');
var _ = require('lodash');

var PreviewActions = require('../actions/PreviewActions')
var ZoomZoneLabelManager = require('../../util/ZoomZoneLabelManager');

var Preview = React.createClass({
    getInitialState: function () {
        return {};
    },


    render: function () {

        var title = ZoomZoneLabelManager.getLabelFromZoomType(this.props.model.zoomType);

        return (
            <div className="preview" onClick={this._onClick} onMouseLeave={this._hideEditZone} >
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
                    <div className="graph-info">

                        <div className="miniwrap">
                            <img className="minicon" src="media/icons/noun_80189.png"/>
                            <span>14 j</span>
                        </div>
                        <div className="miniwrap">
                            <img className="minicon" src="media/icons/noun_13429_cc.png"/>
                            <span>16.25 j</span>
                        </div>
                        <div className="miniwrap">
                            <img className="minicon" src="media/icons/noun_16498_cc.png"/>
                            <span>5.75 j</span>
                        </div>
                    </div>
                </div>
                <div className="preview-edit" ref="previewEdit">
                    <div className="graph-info">
                        <ul className="list" ref="editList">
                            <li className="initLi">
                                edit
                            </li>
                            <li className="initLi">
                                delete
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="preview-footer">
                    <a href="javascript:void(0)" onClick={this._displayEditZone} className="entry-read-more-pointer ripple-effect">
                        <span className="bubble">
                            <span className="fa fa-pencil fa-fw"></span>
                        </span>
                    </a>
                    <p>Kanban &#62; lkdsfmlskd</p>
                    <span>
                        <img className="minicon" src="media/icons/noun_32407_cc.png"/>
                    6
                        <img className="minicon" src="media/icons/noun_120272_cc.png"/>
                    67 stickies
                        <img className="minicon" src="media/icons/noun_80189.png"/>
                    14 bugs
                        <img className="minicon" src="media/icons/noun_13429_cc.png"/>
                    16 features
                        <img className="minicon" src="media/icons/noun_16498_cc.png"/>
                    5 A3
                    </span>
                </div>
            </div>
            );
    },

    _onClick: function () {
        PreviewActions.openZZ(this.props.id);
    },
    _displayEditZone: function (e) {
        e.stopPropagation();

//        $('.rolldown-list li').each(function () {
//            var delay = ($(this).index() / 4) + 's';
//            $(this).css({
//                webkitAnimationDelay: delay,
//                mozAnimationDelay: delay,
//                animationDelay: delay
//            });
//        });

        this.refs.previewEdit.getDOMNode().style.opacity = 1;
        _.each(this.refs.editList.getDOMNode().children, function (el, i) {
                var delay = (i+1) / 4 + 's';
            el.style.webkitAnimationDelay = delay;
            el.style.mozAnimationDelay = delay;
            el.style.animationDelay = delay;
            el.className = " slide-list";
        })
    },
    _hideEditZone: function (e) {
        e.stopPropagation();
        this.refs.previewEdit.getDOMNode().style.opacity = 0;
        _.each(this.refs.editList.getDOMNode().children, function (el, i) {
            el.className = "";
        })
    }
});


module.exports = Preview;