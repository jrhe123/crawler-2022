"use strict";
var Demo = /** @class */ (function () {
    function Demo() {
    }
    Demo.getInstance = function () {
        if (!this.instance) {
            this.instance = new Demo();
        }
        return this.instance;
    };
    return Demo;
}());
var demo1 = Demo.getInstance();
var demo2 = Demo.getInstance();
