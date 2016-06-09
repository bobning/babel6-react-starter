import React, { Component } from 'react';
import { render } from 'react-dom';
import './index.less';
import AreaCascader from '../components/areaCascader';
import areaData from '../../../mock/area';


class HelloWorld extends Component {
  constructor() {
    super();
    this.saveArea = this.saveArea.bind(this);
  }
  
  saveArea(info) {
    console.log('saveArea', info);
  }
  
  render() {
    return (
      <div>
          <a href='./news.html'>Hello World!!</a>
          <AreaCascader data={ areaData.provinces } options={{
              prov: '',
              city: '',
              county: '',
              defaultText: ['省份', '城市', '区县']
          }} myCallBack={this.saveArea} />
      </div>
    );
  }
}

render (
  <HelloWorld />,
  document.getElementById('root')
);