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
    let num = [0,1,2,3,4,5,6,7,8,9];
    if(!city){
        alert('城市名称不能为空');
        return false;
    }
    else {
        for(let i in city) {
            if (Number(city[i]) in num) {
                alert('城市名称只接受中文或英文字符');
                return false;
            }
        }
    }
    if(!qual){
        alert('空气质量指数不能为空');
        return false;
    }
    else{
        for(let i in qual){
            if(!(Number(qual[i]) in num)){
                alert('空气质量只接受整数');
                return false;
            }
        }
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
function delBtnHandle(i, btn) {
    // do sth.
    btn[i].parentElement.parentElement.remove();
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    let addBtn = document.getElementById('add-btn');
    addBtn.onclick = function () {
        addBtnHandle();
        let btn = document.getElementById('aqi-table').getElementsByTagName('input');
        for(let i in btn){
            btn[i].onclick = function () {
                delBtnHandle(i, btn);
            }
        }
    };
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();
