var bindEvent = function (element, eventName, listener) {
    // w3c
    if (window.addEventListener) {
        bindEvent = element.addEventListener(eventName, listener, false);
    }
    // IE
    else if (window.attachEvent) {
        bindEvent = element.attachEvent('on' + eventName, listener);
    }
    // 上古浏览器
    else bindEvent = function (element, eventName, listener) {
        element['on' + eventName] = listener;
    };
};
