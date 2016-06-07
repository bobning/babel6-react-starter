import React, { Component } from 'react';
import { render } from 'react-dom';
import '../css/base';


class HelloWorld extends Component {
  constructor() {
    super();
  }
  
  render() {
    return (
      <div>
          <a href='index.html'>Hello World!!</a>
      </div>
    );
  }
}

render (
  <HelloWorld />,
  document.getElementById('root')
);