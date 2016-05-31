import React, { Component } from 'react';
import { render } from 'react-dom';
import '../css/base';


class HelloWorld extends Component {
  render() {
    return (
      <div>
          Hello World!!
      </div>
    );
  }
}

render (
  <HelloWorld />,
  document.getElementById('root')
);