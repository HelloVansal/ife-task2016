let output = document.getElementById('output');
let li = output.getElementsByTagName('li');
let value = '';
let data = [];  //记录所有整数存储或删除的数组

//定义整数加入操作函数
function join(position){
    let inputValue = document.getElementsByTagName('input')[0].value;
    if(!/^\d+$/.test(inputValue) || inputValue<10 || inputValue>100 ){
        alert('请输入10-100的整数');
        document.getElementsByTagName('input')[0].value = '';
    }
    else {
        value = inputValue;
        output.insertAdjacentHTML(position, '<li style="height:'  + value + 'px;">' + '</li>');
    }
}

//左侧入按钮点击时判断是否调用join函数
document.getElementById('leftIn').onclick = function (){
    if(randomOnclick){
        alert('已随机选取数字，无法手动添加');
    }
    else if(data.length<=60){
        join('afterbegin');
        data.unshift(+value);
    }
    else {
        alert('做多可以输入60个数字');
    }
};
//右侧入按钮点击时判断是否调用join函数
document.getElementById('rightIn').onclick = function (){
    if(randomOnclick){
        alert('已随机选取数字，无法手动添加');
    }
    else if(data.length<=60) {
        join("beforeend");
        data.push(+value);
    }
    else {
        alert('做多可以输入60个数字');
    }
};

//定义整数删除操作函数
function leave(positionDesc, position){
    if(li.length === 0){
        alert('还没数字请先输入！"')
    }
    else {
        alert('删除最'+ positionDesc + '侧节点：' + li[position].style.height.slice(0,-2));
        output.removeChild(li[position]);
    }
}

//左侧出和右侧出按钮点击时调用leave函数
document.getElementById('leftOut').onclick = function (){
    leave('左', '0');
    data.shift();
};

document.getElementById('rightOut').onclick = function (){
    leave('右', li.length-1);
    data.pop();
};

//随机数按钮操作
//设置随机数按钮点击后不能自行加入数字
let randomOnclick = false;
document.getElementById('random').onclick = function () {
    randomOnclick = true;
    if(sortBtnOnClick){
        output.innerHTML = '';
        data = [];
        for(let i=0; i<60; i++){
            let random = 10 + parseInt(Math.random() * 90);
            data.push(random);
            output.insertAdjacentHTML("beforeend", '<li style="height:'  + random + 'px;">' + '</li>');
        }
    }
};

//定义冒泡排序函数
function funcSort(inputSpeed){
    let x = 0;
    for(let i in li){
        for(let j=0; j<li.length-i-1; j++){
            function sort() {
                setTimeout(function () {
                    if(parseInt(li[j].style.height) > parseInt(li[j + 1].style.height)){
                        let max = li[j];
                        li[j] = li[j+1];
                        li[j+1] = max;
                        output.insertBefore(li[j+1], li[j]);
                    }
                },x * inputSpeed)
            }
            sort();
            x++;
        }
    }
}

//设置排序按钮点击后随机数按钮不能点击
let sortBtnOnClick = true;
document.getElementById('sort').onclick = function () {
    sortBtnOnClick = false;
    let inputSpeed = document.getElementsByTagName('input')[1].value;
    if (/^\d+$/.test(inputSpeed)) {
        funcSort(inputSpeed);
    }
    else{
        funcSort(50);
    }
};

//刷新页面
document.getElementById('reload').onclick = function () {
    location.reload();
};
