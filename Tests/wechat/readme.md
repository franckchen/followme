**Q&A**  
Q:如何设置最小宽高？压缩到590*890就不能再变小了  
A:这个没办法，有些内嵌浏览器能够限制浏览器窗口最小尺寸。也可以设值min-height, min-width这两个css属性，当收缩到小于这个尺寸时，缩小失效  
Q:不知道怎么拿到值，假设拿到了“你好啊啊啊啊”  
A:读取value属性就可以拿到值了，实在找不到，可以尝试打印DOM元素，去看他的属性，能找到的，这是小诀窍  

主要问题：  
line21: #left-part 最好补上left: 0这个属性，因为老的浏览器没有没有这个属性会出现兼容性问题，位置会跑偏，建议上下、左右，各写一个，保证兼容性和代码可读性  
line159: #right-part问题比较大，设置为position: absolute; left:300px right: 0;比现在的做好要好很多  
line226: 尝试去修改img的display属性，建议不要这样，如果img需要换行，外层加个div容器就可以了  
line230: 也是一样，尽量减少对于原生标签的样式设置，因为假如说未来left-part下还需要加图片，而这些图片又希望在同一行显示，由于img标签全被修改了样式，处理起来就麻烦了  
line247: name、msg、time通过absolute实现没问题，但是整体来说有些太依赖absolute定位了，这块其实没必要，建议可以考虑float或者其他方式优化下  
line281: 这个span可以没有，没啥用途  
line238: 这个span也是没用的，直接放在#search-kuang里就可以了，而且search-kuang尝试替换为input试试  
line48: center-part丢了个很重要的属性，overflow: auto;如果item多了，超过了屏幕高度，没有这个属性就出事了，加上后，超出的部分滚动滚动条可以查看  
line39: 这个选择器有很大问题#bottom_img已经能够唯一定位了，没必要再添加前面的#left-part，除了撑大了文件体积，没有任何其他作用  
line188: 1px的border另页面整体出现了滚动条，需要处理的，考虑下怎么改吧  

总体问题：  
1.整体过度依赖inline-block,注意，ie6/7对于inline-block支持不好，过度用inline-block会有兼容性问题，建议如果需要考虑兼容性，则多使用float: left  
2.过渡依赖display: absolute  
3.css属性写的有点乱，display,float,宽高，margin,padding等重要属性应该写在上面，font-size，color等不重要的属性可以往下放，整体代码可读性会更好  

**计划**  
学习textarea和content-editable  
学习min-height,min-width,max-height,max-width  
