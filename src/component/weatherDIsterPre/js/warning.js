    var Warning = function(id, data) {
        if (!id || !data) {
            return false;
        }
        let typeObj = {
            baoyu:'暴雨',
            bingbao:'冰雹',
            dafeng:'大风',
            gaowen:'高温',
            leidian:'雷电',
            taifeng:'台风'
        };
        let gradeObj = {
            yellow:'黄色',
            blue:'蓝色',
            orange:'橙色'
        }
        let ul = '<ul class="qxzhjcyj-ul">';

        data.map((item,index)=>{
            let type = item.type,
                stateClass = item.state == 0 ? 'state-release' : 'state-relieve',
                stateText = item.state == 0 ? '发布' : '解除',
                grade = gradeObj[item.grade],
                time = item.time;
            ul += '<li class="qxzhjcyj-li">';
            ul += '<i class="qxzhjcyj-icon ' + type + '"></i>';
            ul += '<div class="qxzhjcyj-box"><div class="qxzhjcyj-wrap">';
            ul += '<span class="qxzhjcyj-type">' + typeObj[type] + '</span><i class="'+ stateClass +'"></i><span class="qxzhjcyj-state">'+ stateText +'</span><span class="qxzhjcyj-grade '+ item.grade +'">'+ grade + typeObj[type] +'</span><span>预警</span><span class="qxzhjcyj-time">'+ time +'</span>';
            ul += '</div></div></li>';
        });
        ul += '</ul>';
        let box = document.getElementById(id);
        box.innerHTML = ul;
    }
