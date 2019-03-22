let output = document.getElementById('output');
let li = output.getElementsByTagName('li');
let data = [];  //记录所有内容存储或删除的数组

//定义整数加入操作函数
function join(position){
    let value = document.getElementsByTagName('textarea')[1].value;
    let valueArray = value.replace(/[\s,，、]/g, ',').split(',');
    //删除数组中的空元素
    let valueArrayCopy = [];
    for(let i in valueArray){
        if(valueArray[i] !== ''){
            valueArrayCopy.push(valueArray[i]);
        }
    }
    for(let i in valueArrayCopy){
        output.insertAdjacentHTML(position, '<li>' + valueArrayCopy[i] + '</li>');
        data.push(valueArrayCopy[i]);
    }
}

//左侧入按钮点击时判断是否调用join函数
document.getElementById('leftIn').onclick = function (){
	join('afterbegin');
};

//右侧入按钮点击时判断是否调用join函数
document.getElementById('rightIn').onclick = function (){
    join("beforeend");
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

//查询
document.getElementById('find').onclick = function (){
    let findValue = document.getElementById('findValue').value;
    for(let i in data){
        if(data[i].indexOf(findValue) !== -1){
            li[i].style.backgroundColor = 'green';
        }
    }
};

//Tag输入操作
let tag = document.getElementsByTagName('textarea')[0];
let output1 = document.getElementById('output1');
let tagli = output1.getElementsByTagName('li');
let tagData = [];
//textarea框中输入内容按空格等按键触发函数
tag.onkeyup = function (){
    if(/[\s,，]+/.test(tag.value[0]) && tag.value.length === 1){
        tag.value = '';
        return false;
    }
    if(/[\s,，]/.test(tag.value)){
        let value = tag.value.replace(/[\s,，]/, '');
        if(tagData.indexOf(value) !== -1){
            tag.value = '';
            return false;
        }
        else{
            if(tagli.length > 3 ){
                tagData.splice(0,1);
                tagli[0].parentNode.removeChild(tagli[0]);
            }
            let li = document.createElement('li');
            li.innerHTML = value;
            output1.appendChild(li);
            tagData.push(value);
            tag.value = '';
        }
    }
};

//Tag鼠标悬停操作
output1.onmouseenter = function () {
    for(let i=0;i<tagli.length;i++) {
        let text = '';
        tagli[i].onmouseenter = function () {
            text = this.innerText;
            this.innerHTML = '点击删除' + text;
            this.style.backgroundColor = 'rgba(0, 255, 0, 0.8)';
            this.style.transition = 'all 1s';
            this.style.color = 'black';
        };
        tagli[i].onmouseout = function () {
            this.innerHTML = text;
            this.style.backgroundColor = 'red';
            this.style.color = 'white';
            this.style.transition = 'all 1s';
        };
        tagli[i].onmousedown = function () {
            this.style.display = 'none';
            this.parentNode.removeChild(this);
            this.style.transition = 'all 2s';
        }
    }
};

//     output1.onmouseover = function(){
//         for(let i in tagli){
//             li
//         }
//     };

// output1.onmousemove = function(e){
//     let ee = e.target;
//     if(ee.tagName.toLowerCase() === 'li'){
//         ee.style.backgroundColor = 'red';
//     }
// };





//刷新页面
document.getElementById('reload').onclick = function () {
    location.reload();
};
