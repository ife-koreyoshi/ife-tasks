/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var cityInfo = document.getElementById("aqi-city-input").value.trim();
    var valueInfo = document.getElementById("aqi-value-input").value.trim();
    if(cityInfo.length !=0 && valueInfo.length != 0){
        var matchRes1 = cityInfo.match(/^[\u0391-\uFFE5a-zA-Z]+$/);
        if(matchRes1 == null){
            alert("输入的城市格式不对，必须为中英文字符！");
            return null;
        }
        var matchRes2 = valueInfo.match(/^[-+]?\d*$/);
        if(matchRes2 == null){
            alert("输入的空气质量指数格式不对，必须为整形！");
            return null;
        }
    }else{
        alert("城市或空气质量指数不可为空！");
        return null;
    }
    aqiData[cityInfo] = valueInfo;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var tableInfo = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for(var city in aqiData){
        tableInfo += "<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button id='"+city+"'>删除</button></td></tr>";
    }
    document.getElementById("aqi-table").innerHTML = city ? tableInfo : "";
    addListener();
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
    // do sth.
    document.getElementById(city).removeEventListener("click", null)
    delete aqiData[city];
    renderAqiList();
}

function addListener() {
    var buttonInfo = document.getElementById("aqi-table").getElementsByTagName("button");
    for (var i = 0; i < buttonInfo.length; i++) {
        buttonInfo[i].addEventListener("click", function(){
            delBtnHandle(this.id);
        });
    }
}

function init() {
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    document.getElementById("add-btn").addEventListener("click", addBtnHandle);
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
}

init();