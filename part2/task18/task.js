let leftIn = document.getElementById('leftIn');
let rightIn = document.getElementById('rightIn');
let leftOut = document.getElementById('leftOut');
let rightOut = document.getElementById('rightOut');

let output = document.getElementById('output');
let value = '';

function join(position){
    let inputValue = document.getElementsByTagName('input')[0].value;
    if(!/^\d+$/.test(inputValue)){
        alert('请输入整数');
        document.getElementsByTagName('input')[0].value = '';
    }
    else {
        value = inputValue;
        let li =document.createElement('li');
        li.innerHTML = value;
        output.insertAdjacentHTML(position, '<li>' + value +'</li>');
    }
}

leftIn.onclick = function (){
    join('afterbegin');
};

rightIn.onclick = function (){
    join("beforeend");
};

function leave(positionDesc, position){
    let li = document.getElementsByTagName('li');
    if(li.length === 0){
        alert('还没数字请先输入！"')
    }
    else {
        alert('删除最'+ positionDesc + '侧节点：' + li[position].textContent);
        output.removeChild(li[0]);
    }
}

leftOut.onclick = function (){
    leave('左', '0')
};

rightOut.onclick = function (){
    leave('右', document.getElementsByTagName('li').length-1)
};



