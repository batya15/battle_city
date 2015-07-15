define(['backbone', './panel.jade'], function (Backbone, template) {
    'use strict';

    return Backbone.View.extend({
        attributes: {
            class: 'v-panel'
        },
        render: function () {
            this.$el.html(template());
        }
    });

});