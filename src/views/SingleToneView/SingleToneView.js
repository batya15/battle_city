define(['backbone'], function(Backbone) {
    'use strict';

    var instance,
        View = Backbone.View.extend({
        attributes: {
            class: 'singleTone'
        },
        tagName: 'button',
        initialize: function () {
            this.$el.text('Я один такой');
        },
        remove: function() {
            Backbone.View.prototype.remove.apply(this);
            instance = null;
        }
    });

    return function SingleTone() {
        if (instance) {
            return instance;
        } else {
            instance = new View();
            return instance;
        }
    };
});