var parseQueryStr = function (urlStr) {
    // 以?分割url,取第二部分也就是?之后的部分
    var queryStr = urlStr.split('?')[1];

    // 如果?后的内容是空的,就没有必要去分析了,直接返回空对象即可
    if (queryStr === '') {
        return {};
    }

    // 查询字符串再用&进行分割
    var pairs = queryStr.split('&');

    // 最终结果
    var result = {};

    var i;
    var len = pairs.length;
    for (i = 0; i < len; i++) {
        // 每个key-value对进行处理,以=做分割
        var temp = pairs[i].split('=');

        // =前的是key值,=后的是value值
        result[temp[0]] = temp[1];
    }

    return result;
};

// 两个测试例子
console.log(parseQueryStr('www.baidu.com?name=cf&age=29'));
console.log(parseQueryStr('www.baidu.com?name=cf'));
