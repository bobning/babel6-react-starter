import React, { Component } from 'react';
import 'babel-polyfill';

export default class AreaCascader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prov: props.options.prov,
      city: props.options.city,
      county: props.options.county
    };

    this.selectProv = this.selectProv.bind(this);
    this.selectCity = this.selectCity.bind(this);
    this.selectCounty = this.selectCounty.bind(this);
  }

  selectProv(e) {
    this.setState({
      prov: e.target.value,
      city: '',
      county: ''
    });
  }

  selectCity(e) {
    this.setState({
      city: e.target.value,
      county: ''
    });
  }

  selectCounty(e) {
    this.setState({
      county: e.target.value
    });
  }

  render() {
    const options = {...{defaultName: ['provinceId','cityId','countyId'], defaultText:['请选择','请选择','请选择']}, ...this.props.options};

    const provs = this.props.data.map((d, i) => {
      return <option key={ i } value={ d.code }>{ d.name }</option>;
    });

    const selectedProv = this.props.data.find(d => d.code === this.state.prov);

    const citys = selectedProv && selectedProv.citys.map((d, i) => {
      return <option key={ i } value={ d.code }>{ d.name }</option>;
    });

    const selectedCity = selectedProv && selectedProv.citys.find(d => d.code === this.state.city);
    const countys = selectedCity && selectedCity.countys.map((d, i) => {
      return <option key={ i } value={ d.code }>{ d.name }</option>;
    });

    const selectedCounty = selectedCity && selectedCity.countys.find(d => d.code === this.state.county);

    const info = {
      prov: selectedProv && {code: selectedProv.code, name: selectedProv.name},
      city: selectedCity && {code: selectedCity.code, name: selectedCity.name},
      county: selectedCounty && {code: selectedCounty.code, name: selectedCounty.name}
    };

    this.props.myCallBack && this.props.myCallBack(info);

    return (
      <ul>
        <li>
          <s>{ selectedProv && selectedProv.name || options.defaultText[0] }</s>
          <select name={options.defaultName[0]} value={this.state.prov} onChange={this.selectProv}>
            <option value="">{options.defaultText[0]}</option>
            {provs}
          </select>
        </li>
        <li>
          <s>{ selectedCity && selectedCity.name || options.defaultText[1] }</s>
          <select name={options.defaultName[1]} value={this.state.city} onChange={this.selectCity}>
            <option value="">{options.defaultText[1]}</option>
            {citys}
          </select>
        </li>
        <li>
          <s>{ selectedCounty && selectedCounty.name || options.defaultText[2] }</s>
          <select name={options.defaultName[2]} value={this.state.county} onChange={this.selectCounty}>
            <option value="">{options.defaultText[2]}</option>
            {countys}
          </select>
        </li>
      </ul>
    );
  }
}
