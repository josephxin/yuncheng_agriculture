export default function Weather(id, data) {
    if (!id || !data) {
        return false;
    }
    let html = '<div class="weather-report">';
    data.map((item, index) => {
        html += index == 0 ? initHead(item) : initBody(item);
    });

    function initHead(item) {
        let headDom = `<div class="weather-report-top">
            <div class="title">
                <span id="x-day">${item.date}（${item.week}）</span>
                <i id="x-brief">${item.brief}，${item.wind}</i>
            </div>
            <div class="content">
                <div class="img">
                    <img src="${item.iconL}" />
                    <img src="${item.iconR}" />
                </div>
                <div class="oc">
                    <span>温度</span>
                    <span class="font-size-36 x-linear"  text="${item.maxT}℃">${item.maxT}℃</span>
                    <span class="font-size-36 x-linear" text="/">/</span>
                    <span class="font-size-36 x-linear"  text="${item.minT}℃">${item.minT}℃</span>
                </div>
            </div>
            <p class="x-rotate"></p>
        </div>`;
        return headDom + '<div class="weather-report-bottom">';
    }

    function initBody(item) {
        let bodyDom = `<div class="x-item">
            <h5>${item.date}（${item.week}）</h5>
            <div>
                <div class="x-item-content">
                    <div>
                        <img src="${item.iconL}" />
                        <img src="${item.iconR}" />
                    </div>
                    <p class="x-color" title="${item.brief}">${item.brief}</p>
                    <p>
                        <span class="x-linear" text="${item.maxT}℃">${item.maxT}℃</span>
                        <span class="x-linear" text="/">/</span>
                        <span class="x-linear" text="${item.minT}℃">${item.minT}℃</span>
                    </p>
                    <p class="x-color" title="${item.wind}">${item.wind}</p>
                </div>
                <p class="x-bar left-bar"></p>
                <p class="x-bar right-bar"></p>
                <p class="x-corner left-corner"></p>
                <p class="x-corner right-corner"></p>
                <p class="x-line left-line"></p>
                <p class="x-line right-line"></p>
                <p class="x-rotate2"></p>
            </div>
        </div>`;
        return bodyDom;
    }
    let domBox = document.getElementById(id);
    domBox.innerHTML = html + '</div><p class="x-color seven-day">7天天气预报</p></div>';
}
