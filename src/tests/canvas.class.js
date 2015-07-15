define(['views/battle/canvas.class'], function (Canvas) {

    module("canvas.class.js", {
        setup: function() {
            this.conteiner =  document.getElementById('qunit-fixture');;
        },
        teardown: function() {
            this.conteiner.innetHTML = '';
        }

    });
    test("single tone testing", 4, function () {
        var one = new Canvas();
        var two = new Canvas();
        ok(one, "Instance Canvas create one");
        ok(two, "Instance Canvas create two");
        strictEqual(one, two, "single tone works");
        one.destroy();
        var three = new Canvas();
        notStrictEqual(two, three, "new object before destroy");
        three.destroy();
    });

    test("create canvas element", 2, function () {
        var canvas = new Canvas();
        ok(canvas.el, "create element");
        strictEqual(canvas.el.tagName, 'CANVAS', 'create canvas element');
        canvas.destroy();
    });

    test("testing set size default", 2, function () {
        var canvas = new Canvas();
        strictEqual(canvas.el.width, 800,"Set 800px width canvas");
        strictEqual(canvas.el.height, 600,"Set 600px height canvas");
        canvas.destroy();
    });

    test("create context", 1, function () {
        var canvas = new Canvas();
        ok(canvas._ctx instanceof CanvasRenderingContext2D,"Set 800px width canvas");
        canvas.destroy();
    });


});
