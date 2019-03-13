/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
let aqiData = {};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    let city = document.getElementById('aqi-city-input').value;
    let qual = document.getElementById('aqi-value-input').value;
    if(!/^[\u4e00-\u9fa5a-zA-Z]+$/.test(city)){
        alert('城市名称只接受中文或英文字符');
        return false;
    }
    if(!/^\d+$/.test(qual)){
        alert('空气质量只接受整数');
        return false;
    }
    aqiData[city] = qual;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    let table = document.getElementById('aqi-table');
    let all = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
    for(let i in aqiData){
        all += '<tr><td>' + i + '</td><td>' + aqiData[i] + '</td><td><input type="button" value="删除"></td></tr>';
    }
    table.innerHTML = all;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    let confirm = addAqiData();
    if (confirm !== false) {
        renderAqiList();
    }
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(e) {
    // do sth.
    let city = e.target.parentNode.parentNode.childNodes[0].textContent;
    delete aqiData[city];
    renderAqiList();
}

function init() {
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    let addBtn = document.getElementById('add-btn');
    addBtn.onclick = function () {
        addBtnHandle();
    };
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    let delBtn = document.getElementById('aqi-table');
    delBtn.onclick = function (e) {
            if(e.target.nodeName.toLowerCase() === 'input'){
                delBtnHandle(e);
            }
    }
}

init();
