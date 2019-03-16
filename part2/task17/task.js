/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
};
//随机颜色
function randomColor() {
    return 'rgba(' + Math.ceil(Math.random()*220) + ',' + Math.ceil(Math.random()*220) + ',' + Math.ceil(Math.random()*220) + ',0.6' + ')'
}
/**
 * 渲染图表
 */
let ul = document.createElement('ul');
let chart_wrap = document.getElementsByClassName('aqi-chart-wrap')[0];
let chart = chart_wrap.appendChild(ul);

function renderChart(days, seeds) {
    //将天数渲染进图表
    let all = '';
    for(let i in days){
        all += '<li><div class="chart_display"></div><div>' + days[i] + '</div></li>';
    }
    chart.innerHTML = all;
    //将粒度的高度和颜色渲染进图表;
    let chart_display = document.getElementsByClassName('chart_display');
    for(let i in chart_display){
        chart_display[i].style.height = seeds[i] * 0.7;
        chart_display[i].style.backgroundColor = randomColor();
    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化

    // 设置对应数据


    // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
let select = document.getElementById('city-select');

function citySelectChange(city) {
    // 确定是否选项发生了变化
    // 设置对应数据
    let cityData =  aqiSourceData[city];
    let days = [];
    let seeds = [];
    for(let date in cityData){
        days.push(date.slice(8));
        seeds.push(cityData[date]);
    }
    // 调用图表渲染函数
    renderChart(days, seeds);
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    let city = select.options[select.selectedIndex].innerHTML;
    citySelectChange(city);
}
// 给select设置事件，当选项发生变化时调用函数citySelectChange
select.onchange = function () {
    let city = select.options[select.selectedIndex].innerHTML;
    citySelectChange(city);
};

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}

init();
