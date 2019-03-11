(function () {
    let btn = document.getElementById('add-btn');
    let data = {};
    let num = [0,1,2,3,4,5,6,7,8,9];
    btn.onclick = function () {
        let a = true;
        let city = document.getElementById('aqi-city-input').value;
        let qual = document.getElementById('aqi-value-input').value;
        if(!city){
            alert('城市名称不能为空');
            a = false;
        }
        else {
            for(let i in city) {
                if (Number(city[i]) in num) {
                    alert('城市名称只接受中文或英文字符');
                    a = false;
                    break;
                }
            }
        }
        if(a){
            if(!qual){
                alert('空气质量指数不能为空');
                a = false;
            }
            else{
                for(let i in qual){
                    if(!(Number(qual[i])  in num)){
                        alert('空气质量只接受整数');
                        a = false;
                        break;
                    }
                }
            }
        }
        console.log(a);


        data[city] = qual;
    }
})();
