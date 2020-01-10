import React, {Component} from 'react';
import StreetDelicacies from '../js/StreetDelicacies';


class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homePageList:[]
    }
  }

  render() {
    return (
      <div className={'Homepage'} style={{position:'relative'}}>
        <div  style={{width:'700px',height:'787px',position:'absolute',left:'-280px',top:'-140px',color:'#000',fontSize:'20px'}}>
          <StreetDelicacies data={this.state.homePageList}/>
        </div>
      </div>
    )
  }

  componentDidMount() {
    // let circleData = [
    //   {name: '新农合参保人数', value: 14039},
    //   {name: '农障人数', value: 14039},
    //   {name: '复原军人保障人数', value: 14039},
    //   {name: '新农合参保人数', value: 14039},
    //   {name: '新农合参保人数', value: 14039},
    //   {name: '新农合参保人数', value: 14039},
    //   {name: '新农合参保人数', value: 14039},
    // ];
    // this.streetDelicacies._setData(this.state.data);
  }
  componentWillReceiveProps(newVal,old){
    if (newVal.homePageList.length>0) {
      // console.log(newVal.homePageList)
      this.setState({
        homePageList:newVal.homePageList
      })
    } else {
      return
    }
  }
}

export default Homepage;
