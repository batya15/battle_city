define(['underscore', 'jquery'], function (_, $) {
    'use strict';

    var instance,
        Canvas,
        ctx,
        OPTIONS = {
            width: 800,
            height: 608
        };

    var x = 0, y = 0;

    $(document).on('keydown', function (e) {
        if (e.keyCode == 38 && graph[y-1] && graph[y-1][x]) {
            y -= 1
        }
        if (e.keyCode == 40 && graph[y+1] && graph[y+1][x]) {
            y += 1
        }
        if (e.keyCode == 39&& graph[y][x+1]) {
            x += 1
        }
        if (e.keyCode == 37&& graph[y][x-1]) {
            x -= 1
        }
    });

    var map = [
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
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
            graph[y][x] = !(map[y][x] || (map[y+1] && (map[y+1][x] || map[y][x+1] || map[y+1][x+1])))
        });
    });

    var imgForest = new Image();
    imgForest.src = '/tank.png';
    var imgForest2 = new Image();
    imgForest2.src = '/tank2.png';
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
        this._render();
    };


    var radius = 150;
    var f = 0;
    var t = 0;
    var s = Date.now(); //Вычислим угол

    Canvas.prototype = {
        constructor: Canvas,
        _render: function () {
            if (!instance) {
                return false;
            }

            f += (Date.now() - s) / 500;
            t += (Date.now() - s) / 20;

            this._clearScene();

            ctx.drawImage(imgForest, x * 16, y * 16, 32, 32);
            //ctx.drawImage((Math.sin(t)<0)? o: o2, 192, 192+ radius * Math.cos(f), 32, 32);

            map.forEach(function (line, y) {
                line.forEach(function (val, x) {
                    if (val) {
                        ctx.drawImage(image[val], x * 16, y * 16, 16, 16);
                    }
                });
            });

            s = Date.now();
            requestAnimationFrame(this._render.bind(this));
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
