let leftIn = document.getElementById('leftIn');
let rightIn = document.getElementById('rightIn');
let leftOut = document.getElementById('leftOut');
let rightOut = document.getElementById('rightOut');

let output = document.getElementById('output');
let li = output.getElementsByTagName('li');
let value = '';
let data = [];

//整数join函数
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

//按钮点击时调用join函数
leftIn.onclick = function (){
    if(random.onclick){
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

rightIn.onclick = function (){
    if(random.onclick){
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
//整数leave函数
function leave(positionDesc, position){
    if(li.length === 0){
        alert('还没数字请先输入！"')
    }
    else {
        alert('删除最'+ positionDesc + '侧节点：' + li[position].style.height.slice(0,-2));
        output.removeChild(li[position]);
    }
}
//按钮点击时调用leave函数
leftOut.onclick = function (){
    leave('左', '0');
    data.shift();
};

rightOut.onclick = function (){
    leave('右', li.length-1);
    data.pop();
};

//随机按钮操作
let random = document.getElementById('random');

random.onclick = function () {
    output.innerHTML = '';
    for(let i=0; i<60; i++){
        let random = 10 + parseInt(Math.random() * 90);
        data.push(random);
        output.insertAdjacentHTML("beforeend", '<li style="height:'  + random + 'px;">' + '</li>');
    }
};

