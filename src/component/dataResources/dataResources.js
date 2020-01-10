/**
 * Created by admin on 2018-12-7.
 */
import React from 'react';

class DataView extends React.Component {
  constructor(props) {
    super();
    this.state = {
        index:0
    };
  }

  render() {
    return(
        <div>
             <iframe 
                src='/dataResources.html' 
                width="1530px" 
                height='730px' 
                scrolling="no"
                frameBorder="0"
                id='dataResources'
            />
        </div>
    )
  }

  refresh(){
      console.log('刷新');
      let dataResourcesIframe = document.getElementById('dataResources');
      dataResourcesIframe.style.position = 'absolute';
      dataResourcesIframe.style.left = '15px';
      console.log(document.getElementsByClassName('root')[0]);
      dataResourcesIframe.contentWindow.location.reload();
      this.setState({
          index:Math.random()
      })
  }

}

export default DataView
