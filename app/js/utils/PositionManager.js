/**
 * Created by gadarras on 19/08/2015.
 */
"use strict";

var PositionManager = {

    getPositionFromCell: function (cellX, cellY, main) {
        var position = {};

        position.x = cellX * (Constants.COLUMN.WIDTH + Constants.COLUMN.MARGE) + Constants.COLUMN.MARGE + Constants.STICKY.PADDING;
        position.y = cellY * Constants.ROW.HEIGHT + Constants.STICKY.MARGE_TOP + Constants.STICKY.PADDING_TOP;

        if (main.backlog) {
            position.x += Constants.BACKLOG.MARGE_LEFT;
        }

        return position;
    }

};

module.exports = PositionManager;