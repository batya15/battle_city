define(['underscore', 'jquery', 'model/tank'], function (_, $, model) {
    'use strict';

    var SPEED = 1/100;

    var texture = {
        1: new Image(),
        2: new Image(),
        4: new Image(),
        8: new Image()
    }
    texture[1].src = '/tanks/1.png';
    texture[2].src = '/tanks/2.png';
    texture[4].src = '/tanks/4.png';
    texture[8].src = '/tanks/8.png';

    var Tank = function (graph) {
        this.graph = graph;
        this.el = document.createElement('canvas');
        this.el.width = 16;
        this.el.height = 16;
        this.ctx = this.el.getContext('2d');

        this.ctx.fillStyle = '#111';
    }

    Tank.prototype = {
        constructor: Tank,
        getTanks: function(dt) {
            if (model.rotation !== this.rotation) {
                model.shift = 0;
                this.ctx.fillRect(0, 0, this.el.width, this.el.height);
                this.ctx.drawImage(texture[model.rotation], 0, 0);
            }

            if (model.move) {
                if (model.rotation === 8 && this.graph[model.y+1] && this.graph[model.y+1][model.x]) {
                    console.log('bottom')
                } else if (model.rotation === 2 && this.graph[model.y-1] && this.graph[model.y-1][model.x]) {
                    console.log('top')
                } else if (model.rotation === 4 && this.graph[model.y][model.x+1]) {
                    console.log('left')
                } else if (model.rotation === 1 && this.graph[model.y][model.x-1]) {
                    console.log('right')
                } else {
                    model.shift = model.shift + SPEED * dt;
                }
            }


            if (model.shift >= 1) {
                model.shift = model.shift - 1;
                if (model.rotation === 1) {
                    model.x--;
                } else if (model.rotation === 4) {
                    model.x++
                } else if (model.rotation === 8) {
                    model.y++
                } else if (model.rotation === 2) {
                    model.y--
                }
            }
            this.rotation = model.rotation;
            return {
                canvas: this.el,
                model: model
            }
        }
    }

    return Tank;
});