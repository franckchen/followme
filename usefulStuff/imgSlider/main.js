// 轮播容器
var mxySlider = $('#mxy-slider');

// 找到轮播里的所有图片
var imgs = mxySlider.find('img');
// 轮播中有多少张图片
var imgLength = imgs.length;

// 因为是教学例子，所有假定图片高度一样
var imgHeight = 550;
var imgWidth = 960;

// 获取轮播高度，因为轮播内的元素都是absolute定位，自身丧失了高度
// 所以需要通过js去添加, 因为一开始还没有将全部孩子设置为absolute,所以能够获取到高度
// 设置了relative是为绝对定位元素做参考
mxySlider.css({
    position: 'relative',
    height: imgHeight
});

// 强制调整图片尺寸
imgs.each(function (index, img) {
    $(img).css({
        width: imgWidth,
        height: imgHeight
    });
});

/**
 * 1.$('<div class="img-wrapper"></div>')是jQuery创建dom元素的方法
 * 2.设置了一个容器，容器的宽度是300%，正好包容下3张图
 */
var imgWrapper = $('<div class="img-wrapper"></div>');
imgWrapper.css({
    position: 'absolute',
    width: (imgLength * 100) + '%',
    height: '100%'
});

// 创造一个包裹每张图片的容器
var imgContainer = $('<div class="img-container"></div>');
imgContainer.css({
    // 包裹上容器就是为了让他能够浮动，以便让图片并排排列
    float: 'left',
    // 参考父元素的宽度，确定每个图片占据的宽度，其结果也就是让一张图片宽度正好占据轮播窗口
    // 父容器宽度300%,图片宽度33.33%~~
    width: (100 / imgLength) + '%'
});

// 可以理解为为所有图片包裹上一层容器，这个容器宽度是父容器的300%,3张图片左右并排排列，出现在视野内的是第一张图
// 剩下的2张因为容器#mxy-slider的overflow:hidden而隐藏了
imgs.wrapAll(imgWrapper);
/**
 * 为每个图片包裹上容器，wrapAll是个这3张图片总体的外围添加一个容器
 */
imgs.wrap(imgContainer);

mxySlider.css({
    'overflow': 'hidden'
});

var pointersContainer = $('<div class="point-container"></div>');
pointersContainer.css({
    'position': 'absolute',
    'bottom': '8px',
    // width: 100%和text-align: center共同作用，另圆点居中
    'width': '100%',
    'text-align': 'center'
});

var i;
var len;
// 轮播中插入点容器
mxySlider.append(pointersContainer);

// 为每一个图片添加一个圆点
for (i = 0, len = imgLength; i < len; i++) {
    var point = $('<div></div>');
    point.css({
        // 教学代码，不考虑ie6和ie7了
        'display': 'inline-block',
        'width': '15px',
        'height': '15px',
        'margin': '0 5px',
        'border-radius': '50%',
        'background-color': '#fff',
        'cursor': 'pointer',
        'font-size': 0
    });

    // 为每个圆点编个号，对应表示点击自己时，切换到第几张图片
    point.attr('data-slider-index', i);

    pointersContainer.append(point);
}

// 当前展示的图片在轮播图中的位序，从0开始算
var currentImgIndex = 0;
// 记录当前轮播是否正在播放动画
var isSliding = false;

// 记录全部图片的偏移位置
var imgPositionMap = [];
for (i = 0, len = imgLength; i < len; i++) {
    // 将.img-wrapper的left值设置为该数组中任意一个值，那么对应下标的图片将展现在轮播视口内
    imgPositionMap.push(-(i * imgWidth));
}

// 插入DOM结构内元素实例化，需要获取下
imgWrapper = $('.img-wrapper');
// 包裹圆点们的容器
pointersContainer = $('.point-container');

pointersContainer.children().eq(currentImgIndex).css({
    'background-color': '#f9ab6a'
});

// 轮播跳转至指定的图片
var slideTo = function (index) {
    // 如果正处于播放中，则本函数不生效，防止两个动画同时播放造成冲突
    if (isSliding) {
        return;
    }

    if (index === currentImgIndex) {
        return;
    }

    // 设置标志位
    isSliding = true;

    // 开始播动画了，圆点的颜色要修改，全部改成白色，动画播放完，对应的圆点加上颜色
    pointersContainer.find('div').css({
        'background-color': '#fff'
    });

    // 常量用大写表示，一次轮播走50步完成
    var STEP = 50;
    // 轮播一张图片所耗时间，单位是毫秒
    var ANIMATION_LENGTH = 500;
    // 每一帧的间隔时间
    var ANIMATION_INTERVAL = ANIMATION_LENGTH / STEP;

    // 轮播图片的起始位置和终止位置
    var fromPosition = imgPositionMap[currentImgIndex];
    var toPosition = imgPositionMap[index];

    var distance = toPosition - fromPosition;
    var stepLength = distance * 0.02;
    var steps = [];

    // 计算得出轮播每一步的位置
    var i;
    for (i = 0; i < STEP; i++) {
        fromPosition += stepLength;
        // Math.floor,舍去小点后的数，常用，背下来
        steps.push(Math.floor(fromPosition));
    }

    // 最后一步的位置调整，防止溢出或不足
    if (steps[STEP - 1] !== toPosition) {
        steps[STEP - 1] = toPosition;
    }

    // 轮播动画播放完的回调函数
    var playEnd = function () {
        // 切换状态
        isSliding = false;
        // 播放完了，当前展示的图片也就变了，需要调整序号
        currentImgIndex = index;

        pointersContainer.children().eq(currentImgIndex).css({
            'background-color': '#f9ab6a'
        });
    };

    // 调用clearInterval停止null不会抛出异常，这个要记住~是无害的
    var timer = null;
    var count = 0;
    // 动画播放函数，注意形参callback,在动画全部播放完成后会调用，注意理解，在js中他叫做回调函数
    var play = function (callback) {
        imgWrapper.css({
            left: steps[count]
        });

        count++;
        if (count > STEP) {
            clearInterval(timer);
            // 动画播放完了，执行回调函数，重点理解
            callback();
        }
    };

    // 间歇性调整图片位置，20ms一次，很快，所以看起来像动画效果
    timer = setInterval(
        function () {
            play(playEnd);
        },
        ANIMATION_INTERVAL
    );
};

// 点击事件冒泡至容器上统一处理
pointersContainer.on('click', function (e) {
    // 点击的对象
    var $target = $(e.target);

    // 从点击的圆点上取一下这个圆点对应的轮播图的序号
    var sliderIndex = $target.attr('data-slider-index');
    if (!sliderIndex) {
        return;
    }

    // 跳转至圆点对应的轮播图
    slideTo(sliderIndex);
});
