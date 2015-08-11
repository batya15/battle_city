define(['underscore', 'jquery', './tank', 'model/tank'], function (_, $, Tank, model) {
    'use strict';

    var instance,
        Canvas,
        ctx,
        OPTIONS = {
            width: 800,
            height: 608
        };
    var MOVE = {
        37: 1,
        38: 2,
        39: 4,
        40: 8
    };

    $(document).on('keydown', function (e) {
        var code = MOVE[e.keyCode];

        if (code) {
                model.move = model.move | code;
                model.rotation = code;
        }
    });

    $(document).on('keyup', function (e) {
        var code = MOVE[e.keyCode];

        if (code) {
            model.move = model.move ^ code;
        }
    });

    var map = [
        [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 1, 1, 4, 4, 4, 4, 0, 0, 2, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 4, 4, 4, 4, 0, 0, 0, 0, 0, 1, 1, 4, 4, 4, 4, 0, 0, 2, 2, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 4, 4, 4, 4, 1, 1, 0, 0, 0, 0, 0, 4, 4, 4, 4, 1, 1, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 0, 0, 2, 2, 0, 0],
        [0, 0, 0, 0, 4, 4, 4, 4, 1, 1, 0, 0, 0, 0, 0, 4, 4, 4, 4, 1, 1, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 0, 0, 2, 2, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 1, 1, 0, 0, 0, 0],
        [0, 0, 2, 2, 0, 0, 0, 0, 4, 4, 0, 0, 0, 2, 2, 0, 0, 0, 0, 4, 4, 4, 4, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 2, 0, 0, 0, 0, 4, 4, 0, 0, 0, 2, 2, 0, 0, 0, 0, 4, 4, 4, 4, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [3, 3, 3, 3, 1, 1, 0, 0, 4, 4, 0, 0, 3, 3, 3, 1, 1, 0, 0, 4, 4, 4, 4, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
        [3, 3, 3, 3, 1, 1, 0, 0, 4, 4, 0, 0, 3, 3, 3, 1, 1, 0, 0, 4, 4, 4, 4, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
        [3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 2, 2, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2],
        [3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 2, 2, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2],
        [0, 0, 1, 1, 4, 4, 4, 4, 0, 0, 0, 0, 0, 1, 1, 4, 4, 4, 4, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 4, 4, 4, 4, 0, 0, 0, 0, 0, 1, 1, 4, 4, 4, 4, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [3, 3, 3, 3, 1, 1, 0, 0, 4, 4, 0, 0, 3, 3, 3, 1, 1, 0, 0, 4, 4, 4, 4, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
        [3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 2, 2, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2],
        [3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 2, 2, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2],
        [0, 0, 1, 1, 4, 4, 4, 4, 0, 0, 0, 0, 0, 1, 1, 4, 4, 4, 4, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 4, 4, 4, 4, 0, 0, 0, 0, 0, 1, 1, 4, 4, 4, 4, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 2, 0, 0, 4, 4, 4, 4, 3, 3, 0, 0, 2, 0, 0, 4, 4, 4, 4, 3, 3, 3, 3, 4, 4, 4, 4, 3, 3, 3, 3, 0, 0, 1, 1, 0, 0],
        [2, 2, 0, 0, 4, 4, 4, 4, 3, 3, 0, 0, 2, 0, 0, 4, 4, 4, 4, 3, 3, 3, 3, 4, 4, 4, 4, 3, 3, 3, 3, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 4, 4, 4, 4, 3, 3, 3, 3, 4, 4, 4, 4, 0, 0],
        [3, 3, 3, 3, 1, 1, 0, 0, 4, 4, 0, 0, 3, 3, 3, 1, 1, 0, 0, 4, 4, 4, 4, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
        [3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 2, 2, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2],
        [3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 2, 2, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2],
        [0, 0, 1, 1, 4, 4, 4, 4, 0, 0, 0, 0, 0, 1, 1, 4, 4, 4, 4, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 4, 4, 4, 4, 0, 0, 0, 0, 0, 1, 1, 4, 4, 4, 4, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 2, 0, 0, 4, 4, 4, 4, 3, 3, 0, 0, 2, 0, 0, 4, 4, 4, 4, 3, 3, 3, 3, 4, 4, 4, 4, 3, 3, 3, 3, 0, 0, 1, 1, 0, 0],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 2, 2, 0, 0, 0, 0]
    ];

    var graph = [];

    map.forEach(function (line, y) {
        graph[y] = []
        line.forEach(function (val, x) {
            graph[y][x] = (map[y][x] || (map[y+1] && (map[y+1][x] || map[y][x+1] || map[y+1][x+1])))
        });
    });

    var tank = new Tank(graph);
    var o = new Image();
    o.src = '/oriol.png';
    var o2 = new Image();
    o2.src = '/oriol2.png';

    var imageList = ['1', '2', '3', '4'],
        image = {};

    imageList.forEach(function (val) {
        image[val] = new Image();
        image[val].src = '/' + val + '.png'
    });


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
        this._render(0);
    };


    var radius = 150;
    var f = 0;
    var t = 0;
    var lastTime = 0;
    Canvas.prototype = {
        constructor: Canvas,
        _render: function (dt) {
            var delta =  dt - lastTime;
            lastTime = dt;

            if (!instance) {
                return false;
            }

            f += (delta) / 500;
            t += (delta) / 20;

            this._clearScene();
            var tankO = tank.getTanks(delta);

            var shiftX = 0, shiftY = 0;

            if (model.rotation === 4) {
                shiftX = model.shift * 16;
            }
            if (model.rotation === 1) {
                shiftX = - model.shift * 16
            }
            if (model.rotation === 8) {
                shiftY =  model.shift * 16
            }
            if (model.rotation === 2) {
                shiftY = - model.shift * 16
            }

            ctx.drawImage(tankO.canvas, model.x * 16 + shiftX, model.y * 16 + shiftY, 32, 32);

            //ctx.drawImage(tankImg, 1 * 16, 1 * 16, 32, 32);
            //ctx.drawImage((Math.sin(t)<0)? o: o2, 192, 192+ radius * Math.cos(f), 32, 32);

            map.forEach(function (line, y) {
                line.forEach(function (val, x) {
                    if (val) {
                        ctx.drawImage(image[val], x * 16, y * 16, 16, 16);
                    }
                });
            });
            ctx.fillStyle = 'red';
            graph.forEach(function (line, y) {
                line.forEach(function (val, x) {
                    if (val) {
                        ctx.fillRect(x*16+14, y*16+14, 4, 4)
                    }
                });
            });
            ctx.fillRect(model.x*16+14, model.y*16+14, 4, 4)

            requestAnimationFrame(this._render.bind(this), this.el);
        },
        _clearScene: function () {
            //ctx.clearRect(0, 0, this.el.width, this.el.height);
            ctx.fillStyle = '#111';
            ctx.fillRect(0, 0, this.el.width, this.el.height);

        },
        destroy: function () {
            instance = ctx = null;
        }
    };

    return Canvas;
});
