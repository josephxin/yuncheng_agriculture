import React from 'react';
import {Common} from '../common/common';
/* css */
import './select.css';

/*
* 下拉框组件 简单封装
* @author msh
* 注 _setList 可以自定义取值规则
* @props list {Array} 内容,list[0] 会被默认显示
* @props name {String} 组件名 warn时使用
* @props onSelectChange {Function} callBack 事件回调
* */
class Select extends React.Component {
  _width = undefined;
  _height = undefined;
  _top = undefined;
  _left = undefined;
  _bottom = undefined;
  _right = undefined;
  isRealUpdate = false;

  _getText() {
    return this.state.active;
  }

  _setSelectedText(name) {
    this.isRealUpdate = true;
    this.setState({
      active: name
    });
  };

  _itemClick(name, index) {
      //console.log({name,index});
    let me = this;
    me.isRealUpdate = true;
    const data = me.original[index] || {};
    me.setState({
      active: name
    });
    let propsEventChange = me.props.onSelectChange;
    if (!propsEventChange || typeof propsEventChange !== 'function') {
      throw new Error(`The props.onSelectChange of the Select component ${me.props.name || ''} is not correct.`);
    } else {
      propsEventChange({
        name,
        index,
        data
      });
    }
  }

  _setList(arr, fn) {
    let me = this;
    me.original = arr;
    //console.log(arr)
    this.setState({
      list:arr
    })
    let list = arr;

    /* 如果定义了arr的取值规则执行 */
    if (fn && typeof fn === 'function') {
      list = arr.map(fn);
    }

    /* 监测是否符合数组 */
    if (!(list instanceof Array)) {
      console.warn(`The arr params of the function _setList of the Select component ${me.props.name || ''} is not correct or the fn params is not correct , So I assign it to an empty array`);
      list = [];
    }

    /* 如果和state中存储的list相同 不执行*/
    if (me.isSameArray(me.oldList, list)) {
      return false;
    }
    //console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv',this.state.active)
    me.oldList = list;
    if(list.length>0){
      me.setState({
        list,
        active: list[0].name
      });
    }else{
      me.setState({
        list,
        active:''
      });
    }
    
  }

  /* 本组件内简单判断数组是否相同**
   * @param cArr  被对比数组
   * @param dArr  需对比数组
   */
  isSameArray(cArr, dArr) {
    if (cArr.length != dArr.length) return false;
    for (let i = 0; i < cArr.length; i++) {
      if (cArr[i] != dArr[i]) {
        return false;
      }
    }
    return true;
  }

  _clickHere() {
    let me = this;

    me.isRealUpdate = true;

    let flag = !me.state.show;

    me.setState({
      show: flag
    });
  }

  _addEventListener(e) {
    let me = this;

    me.isRealUpdate = true;

    let flag = Common.hasClass(e.target, me._id) || Common.hasClass(e.target.parentNode, me._id);
    if (!flag) {
      me.setState({
        show: false
      });
    }
  }

  constructor(props) {
    super(props);
    let me = this;
    let list = props.list;
    me.original = list;

    if (!(list instanceof Array)) {
      list = [];
    }

    me.oldList = list;

    me._id = Common.randomID(12);

    me._width = props.width || 160;
    me._height = props.height || 32;
    me._top = props.top || 0;
    me._left = props.left || 0;
    me._right = props.right || 0;
    //me._right = props.right || 0;
    // me._bottom = props.bottom || 0;

    me._eventFunction = me._addEventListener.bind(me);

    me.state = {
      list,
      show: false,
      active: ''
    };
  }

  render() {
    let me = this;
    let _height = me._height;
    let innerHeight = _height;
    let activeText = me.state.active;

    let flag = me.state.show;
    return (
      <div className={'select-box'} style={{
        width: me._width,
        height: _height,
        top: me._top,
        left: me._left || '',
        right: me._right || '',
        position: me.props.position || 'absolute',
        zIndex: me.props.zIndex,
        marginTop:me.props.marginTop,
      }}>
        <div className={`show-here ${me._id}`} style={{
          width: me._width,
          height: _height,
          lineHeight: `${innerHeight}px`
          // paddingRight: _height
        }} onClick={me._clickHere.bind(this)}>
          <span title={activeText} style={{
            width: me._width - innerHeight,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
          }}>{activeText}</span>
          <i style={{height: innerHeight, width: innerHeight}} className={flag ? 'showi' : 'hidei'}></i>
        </div>
        <ul className={`select ${flag ? 'slidedown' : 'slideup'} dialog-box-wrap`} style={{
          top: _height
        }}>
          {
            me.state.list.map((t, i) => {
              return (
                <li
                  key={`list_${i}`}
                  onClick={me._itemClick.bind(this, t.name, i)}
                  style={{
                    lineHeight: `${innerHeight}px`,
                    width: me._width,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
                  }}
                  title={t.name}
                >
                  {t.name}
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }

  componentDidMount() {
    //console.log(this.state.list)
  }

  componentDidUpdate() {
    let me = this;
    let flag = me.state.show;
    if (!flag) {
      window.removeEventListener('click', me._eventFunction, false);
    } else {
      window.addEventListener('click', me._eventFunction, false);
    }
  }

  componentWillUnmount() {
    let me = this;
    me.setState({
      show: false
    });
    window.removeEventListener('click', me._eventFunction, false);
  }
}

export default Select;
