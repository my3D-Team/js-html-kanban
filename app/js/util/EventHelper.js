/**
 * Created by ndamie on 21/08/2015.
 */
"use strict";


var EventHelper = {

    getAttr: function (e, attr) {

        if (e[attr]) {
            return e[attr];
        }
        if (e.touches && e.touches.length > 0) {
            return e.touches[0][attr];
        }
        if (e.changedTouches && e.changedTouches[0]) {
            return e.changedTouches[0][attr];
        }

        console.warn("attr : " + attr + " not available in this event.", e)
    }

}

module.exports = EventHelper;

