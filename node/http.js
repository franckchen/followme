var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    /**
     * 1.end的作用是结束响应，告诉客户端所有消息已经发送.当所有要返回的内容发送完毕时,该函数必须被调用一次
     * 2.如何不调用该函数，客户端将永远处于等待状态
     * 3.一般的响应用write()函数，但是必须以end收尾，否则B端永远处于pending状态
     */
    res.end('Hello World\n');
}).listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080/');
