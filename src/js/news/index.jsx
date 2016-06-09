import React, { Component } from 'react';
import { render } from 'react-dom';
import './news.less';


class HelloWorld extends Component {
  constructor() {
    super();
  }
  
  render() {
    return (
      <div className='img1'>
          <a href='index.html'>Hello World!!</a>
      </div>
    );
  }
}

render (
  <HelloWorld />,
  document.getElementById('root')
);