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
    let y = dat.getFullYear();
    let m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    let returnData = {};
    let dat = new Date("2016-01-01");
    let datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

let aqiSourceData = {
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
function randomColor() {
    let color = {
        r: Math.floor(Math.random() * 250),
        g: Math.floor(Math.random() * 250),
        b: Math.floor(Math.random() * 250),
    };
    return color.r + ',' + color.g + ',' + color.b;
}

// 用于渲染图表的数据
let chartData = {};

// 记录当前页面的表单选项
let pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
};

/**
 * 渲染图表
 */
function renderChart() {
    let yC = document.getElementById('y-coor');
    let chart_wrap = document.getElementById('aqi-chart-wrap');
	let nowSelectCity = pageState['nowSelectCity'];
	let nowGraTime = pageState['nowGraTime'];
	let graData = chartData[nowGraTime][nowSelectCity];
	console.log(graData);
	let all = '';
	for(let i in graData){
		all += '<div></div>' + '<div>' + graData[i]['date'] + '</div>';
	}
	chart_wrap.innerHTML = all;

	

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
function citySelectChange() {
    // 确定是否选项发生了变化

    // 设置对应数据

    // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    let form_gra_time = document.getElementById('form-gra-time');
    form_gra_time.onchange = function () {
        graTimeChange();
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    let cities = '';
    for(let city in aqiSourceData){
        cities += '<option>' + city + '</option>';
    }
    let city_select = document.getElementById('city-select');
    city_select.innerHTML = cities;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    city_select.onchange = function () {
        citySelectChange();
    }

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    let day = {}; //创建天为单位的数组

    let week = {}; //创建周为单位的数组
    let weekNum = 1; //计数多少周
    let weekTotal = 0;
    let weekDays = 0; //满7为一个自然周

    let month = {}; //创建月为单位的数组
    let monthNum = 1;
    let monthTotal = 0; //一个月的总的空气指数

    for (let city in aqiSourceData){
        //先遍历声明日、周、月的数组
        day[city] = {};
        week[city] = {};
        month[city] = {};
        for(let date in aqiSourceData[city]){
            //date为每天的日期
            let sourceData = aqiSourceData[city][date];  //sourceDate为每天的空气质量的数据
            //每日数据
            let dayGet = {};
            dayGet['date'] = date.slice(8); //每天的日期从第八位开始
            dayGet['data'] = sourceData; //把数据赋给data属性
            dayGet['height'] = sourceData * 0.75 + "px"; //把数据值乘以0.75赋给height，给以后动态调用
            dayGet['width'] = '14px'; //每日数据的宽度设为14px
            dayGet['color'] = randomColor();
            dayGet['title'] = city + date; //传入当前的城市和日期
            day[city][date] = dayGet; //把dayGet所获得的动态数组赋给day数组的当前值

            //每周数据
            weekTotal += sourceData;
            let weekGet = {};
            if(weekDays === 7 || date === '2016-3-31'){
                let weekData = (weekTotal/7).toFixed(2);
                weekGet['date'] = '第' + weekNum + '周';
                weekGet['data'] = weekData;
                weekGet['height'] = sourceData * 0.75 + "px"; //把数据值乘以0.75赋给height，给以后动态调用
                weekGet['width'] = '50px'; //每日数据的宽度设为14px
                weekGet['color'] = randomColor();
                weekGet['title'] = city + date; //传入当前的城市和日期
                week[city][weekGet['date']] = weekGet;
                weekTotal = 0;
                weekDays = 0;
                weekNum++;
            }
            weekDays++;
            /*每月数据*/
            monthTotal += sourceData;
            if (date === '2016-01-31' || date === '2016-03-31' || date === '2016-02-29') {
                let monthData = 0;
                if (date === '2016-02-29') {
                    monthData = (monthTotal / 29).toFixed(2);
                } else {
                    monthData = (monthTotal / 31).toFixed(2);
                }
                let monthGet = {}; //声明一个数组暂时存放需要的数据
                monthGet['date'] = "第" + monthNum + "月"; //传入当前的日期
                monthGet['data'] = monthData; //把数据赋给date属性
                monthGet['height'] = monthData * 0.75 + "px"; //把数据值乘以0.75赋给height，给以后动态调用
                monthGet['width'] = '100px'; //每日数据的宽度设为10px
                monthGet['color'] = randomColor();
                monthGet['title'] = city + monthGet['date']; //传入当前的城市和日期

                month[city][monthGet['date']] = monthGet;
                monthTotal = 0;
                monthNum++;
            }
        }
        //周数和月数初始化，否则轮到上海周数据的时候第一周就显示成10多周了
        weekNum = 1;
        monthNum = 1
    }

    chartData.day = day;
    chartData.week = week;
    chartData.month = month;
    console.log(chartData);
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
	if(pageState['nowSelectCity'] === -1){
		pageState['nowSelectCity'] = '北京';
		renderChart();
	}
}

init();
