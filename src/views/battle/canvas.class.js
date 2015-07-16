define(['underscore'], function () {
    'use strict';

    var instance,
        Canvas,
        ctx,
        OPTIONS = {
            width: 800,
            height: 608
        };

    var imgForest = new Image();
    imgForest.src = '/tank.png';
    var imgForest2 = new Image();
    imgForest2.src = '/tank2.png';
    var o = new Image();
    o.src = '/oriol.png';
    var o2 = new Image();
    o2.src = '/oriol2.png';

    Canvas = function () {
        if (instance) {
            return instance;
        }
        instance = this;
        this.el = document.createElement('canvas');
        this.el.width = OPTIONS.width;
        this.el.height = OPTIONS.height;
        ctx = this.el.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        this._render();
    };


    var radius = 150;
    var f = 0;
    var t = 0;
    var s = Date.now(); //Вычислим угол

    Canvas.prototype = {
        constructor: Canvas,
        _render: function() {
            if (!instance) {
                return false;
            }
            f += (Date.now() - s)/500;
            t += (Date.now() - s)/20;

            this._clearScene();
            ctx.drawImage((Math.sin(t)<0)? imgForest: imgForest2, 200, 200+ radius * Math.cos(f), 32, 32);
            ctx.drawImage((Math.sin(t)<0)? o: o2, 200, 200+ radius * Math.cos(f), 32, 32);


            s = Date.now();
            requestAnimationFrame(this._render.bind(this));
        },
        _clearScene: function() {
            ctx.clearRect(0, 0, this.el.width, this.el.height);
            ctx.fillStyle = '#111';
            ctx.fillRect(0, 0, this.el.width, this.el.height);

        },
        destroy: function () {
            instance = ctx = null;
        }
    };

    return Canvas;
});
