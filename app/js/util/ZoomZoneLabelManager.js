
"use strict";

var Labels = require('./Labels');

var ZoomZoneLabelManager = {

    /**
     * get the corresponding label of the zoomType given
     * @param zoomType
     * @returns {string}
     */
    getLabelFromZoomType: function(zoomType){
        var returnValue = "";
        switch (zoomType){
            case Labels.ZOOM_TYPE.WEBVIEW:
                returnValue = Labels.NAME.WEBVIEW;
                break;
            case Labels.ZOOM_TYPE.TICKETING:
                returnValue = Labels.NAME.TICKETING;
                break;
            case Labels.ZOOM_TYPE.KANBAN:
                returnValue = Labels.NAME.KANBAN;
                break;
            case Labels.ZOOM_TYPE.KANBAN_CTF:
                returnValue = Labels.NAME.KANBAN_CTF;
                break;
            case Labels.ZOOM_TYPE.FREE_ZOOM_ZONE:
                returnValue = Labels.NAME.FREE_ZOOM_ZONE;
                break;
            case Labels.ZOOM_TYPE.MY_CANVAS:
                returnValue = Labels.NAME.MY_CANVAS;
                break;
            case Labels.ZOOM_TYPE.MIRROR:
                returnValue = Labels.NAME.MIRROR;
                break;
        }
        return returnValue;
    },

    /**
     * get the corresponding label of the zoomType given
     * @param zoomType
     * @returns {string}
     */
    getBreadcrumbLabelFromZoomType: function(zoomType){
        var returnValue = "";
        switch (zoomType){
            case Labels.ZOOM_TYPE.WEBVIEW:
                returnValue = Labels.MENU.HEADER.BREADCRUMB.NAME.WEBVIEW;
                break;
            case Labels.ZOOM_TYPE.TICKETING:
                returnValue = Labels.MENU.HEADER.BREADCRUMB.NAME.TICKETING;
                break;
            case Labels.ZOOM_TYPE.KANBAN:
                returnValue = Labels.MENU.HEADER.BREADCRUMB.NAME.KANBAN;
                break;
            case Labels.ZOOM_TYPE.KANBAN_CTF:
                returnValue = Labels.MENU.HEADER.BREADCRUMB.NAME.KANBAN_CTF;
                break;
            case Labels.ZOOM_TYPE.FREE_ZOOM_ZONE:
                returnValue = Labels.MENU.HEADER.BREADCRUMB.NAME.FREE_ZOOM_ZONE;
                break;
            case Labels.ZOOM_TYPE.MY_CANVAS:
                returnValue = Labels.MENU.HEADER.BREADCRUMB.NAME.MY_CANVAS;
                break;
            case Labels.ZOOM_TYPE.MIRROR:
                returnValue = Labels.MENU.HEADER.BREADCRUMB.NAME.MIRROR;
                break;
        }
        return returnValue;
    },

    /**
     * get the corresponding label of the classType given
     * @param classType
     * @returns {string}
     */
    getLabelFromClassType: function(classType){
        var returnValue = "";
        switch (classType){
            case Labels.CLASS_TYPE.WEBVIEW:
                returnValue = Labels.NAME.WEBVIEW;
                break;
            case Labels.CLASS_TYPE.TICKETING:
                returnValue = Labels.NAME.TICKETING;
                break;
            case Labels.CLASS_TYPE.KANBAN:
                returnValue = Labels.NAME.KANBAN;
                break;
            case Labels.CLASS_TYPE.KANBAN_CTF:
                returnValue = Labels.NAME.KANBAN_CTF;
                break;
            case Labels.CLASS_TYPE.FREE_ZOOM_ZONE:
                returnValue = Labels.NAME.FREE_ZOOM_ZONE;
                break;
            case Labels.CLASS_TYPE.MY_CANVAS:
                returnValue = Labels.NAME.MY_CANVAS;
                break;
            case Labels.CLASS_TYPE.MIRROR:
                returnValue = Labels.NAME.MIRROR;
                break;
        }
        return returnValue;
    }

};

module.exports = ZoomZoneLabelManager;