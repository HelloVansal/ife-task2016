let output = document.getElementById('output');
let li = output.getElementsByTagName('li');
let value = '';
let data = [];  //记录所有内容存储或删除的数组

//定义整数加入操作函数
function join(position){
    value = document.getElementsByTagName('textarea')[0].value;
    let valueArray = value.split(' ').join(',').split(' ').join(',').split('、').join(',').split('，').join(',').split(',');
    //删除数组中的空元素,并添加到data中
    let valueArrayCopy = valueArray;
    for(let i in valueArray){
        if(!valueArray[i] || valueArray[i] ===' '|| valueArray[i] ===' '){
            valueArrayCopy.splice(i, 1);
        }
        else{
            data.push(valueArray[i]);
        }
    }
    console.log(valueArray);
    console.log(valueArrayCopy);
    console.log(data);
    for(let i in valueArray){
        output.insertAdjacentHTML(position, '<li>' + valueArray[i] + '</li>');
    }
}

//左侧入按钮点击时判断是否调用join函数
document.getElementById('leftIn').onclick = function (){
	join('afterbegin');
    data.unshift(value);
};

//右侧入按钮点击时判断是否调用join函数
document.getElementById('rightIn').onclick = function (){
    join("beforeend");
    data.push(value);
};

//定义整数删除操作函数
function leave(positionDesc, position){
    if(li.length === 0){
        alert('还没数字请先输入！"')
    }
    else {
        alert('删除最'+ positionDesc + '侧节点：' + li[position].innerHTML);
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

//刷新页面
document.getElementById('reload').onclick = function () {
    location.reload();
};
