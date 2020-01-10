import React from 'react';
import './gis-icon.scss';

class gisIcon extends React.Component {
  constructor(props) {
    super();
    this.state={
        active: props.active || '',
        data: props.data || []
    }

  }
  setTabActive(index){
     index = index < 0 ? null : index;
     this.setState({
        active : index
     })
  }
  itemClick(obj) {
    let callback = { name:obj.name,index:obj.index }
    if (this.state.active === obj.index ) {
        this.setTabActive();
        callback = { name:'',index:'' }
    }else {
        this.setTabActive(obj.index);
    }
    if (typeof this.props.onClick === 'function') {
        this.props.onClick(callback);
    }
  }
  // iconClick(url,index){
  //   return url || { "backgroundImage":'url("./img/gis-icon-"'+ (index+1) +')' }
  // }
  render() {
    let data = this.props.data || [];
    return (
        <div className={"gisNavIcon"}>
        {
            data.map((item, index) => {
              return (
                  <div key={index} title={item.name} style={{backgroundImage: 'url(' + item.icon + ')',}} className={`gisNavIconItem ${this.state.active === index ? 'active' : ''}`} onClick={this.itemClick.bind(this,{name:item.name,index:index})}></div>
              )
            })
        }
      </div>
    )
  }
}

export default gisIcon
