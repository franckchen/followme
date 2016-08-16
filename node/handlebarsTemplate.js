/**
 * handlebars是node.js中常用的模板
 */
var Handlebars = require('handlebars');

/**
 * 1.模板都有自己的语法,每种语言都有自己的模板,如node的handlebars,php的smarty等等
 * 2.下面这段模板语法的意思就是遍历newsList这个数组,
 * 然后逐一生成li,填充进内容
 * 3.数据来自于后端,模板根据数据生成HTML,返回给前端,前端展现给用户新闻页
 */
var cf = ''
    + '<ul>'
    + '{{#each newsList}}'
    + '<li>标题: {{title}},内容缩略: {{content}}</li>'
    + '{{/each}}'
    + '</ul>';

// newsList编译模板
var template = Handlebars.compile(cf);
// 模板中填入数据,生成最终的html
var mxy = template({
    newsList: [
        {
            title: '王宝强离婚',
            content: '王宝强被带绿帽子啦'
        },
        {
            title: '奥运金牌',
            content: '中国健儿又夺金牌啦'
        },
        {
            title: '马新宇考公务员',
            content: '大宇哥要回家啦'
        }
    ]
});

// 最终输出了一段结合了数据的HTML
console.log(mxy);

/**
 * 模板 + 数据 = HTML
 */
