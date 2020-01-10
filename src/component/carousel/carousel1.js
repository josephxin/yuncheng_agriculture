import React from 'react';
import { Carousel,Icon } from 'antd';
import './carousel1.scss';

class Carouse extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                /*{imgs:require('./imgs/1.jpg'),name:'大白菜'},
                {imgs:require('./imgs/2.jpg'),name:'大白菜'},    
                {imgs:require('./imgs/3.jpg'),name:'大白菜'},
                {imgs:require('./imgs/5.jpg'),name:'青菜'},
                {imgs:require('./imgs/4.jpg'),name:'大白菜'},    
                {imgs:require('./imgs/1.jpg'),name:'大白菜'},*/
            ],
            imglength:0,
        }
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
    }
    setData(json){
        this.setState({
          data:json,
        });
        const me = this;
        //me.apper()
       // console.log(len);
    }
    next() {
        this.slider1.slick.slickNext();
    }
    prev() {
        this.slider1.slick.slickPrev();
    }
     setData1(data){
        this.setState({
            data:data.data,
            //detail:data.detail,
            imglength: data.length
        })
    }
    _addList() {
        const me = this;
        if (!me.state.data) { return }
        return me.state.data.map((s, i) => {
          return <div key={i} onClick={this.props.imgDet.bind(this,s.id,s.name)} className="slick-slide slick-active slick-current" >
                <dl>
                <dd>{s.name}</dd>
                    <dt><img src={s.imgs}/></dt>
                    
                </dl>
            </div>
        })
    }
    mouseover(dontAnimate){
        dontAnimate = true
    }
    render(){
        let len = this.state.imglength
        return (
        <div style={{width:447, marginTop:-24 }} className="imgdiv">
        {
            len>2 ? 
            (<div>
                <Carousel autoplay={false} dots={true} ref={el => (this.slider1 = el)} className={"slick-active"}>
                    {this._addList()}
                </Carousel>
                <div className="prev1"><Icon type="left" onClick={this.prev} style={{ fontSize: '20px', color: '#09d9db' }}/></div>
                <div className="next1"><Icon type="right" onClick={this.next} style={{ fontSize: '20px', color: '#09d9db' }}/></div>
            </div>)
            : ( len==0?
                (<div className="nodata1">暂无数据...</div>)
                :(<div>
                    <div className="list">
                        {this._addList()}
                    </div>
                </div>)
            )
        }
    </div>
    )
    }
}
export default Carouse;