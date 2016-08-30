function getXHR() {
    // 旧IE不支持XMLHttpRequest,需要用ActiveXObject
    if (window.ActiveXObject) {
        try {
            return new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try {
                return new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) {}
        }
    }
    // 对于支持的直接用就可以了
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
}
/**
 * 异步请求
 *
 * @public
 * @param {string} url
 * @param {Object=} options
 */
var request = function (url, options) {
    // 获取ajax方法,老ie和新型浏览器分开处理
    var xhr = getXHR();

    // 规定ajax请求方法,默认用GET方法
    xhr.open(options.method || 'GET', url);

    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300)
                || xhr.status == 304
            ) {
                // ajax成功,如果有成功回调则执行成功回调
                if (options.success) {
                    options.success(xhr.responseText);
                }
            }
            // ajax失败,如果有失败回调,则执行
            else if (options.failure) {
                options.failure();
            }
        }
    };

    // options.data里是发送给后端的数据
    xhr.send(options.data);

    return xhr;
};
