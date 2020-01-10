import React from 'react';
import { Carousel,Icon } from 'antd';
import './carousel.scss';

class Carouse extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            imglength:0,
            detail:''
        }
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.title = this.props.name.slice(0,2); // or str=str.Remove(str.Length-i,i);
    }
    next() {
        this.slider.slick.slickNext();
    }
    prev() {
        this.slider.slick.slickPrev();
    }
    
    setData(json){
        this.setState({
          data:json
        });
        const me = this;
        //me.apper()
    }
    openDetail(data){
        console.log('1111111111111111111111111111')
        console.log(data)
    }
    _addList() {
        const me = this;
        if (!me.state.data) { return }
        return this.state.data.map((s, i) => {
            if(s.httpUrl){
                return  <div key={i} onClick={this.props.openDetail.bind(this,s.httpUrl)} className="slick-slide slick-active slick-current" >
                        <dl>
                            <dd>{s.name}</dd>
                            <dt><img src={s.imgs}/></dt>
                        </dl>
                    </div>
            }else{
                return  <div key={i} onClick={this.props.openDetail.bind(this,s.detail)} className="slick-slide slick-active slick-current" >
                        <dl>
                            <dd>{s.name}</dd>
                            <dt><img src={s.imgs}/></dt>
                        </dl>
                    </div>
            }
            
        })
    }
    setData1(data){
        this.setState({
            data:data.data,
            detail:data.detail,
            imglength: data.length
        })
    }
    render(){
        let len = this.state.imglength
        return (
        <div style={{width:1384}}>
        {
            len>=7 ? 
            (<div className={'ant-carousel-area'}>
                <Carousel autoplay={false} dots={true} ref={el => (this.slider = el)} className={"slick-active"}>
                    {this._addList()}
                </Carousel>
                <div className="prev0"><Icon type="left" onClick={this.prev} style={{ fontSize: '20px', color: '#09d9db' }}/></div>
                <div className="next0"><Icon type="right" onClick={this.next} style={{ fontSize: '20px', color: '#09d9db' }}/></div>
            </div>)
            : ( len==0?
                (<div className="nodata">暂无数据...</div>)
                :(<div>
                    <div className="list1">
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