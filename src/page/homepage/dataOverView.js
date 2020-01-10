/**
 * Created by admin on 2018-12-7.
 */
import React from 'react';
// import ChartLib from './chart-library.min.js';
import roulette01 from './image/data-overview/do-roulette-01.png';
import roulette02 from './image/data-overview/do-roulette-02.png';
import roulette03 from './image/data-overview/do-roulette-03.png';
import sphere01 from './image/data-overview/do-sphere-01.png';
import circle01 from './image/data-overview/do-circle-01.png';

class DataView extends React.Component {
  constructor(props) {
    super();
    this.state = {};

  }


  render() {
    let me = this;
    let props = this.props;
    return (
      <div>
        <div className="root" style={{opacity: '0'}} do-root="true">
          {/* <!-- Group1 --> */}
          <div className="group" style={{left: '0px', top: '73px'}}>
            <div className="title01" style={{left: '0px'}} do-item-id="g1_t">
              业务数据
            </div>
            <div className="rect01" style={{left: '0px', top: '45px'}} do-item-id="g1_1">
              <div className="name01">统计局</div>
              <div className="numeric01">1024</div>
            </div>
            <div className="rect01" style={{left: '0px', top: '145px'}} do-item-id="g1_2">
              <div className="name01">农业部</div>
              <div className="numeric01">1024</div>
            </div>
            <div className="rect01" style={{left: '0px', top: '245px'}} do-item-id="g1_3">
              <div className="name01">气象局</div>
              <div className="numeric01">1024</div>
            </div>
            <div className="rect01" style={{left: '0px', top: '345px'}} do-item-id="g1_4">
              <div className="name01">市场信息科</div>
              <div className="numeric01">1024</div>
            </div>
            <div className="rect01" style={{left: '0px', top: '445px'}} do-item-id="g1_5">
              <div className="name01">合作社</div>
              <div className="numeric01">1024</div>
            </div>
            <div className="rect01" style={{left: '0px', top: '545px'}} do-item-id="g1_6">
              <div className="name01">农户</div>
              <div className="numeric01">1024</div>
            </div>
            <div className="rect01" style={{left: '0px', top: '645px'}} do-item-id="g1_7">
              <div className="name01">企业</div>
              <div className="numeric01">1024</div>
            </div>
            <div className="ellipsis01" style={{left: '0px', top: '745px'}} do-item-id="g1_e">
              ... ...
            </div>
          </div>

          {/* <!-- Group2 --> */}
          <div className="group" style={{left: '204px', top: '125px'}}>
            <div className="title02" style={{left: '0px'}} do-item-id="g2_t">
              物联网数据
            </div>
            <div className="rect02" style={{left: '0px', top: '45px'}} do-item-id="g2_1">
              <div className="name02">空气温度</div>
              <div className="numeric02">1024</div>
            </div>
            <div className="rect02" style={{left: '0px', top: '145px'}} do-item-id="g2_2">
              <div className="name02">空气湿度</div>
              <div className="numeric02">1024</div>
            </div>
            <div className="rect02" style={{left: '0px', top: '245px'}} do-item-id="g2_3">
              <div className="name02">光照强度</div>
              <div className="numeric02">1024</div>
            </div>
            <div className="rect02" style={{left: '0px', top: '345px'}} do-item-id="g2_4">
              <div className="name02">二氧化碳</div>
              <div className="numeric02">1024</div>
            </div>
            <div className="rect02" style={{left: '0px', top: '445px'}} do-item-id="g2_5">
              <div className="name02">土壤温度</div>
              <div className="numeric02">1024</div>
            </div>
            <div className="rect02" style={{left: '0px', top: '545px'}} do-item-id="g2_6">
              <div className="name02">土壤湿度</div>
              <div className="numeric02">1024</div>
            </div>
            <div className="ellipsis02" style={{left: '0px', top: '645px'}} do-item-id="g2_e">
              ... ...
            </div>
          </div>

          {/* <!-- Group3 --> */}
          <div className="group" style={{left: '404px', top: '226px'}}>
            <div className="title03" style={{left: '0px'}} do-item-id="g3_t">
              互联网数据
            </div>
            <div className="rect03" style={{left: '0px', top: '45px'}} do-item-id="g3_1">
              <div className="name03">门户网站</div>
              <div className="numeric03">1024</div>
            </div>
            <div className="rect03" style={{left: '0px', top: '145px'}} do-item-id="g3_2">
              <div className="name03">政策法规</div>
              <div className="numeric03">1024</div>
            </div>
            <div className="rect03" style={{left: '0px', top: '245px'}} do-item-id="g3_3">
              <div className="name03">案例库</div>
              <div className="numeric03">1024</div>
            </div>
            <div className="rect03" style={{left: '0px', top: '345px'}} do-item-id="g3_4">
              <div className="name03">... ...</div>
              <div className="numeric03">1024</div>
            </div>
          </div>

          {/* <!-- Node --> */}
          <div className="node01" style={{left: '575px', top: '435px'}} do-item-id="n1">
            数据汇聚
          </div>
          <div className="node01" style={{left: '1240px', top: '435px'}} do-item-id="n2">
            数据应用
          </div>
          <div className="node01" style={{left: '1600px', top: '435px'}} do-item-id="n3">
            数据服务
          </div>

          {/* <!-- Core --> */}
          <div className="group" style={{left: '680px', top: '326px', width: '595px'}}>
            <div style={{textAlign: 'center', color: '#FFF', fontSize: '28px', fontWeight: 'bold'}} do-item-id="c_t">
              大数据平台
            </div>
            <div className="core-numeric01" do-item-id="c_1">
              <span>2</span>
              <span>3</span>
              <span>1</span>
              ,
              <span>7</span>
              <span>8</span>
              <span>9</span>
              ,
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <small>条</small>
            </div>
            <div className="core-numeric02" do-item-id="c_2">
              <span>9</span>
              <span>9</span>
              <span>9</span>
              ,
              <span>9</span>
              <span>9</span>
              <span>9</span>
              ,
              <span>9</span>
              <span>9</span>
              <span>9</span>
              <small>KB</small>
            </div>
          </div>

          {/* <!-- Group4 --> */}
          <div className="group" style={{left: '1420px', top: '68px'}}>
            <div className="rect03" style={{left: '0px', top: '0px'}} do-item-id="g4_1">
              <div className="name03">生产监测</div>
              <div className="numeric03">1024</div>
            </div>
            <div className="rect03" style={{left: '0px', top: '100px'}} do-item-id="g4_2">
              <div className="name03">农投品监测</div>
              <div className="numeric03">1024</div>
            </div>
            <div className="rect03" style={{left: '0px', top: '200px'}} do-item-id="g4_3">
              <div className="name03">灾害预报</div>
              <div className="numeric03">1024</div>
            </div>
            <div className="rect03" style={{left: '0px', top: '300px'}} do-item-id="g4_4">
              <div className="name03">流通追溯</div>
              <div className="numeric03">1024</div>
            </div>
            <div className="rect03" style={{left: '0px', top: '400px'}} do-item-id="g4_5">
              <div className="name03">价格预警</div>
              <div className="numeric03">1024</div>
            </div>
            <div className="rect03" style={{left: '0px', top: '500px'}} do-item-id="g4_6">
              <div className="name03">质量安全</div>
              <div className="numeric03">1024</div>
            </div>
            <div className="rect03" style={{left: '0px', top: '600px'}} do-item-id="g4_7">
              <div className="name03">信用体系</div>
              <div className="numeric03">1024</div>
            </div>
            <div className="rect03" style={{left: '0px', top: '700px'}} do-item-id="g4_8">
              <div className="name03">... ...</div>
              <div className="numeric03">1024</div>
            </div>
          </div>

          {/* <!-- Group5 --> */}
          <div className="group" style={{left: '1754px', top: '118px'}}>
            <div className="rect01" style={{left: '0px', top: '0px'}} do-item-id="g5_1">
              <div className="name01">统计局</div>
              <div className="numeric01">1024</div>
            </div>
            <div className="rect01" style={{left: '0px', top: '100px'}} do-item-id="g5_2">
              <div className="name01">农业部</div>
              <div className="numeric01">1024</div>
            </div>
            <div className="rect01" style={{left: '0px', top: '200px'}} do-item-id="g5_3">
              <div className="name01">气象局</div>
              <div className="numeric01">1024</div>
            </div>
            <div className="rect01" style={{left: '0px', top: '300px'}} do-item-id="g5_4">
              <div className="name01">市场信息科</div>
              <div className="numeric01">1024</div>
            </div>
            <div className="rect01" style={{left: '0px', top: '400px'}} do-item-id="g5_5">
              <div className="name01">合作社</div>
              <div className="numeric01">1024</div>
            </div>
            <div className="rect01" style={{left: '0px', top: '500px'}} do-item-id="g5_6">
              <div className="name01">农户</div>
              <div className="numeric01">1024</div>
            </div>
            <div className="rect01" style={{left: '0px', top: '600px'}} do-item-id="g5_7">
              <div className="name01">企业</div>
              <div className="numeric01">1024</div>
            </div>
            <div className="ellipsis01" style={{left: '0px', top: '700px'}} do-item-id="g5_e">
              ... ...
            </div>
          </div>

          {/* <!-- Edges --> */}
          <div do-source-id="g1_1" do-target-id="n1" do-middle-offset-x="50"></div>
          <div do-source-id="g1_2" do-target-id="n1" do-middle-offset-x="50"></div>
          <div do-source-id="g1_3" do-target-id="n1" do-middle-offset-x="50"></div>
          <div do-source-id="g1_4" do-target-id="n1"></div>
          <div do-source-id="g1_5" do-target-id="n1" do-middle-offset-x="50"></div>
          <div do-source-id="g1_6" do-target-id="n1" do-middle-offset-x="50"></div>
          <div do-source-id="g1_7" do-target-id="n1" do-middle-offset-x="50"></div>
          <div do-source-id="g1_e" do-target-id="n1" do-middle-offset-x="50"></div>
          <div do-source-id="g2_1" do-target-id="n1" do-middle-offset-x="50"></div>
          <div do-source-id="g2_2" do-target-id="n1" do-middle-offset-x="50"></div>
          <div do-source-id="g2_3" do-target-id="n1" do-middle-offset-x="50"></div>
          <div do-source-id="g2_4" do-target-id="n1" do-middle-offset-x="50"></div>
          <div do-source-id="g2_5" do-target-id="n1" do-middle-offset-x="50"></div>
          <div do-source-id="g2_6" do-target-id="n1" do-middle-offset-x="50"></div>
          <div do-source-id="g2_e" do-target-id="n1" do-middle-offset-x="50"></div>
          <div do-source-id="g3_1" do-target-id="n1"></div>
          <div do-source-id="g3_2" do-target-id="n1"></div>
          <div do-source-id="g3_3" do-target-id="n1"></div>
          <div do-source-id="g3_4" do-target-id="n1"></div>
          {/* <!-- <div do-source-id="g3_e" do-target-id="n1"></div> --> */}
          <div do-source-id="n2" do-target-id="g4_1"></div>
          <div do-source-id="n2" do-target-id="g4_2"></div>
          <div do-source-id="n2" do-target-id="g4_3"></div>
          <div do-source-id="n2" do-target-id="g4_4"></div>
          <div do-source-id="n2" do-target-id="g4_5"></div>
          <div do-source-id="n2" do-target-id="g4_6"></div>
          <div do-source-id="n2" do-target-id="g4_7"></div>
          <div do-source-id="n2" do-target-id="g4_8"></div>
          {/* <!-- <div do-source-id="n2" do-target-id="g4_e"></div> --> */}
          <div do-source-id="g4_1" do-target-id="n3"></div>
          <div do-source-id="g4_2" do-target-id="n3"></div>
          <div do-source-id="g4_3" do-target-id="n3"></div>
          <div do-source-id="g4_4" do-target-id="n3"></div>
          <div do-source-id="g4_5" do-target-id="n3"></div>
          <div do-source-id="g4_6" do-target-id="n3"></div>
          <div do-source-id="g4_7" do-target-id="n3"></div>
          <div do-source-id="g4_8" do-target-id="n3"></div>
          {/* <!-- <div do-source-id="g4_e" do-target-id="n3"></div> --> */}
          <div do-source-id="n3" do-target-id="g5_1"></div>
          <div do-source-id="n3" do-target-id="g5_2"></div>
          <div do-source-id="n3" do-target-id="g5_3"></div>
          <div do-source-id="n3" do-target-id="g5_4"></div>
          <div do-source-id="n3" do-target-id="g5_5"></div>
          <div do-source-id="n3" do-target-id="g5_6"></div>
          <div do-source-id="n3" do-target-id="g5_7"></div>
          <div do-source-id="n3" do-target-id="g5_e"></div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    // let me = this;

    // ////
    // // 创建中央组件控制器，绑定视图中的数值填充区域。
    // ////

    // let viewport = me.$el;

    // let app = new ChartLib.DataOverview({
    //   viewport: viewport,
    //   core: {
    //     x: 645, //875
    //     y: 130,
    //     width: 660, //1000
    //     height: 622, //viewport.clientHeight
    //     rings: [
    //       roulette01,
    //       roulette02,
    //       roulette03
    //     ],
    //     sphere: sphere01,
    //     itemBackground: circle01
    //   }
    // });
    // me._app = app;

    // // 为核心区特殊数值内容区绑定处理器   处理数据
    // app.registerFormatter('c_1', function (element, value) {
    //   return Math.round(value).toLocaleString().split('')
    //     .map(o => o === ',' ? o : ('<span>' + o + '</span>'))
    //     .join('\n') + '\n<small>条</small>';
    // });
    // app.registerFormatter('c_2', function (element, value) {
    //   return Math.round(value).toLocaleString().split('')
    //     .map(o => o === ',' ? o : ('<span>' + o + '</span>'))
    //     .join('\n') + '\n<small>KB</small>';
    // });

    // app.startRender(); //开始渲染
    // app.appear(1000);  // 出现视图间隔

    // // 将所有数值内容区的数值均重置为0。
    // // 需要注意App.set用法有三种：
    // // 1、app.set(value) 将所有数值内容区均设置为此值。
    // // 2、app.set(key, value) 将指定key的数值内容区设置为value。
    // // 3、app.set([{key:key1,value:value1}]) or app.set({key1:value1}) 批量设置数值内容区的值。
    // app.set(0);

    // viewport.style.opacity = '';

    // ////
    // // 填充本地静态数据，正式对接时应更换为接口。
    // ////
    // let autoIncrement = 0;
    // let testTimer = new ChartLib.Timer(2000);
    // testTimer.on('timer', e => {
    //   // 转换思路提供的接口数据，映射至数值内容区。
    //   // let indexData = require('./json/getIndexData.json');
    //   const mapData = {
    //     //
    //     'SJLY-环保部': 'g1_1',
    //     'SJLY-省政府': 'g1_2',
    //     'SJLY-环保厅': 'g1_3',
    //     'SJLY-涉农部委': 'g1_4',
    //     'SJLY-市县环保局': 'g1_5',
    //     'SJLY-互联网': 'g1_5',
    //     'SJLY-公众': 'g1_6',
    //     'SJLY-企业': 'g1_7',
    //     //
    //     'WLWSJ-水环境': 'g2_1',
    //     'WLWSJ-气环境': 'g2_2',
    //     'WLWSJ-土壤环境': 'g2_3',
    //     'WLWSJ-声环境': 'g2_4',
    //     'WLWSJ-污染源综合环境': 'g2_5',
    //     'WLWSJ-核与辐射': 'g2_6',
    //     //
    //     'HLWSJ-舆情': 'g3_1',
    //     'HLWSJ-门户网站': 'g3_2',
    //     'HLWSJ-政策法规': 'g3_3',
    //     'HLWSJ-案例库': 'g3_4',
    //     //
    //     'SJYY-水环境分析': 'g4_1',
    //     'SJYY-气环境分析': 'g4_2',
    //     'SJYY-土环境分析': 'g4_3',
    //     'SJYY-污染源环境监督': 'g4_4',
    //     'SJYY-污染源监测': 'g4_5',
    //     'SJYY-环境应急': 'g4_6',
    //     'SJYY-公众服务': 'g4_7',
    //     'SJYY-企业服务': 'g4_8',
    //     //
    //     'SJFW-环保部': 'g5_1',
    //     'SJFW-省政府': 'g5_2',
    //     'SJFW-环保厅': 'g5_3',
    //     'SJFW-涉农部委': 'g5_4',
    //     'SJFW-市县环保局': 'g5_5',
    //     'SJFW-公众': 'g5_6',
    //     'SJFW-企业': 'g5_7',
    //     //
    //     'SJHJ-数据总条数': 'c_1',
    //     'SJHJ-数据容量': 'c_2'
    //   };
    //   let data = [];
    //   let coreData = [];

    //   mapData.data.map(d => {
    //     let value = Number(d.SJL) + autoIncrement;
    //     let okey = d.TYPE + '-' + d.NAME;
    //     let key = mapData[okey];
    //     if (key)
    //       data.push({
    //         key,
    //         value
    //       });
    //     else if (d.TYPE === 'SJHJ')
    //       coreData.push({
    //         key: d.NAME,
    //         value
    //       });
    //   });
    //   data.push({
    //     key: 'core',
    //     value: coreData
    //   });

    //   app.set(data);

    //   autoIncrement += Math.round(Math.random() * 20);
    // });
    // testTimer.start();
    // me._testTimer = testTimer;
  }

  componentWillUnmount() {
  }
}

export default DataView
