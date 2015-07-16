define(['backbone', './app.jade', 'views/battle/canvas.class', 'views/SingleToneView/SingleToneView'],
    function(Backbone, template) {
    'use strict';

    var Canvas = require('views/battle/canvas.class'),
        SingleTone = require('views/SingleToneView/SingleToneView');

    return Backbone.View.extend({
        el: 'body',
        events: {
          'click #button': 'addView',
          'click #single': 'addSingle'
        },
        initialize: function() {
            console.log('Панель');
        },
        render: function() {
            this.$el.html(template());
            this.addView();
        },
        addView: function () {
            var canvas = new Canvas();
            this.$('.main').append(canvas.el);
        },
        addSingle: function () {
            var v = new SingleTone();
            this.$('.main').append(v.$el);
        }
    });

});