define(function (require) {
    var cf = require('cf');
    var mxy = require('mxy');

    // 被require时 ，下面这些代码是会被运行的
    console.log(cf.name);
    console.log(mxy.name);
});
