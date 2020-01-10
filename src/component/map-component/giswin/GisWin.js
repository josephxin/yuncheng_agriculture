/**
 * Created by joseph_xin on 2018-12-16.
 */
import React from 'react';
/*引入antd框架*/
import { Table } from 'antd';

class GisWin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      observationHead: [],
      dataSource: []
    };

  }
  render() {
    let me = this;
    return(
      <div className={'observation-cont'}>
        <div className={'observation-head'}>
          {
            me.state.observationHead.map((t, i)=>{
              return (
                <div key={i}>
                  <p className={t.color}><span className={'font-22'}>{t.num}</span>{t.unit}</p>
                  <p className={'head-gray'}>{t.name}</p>
                </div>
              )
            })
          }
        </div>

        <Table columns={me.props.columns} dataSource={me.state.dataSource} pagination={false} scroll={{ y: 350 }} />
      </div>
    )
  }
  setData(d){
    this.setState({...d})
  }
}

export default GisWin
