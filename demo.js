const getTrueNumber = x => (x < 0 ? Math.abs(x) : x);


var date2 = new Date()

var s1 = date1.getTime(),
  s2 = date2.getTime();

var total = (s2 - s1) / 1000;

var day = parseInt(total / (24 * 60 * 60)); //计算整数天数
var hour = parseInt((total - ((24 * 60 * 60)) * day) / (60 * 60)) + 8; //计算整数天数
const d = document.getElementById("time");
d.innerHTML = '我们相识了' + getTrueNumber(day) + '天' + hour + '小时';


var input = document.getElementById("input");
var btn1 = document.getElementById('baidu');
var btn2 = document.getElementById('bing');
btn1.addEventListener('click', function () {
  location.href = 'http://www.baidu.com/s?wd=' + input.value
});
btn2.addEventListener('click', function () {
  location.href = 'https://www.bing.com/search?q=' + input.value
});
var search = document.querySelector('input');
document.addEventListener('keyup', function (e) {
  if (e.keyCode == 83) {
    search.focus();
  }
})
window.onload = function () {
  var canvas = document.getElementById("c");
  var ctx = canvas.getContext("2d");
  //var c = $("#c");
  var c = document.getElementById("c");
  var w, h;
  var pi = Math.PI;
  var all_attribute = {
    num: 100, // 个数
    start_probability: 0.1, // 如果数量小于num，有这些几率添加一个新的     		     
    size_min: 1, // 初始爱心大小的最小值
    size_max: 2, // 初始爱心大小的最大值
    size_add_min: 0.3, // 每次变大的最小值（就是速度）
    size_add_max: 0.5, // 每次变大的最大值
    opacity_min: 0.3, // 初始透明度最小值
    opacity_max: 0.5, // 初始透明度最大值
    opacity_prev_min: .003, // 透明度递减值最小值
    opacity_prev_max: .005, // 透明度递减值最大值
    light_min: 0, // 颜色亮度最小值
    light_max: 90, // 颜色亮度最大值
  };
  var style_color = find_random(0, 360);
  var all_element = [];
  window_resize();

  function start() {
    window.requestAnimationFrame(start);
    style_color += 0.1;
    //更改背景色hsl(颜色值，饱和度，明度)
    ctx.fillStyle = 'hsl(' + style_color + ',100%,97%)';
    ctx.fillRect(0, 0, w, h);
    if (all_element.length < all_attribute.num && Math.random() < all_attribute.start_probability) {
      all_element.push(new ready_run);
    }
    all_element.map(function (line) {
      line.to_step();
    })
  }

  function ready_run() {
    this.to_reset();
  }

  function arc_heart(x, y, z, m) {
    //绘制爱心图案的方法，参数x,y是爱心的初始坐标，z是爱心的大小，m是爱心上升的速度
    y -= m * 10;

    ctx.moveTo(x, y);
    z *= 0.05;
    ctx.bezierCurveTo(x, y - 3 * z, x - 5 * z, y - 15 * z, x - 25 * z, y - 15 * z);
    ctx.bezierCurveTo(x - 55 * z, y - 15 * z, x - 55 * z, y + 22.5 * z, x - 55 * z, y + 22.5 * z);
    ctx.bezierCurveTo(x - 55 * z, y + 40 * z, x - 35 * z, y + 62 * z, x, y + 80 * z);
    ctx.bezierCurveTo(x + 35 * z, y + 62 * z, x + 55 * z, y + 40 * z, x + 55 * z, y + 22.5 * z);
    ctx.bezierCurveTo(x + 55 * z, y + 22.5 * z, x + 55 * z, y - 15 * z, x + 25 * z, y - 15 * z);
    ctx.bezierCurveTo(x + 10 * z, y - 15 * z, x, y - 3 * z, x, y);
  }
  ready_run.prototype = {
    to_reset: function () {
      var t = this;
      t.x = find_random(0, w);
      t.y = find_random(0, h);
      t.size = find_random(all_attribute.size_min, all_attribute.size_max);
      t.size_change = find_random(all_attribute.size_add_min, all_attribute.size_add_max);
      t.opacity = find_random(all_attribute.opacity_min, all_attribute.opacity_max);
      t.opacity_change = find_random(all_attribute.opacity_prev_min, all_attribute.opacity_prev_max);
      t.light = find_random(all_attribute.light_min, all_attribute.light_max);
      t.color = 'hsl(' + style_color + ',100%,' + t.light + '%)';
    },
    to_step: function () {
      var t = this;
      t.opacity -= t.opacity_change;
      t.size += t.size_change;
      if (t.opacity <= 0) {
        t.to_reset();
        return false;
      }
      ctx.fillStyle = t.color;
      ctx.globalAlpha = t.opacity;
      ctx.beginPath();
      arc_heart(t.x, t.y, t.size, t.size);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function window_resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
  }
  window.onresize = function () {
    window_resize();
  };

  //返回一个介于参数1和参数2之间的随机数
  function find_random(num_one, num_two) {
    return Math.random() * (num_two - num_one) + num_one;
  }

  start();
};