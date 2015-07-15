define(['underscore'], function () {
    'use strict';

    var instance,
        Canvas,
        OPTIONS = {
            width: 800,
            height: 600
        };

    Canvas = function () {
        if (instance) {
            return instance;
        }
        this.el = document.createElement('canvas');
        this.el.width = OPTIONS.width;
        this.el.height = OPTIONS.height;
        this._ctx = this.el.getContext('2d');
        this._render();
        instance = this;
    };

    Canvas.prototype = {
        constructor: Canvas,
        _render: function() {
            if (!instance) {
                return false;
            }
            requestAnimationFrame(this._render);
        },
        destroy: function () {
            instance = null;
        }
    };

    return Canvas;
});
